---
type: resources
title: "Cumulative Human Impacts"
name: "Cumulative Human Impacts Dataset"
card_image: "/images/infographs/trends_cumulative_impact.jpg"
card_text: "Change in human impact on global oceans from 2003 to 2013, mapped to ~1 km gridded resolution."
bg_image: "/images/banners/fish-net.jpg"
---
<br>
<br>
<br>

#### Most recent project

>We mapped the cumulative impact of human activities on global oceans from 2003 to 2013.  We found that our impact is increasing for the majority of the ocean (59%). Most of the increase was due to climate change but also from fishing, land-based pollution, and shipping.  

*[Citation:](https://www.nature.com/articles/s41598-019-47201-9)
Halpern, B.S., Frazier, M., Afflerbach, J., Lowndes, J.S., Micheli, F., O’Hara, C., Scarborough, C., Selkoe, K.A., 2019. Recent pace of change in human impact on the world’s ocean. Sci Rep 9, 11609. https://doi.org/10.1038/s41598-019-47201-9*


##### Accessing the data
The data from this analysis are available from KNB, with a package for each stressor (link to the KNB package by clicking the "Data package name"). 

All raster files are .tif format and coordinate reference system is mollweide wgs84. 


Category  | Data package name   | Description   
----------------- | ----------------- | -----------------
Cumulative impact | [Cumulative impacts](https://knb.ecoinformatics.org/view/doi:10.5063/F12B8WBS)  |The cumulative impact of all 14 stressors on 21 marine habitats 
Land-based | [Organic chemical pollution](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F12805ZF) |  relative intensity of organic pollution due to pesticide runoff from land-based applications 
Land-based | [Nutrient pollution](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1610XPS) | relative intensity of nutrient pollution due to fertilizer runoff from land-based applications
Land-based | [Light pollution](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1SQ8XQF) | relative magnitude of light pollution in coastal environments  
Land-based | [Direct human disturbance](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1XG9PGM) | magnitude of direct human interactions on coastal and near-coastal habitats, such as trampling 
Climate | [Sea level rise](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1377727) | magnitude of increasing sea level due to increasing atmospheric CO2 levels from human influences 
Climate | [Ocean acidification](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1707ZRQ) | magnitude of decreasing aragonite saturation state due to increasing atmospheric CO2 levels from human influences  
Climate | [Sea surface temperature](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1BP014N) | frequency of extreme temperature events relative to a historical baseline period 
Fisheries | [Commercial fishing - pelagic low-bycatch](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F19S1PCR) | tonnes of pelagic fisheries catch using low bycatch gear types, standardized by Net Primary Productivity  
Fisheries | [Commercial fishing - pelagic high-bycatch](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1FF3QPR) | tonnes of pelagic fisheries catch using high bycatch gear types, standardized by Net Primary Productivity  
Fisheries | [Commercial fishing - demersal non-destructive high-bycatch](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1K64GC1) | tonnes of demersal fisheries catch using nondestructive, but high bycatch, gear types, standardized by Net Primary Productivity 
Fisheries | [Commercial fishing - demersal non-desctructive low-bycatch](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1PZ574W) | tonnes of demersal fisheries catch using nondestructive and low bycatch gear types, standardized by Net Primary Productivity 
Fisheries | [Commercial fishing - demersal destructive](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1TQ5ZVT) | tonnes of catch using demersal destructive gear types, standardized by Net Primary Productivity 
Fisheries | [Artisanal fishing](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1ZG6QKJ) | tonnes of artisanal fisheries catch standardized by Net Primary Productivity 
Shipping | [Shipping](https://knb.ecoinformatics.org/view/resource_map_doi:10.5063/F1NZ85ZN) | relative intensity of global shipping traffic  

*Each data package includes:*

- Raw stressor intensity rasters for 2003 to 2013. These rasters are created using scripts located in the 'stressors' folder of the 'impact_acceleration' Github repository.

- Rescaled stressor intensity rasters for 2003 to 2013. Raw stressor intensities are rescaled to values between 0 and 1, using either known or estimated ecosystem thresholds or upper quantile values from the distribution of global stressor intensity values across years. These rasters are created using scripts located in the 'stressors' folder of the 'impact_acceleration' Github repository.

- Impact rasters for 2003 to 2013 which describe the impact of the stressor based on the vulnerability of 21 marine ecosystems to the stressor. The impact of the stressor is estimated by multiplying the stressor's intensity by the corresponding ecosystem vulnerability where the ecosystem occurs. The average impact of each stressor, across all ecosystems, is estimated by summing the stressor-by-ecosystem vulnerability combinations and dividing by the number of ecosystems within each cell. These rasters are created using scripts located in the 'impacts' folder of the 'impact_acceleration' Github repository.

- A trend raster describing the average annual change in impact from 2003 to 2013. This raster is created using scripts located in the 'trend' folder of the 'impact_acceleration' Github repository.

*The Cumulative impact package includes:*

- Ecosystem rasters describing the location (1 if present, otherwise NA) of 21 global marine ecosystems. These rasters are the same as used in previous years, with the exception of seaice. The seaice raster was created using a script located in the 'habitats' folder of the 'impact_acceleration' Github repository.

- A vulnerability matrix describing the vulnerability of each ecosystem to each stressor, with values ranging from 0-4.

- The impact_acceleration-1.0.zip GitHub repository with the code used to generate, analyze, and visualize data.

The code to create and analyze these data is available from Github: https://github.com/OHI-Science/impact_acceleration

#### Earlier projects
We mapped the change, using 2008 and 2013 data, in cumulative impacts to global marine ecosystems  from fishing, climate change, and ocean- and land-based stressors ([Halpern et al. 2015](https://www.nature.com/articles/ncomms8615)). Seven data packages are available from KNB:

1. [supplementary data](https://knb.ecoinformatics.org/#view/doi:10.5063/F19Z92TW)  habitat data and other files 

2. [raw stressor data](https://knb.ecoinformatics.org/#view/doi:10.5063/F1S180FS) 2008 and 2013

3. [stressor data rescaled by one time period](https://knb.ecoinformatics.org/#view/doi:10.5063/F1DR2SDD)  2008 and 2013, scaled from 0-1

4. [stressor data rescaled by two time periods](https://knb.ecoinformatics.org/#view/doi:10.5063/F19021PC) 2008 and 2013, scaled from 0-1 

5. [pressure and cumulative impacts data](https://knb.ecoinformatics.org/#view/doi:10.5063/F15718ZN) 2013, all pressures

6. [pressure and cumulative impacts data](https://knb.ecoinformatics.org/#view/doi:10.5063/F11J97N3) 2008 and 2013, subset updated for both time periods

7. [change in pressures and cumulative impact](https://knb.ecoinformatics.org/#view/doi:10.5063/F1WS8R5T) 2008 to 2013

*Description of data:* 
Raw stressor data -> 
rescaled stressor data (values rescaled to be between 0-1) -> 
pressure data (stressor data after adjusting for habitat/pressure vulnerability) -> 
cumulative impact (sum of pressure data) -> 
difference between 2008 and 2013 pressure and cumulative impact data. 

All raster files are .tif format and coordinate reference system is mollweide wgs84. 


**Original Cumulative Human Impact Data**

The original project for mapping the cumulative human impact to marine ecosystems ([Halpern et al. 2008](https://science.sciencemag.org/content/319/5865/948.abstract)) additionally has 4 packages of data, with the [main cumulative impact data](https://knb.ecoinformatics.org/view/doi%3A10.5063%2FF19C6VN5) available along with several nested datasets available within that page.
