---
title: "Exploring OHI Data Layers"
name: "A deep dive into how data are incorporated into the OHI framework"
bg_image: "/images/banners/turtle-swimming.jpg"
card_image: "/images/layers_blog/layer_visualization.jpg"
preview_text: ""
Date: 2023-08-23
author: Adelaide Robinson
menu:
  main:
    parent: 'News'
    weight: 2
---

# Understanding the journey from raw data to goal scores in OHI

{{<newsHead>}}

The Ocean Health Index monitors [10 key goals](https://oceanhealthindex.org/goals/) for ensuring the ocean is able to sustainably meet the needs of people around the world. In order to monitor ocean health at a comprehensive scale, the OHI team has to process and incorporate many different datasets. But how exactly do we get from raw data to calculating goal scores? There are four key components in this process:

-   **Raw Data:** Data downloaded for use in the OHI framework. OHI utilizes data from many different sources.

-   **Data Prep:** An R script or series of scripts stored together. A data prep is used to create one or more related data layers.

-   **Data Layer:** A new dataset created through a data prep, containing a value or set of values for each region. These are in a standardized format and are prepared especially for incorporation into the OHI model.

-   **Goal Score:** Each data layer influences the score for one or more goals or subgoals. The calculations used are dependent on the goal and data layer and can be found in the [methods](https://oceanhealthindex.org/images/htmls/Supplement.html#6_Goal_models_and_data).

To really breakdown this process let's take a look at one of the many data preparation processes utilized in OHI: the mariculture data prep.

The mariculture data prep is contained within a single R script: [Mar_dataprep.RMD.](https://ohi-science.org/ohiprep_v2023/globalprep/mar/v2023/mar_dataprep.html) In this script we take two different datasets ([FAO Global Aquaculture Production (Quantity)](https://www.fao.org/fishery/statistics-query/en/aquaculture/aquaculture_quantity) and [Monterey Bay Aquarium Seafood Watch Recommendations](https://www.seafoodwatch.org/)) and turn them into data layers. This data prep creates three layers: [Mariculture harvest](https://github.com/OHI-Science/ohiprep_v2023/blob/gh-pages/globalprep/mar/v2023/output/mar_harvest_tonnes.csv), which has values for how many tonnes of mariculture each region produces each year; [Mariculture sustainability score](https://github.com/OHI-Science/ohiprep_v2023/blob/gh-pages/globalprep/mar/v2023/output/mar_sustainability.csv) which scores how sustainable the mariculture is for each region; and finally the [Genetic escapes](https://github.com/OHI-Science/ohiprep_v2023/blob/gh-pages/globalprep/mar/v2023/output/GenEsc.csv) data layer, which quantifies the potential for harmful genetic escapement from mariculture species. Once the data layers have been created, OHI coding infrastructure is used to calculate the scores for each of the goals they affect. Each of these layers impact the scores for different goals. The Mariculture harvest and Mariculture sustainability score layers impact the Mariculture subgoal. The genetic escapes pressure layer impacts multiple subgoals including Livelihoods, Economies, Fisheries, and Species Condition.

<div style="width: 850px; overflow: hidden; border: 1px solid #000;">
  <iframe seamless src="/images/layers_blog/mar_connections.html" width="1000" height="500" style="margin-left: -150px; margin-right: -500px; margin-top: -20px; border: none;" scrolling="no"></iframe>
</div>

### Exploring the Connections Between Layers

As OHI fellows we spend a large proportion of our time creating data layers. Data layers are the foundational components used to calculate OHI scores. As a reminder: each data layer is a new dataset created from one or more raw data sources.

Now that we have a better idea of what a data layer is, we can take a deeper look at how they fit into the OHI model. Below you'll find an interactive visualization that shows the relationships between all layers included in OHI and the goals that they are incorporated into.

*Click on a goal or data layer icon, or select a goal from the dropdown list to see which data layers impact each goal score. Hover over the goal and data layer icons to see their titles.*

<div style="width: 930px; overflow: hidden; border: 1px solid #000;">
  <iframe seamless src="/images/layers_blog/layer_connections.html" width="1000" height="570" style="margin-left: -20px; margin-right: -500px; margin-top: -60px; margin-bottom: 10px; border: none;" scrolling="no"></iframe>
</div>

Code for visualizations in this blogpost can be found in the [website GitHub repospitory](https://github.com/OHI-Science/OHI-website/blob/dev/scripts/layers_blogpost_visualizations.Rmd).

This post was created by the [2023 OHI Fellows](https://oceanhealthindex.org/about/ohifellows/).

------------------------------------------------------------------------
