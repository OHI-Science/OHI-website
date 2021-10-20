---
title: "Sub-Goal: Mariculture"
name: "Mariculture"
bg_image: "/images/banners/shark-fish.jpg"
id: "MAR"
description: "Mariculture measures the ability to reach the highest levels of seafood gained from farm-raised facilities without damaging the ocean’s ability to provide fish sustainably now and in the future."
---

Mariculture is a component of the Food Provision goal.  The Mariculture subgoal measures the ability to maximize the amount of seafood from farm-raised facilities without compromising the ocean’s ability to sustainably provide food now and in the future. 

A score of 100 means that a region is growing the greatest amount of farmed seafood possible based on its potential (where its maximum potential is estimated in different ways depending on the assessment) and without compromising future production.  Sustainable production is acheived by not compromising water quality, avoiding unsustainable sources of feed and sources for replenishing cultivated species, and ensuring the safety and quality of the product. 

#### Practical Guidance

*_STEP 1: Mariculture Data_*
This goal requires two key pieces of information: the amount of mariculture food production by region and taxa, and a corresponding measure of how sustainably it is produced.

Data describing the quantity of aquaculture production for each region and taxa is required. The FAO (http://www.fao.org/fishery/statistics/global-aquaculture-production/en) provides the tonnes (and USD) of taxa-specific production by country, but for subcountry analyses, it will be necessary to  distribute the production among the regions.

> Production that is used as feed for other fish (e.g., sprat) would be more appropriate to include in Natural Products. This is because they are not being consumed directly. Fish such as sprat, for example, may be used to feed pigs in addition to other fish, and therefore you would need to know how much (tonnage) is being produced, and where it is going to be able to accurately distinguish these categories to avoid double-counting.

> Currently, most mariculture seaweeds are produced for human consumption and, if possible, should be included in the Mariculture subgaol.

For each category of mariculture, a score describing the sustainability of the rearing practices is required. This can take into account many variables, including: monitoring and tracking programs to ensure quality and safety for human consumption; sustainable sources of seed stocks; sustainably produced feed; minimal habitat destruction; maintainance of clean waters; rearing practices that do not promote disease or introduce invasive species.  

Sustainability scores should be as specific as possible, for example describing the sustainability for a specific taxa, region, rearing practice, etc.  But data at this resolution is usually not available.  The sustainability data used by the Global Assessment is from the [Monterey Bay Aquarium Seafood Watch](https://www.seafoodwatch.org/recommendations/search?query=).  This is a valuable source of data and relatively detailed, but even so, we must do a fair amount of gapfilling to ensure every taxa and country gets a sustainability score.

Sustainability scores are generally converted to a scale of 0 to 1, with 1 indicating that mariculture practices for a specific animal and region is fully sustainable.

*_STEP 2: Determine the Reference Point_*

There are various approaches for determining the reference point for this goal depending on available data and regional goals. 

One option is for the reference point to be based on the maximum potential yield of mariculture in each region.  One factor limiting potential yield is the availablity of suitable habitat for each of the cultured taxa. Obtaining this value requires estimating the amount of harvest that is possible in a region given available area and biological conditions (e.g., temperature and nutrient levels can support mariculture). A valuable reference that explores mariculture production potential at the global scale is Gentry et al. 2017.  We used this general approach to determine aquaculture production potential for each country.    

However, reference points based entirely on habitat suitability models will overestimate potential production for several reasons. For one, models generally fail to adequately capture all the biological and geomorphological limitations to production. But perhaps more importantly, in addition to the biological constraints that limit production there will also be economic and social constraints. Mariculture will compete for space with many other ocean uses, including fishing, tourism, shipping, and other activities, and may be threaten high biodiversity or environmentally sensitive areas. Given this, production potential estimates should also incorporate economic and social limitations. These include distance from the coast and/or human population centers, demand for seafood, and allotment of marine space to mariculture versus sports, hotels, beaches, tourism, or other uses. 

For the Global Assessment, we adjusted the habitat suitability estimates of production potential to account for the social and economic realities as well.  In this case, we constrained the per-country potential to 1% of the potential tonnage estimated using habitat suitability models, and used these country values as reference points. However, this could be fine-tuned at the local scale by finding maps describing the locations of competing coastal activities or general restrictions to use. Information about local preferences for mariculture seafood versus other activities and uses could also be used to help adjust the reference point.

Reference points for production could also reflect regional targets established by other metrics.

> If a region has little or no suitable habitat for mariculture, the score for this goal should be NA. 

*_STEP 3: Model Considerations_*

A low score can indicate one of two things – that species are being farmed in an unsustainable manner or that regions are not maximizing the potential to farm in their marine territorial waters. Specifically, for the Global Assessment for each taxa and region, we multiply the tonnes of production by the sustainability coefficient to get the functional harvest tonnes (if sustainability is 0 then functional harvest will go to zero).  We then sum the functional harvest tonnes across all species. This assumes that a tonne of seaweed production is equally as important as salmon production, despite differences in nutritional quality or economic value. This model could be adpated to meet local needs.

### Examples of the Approach
{{< csvTable path="tables/mariculture.csv"  sep=";" >}}
