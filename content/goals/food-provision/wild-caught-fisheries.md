---
title: "Sub Goal: Wild Caught Fisheries"
name: "Wild Caught Fisheries"
bg_image: "/images/banners/shark-fish.jpg"
id: "FIS"
description: "This sub-goal describes the amount of wild-caught seafood harvested and its sustainability for human consumption. "
---

The Fisheries sub-goal describes the amount of wild-caught seafood harvested and its sustainability for human consumption. The model generally compares landings with Maximum Sustainable Yield. A score of 100 means the country or region is harvesting seafood to the ecosystem’s production potential in an sustainable manner.

### Practical Guidance

Fisheries science is a discipline that in part aims to estimate the amount of fish that can sustainably be extracted from the sea. For this reason, it is important to consult with fisheries experts in your study area. Fisheries experts will be able to advise how to best estimate the maximum amount of catch that can be sustainably fished, and the information available will determine what type of modeling to take. There are many different modeling approaches, and most are based on either catch alone, or catch-per-unit-effort.

> The Ocean Health Index relies on freely accessible, open-source data that is consistently updated over time. Here are two datasets used in the OHI-Global assessments, which could be also be useful for OHI+ assessments: Fisheries catch over time from the Sea Around Us Project (seaaroundus.org) and Global fisheries landings over time from FAO (fao.org/fishery/statistics/en).

If only catch data are available, it is highly recommended to follow the approach in the 2013 global assessment (Halpern et al. 2015) rather than the 2012 global assessment (Halpern et al. 2012). All global assessments use national fisheries catches reported to the Food and Agricultural Organization (FAO), and the 2013 global assessment used the fisheries modeling method for data-poor sources developed by Martell & Froese (2013). With this method, fisheries catch information would be used to calculate the population biomass (B), and its maximum sustainable yield (BMSY). The reference functional relationship between fisheries catch and effort information would be used to calculate the present biomass against BMSY would be used to set the reference point. The current status would be calculated using the present state of every individual species and combining each species together as the weighted proportion of the total catch.

You can find data for catch-per-unit effort data, and then create a functional relationship to determine the reference point.

> At a global scale, catch, effort, and MSY estimates are not available for either commercial, artisanal or recreational fishing: only landings data for commercial fisheries are available through the United Nations Food and Agriculture program (UN FAO). You will hopefully be able to find more localized data when conducting your assessment.

When collecting data on fish landings, it’s important to consider how you will divide the data among regions. You should try to assess each fish species by its entire population across all regions in your study area. The status in the global assessment model (2013) was calculated based on estimating population biomass relative to the biomass that can deliver maximum sustainable yield for each landed stock (B/BMSY). This ratio is conventionally used to inform fisheries management. This approach adopts the population biomass at MSY (BMSY) as a single-species reference point.

> If you are replicating models from the global assessment (2013-2015), do not split the catch among regions; instead, you want to sum catch across all regions so you can calculate B/BMSY for the whole population.

The principle of the **reference point** should not change. You should be creating models that penalize scores for harvesting above the maximum sustainable yield, as defined in your assessment, and scores that penalize for harvesting below the sustainable yield. The penalties vary for models developed in the global assessments, where overfished species negatively influence scores more than under-fished species do.

It is important to also consider buffering around the reference point (eg. 75% of BMSY) because of imperfect knowledge about the data. Part of this depends on the type of assumptions you want to make about the ecology of fish species in your area and the impacts upon them from fishing practices. For instance, when all species are exploited simultaneously, fishing pressure on each population might be lower due to changes in interactions between species that occur when a predator population is reduced.

_A note about methods used in the fisheries goal_

Since Global 2012, several new data-poor approaches have been developed to assess fisheries that leverage globally-available information (Costello *et al*., 2012; Martell & Frœse, 2013; Thorson *et al*., 2013). The estimates of B/BMSY used in Global 2013 were obtained by applying a model developed by Martell & Frœse, (2013), and referred to as the “catch-MSY” method. This approach adopts the population biomass at MSY (BMSY) as a single-species reference point.

The catch-MSY approach improves upon the method used in Global 2012 in that it leverages a mechanistic understanding of the connection between harvest dynamics and population dynamics and uses this to infer stock depletion levels as a function of both historical patterns in catch and of species-specific resilience traits (Thorson *et al*. 2013). In addition, this model is more informative in the case of developing fisheries, whereas the Global 2012 approach assumed a perfect score in cases where a peak with successive decline had yet to be observed.

Although it is a data-limited method, the more complex approach better takes into account species-specific fishery dynamics. The scores for each population were also combined using a geometric mean, which ensures that smaller, rarer populations have more weight so that the biodiversity of the catch is taken into account as well.

_Calculating the fisheries goal_

Calculating the fisheries goal using methods from global assessments (2013-2015 as it is not recommended to use methods from the 2012 global assessment) relies on catch or catch-per-unit-effort data. The fisheries goal model uses mean catch and B/BMSY for all species. These are two separate steps: the mean catch is not used to calculate B/BMSY. Once you have B/BMSY for all the species, you will combine them together to get a single fisheries score for each of the regions in your study area. This is where the mean catch is used: it is a weighting factor so that species with higher mean catch will contribute more to the final score. You will not need to calculate this because the Toolbox calculates the weighted mean when you provide mean catch as an input layer to the Toolbox. The input layer should simply be the mean catch for each species.

When calculating B/BMSY and mean catch, use as much information as possible: all the years available. Species that have few years of available data will likely be less accurate and it is important to document this. It is admissible to have different ranges of years for different species, since too much information would be lost if all species required the same species range. However, interpreting why different species have different years of time series is important. There may be data for 30 years of history for some species, 10 for others and 5 or 6 for others. It is important to know whether there is only 6 years of data because it is a recent fishery that developed in the last 6 years; in this case 6 years is enough. But if only 6 years of data are available because they stopped collecting the data in recent years, you might get a completely misleading assessment. And of course if you know there was no catch at all in recent years, it is important to include those recent years as 0’s. 0’s must also be included when calculating B/BMSY or the results will be nonsensical.

How B/BMSY is calculated for global assessments is a bit unsatisfactory and is in the process of being better developed. This is because the global model is very imprecise, which also affects how to interpret B/BMSY results. **It is important to consult with a fisheries scientist in your study area, as they will have expertise with the information and knowledge available in the local context**. If possible, we suggest calculating the scores using a more precise model as well, so fisheries experts can assess whether results look reasonable. This is important so that the scores produced have credibility.

### Examples of the Approach
{{< csvTable path="static/tables/fisheries.csv" >}}
