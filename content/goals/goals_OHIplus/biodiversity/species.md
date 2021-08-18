---
title: "Biodiversity: Species"
name: "Species"
bg_image: "/images/banners/shark-fish.jpg"
id: "ICO"
description: "Iconic species are those that are relevant to local cultural identity (e.g. through a species' relationship to traditional activities). This sub-goal assesses how well those species are conserved."
---

The Species sub-goal is part of the Biodiversity goal and assesses the condition of all marine species present in a region, including endangered species and species in relatively good condition.

#### Practical Guidance

> Data for this goal may also used in Sense of Place sub-goal: Iconic Species. It will be effective for goal keepers of Biodiversity and Sense of Place to work together on data gathering.

Ideally, every marine species living in the assessment area will have spatial data describing their location and descriptions of their popoulation health.

*_STEP 1: Identify and find the data_*

A useful starting point is to develop a list of all the species living in the assessment area.  

Then, begin hunting for data describing each species distribution and conservation status. It is best if you only use species for which there are both spatial data and an assessment (or, can be reliably estimated using gapfilling approaches). 

For the global assessment, we identified the extinction risk of each species using data from the International Union for the Conservation of Nature (IUCN) (www.iucnredlist.org/technical-documents/spatial-data). IUCN provides global species assessments that describe the distribution and the conservation status of species, ranging from Least Concern to Critically Endangered to Extinct. These risk categories were turned into these into weights (between 0 and 1) for calculations. IUCN comprehensively assesses *all* the species within a particular taxa, which provides a relatively unbiased geographic snapshot of how total marine biodiversity is faring, even though it is a very small sub-sample of overall species diversity.

The species ranges were mostly determined using IUCN distribution maps; however, AquaMaps data was used for species not covered by the IUCN distribution maps. 

IUCN and Aquamaps may be a valuable source of data for OHI+ studies.  However, applying these global datasets to more local areas can create potential gaps. For example, not all species identified in a region will be in these databases because they do belong to one of the assessed taxa, or due to oversights or errors in range maps. Furthermore, for the most part, the extinction risk scores reflect the global average, even though this can vary by region. 

Due to these shortcomings, if available, local studies of marine species distribution and status are often preferred. A good compromise might be to use a combination of global data and local data. However, one thing to keep in mind when using local data sets is that local lists might focus on endangered species and leave species in relatively good conditions un-assessed. This could result in bias, resulting in poorer scores.  

Ideally, data describing species distributions will be in a map form, either describing presence/absence or more detailed data. 
If spatial distribution distribution maps are unavailable, you can simplify the model by identifying the species to each assessed region. In this case, the contribution of the species to the region score will not be weighted by the size of their distribution. But that is fine! If data at this spatial resolution is unavailable, the score can be calculated by lumping all the species in the entire assessment area and applying the same score to all regions.  
In regard to conservation status, You can complement IUCN data (or other global data) with scientific literature searches to see if anyone has scored the species status in a way that you can use.  Another alternative is to rely on local expert judgement.

*_STEP 2: Consider the reference point_*

It will be important to identify a meaningful reference points for both 0 and 100 scores.  For example, for the Global Assessment a score of 100 indicates that all species are of "Least Concern", and a zero score indicates that 75% (or more) of species go extinct. In this case, the data was rescaled so that a zero score did not reflect 100% extinction, based on the literature of mass extinctions (e.g., Barnosky et al., 2011).  Rescaling could be further refined using nonlinear relationships between species condition scores and ultimate status scores.

*_STEP 3: Think about the model_*

At this point, you will want to consider how to best aggregate all the species information to arrive at a single score.  For instance, will the way you aggregate the species extinction risk data take into account the influence of species with smaller ranges size, or will that information be lost in the averaging process? An inherent disadvantage for conservation may occur when rare species get rarer in the future, and will therefore have a relatively small influence on the score while common species drive the results.

The model used for the Global Assessment, starts by analyzing the data at the raster cell scale. The species located in each raster cell are replaced by their numeric extinction risk values and these values are then averaged to get a single condition value for each cell.  The resulting cell values are then averaged within each country's EEZ to get the region score.  

The result is that range size has an impact on score results. For example, most cone snail species will not have a big impact on the Species sub-goal score because they tend to be rare species and have small distributions. 

This approach may, or may not, reflect the desired objectives of other OHI+ assessments.

*_Additional notes_*
Do you know how the data were collected? Do you have information on sampling effort? If you don’t know, you may not be sure whether changes in condition are due to monitoring efforts or biodiversity change, and you therefore may want to consider the uncertainty of your model.


#### Examples of the Approach
{{< csvTable path="tables/biodiversity-species.csv" sep=";" >}}

