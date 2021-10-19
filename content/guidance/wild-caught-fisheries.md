---
title: "Sub Goal: Wild Caught Fisheries"
name: "Wild Caught Fisheries"
bg_image: "/images/banners/shark-fish.jpg"
id: "FIS"
description: "This sub-goal describes the amount of sustainably harvested seafood for human consumption. "
---

Fisheries is part of the Food Provision goal. The Fisheries subgoal measures the amount of seafood sustainably harvested in a given EEZ or region through any means for use primarily in human consumption and thus includes wild-caught commercial fisheries, mariculture, artisanal-scale and recreational fisheries. The Food Provision goals aim to maximize the amount of sustainably produced seafood from wild or ocean-cultured stocks so both over- or under- harvesting should be penalized. A score of 100 means the country or region is harvesting seafood to the ecosystem’s production potential in an sustainable manner.


>The sub-goals of Food Provision (Fisheries and Mariculture) measure the amount of goods sustainably harvested from the sea for human consumption, while the Natural Products goal measures the amounts of non-food goods for trade (e.g., fish meal and oil, fish for aquarium, etc) in your study area. Data for both goals are often recorded in the same sources. It may be time-saving for the goal keepers for these two goals to join efforts to gather data.

>Fisheries data, particularly fishing gear-type data and effort, are also used to create pressure data layers.  Pressures can result from the use of gear types, such as bottom trawls, that destroy habitats; high amounts of bycatch that is discarded; and, unreported and illegal catch that is, by definition, not regulated. It may be efficient to calculate these layers at the same time.   

#### Practical Guidance

*_STEP 1: Wildcaught Fisheries Data_*

This subgoal requires data for each region describing the amount (tonnes) of catch for each stock and a metric describing the stock's status.

>Ideally, this subgoal will include seafood from commercial, recreational, and artisanal fisheries in your area, although most completed assessments have only included catch information from commercial fisheries due to data availability limitations. When data become available for artisanal and/or recreational catch, they should be included as part of the fisheries sub-goal or as a separate sub-goal depending on the context.

Fisheries science is a discipline that, in part, aims to estimate the amount of fish that can sustainably be extracted from the sea. Given the complexity of the subject, **it is important to consult with a fisheries scientist in your study area, as they will have local expertise to help develop a regionally relevant model and direct you to available data.** 

> The datasets used for the Global Assessment may also be useful for OHI+ assessments. We have used: Fisheries catch data from the Sea Around Us Project (seaaroundus.org) and global fisheries landings over time from FAO (fao.org/fishery/statistics/en). However, these data only report landings at the country scale, which may not be high enough resolution for a subcountry analysis. For stock status scores, we use data from the RAM Legacy Stock Assessment Database (https://www.ramlegacy.org/).  

For stock status scores, the Global Assessment uses the population biomass (B) relative to the biomass that can deliver maximum sustainable yield (BMSY) for each landed stock (B/BMSY).  A B/Bmsy score of 1 indicates the stock is harvested at the maximum sustainable yield.  Values < 1 indicate that biomass is too low to provide maximum sustainable yield. Ideally, these data are modeled using formal stock assessments based on fishing effort, catch, and life-history traits. When formal stock assessments are unavailable, we estimate B/Bmsy using a data-limited catch-MSY approach (Rosenberg et al. 2014; Martell & Froese 2013; Thorson et al. 2013; Costello et al. 2012, 2016), however, this method has a great deal of error (Afflerbach et al. 2019). 

An alternative approach used by Sea Around Us classifies stocks into broad categories of: undeveloped, developing, fully exploited, and collapsed using landings data (http://www.seaaroundus.org/stock-status-plots-method/). This may be adequate for your needs.

For this subgoal, the **reference point** is the maximum amount of sustainably harvested catch which is built into the B/Bmsy score. 

*_STEP 2: Fisheries model_*

B/Bmsy scores are converted to stock status scores with values ranging from 0 to 1. For OHI global, stock status equals B/Bmsy when B/Bmsy values are <1.05. This penalizes the harvest of stocks with biomass values too low to provide maximum sustainable yield. When B/Bmsy values are > 1.05, we adjust the status score to be < 1, with increasing penalties as the B/Bmsy gets larger. This penalizes regions for not fishing enough of underharvested stocks. The penalty applied for underharvesting is less than that applied to overharvested stocks, but regions suffering from food insecurity may decide to penalize underharvest more aggressively.  

The current status for each region is calculated by combining the current status scores of all the stocks within a region. For the Global Assessment, the stock status scores are averaged using a geometric mean weighted by the average catch since 1980.  The geometric mean ensures that smaller, rarer populations are weighted more heavily in the score calcuation which takes into account the biodiversity of the catch.  However, other assessments have used other approaches to combining stock status scores.

*Table. Combining stock status scores*
Different approaches may be used to combine stock status scores to calculate each region's status score.

Approach   | Description   |  Theory
----------- | ------------- | ---------------------
equal weighting average | status scores of all stocks within a region are averaged  | all stocks, regardless of how much food they supply, should be managed equally well
catch weighted average | stock status scores weighted by their tonnes of catch  | score is driven by the most important food stocks  
geometric mean weighting | stock status scores are weighted by tonnes of catch but stocks with low catch count for more than their absolute catch  | the score is heavily influenced by the most important food stocks, but smaller stocks still influence the score     

*_Additional considerations_*

It is important to determine the true nature of zero or missing values. For example, missing data may indicate that the stock is no longer monitored.  Or, that there was no catch. If there was no catch in recent years, it is important to include those recent years as 0’s.


#### Examples of the Approach
{{< csvTable path="tables/fisheries.csv" sep=";" >}}

#### References
Afflerbach, J.C., Frazier, M., Froehlich, H.E., Anderson, S.C., Halpern, B.S., 2019. Quantifying uncertainty in the wild-caught fisheries goal of the Ocean Health Index. Fish and Fisheries 20, 343–354. https://doi.org/10.1111/faf.12346

Costello, C., Ovando, D., Clavelle, T., Strauss, C.K., Hilborn, R., Melnychuk, M.C., Branch, T.A., Gaines, S.D., Szuwalski, C.S., Cabral, R.B., Rader, D.N. & Leland, A. (2016). Global fishery prospects under contrasting management regimes. Proceedings of the National Academy of Sciences, 113, 5125–5129.

Costello, C., Ovando, D., Hilborn, R., Gaines, S.D., Deschenes, O. & Lester, S.E. (2012). Status and solutions for the world’s unassessed fisheries. Science, 338, 517–520.

Martell, S. & Froese, R. (2013). A simple method for estimating MSY from catch and resilience. Fish and Fisheries, 14, 504–514.

Rosenberg, A.R., Fogarty, M.J., Cooper, A.B., Dickey-Collas, M., Fulton, B., Gutiérrez, N.L., Hyde, K.J.W., Kleisner, K., Kristiansen, Longo, C., Minte-Vera, C., Minto, C., Mosqueira, I., Osio, G.C., Ovando, D., Selig, E. & Thorson, J.T. (2014). Developing new approaches to 116 global stock status assessment and maximum sustainable production of the seas.

Thorson, J.T., Minto, C., Minte-Vera, C.V., Kleisner, K.M., Longo, C. & Jacobson, L. (2013). A new role for effort dynamics in the theory of harvested populations and data-poor stock assessment. Canadian Journal of Fisheries and Aquatic Sciences, 70, 1829–1844.

