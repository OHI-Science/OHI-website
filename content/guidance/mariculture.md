---
title: "Guidance: Mariculture"
name: "Mariculture"
bg_image: "/images/banners/shark-fish.jpg"
id: "MAR"
description: "Mariculture measures the ability to sustainably produce food from farm facilities."
---

Mariculture is a component of the Food Provision goal.  This subgoal measures the ability to maximize the amount of seafood from farm-raised facilities without compromising sustainability. 

A score of 100 means that a region is growing the greatest amount of farmed seafood possible based on its potential (where its maximum potential is estimated in different ways depending on the assessment) and without compromising future production.  Sustainable production is acheived by not compromising water quality, avoiding unsustainable sources of feed and sources for replenishing cultivated species, and ensuring the safety and quality of the product. 

#### Practical Guidance

*_STEP 1: Mariculture Data_*

This goal requires two key pieces of information: the amount of mariculture food production by region and taxa, and a corresponding measure of how sustainably it is produced.

Data describing the quantity of aquaculture production for each region and taxa is required. The [FAO](http://www.fao.org/fishery/statistics/global-aquaculture-production/en) provides the tonnes (and USD) of taxa-specific production by country, but for subcountry analyses, it will be necessary to  distribute the production among the regions.

> Production that is used as feed for other fish (e.g., sprat) would be more appropriate to include in Natural Products because it is not directly consumed by humans. Fish such as sprat, for example, may be used to feed pigs, and therefore it is useful (but not always possible) to know where the production is going in order to accurately assign the product to the correct goal.

> Currently, most (but not all!) mariculture seaweeds are produced for human consumption and, if possible, should be included in the Mariculture subgaol.

For each category of mariculture, a score describing the sustainability of the rearing practices is required. This can take into account many variables, including: monitoring and tracking programs to ensure quality and safety for human consumption; sustainable sources of seed stocks; sustainably produced feed; minimal habitat destruction; maintenance of clean waters; rearing practices that do not promote disease or introduce invasive species.  

Sustainability scores should be as specific as possible, for example describing the sustainability for a specific taxa, region, rearing practice, etc.  But data at this resolution is usually not available.  The sustainability data used by the Global Assessment is from the [Monterey Bay Aquarium Seafood Watch](https://www.seafoodwatch.org/recommendations/search?query=).  This is a valuable source of data and relatively detailed, but even so, we must do a fair amount of gapfilling to ensure every taxa and country gets a sustainability score.

Sustainability scores are generally converted to a scale of 0 to 1, with 1 indicating that mariculture practices for a specific animal and region are fully sustainable.

*_STEP 2: Determine the Reference Point_*

There are various approaches for determining the reference point for this goal depending on available data and regional goals. 

One option is for the reference point to be based on the maximum potential yield of mariculture in each region.  One factor limiting potential yield is the availability of suitable habitat for each of the cultured taxa. Obtaining this value requires estimating the amount of harvest that is possible in a region given available area and biological conditions (e.g., temperature and nutrient levels can support mariculture). A valuable reference that explores mariculture production potential at the global scale is [Gentry et al. 2017](https://www.nature.com/articles/s41559-017-0257-9).  We used this general approach to determine aquaculture production potential for each country.    

However, reference points based entirely on habitat suitability models will overestimate potential production for several reasons. For one, models generally fail to adequately capture all the biological and geomorphological limitations to production. But perhaps more importantly, in addition to the biological constraints that limit production there will also be economic and social constraints. Mariculture competes with many other activities for space, including fishing, tourism, shipping, and other activities. Mariculture may also threaten biodiversity and environmentally sensitive areas. Given this, production potential estimates should also incorporate economic and social limitations. These include distance from the coast and/or human population centers, demand for seafood, and allotment of marine space to mariculture versus sports, hotels, beaches, tourism, or other uses. 

For the Global Assessment, we adjusted the habitat suitability estimates of production potential to help account for the social and economic realities as well.  In this case, we constrained the per-country potential to 1% of the potential tonnage estimated using habitat suitability models, and used these country values as reference points. However, this could be fine-tuned at the local scale by finding maps describing the locations of competing coastal activities or general restrictions to use. Information about local preferences for mariculture seafood versus other activities and uses could also be used to help adjust the reference point.

Reference points for production could also reflect regional targets established by other metrics.

> If a region has little or no suitable habitat for mariculture, the score for this goal should be NA. 

*_STEP 3: Model Considerations_*

A low score can indicate one of two things – that species are being farmed in an unsustainable manner or that regions are not maximizing the potential to farm in their marine territorial waters. For the Global Assessment we estimate how close a country's total production is relative to its potential production by dividing the observed tonnes of harvest by the potential harvest. We then multiply this by the averaged (weighted by production) sustainability scores for each taxa and region. This assumes that a tonne of seaweed production is equally as important as salmon production, despite differences in nutritional quality or economic value. 

### Examples of the Approach
{{< csvTable path="tables/mariculture.csv"  sep=";" >}}
