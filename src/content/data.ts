export interface Paper {
    id: string;
    title: string;
    authors: string;
    date: string;
    journal: string;
    tags: string[];
    link?: string;
    file: string;
    abstract?: string;
    highlights?: string[];
    audio?: string; // URL to NotebookLM Deep Dive or similar
}

export interface BlogEntry {
    id: string;
    title: string;
    date: string;
    summary: string;
    file: string;
    tags: string[];
}

export const papers: Paper[] = [
    {
        id: "lulc-comparison",
        title: "Global 10 m land use land cover datasets: A comparison of dynamic world, world cover and esri land cover",
        authors: "ZS Venter, DN Barton, T Chakraborty, T Simensen, G Singh",
        date: "2022",
        journal: "Remote Sensing 14 (16), 4101",
        tags: ["Remote Sensing", "Land Cover", "Data Analysis"],
        file: "/content/research/lulc-comparison.md",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=J4rtU2kAAAAJ&citation_for_view=J4rtU2kAAAAJ:d1gkVwhDpl0C"
    },
    {
        id: "water-hyacinth",
        title: "A remote sensing method to monitor water, aquatic vegetation, and invasive water hyacinth at national extents",
        authors: "G Singh, C Reynolds, M Byrne, B Rosman",
        date: "2020",
        journal: "Remote Sensing 12 (24), 4021",
        tags: ["Invasive Species", "Water Monitoring", "Deep Learning"],
        file: "/content/research/water-hyacinth.md",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=J4rtU2kAAAAJ&citation_for_view=J4rtU2kAAAAJ:u-x6o8ySG0sC"
    },
    {
        id: "uncertainty-quantification",
        title: "Uncertainty quantification for probabilistic machine learning in earth observation using conformal prediction",
        authors: "G Singh, G Moncrieff, Z Venter, K Cawse-Nicholson, J Slingsby, ...",
        date: "2024",
        journal: "Scientific Reports 14 (1), 16166",
        tags: ["Machine Learning", "Probabilistic ML", "Conformal Prediction"],
        file: "/content/research/uncertainty-quantification.md",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=J4rtU2kAAAAJ&citation_for_view=J4rtU2kAAAAJ:2osOgNQ5qMEC",
        highlights: [
            "Introduces Conformal Prediction for robust EO metrics",
            "Statistically sound uncertainty intervals for satellite data",
            "Validated across multiple biome classification tasks"
        ],
        audio: "https://www.w3schools.com/html/horse.mp3" // Placeholder for NotebookLM audio
    },
    {
        id: "biodiversity-intactness",
        title: "A place-based assessment of biodiversity intactness in sub-Saharan Africa",
        authors: "HS Clements, R Biggs, A De Vos, E Do Linh San, GP Hempson, B Linden, ...",
        date: "2025",
        journal: "Nature, 1-9",
        tags: ["Biodiversity", "Conservation", "Africa"],
        file: "/content/research/biodiversity-intactness.md",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=J4rtU2kAAAAJ&citation_for_view=J4rtU2kAAAAJ:eQOLeE2rZwMC"
    },
    {
        id: "explainable-ml",
        title: "An earth observation and explainable machine learning approach for determining the drivers of invasive species",
        authors: "G Singh, B Rosman, MJ Byrne, C Reynolds",
        date: "2025",
        journal: "Environmental Monitoring and Assessment 197 (11), 1172",
        tags: ["XAI", "Invasive Species", "Earth Observation"],
        file: "/content/research/explainable-ml.md",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=J4rtU2kAAAAJ&citation_for_view=J4rtU2kAAAAJ:YsMSGLbcyi4C"
    },
    {
        id: "tree-fern-prediction",
        title: "The invaded range of the tree fern Sphaeropteris cooperi is predicted to shrink",
        authors: "ML Van den Berg, G Singh, EJ McCulloch-Jones, M Rouget, ...",
        date: "2025",
        journal: "South African Journal of Botany 178, 390-399",
        tags: ["Climate Change", "Botany", "Species Distribution"],
        file: "/content/research/tree-fern-prediction.md",
        link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=J4rtU2kAAAAJ&citation_for_view=J4rtU2kAAAAJ:Tyk-4Ss8FVUC"
    }
];

export const blogs: BlogEntry[] = [
    {
        id: "future-ai-ecology",
        title: "The Future of AI in Ecology",
        date: "December 18, 2025",
        summary: "Exploring how generative models and computer vision are redefining environmental science.",
        file: "/content/blogs/future-ai.md",
        tags: ["Future", "AI", "Ecology"]
    }
];
