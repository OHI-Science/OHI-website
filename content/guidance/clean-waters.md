---
# Title in the banner
title: "Guidance: Clean Waters"
name: "Clean Waters"
bg_image: "/images/banners/turtle-swimming.jpg"
id: "CW"
icon: "/images/goal-icons/clean-waters.svg"
description: "This goal captures the degree to which local waters are unpolluted."
color: "#4EA09F"
weight: 9
---
People value marine waters that are free of pollution and debris for aesthetic and health reasons. Contamination of waters comes from oil spills, chemicals, disease pathogens (e.g., fecal coliform, viruses, and parasites from sewage outflow), and trash. Pollution can result in contaminated marine food resources, damage to mariculture, toxic blooms, beach closures, and mass kills of organisms. People are sensitive to these phenomena occurring in areas that they access for recreation or other purposes as well as for simply knowing that clean waters exist. The Clean Water goal captures the degree to which local waters are unpolluted by natural and human-made causes. This goal scores highest when the contamination level is zero.

This goal should aim to capture the full spectrum of pollution types that can cause waters to become unsuitable for recreation, enjoyment, and other purposes. Categories of pollution can include eutrophication (nutrients), chemicals, pathogens, oil pollution, and marine debris. Ideally, data will be from direct measurements of pollutants from each category collected from on-going monitoring programs. 

#### Practical Guidance

*-STEP 1: Identify pollution data-*
First consider the types and sources of pollution that may be in your area (see table). Types of pollution can include: trash/plastics, excess nutrients (e.g., nitrogen and phosphorous), and organic (e.g., pesticides, medications) and inorganic (e.g., heavy metals) chemicals. Sources of pollution can originate on land or in marine environments. For example: Are there known sources of trash and marine debris? Does wastewater get effectively treated before it is discharged into the environment? How does urban and agricultural runoff contribute to your local coastal waters?  

For the Global Assessment, we evaluate 4 categories of pollution from multiple sources: nutrient pollution, organic and inorganic chemical pollution, pathogens, and trash.

Once the pollution types are identified, ideally you can find in situ measurements that directly measure pollutants. This could include monitoring data describing concentrations of pathogens, nitrogen, chemical contaminants, or trash.  Pollutants can be measured in samples from the water column, sediments, or organisms, such as shellfish. For the Global Assessment, trash pollution was based on point sample data of offshore marine plastics that were interpolated to obtain complete global maps. Data at this scale will not capture local sources of trash pollution and isn't great at describing coastal trash.

Alternatively, for some pollutant the measurements could reflect the impact of the pollution. For example, instead of describing nitrogen or phosphorous concentrations, data can describe the frequency and location of anoxic conditions or toxic algal blooms. 

If direct measurements of water pollution are unavailable, the pollution levels may be estimated by modeling available data sources.  For the Global Assessment, nutrient pollution was modeled from land-based agricultural inputs occurring within the watershed and then diffused into the ocean (reference here).  The model  included synthetic fertilizer inputs, but could be expanded to include inputs from manure, mariculture, and human wastewater.   

If modeling is not a viable solution, proxy data could be used such as as coastal population or shipping density. For the Global Assessment, pathogen pollution from human wastewater is based on  the number of people who do not have improved access to sanitation.

You should attempt to use more refined data than the Global Assessment data, because it relies heavily on proxy data for water quality and may not be very accurate at smaller spatial scales. 

*_Example sources of pollution_*

{{< csvTable path="tables/sources_of_pollution.csv"  sep="," >}}

One potential problem to avoid is counting the same source of pollution in multiple ways. For example, if you have in situ measurements of excess nutrients, it would be unnecesary to include modeled nitrogen inputs from agriculture because presumably this would already be accounted for in the direct measures.  


*-STEP 2: Modeling the data-*

For the Global Assessment, we focus on marine pollution occurring within 3 nm from shore. This is the region of most direct importance to humans, but this decision should be evaluated based on the objectives of your assessment.

Each of the 4 categories of pollution (nutrient pollution, chemical pollution, pathogens, and trash) should be rescaled to values from 0 to 1.

Fro the Global Assessment the reference point is no pollution, and consequently, a value of 1 indicates an environment with no pollution. You may also decided that an ocean completely rid of pollution is ideal, or you may use a different reference point.   For example, you may use find that beach closure of less than 10 days per year due to E.coli contamination is acceptable.  

The categories of pollution will need to be combined into a single score.  For the Global Assessment, we combine the scores using a geometric mean which means that the final score will be driven by the worst performing pollutant category. This guarantees that if any one of the components scores poorly, the score will be low even if the other pollution types perform well.

*_Other Notes_*

The data used in the Clean Waters goal is also used as Pressures layers. You should approach the both of them at the same time when possible. For example, marine debris from plastic pollution is also one of the pressures layers. When the data are used as a pressure, the scores are inverted such that a high value of debris results in a high pressure score. 


### Examples of the Approach
{{< csvTable path="tables/clean-waters.csv"  sep="," >}}
