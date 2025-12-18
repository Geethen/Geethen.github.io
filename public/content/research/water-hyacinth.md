# Monitoring Invasive Water Hyacinth at National Extents

Invasive species like Water Hyacinth (*Pontederia crassipes*) pose a significant threat to freshwater ecosystems worldwide. This paper introduces a robust remote sensing method for national-scale monitoring.

## Problem Statement
Water hyacinth grows rapidly, clogging waterways and depleting oxygen levels for aquatic life. Monitoring its spread manually or through localized drones is not feasible for entire countries.

## The Approach
We leveraged **Sentinel-2 multispectral imagery** combined with a modified U-Net architecture to differentiate between open water, native aquatic vegetation, and water hyacinth.

### Key Innovations:
1. **Spectral Indices**: Development of a new index specifically tuned for hyacinth detection.
2. **Cloud Masking**: Advanced temporal compositing to remove cloud interference in tropical regions.
3. **Citizen Science**: Integrating validation data from local fishing communities.

## Results
The model achieved an overall accuracy of **92%** across diverse water bodies in South Africa. The system now provides monthly maps of hyacinth infestation, helping water management authorities target their clearing efforts more effectively.
