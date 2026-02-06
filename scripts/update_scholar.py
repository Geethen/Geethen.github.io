import json
import os
import re
from datetime import datetime
from scholarly import scholarly

# Configuration
SCHOLAR_ID = 'J4rtU2kAAAAJ'
DATA_TS_PATH = 'src/content/data.ts'
SCHOLAR_JSON_PATH = 'src/content/scholar.json'

def update_scholar_data():
    print(f"Fetching data for Scholar ID: {SCHOLAR_ID}...")
    
    # Fetch author data
    try:
        author = scholarly.search_author_id(SCHOLAR_ID)
        author = scholarly.fill(author, sections=['basics', 'indices', 'publications'])
    except Exception as e:
        print(f"Error fetching data: {e}")
        return

    # 1. Update scholar.json
    scholar_stats = {
        "totalCitations": author.get('citedby', 0),
        "hIndex": author.get('hindex', 0),
        "lastUpdated": datetime.now().strftime("%Y-%m-%d"),
        "citations": {}
    }

    print(f"Total Citations: {scholar_stats['totalCitations']}")
    print(f"H-Index: {scholar_stats['hIndex']}")

    # Map publications to citation counts
    # We need a way to match Google Scholar titles to our data.ts IDs
    # For now, we'll try to match by title similarity or just update the total
    
    # Read current data.ts to get existing paper titles and IDs
    with open(DATA_TS_PATH, 'r', encoding='utf-8') as f:
        data_ts_content = f.read()

    # Simple regex to find paper titles and IDs in data.ts
    # Match id: "..." and title: "..."
    existing_papers = re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)"', data_ts_content)
    id_map = {title.lower(): paper_id for paper_id, title in existing_papers}

    new_papers_found = []

    for pub in author['publications']:
        title = pub['bib']['title']
        citations = pub.get('num_citations', 0)
        
        match_id = id_map.get(title.lower())
        if match_id:
            scholar_stats["citations"][match_id] = citations
        else:
            # Check if it's actually new (not just a title mismatch)
            new_papers_found.append({
                "title": title,
                "authors": pub['bib'].get('author', 'Unknown'),
                "year": pub['bib'].get('pub_year', 'Unknown'),
                "journal": pub['bib'].get('venue', 'Unknown'),
                "citations": citations
            })

    # Save scholar.json
    with open(SCHOLAR_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(scholar_stats, f, indent=2)
    print(f"Updated {SCHOLAR_JSON_PATH}")

    # 2. Append new papers to data.ts if any
    if new_papers_found:
        print(f"Found {len(new_papers_found)} potentially new papers!")
        
        added_count = 0
        for paper in new_papers_found:
            # Generate a simple slug for ID
            paper_id = re.sub(r'[^a-z0-9]+', '-', paper['title'].lower()).strip('-')
            
            # Check if this ID already exists in data.ts (maybe manual ID was different)
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
            # Insert before the last ]; in the papers array
            # Note: This is a bit fragile but works for the current structure
            # We look for the export const papers: Paper[] = [ ... ]; block
            
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
