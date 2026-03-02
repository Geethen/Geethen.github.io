import json
import re
import time
import random
from datetime import datetime

import requests
from bs4 import BeautifulSoup

# Configuration
SCHOLAR_ID = 'J4rtU2kAAAAJ'
DATA_TS_PATH = 'src/content/data.ts'
SCHOLAR_JSON_PATH = 'src/content/scholar.json'

HEADERS = {
    'User-Agent': (
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
        'AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/122.0.0.0 Safari/537.36'
    ),
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}


def fetch_page(cstart=0, pagesize=100):
    url = (
        f'https://scholar.google.com/citations'
        f'?user={SCHOLAR_ID}&hl=en&cstart={cstart}&pagesize={pagesize}'
    )
    time.sleep(random.uniform(2, 4))
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    if 'gs_captcha' in resp.text or 'sorry/index' in resp.url:
        raise RuntimeError('Google returned a CAPTCHA page — try again later.')
    return BeautifulSoup(resp.text, 'html.parser')


def parse_stats(soup):
    stats = {'totalCitations': 0, 'hIndex': 0}
    table = soup.find('table', id='gsc_rsb_st')
    if not table:
        raise RuntimeError('Stats table not found — page structure may have changed.')
    for row in table.find_all('tr'):
        label_el = row.find('td', class_='gsc_rsb_sc1')
        values = row.find_all('td', class_='gsc_rsb_std')
        if not label_el or not values:
            continue
        label = label_el.get_text(strip=True).lower()
        try:
            val = int(values[0].get_text(strip=True))
        except ValueError:
            continue
        if 'citation' in label:
            stats['totalCitations'] = val
        elif 'h-index' in label:
            stats['hIndex'] = val
    return stats


def parse_publications(soup):
    pubs = []
    for row in soup.find_all('tr', class_='gsc_a_tr'):
        title_el = row.find('a', class_='gsc_a_at')
        if not title_el:
            continue
        title = title_el.get_text(strip=True)

        gray = row.find_all('div', class_='gs_gray')
        authors = gray[0].get_text(strip=True) if len(gray) > 0 else 'Unknown'
        venue_year = gray[1].get_text(strip=True) if len(gray) > 1 else ''
        # venue_year is typically "Journal Name, YYYY"
        journal = venue_year.rsplit(',', 1)[0].strip() if ',' in venue_year else venue_year
        year = venue_year.rsplit(',', 1)[-1].strip() if ',' in venue_year else 'Unknown'

        cite_el = row.find('a', class_='gsc_a_ac')
        try:
            citations = int(cite_el.get_text(strip=True)) if cite_el and cite_el.get_text(strip=True) else 0
        except ValueError:
            citations = 0

        pubs.append({'title': title, 'authors': authors, 'journal': journal, 'year': year, 'citations': citations})
    return pubs


def update_scholar_data():
    print(f"Fetching data for Scholar ID: {SCHOLAR_ID}...")

    try:
        soup = fetch_page(cstart=0, pagesize=100)
        stats = parse_stats(soup)
        publications = parse_publications(soup)

        # Fetch additional pages if there are 100+ publications
        if len(publications) == 100:
            soup2 = fetch_page(cstart=100, pagesize=100)
            publications.extend(parse_publications(soup2))
    except Exception as e:
        print(f"Error fetching data: {e}")
        return

    print(f"Total Citations: {stats['totalCitations']}")
    print(f"H-Index: {stats['hIndex']}")
    print(f"Publications found: {len(publications)}")

    # 1. Update scholar.json
    scholar_stats = {
        "totalCitations": stats['totalCitations'],
        "hIndex": stats['hIndex'],
        "lastUpdated": datetime.now().strftime("%Y-%m-%d"),
        "citations": {}
    }

    # Read current data.ts to get existing paper titles and IDs
    with open(DATA_TS_PATH, 'r', encoding='utf-8') as f:
        data_ts_content = f.read()

    existing_papers = re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)"', data_ts_content)
    id_map = {title.lower(): paper_id for paper_id, title in existing_papers}

    new_papers_found = []

    for pub in publications:
        title = pub['title']
        citations = pub['citations']
        match_id = id_map.get(title.lower())
        if match_id:
            scholar_stats["citations"][match_id] = citations
        else:
            new_papers_found.append(pub)

    with open(SCHOLAR_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(scholar_stats, f, indent=2)
    print(f"Updated {SCHOLAR_JSON_PATH}")

    # 2. Append new papers to data.ts if any
    if new_papers_found:
        print(f"Found {len(new_papers_found)} potentially new papers!")

        added_count = 0
        for paper in new_papers_found:
            paper_id = re.sub(r'[^a-z0-9]+', '-', paper['title'].lower()).strip('-')
            if f'id: "{paper_id}"' in data_ts_content:
                continue

            new_entry = f"""    {{
        id: "{paper_id}",
        title: "{paper['title']}",
        authors: "{paper['authors']}",
        date: "{paper['year']}",
        journal: "{paper['journal']}",
        tags: ["Research"],
        file: "/content/research/todo-{paper_id}.md",
        link: "https://scholar.google.com/scholar?oi=bibs&hl=en&cluster=0"
    }},
"""
            papers_match = re.search(r'(export const papers: Paper\[\] = \[.*?)\n\];', data_ts_content, re.DOTALL)
            if papers_match:
                insertion_point = papers_match.end(1)
                data_ts_content = data_ts_content[:insertion_point] + ",\n" + new_entry + data_ts_content[insertion_point:]
                added_count += 1

        if added_count > 0:
            with open(DATA_TS_PATH, 'w', encoding='utf-8') as f:
                f.write(data_ts_content)
            print(f"Added {added_count} new paper stubs to {DATA_TS_PATH}")


if __name__ == "__main__":
    update_scholar_data()
