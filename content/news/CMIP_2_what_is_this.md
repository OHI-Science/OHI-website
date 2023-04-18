---
title: "CMIP6: Finding data"
name: "Where do I find CMIP6 data"
bg_image: "images/banners/lake.jpg"
card_image: "/images/cmip6/marisco2.jpg"
preview_text: "Climate models from the CMIP6 Scenario experiments predict the future climate of our planet. We are here to help you find these data..."
Date: 2022-12-16
author: Melanie Frazier, Ben Halpern, Alejandra Vargas, Mandy Lombard
menu:
  main:
    parent: 'News'
    weight: 2
---
# CMIP6 Climate Scenario data: Where do I get the data!

{{<newsHead>}}

If you are an ecologist or biologist and need predictions of future climate variables, then the CMIP6 Scenario data will probably be what you want!  

In this blogpost, we provide an overview of the raw CMIP6 data because this is helpful for understanding these data. However, because we believe non-climate scientists should probably seek more derived CMIP6 products, we also provide information about some of these products that we have used in our research.

A [previous post](https://oceanhealthindex.org/news/cmip_1_what_is_this/) provides an overview of the CMIP6 Scenario data. If you are new to CMIP data, we recommend starting there. [This article](https://www.carbonbrief.org/cmip6-the-next-generation-of-climate-models-explained/), "CMIP6: the next generation of climate models explained" also provides an excellent overview of CMIP6 that manages to be high-level *and* understandable. And, much of the content in this post is derived from this [excellent source](https://confluence.ecmwf.int/display/CKB/CMIP6%3A+Global+climate+projections#CMIP6:Globalclimateprojections-Parameterlistings), which I highly recommend reading because it provides a super useful and down-to-earth description of CMIP6. 

##

> We are always on the hunt for data. Please let us know (frazier@nceas.ucsb.edu) if you discover CMIP6 ensemble datasets and/or downscaled data that are publicly available. I will add them to this post. MANY THANKS!


<br>

##



## Raw CMIP data


### Earth System Grid Federation: A deep dive

The CMIP6 data archive is distributed through the [Earth System Grid Federation (ESGF)](https://esgf-node.llnl.gov/search/cmip6/).


![esgf1](/images/cmip6/ESGF_1.png)
##

>If the ESGF website seems daunting, don't worry, we feel the same!

##

There are a series of dropdown menus on the left of the ESGF site that will guide you through the process of finding data. We recommend an iterative approach because if the "Search" button is clicked after selecting a menu option, the subsequent menus will be simplified as irrelevant categories are removed.  

![esgf2](/images/cmip6/esfg_dropdowns.jpg)

*Source ID & Institution ID*

The global climate models and institutions that produce them. I usually skip over this section because it is rare for me to select on the model, and depending on the climate variable of interest, many of these options will disappear.

<details>
<summary> Click the triangle to see all the climate models and institutions </summary>

*CMIP6 data models and institutions (from this incredibly helpful [resource](https://confluence.ecmwf.int/display/CKB/CMIP6%3A+Global+climate+projections)):* 
{{< csvTable path="tables/cmip6_sources_institutions.csv" sep="," >}}
</details>

##

*Source Type*

A description of the general circulation model. In most cases, the model is a coupled atmospheric and oceanic general circulation model (AOGCM), but other models are used.  

> Atmospheric (AGCMs) and oceanic GCMs (OGCMs) can be coupled to form an atmosphere-ocean coupled general circulation model (CGCM or AOGCM). With the addition of submodels such as a sea ice model or a model for evapotranspiration over land, AOGCMs become the basis for a full climate model. -- [Wikipedia](https://en.wikipedia.org/wiki/General_circulation_model)

##

*Experiment ID (aka "scenarios")*

The IPCC Sixth Assessment Report (CMIP6) includes 8 future scenarios (2015-2100) and one historical scenario (1850-2014). These scenarios represent different pathways the world might follow, which will lead to different predictions of future climate.

<details>
<summary> Click the triangle to see the climate scenarios </summary>

*CMIP6 data climate scenarios (from this incredibly helpful [resource](https://confluence.ecmwf.int/display/CKB/CMIP6%3A+Global+climate+projections)) and [here](https://en.wikipedia.org/wiki/Shared_Socioeconomic_Pathways).*
IPCC Scenarios  | Description                       | Estimated Warming 2041-2060, C
--------------- | --------------------------------- |----------------------------
historical      | Simulation of climate variables from the recent past from 1850 to 2014. These predictions are from a coupled atmosphere-ocean general circulation model (AOGCM) using observed variables such as atmospheric composition, land use and solar forcing. The historical simulation can be used to evaluate model performance against present climate and observed climate change. | NA
SSP1-1.9 | Based on SSP1 with low climate change mitigation and adaptation challenges which leads to a future pathway with a radiative forcing of 1.9 W/m2 in the year 2100. The SSP1-1.9 scenario fills a gap at the very low end of the range of plausible future forcing pathways, due to interest in informing a possible goal of limiting global mean warming to 1.5°C above pre-industrial levels based on the Paris COP21 agreement. | 1.6
SSP1-2.6 | Based on SSP1 with low climate change mitigation and adaptation challenges which leads to a radiative forcing of 2.6 W/m2 in the year 2100. The SSP1-2.6 scenario represents the low end of plausible future forcing pathways. SSP1-2.6 depicts a "best case" future from a sustainability perspective. | 1.7
SSP4-3.4  | Based on SSP4 in which climate change adaptation challenges dominate which leads to a radiative forcing of 3.4 W/m2 in the year 2100. The SSP4-3.4 scenario fills a gap at the low end of the range of plausible future forcing pathways. SSP4-3.4 is of interest to mitigation policy since mitigation costs differ substantially between forcing levels of 4.5 W/m2 and 2.6 W/m2. |
SSP5-3.4OS  | Based on SSP5 in which climate change mitigation challenges dominate with a peak and decline in forcing towards an eventual radiative forcing of 3.4 W/m2 in the year 2100. The SSP5-3.4OS scenario branches from SSP5-8.5 in the year 2040 whereupon it applies substantially negative net emissions. SSP5-3.4OS explores the climate science and policy implications of a peak and decline in forcing during the 21st century. SSP5-3.4OS fills a gap in existing climate simulations by investigating the implications of a substantial overshoot in radiative forcing relative to a longer-term target. | 
SSP2-4.5 | Based on SSP2 with intermediate climate change mitigation and adaptation challenges which lead to a radiative forcing of 4.5 W/m2 in the year 2100. The SSP2-4.5 scenario represents the medium part of plausible future forcing pathways. SSP2-4.5 is comparable to the CMIP5 experiment RCP4.5. | 2.0
SSP4-6.0  | SSP4-6.0 is based on SSP4 in which climate change adaptation challenges dominate and RCP6.0 which lead to a radiative forcing of 6.0 W/m2 in the year 2100. The SSP4-6.0 scenario fills in the range of medium plausible future forcing pathways. SSP4-6.0 defines the low end of the forcing range for unmitigated SSP baseline scenarios. | 
SSP3-7.0   | Based on SSP3 in which climate change mitigation and adaptation challenges are high which leads to a radiative forcing of 7.0 W/m2 in the year 2100. The SSP3-7.0 scenario represents the medium to high end of plausible future forcing pathways. SSP3-7.0 fills a gap in the CMIP5 forcing pathways that is particularly important because it represents a forcing level common to several (unmitigated) SSP baseline pathways. | 2.1
SSP5-8.5 | SSP5-8.5 is based on SSP5 in which climate change mitigation challenges dominate which leads to a radiative forcing of 8.5 W/m2 in the year 2100. The ssp585 scenario represents the high end of plausible future forcing pathways.  SSP5-8.5 is comparable to the CMIP5 experiment RCP8.5. | 2.4
</details>

<br>

*Variant Label*

Modeling centers often run the same climate model with slightly different settings and initial conditions. A model and its collection of runs is referred to as an ensemble (not to be confused with "ensembles" that combine the various climate models, typically from different institutions). For some models, there is only one variant, but some models (e.g., CanESM5) include large numbers of variants. 

These are interesting from a statistical perspective because they give some idea of the variation at this modeling scale.

<details>
<summary> Click the triangle to learn more about these ensembles </summary>

*CMIP6 esembles (taken entirely from this incredibly helpful [resource](https://confluence.ecmwf.int/display/CKB/CMIP6%3A+Global+climate+projections)):* 
Within these ensembles, four different categories of sensitivity studies are done, and the resulting individual model runs are labelled by four integers indexing the experiments in each category

e.g. r<W>i<X>p<Y>f<Z>, where W, X, Y and Z are positive integers as defined below:

- The first category, labelled realization_index (referred to with letter r), performs experiments which differ only in random perturbations of the initial conditions of the experiment. Comparing different realizations allow estimation of the internal variability of the model climate.
- The second category, labelled initialization_index (referred to with letter i), refers to variation in initialisation parameters. Comparing differently initialised output provides an estimate of how sensitive the model is to initial conditions.
- The third category, labelled physics_index (referred to with letter p), refers to variations in the way in which sub-grid scale processes are represented. Comparing different simulations in this category provides an estimate of the structural uncertainty associated with choices in the model design.
- The fourth category labelled forcing_index (referred to with letter f) is used to distinguish runs of a single CMIP6 experiment, but with different forcings applied.

</details>

## 

*Variable*

Many different climate variables (e.g., sea surface temperature, near surface air temperature, rainfall) are modeled for the CMIP6 project.

The climate variables often go by a short identifier. For example, to search for sea surface temperature data, you will often need to use it's shortname which is "tos". You can learn more about some of the common CMIP6 climate variables and their shortname (i.e., ESGF Variable ID) in the below table. 

<details>
<summary> Click the triangle to see a long list of CMIP6 climate variables</summary>

*Some common CMIP6 climate variables (from this incredibly helpful [resource](https://confluence.ecmwf.int/display/CKB/CMIP6%3A+Global+climate+projections#CMIP6:Globalclimateprojections-Parameterlistings)):* 
{{< csvTable path="tables/climate_variables.csv" sep="," >}}
</details>

<br>
<br>

## Resources for derived products

We've said this [before](https://oceanhealthindex.org/news/cmip_1_what_is_this/), but we'll say it again: If you are an ecologist or biologist you should, if possible, avoid the raw climate data and use more derived products that others have created.

Using derived products can provide many advantages:

> Derived data products are generally easier to work with because the raw ESGF has many idiosyncrasy's. One example: data are often reported using an irregular grid that must be interpolated to a regular grid.

> You will be able to harness the power of the ensemble! Most derived CMIP6 data products are "ensembles" that combine a subset of the CMIP6 climate models into a single dataset. In most cases, ensembles are more accurate than any given single climate model. 


> Much of the raw CMIP data is very coarse resolution (e.g., 1 to 1.25 degrees). You may be able to find downscaled climate data which has translated coarse resolution spatial information into a finer spatial resolution. This is often better suited to the scale we want to work at.

Of course, it is possible to download raw data and generate ensembles and downscaled data, however, avoiding this will save lots of time and computational energy. Derived datasets are generally created by experts who have spent a good deal of time thinking about how to deal with the idiosyncrasies of CMIP6 data, selecting and combining the climate models, and correcting for [bias](https://climate.copernicus.eu/sites/default/files/2021-01/infosheet7.pdf). 

But: if you must work with the raw data. Here are some resources that look useful:

* I have explored raw netCDF ESGF climate models a bit, and I can confirm that CDO (Climate Data Operators) can be a good option for manipulating these files. If you don't work from the terminal, it can feel a bit intimidating at first but I have found it to be worth it. This [resource](https://mathmarecol.github.io/Welcome/cdo.html) is what I used to get started! This guide also describes how to use ncview which is a netCDF viewer that I have also found useful!

* In general, dealing with netCDF files in R deserves its own post (to be continued)! But I have found this [R package](https://docs.ropensci.org/tidync/) helpful. 

* [Climate Change Impact Assessment: A practical walk-through](https://claut.gitlab.io/man_ccia/)



### Global CMIP6 derived models that we are using
{{< csvTable path="tables/global_cmip6_derived_products.csv" sep="," >}}

**1. [Xu et al. 2021](https://www.nature.com/articles/s41597-021-01079-3)

2. [Olen and Lehsten 2022](https://www.sciencedirect.com/science/article/pii/S2352340922000166)

3. [IPCC WGI Interactive Atlas](https://interactive-atlas.ipcc.ch/regional-information)

4. [WorldClim](https://www.worldclim.org/data/cmip6/cmip6climate.html)

5. [NOAA's Climate Change Web Portal: CMIP6](https://psl.noaa.gov/ipcc/cmip6/)

6. [Muis et al. 2022](https://www.essoar.org/doi/10.1002/essoar.10511919.1)

7. [Beusen et al. 2022](https://www.sciencedirect.com/science/article/pii/S0959378021002053#f0015)

8. [Thrasher et al. 2022](https://www.nature.com/articles/s41597-022-01393-4)

9. [Jiang et al. 2023](https://doi.org/10.1029/2022MS003563)
 
### United States CMIP6 derived models that we have explored
{{< csvTable path="tables/us_cmip6_derived_products.csv" sep="," >}}

**1. [AdaptWest Project 2022](https://adaptwest.databasin.org/pages/adaptwest-climatena/)
2. [MACA Data Portal](https://climate.northwestknowledge.net/MACA/data_portal.php)
3. [Mahoney et al. 2022](https://www.researchgate.net/publication/358571908_A_CMIP6_ensemble_for_downscaled_monthly_climate_normals_over_North_America)

## References

* [ECMWF](https://confluence.ecmwf.int/display/CKB/CMIP6%3A+Global+climate+projections): A super useful and down-to-earth description of CMIP6! 

* Tebaldi, C., et al., 2021. Climate model projections from the Scenario Model Intercomparison Project (ScenarioMIP) of CMIP6. Earth System Dynamics 12, 253–293. https://doi.org/10.5194/esd-12-253-2021

* O’Neill, B.C., Tebaldi, C., van Vuuren, D.P., Eyring, V., Friedlingstein, P., Hurtt, G., Knutti, R., Kriegler, E., Lamarque, J.-F., Lowe, J., Meehl, G.A., Moss, R., Riahi, K., Sanderson, B.M., 2016. The Scenario Model Intercomparison Project (ScenarioMIP) for CMIP6. Geoscientific Model Development 9, 3461–3482. https://doi.org/10.5194/gmd-9-3461-2016


<br>
<br>

<b>

---

This post was created as part of the [MARISCO project](https://belmontforum.org/connect/oceans2018/groups/marisco-project/) which is funded by the Belmont Forum.

Belmont Forum members and partner organizations work together to direct and fund research on environmental change that affect us all. 

![cmip_scenarios](/images/cmip6/logos.jpg)




---