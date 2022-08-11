---
title: "From Raster --> Terra"
name: "Making the Spatial Switch"
bg_image: "/images/banners/disturbed-fish.jpg"
card_image: "/images/people/fellows_2022.jpg"
preview_text: "`raster` has been the go-to spatial analysis package in R since the dawn of time, but we converted our workflow to the more modern `terra` package. At the Ocean Health Index, we work with spatial data for a plethora of goals like mapping sea ice extent and habitat types that sequester carbon throughout the land and coastal nations. Let's dive into how we converted our code from `raster` to `terra`."
Date: 2022-08-11
author: Cullen Molitor, Peter Menzies, Juliet Cohen
menu:
  main:
    parent: 'News'
    weight: 2
---
# Switching Spatial Analysis from the `raster` package

{{<newsHead>}}

Spatial data in `R` has a reputation for being tedious and time consuming. It can be challenging to wrangle `.shp` files, `.nc` files, and `.tif` files and their metadata in order to execute analyses and visualize rasters. The [Ocean Health Index](https://oceanhealthindex.org/) has historically applied the `raster` package to annually monitor the relationship between the marine health and human well-being for 220 regions. But with the goal of continuously improving methodology and keeping up with the hip trends in environmental science, the Ocean Health Index Global converted from using `raster` to `terra`. The `terra` package is essentially the modern version of `raster`, but with faster processing speeds and more flexible functions. However, there were certainly some bumps along the road when it came to parallelization. Let's take a look at how we converted our workflow to calculate `sea ice extent`, `soft bottom habitat destriction`, and `sea level rise`.

<br>

## Sea Ice Extent

## Soft Bottom Habitat Destruction

## Sea Level Rise




