---
title: "Guidance: Iconic Species"
name: "Iconic Species"
bg_image: "/images/banners/shark-fish.jpg"
id: "ICO"
description: "This sub-goal assesses the health of the iconic species in a region."
---

Iconic species is a component of the Sense of Place goal which aims to capture how well we are protecting the local coastal and marine systems that we value as part of our cultural identity. For the iconic species subgoal, a score of 100 means that all the culturally important marine species in a region are doing well. 

#### Practical Guidance

This sub-goal assesses the condition of local marine species that are iconic to a region.

> Data for this goal will likely have considerable overlap with Biodiversity sub-goal: Species. Calculating Biodiversity and Sense of Place scores should be a collaborative effort.

*_STEP 1: Determine iconic species_*

First you need to identify the iconic species located in each region. These species may be valued because of their role in: 1) traditional activities such as fishing, hunting or commerce; 2) local ethnic or religious practices; 3) existence value; and 4) locally-recognized aesthetic value (e.g., touristic attractions/common subjects for art such as whales). 
> Habitat-forming species are not included in this definition nor are species that are harvested solely for economic or utilitarian purposes (even though they may be iconic to a sector or individual). 

In practice, Iconic Species are usually a subset of the broader list of species in an area, and so you should be able to find Iconic Species after having found assessed species data for the Species sub-goal of the Biodiversity goal (see Biodiversity for more details). Once you have the full list of assessed species you can determine a subset for Iconic Species. For instance, are there species that are culturally held as valuable? Do any species appear on the currency or postage stamps?

> Defining which species are iconic can be challenging, especially because different species can be iconic to different groups within the same region. It might be helpful to elicit information from experts on local customs and tradition.

Ultimately, almost any species can be iconic to someone, but the intent of this goal is to focus on those species widely seen as iconic within a country, and iconic from a cultural or existence value (rather than for a livelihoods or extractive reason). Many lists exist for globally important, threatened, and endemic species, but the extent these species represent regionally iconic species is unclear. For the global assessment, species were drawn from the World Wildlife Fund’s global and regional lists for Priority Species (especially important to people for their health, livelihoods, and/or culture) and Flagship Species (‘charismatic’ and/or well-known). 

*_STEP 2: Assess condition_*

For the global assessment, the health of each iconic species was based on its  extinction risk from the International Union for the Conservation of Nature ([IUCN](https://www.iucnredlist.org/resources/spatial-data-download)). IUCN provides global species assessments that describe the distribution and the conservation status of species, ranging from Least Concern to Critically Endangered to Extinct.

Beyond extinction risk, there are many metrics that can be used to assess species health, such as the stability of their populations.

Keep in mind that regional assessments of species condition are usually more accurate than large global assessments (such as the IUCN), and are thus preferred data sources. A good compromise might be to use local data when available and gapfill missing data with global assessments.

Species status data must then be converted to values between 0 to 1, with 1 indicating low risk, low vulnerability, high health. The reference point will be all iconic species having a healthy level of existence.

*_STEP 3: Calculate final score_*

The species' status scores in each region will need to be combined.  The global assessment simply averages the species status scores within each region. However, it might be worth weighting by some variable such as its iconic status.  


#### Examples of the Approach
{{< csvTable path="tables/iconic-species.csv" sep=";" >}}
