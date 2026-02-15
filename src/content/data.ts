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
        link: "https://www.mdpi.com/2072-4292/14/16/4101"
    },
    {
        id: "water-hyacinth",
        title: "A remote sensing method to monitor water, aquatic vegetation, and invasive water hyacinth at national extents",
        authors: "G Singh, C Reynolds, M Byrne, B Rosman",
        date: "2020",
        journal: "Remote Sensing 12 (24), 4021",
        tags: ["Invasive Species", "Water Monitoring", "Deep Learning"],
        file: "/content/research/water-hyacinth.md",
        link: "https://www.mdpi.com/2072-4292/12/24/4021"
    },
    {
        id: "uncertainty-quantification",
        title: "Uncertainty quantification for probabilistic machine learning in earth observation using conformal prediction",
        authors: "G Singh, G Moncrieff, Z Venter, K Cawse-Nicholson, J Slingsby, ...",
        date: "2024",
        journal: "Scientific Reports 14 (1), 16166",
        tags: ["Machine Learning", "Probabilistic ML", "Conformal Prediction"],
        file: "/content/research/uncertainty-quantification.md",
        link: "https://www.nature.com/articles/s41598-024-67252-0",
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
        link: "https://www.nature.com/articles/s41586-025-09781-7"
    },
    {
        id: "explainable-ml",
        title: "An earth observation and explainable machine learning approach for determining the drivers of invasive species",
        authors: "G Singh, B Rosman, MJ Byrne, C Reynolds",
        date: "2025",
        journal: "Environmental Monitoring and Assessment 197 (11), 1172",
        tags: ["XAI", "Invasive Species", "Earth Observation"],
        file: "/content/research/explainable-ml.md",
        link: "https://link.springer.com/article/10.1007/s10661-025-14517-1"
    },
    {
        id: "tree-fern-prediction",
        title: "The invaded range of the tree fern Sphaeropteris cooperi is predicted to shrink",
        authors: "ML Van den Berg, G Singh, EJ McCulloch-Jones, M Rouget, ...",
        date: "2025",
        journal: "South African Journal of Botany 178, 390-399",
        tags: ["Climate Change", "Botany", "Species Distribution"],
        file: "/content/research/tree-fern-prediction.md",
        link: "https://doi.org/10.1016/j.sajb.2025.01.046"
    },
    {
        id: "global-10-m-land-use-land-cover-datasets-a-comparison-of-dynamic-world-world-cover-and-esri-land-cover-remote-sens-14-4101",
        title: "Global 10 m Land Use Land Cover Datasets: A Comparison of Dynamic World, World Cover and Esri Land Cover, Remote Sens., 14, 4101",
        authors: "Unknown",
        date: "2022",
        journal: "Unknown",
        tags: ["Research"],
        file: "/content/research/todo-global-10-m-land-use-land-cover-datasets-a-comparison-of-dynamic-world-world-cover-and-esri-land-cover-remote-sens-14-4101.md",
        link: "https://scholar.google.com/scholar?oi=bibs&hl=en&cluster=0"
    },
,
    {
        id: "global-10-m-land-use-land-cover-datasets-a-comparison-of-dynamic-world-world-cover-and-esri-land-cover-remote-sens-14-16-4101",
        title: "Global 10 m land use land cover datasets: a comparison of dynamic world, world cover and Esri land cover. Remote Sens 14 (16): 4101",
        authors: "Unknown",
        date: "2022",
        journal: "Unknown",
        tags: ["Research"],
        file: "/content/research/todo-global-10-m-land-use-land-cover-datasets-a-comparison-of-dynamic-world-world-cover-and-esri-land-cover-remote-sens-14-16-4101.md",
        link: "https://scholar.google.com/scholar?oi=bibs&hl=en&cluster=0"
    },
,
    {
        id: "an-earth-observation-and-explainable-machine-learning-approach-for-determining-the-drivers-of-invasive-species-a-water-hyacinth-case-study",
        title: "An earth observation and explainable machine learning approach for determining the drivers of invasive species—a water hyacinth case study",
        authors: "Unknown",
        date: "2025",
        journal: "Unknown",
        tags: ["Research"],
        file: "/content/research/todo-an-earth-observation-and-explainable-machine-learning-approach-for-determining-the-drivers-of-invasive-species-a-water-hyacinth-case-study.md",
        link: "https://scholar.google.com/scholar?oi=bibs&hl=en&cluster=0"
    },
,
    {
        id: "the-invaded-range-of-the-tree-fern-sphaeropteris-cooperi-is-predicted-to-shrink-in-two-southern-hemisphere-biodiversity-hotspots",
        title: "The invaded range of the tree fern Sphaeropteris cooperi is predicted to shrink in two southern hemisphere biodiversity hotspots",
        authors: "Unknown",
        date: "2025",
        journal: "Unknown",
        tags: ["Research"],
        file: "/content/research/todo-the-invaded-range-of-the-tree-fern-sphaeropteris-cooperi-is-predicted-to-shrink-in-two-southern-hemisphere-biodiversity-hotspots.md",
        link: "https://scholar.google.com/scholar?oi=bibs&hl=en&cluster=0"
    },
,
    {
        id: "the-application-of-machine-learning-methods-to-satellite-data-for-the-management-of-invasive-water-hyacinth",
        title: "The application of machine learning methods to satellite data for the management of invasive water hyacinth",
        authors: "Unknown",
        date: "2023",
        journal: "Unknown",
        tags: ["Research"],
        file: "/content/research/todo-the-application-of-machine-learning-methods-to-satellite-data-for-the-management-of-invasive-water-hyacinth.md",
        link: "https://scholar.google.com/scholar?oi=bibs&hl=en&cluster=0"
    },
,
    {
        id: "reducing-the-labeling-burden-in-time-series-mapping-using-common-ground-a-semi-automated-approach-to-tracking-changes-in-land-cover-and-species-over-time",
        title: "Reducing the labeling burden in time-series mapping using Common Ground: a semi-automated approach to tracking changes in land cover and species over time",
        authors: "Unknown",
        date: "2026",
        journal: "Unknown",
        tags: ["Research"],
        file: "/content/research/todo-reducing-the-labeling-burden-in-time-series-mapping-using-common-ground-a-semi-automated-approach-to-tracking-changes-in-land-cover-and-species-over-time.md",
        link: "https://scholar.google.com/scholar?oi=bibs&hl=en&cluster=0"
    },

];

export const blogs: BlogEntry[] = [
    {
        id: "common-ground",
        title: "Common Ground: A Semi-Supervised Approach to Scalable Time-Series Mapping",
        date: "February 5, 2026",
        summary: "Introducing a framework that combines unsupervised change detection with semi-supervised learning to automate land cover map updates.",
        file: "/content/blogs/common_ground_blog.md",
        tags: ["Semi-Supervised Learning", "Remote Sensing", "Time-Series"]
    }
];
