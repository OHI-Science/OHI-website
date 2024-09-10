---
title: "The Trouble with Transformation"
name: "The Challenges of Projecting Spatial Data"
bg_image: "/images/crs-examples/dark-globe-angle-3.jpg"
card_image: "/images/crs-examples/old-world-map-card.jpg"
preview_text: "Have you ever wondered what happens to your data when you project it from one CRS to another? Or whether or not you should convert your data from counts to density..."
date: 2024-09-10
author: "Anna Ramji"
menu:
  main:
    parent: 'News'
    weight: 2 
---

</br>

<h1 style="margin-bottom: 0;">The Trouble with Transformation</h1>
<div style="height: 10px;"></div>
<h4 style="margin-top: 0;">The Challenges of Projecting Spatial Data</h4>

{{<newsHead>}}

## Introduction 

Have you ever wondered what happens to your data when you project it from one CRS to another? Or whether or not you should convert your data from counts to density before projecting?

In this article, we’ll walk through how reprojecting and transforming geospatial data can potentially lead to large errors! To help you avoid this problem we’ll show you how to check for and avoid these problems.

To demonstrate these ideas, we’ll look through a fairly straightforward example using commercial landings data ([Watson, 2017](https://www.nature.com/articles/sdata201739)), which was received via personal correspondence with R. A. Watson and preprocessed by past fellows in 2020: <a href=”https://github.com/OHI-Science/ohiprep_v2024/blob/gh-pages/globalprep/prs_fish/v2020/fishing_pressure_layers.Rmd”>ohiprep_v2024/globalprep/prs_fish/v2020/fishing_pressure_layers.Rmd</a> and saved in [this repository](https://github.com/OHI-Science/ohiprep_v2024/tree/gh-pages/Reference/CRS) for this walkthrough. Commercial landings “are the weight of, or revenue from, fish that are caught, brought to shore, processed, and sold for profit”, not including recreational or subsistence fishing ([NOAA, n.d.](https://ecowatch.noaa.gov/thematic/commercial-landings#:~:text=Commercial%20landings%20are%20the%20weight,processed%2C%20and%20sold%20for%20profit.)). This data also includes estimates of illegal, unregulated, and unreported catch (IUU) and discards at sea ([Watson, 2017](https://www.nature.com/articles/sdata201739)). 

### Packages Used

```r
library(here) # for reproducible file paths
library(terra)  # for geospatial data
library(tidyverse) 
```

## Data Exploration

### Overview

To begin, we will read in the data and familiarize ourselves with some of the basic information relevant to geographic data, particularly the coordinate reference system and the areas represented by each raster cell. We will then create exploratory data visualizations and perform some investigations of raster cell size and raster values. 

### Process 

We’ll read the raster into R using `terra`’s `rast()` function and the `{here}` package. 

<details>
<summary>`{here}`</summary>
<p>
To learn more about `{here}`, see their [official website](https://here.r-lib.org/) and
the [CRAN documentation](https://cloud.r-project.org/web/packages/here/index.html).
</p>
</details>

```r
# Read in commercial landings data
fish <- terra::rast(here::here("Reference", "CRS", "commercial_landings_2017.tif"))

```
</br>

When working with new data, it is important to start with a preliminary exploration of the data. Here we’ll print out basic information about our spatial object, `fish`.  

```r
# print out geospatial data info (class, dimensions, resolution, extent, CRS, etc.)
fish
```

<details>
<summary>
Output (raster metadata)
</summary>

```console
class       : SpatRaster 
dimensions  : 347, 720, 1  (nrow, ncol, nlyr)
resolution  : 0.5, 0.5  (x, y)
extent      : -180, 180, -85.5, 88  (xmin, xmax, ymin, ymax)
coord. ref. : lon/lat WGS 84 (EPSG:4326) 
source      : commercial_landings_2017.tif 
name        : commercial_landings_2017 
min value   :                      0.0 
max value   :                 145169.4
```
</details>

This shows us important basic information about the spatial object, `fish`. What we’re going to pay a lot of attention to in this example is the coordinate reference system (CRS) (`coord. ref.:` in the output above). 

A previous [OHI News post by Dustin Duncan] (https://oceanhealthindex.org/news/crs_deep_dive/)  dives into details about coordinate reference systems, projections, and more. For now, we can think about coordinate reference systems as a way to describe locations in a standardized way such that a 2-dimensional point on a projected map describes a “real” position on Earth. 

> <details>
    <summary>My Favorite Resources for Understanding Coordinate Reference Systems</summary>
    <br>
    <p>My favorite resources for understanding this concept are [this Vox video](https://www.youtube.com/watch?v=kIID5FDi2JQ) on how areas of the globe must be distorted in order to render the 3-D ellipsoid of Earth into a 2D map, [this ArcGIS Pro article](https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/coordinate-systems-and-projections.htm), and [Ningchuan Xiao’s interactive visualization](https://ncxiao.github.io/map-projections/index.html) of how different projections warp the area of different parts of the world using [Tissot’s indicatrix](https://en.wikipedia.org/wiki/Tissot%27s_indicatrix) and Gedymin faces. If you’re not a fan of gifs you can click “pause” on that visualization, or use [this Map Projection Playground](https://observablehq.com/@floledermann/projection-playground) by Florian Ledermann to visualize how different variables impact 2-D representations of area.</p>
</details>



This spatial object’s CRS is [WGS 84 (EPSG:4326)](https://epsg.io/4326), which is a geographic coordinate reference system used by Google Earth and is the native system of Global Positioning Systems (GPS). `WGS 84` refers to the datum World Geodetic System 1984 ensemble, which specifies that the WGS 84 ellipsoid is used. `EPSG 4326` defines the full coordinate reference system and indicates the projection on that WGS 84 ellipsoid and is the horizontal component of the 3-D system. 
This is our initial geographic coordinate reference system, and any changes we make to this down the line will involve projecting and transforming the data. 

The `dimensions` field indicates that there are 347 rows, 720 columns, and only one layer, which we know is tonnes of commercial fisheries landings in 2017. 

The `lon/lat` text before `WGS 84` in the output indicates that we are dealing with a geographic CRS with angular units (degrees) of latitude and longitude. 

The `name` field indicates that the raster has one layer, named “commercial_landings_2017”. The `min value` and `max value` fields indicate that across all raster cells in this layer, the minimum value is 0 and the maximum value is 145169.4. 

Another important aspect of a raster’s structure is its resolution. Resolution describes the amount of Earth’s area that each grid cell represents. When a raster has more cells, the data will have a finer, more detailed resolution. One interesting thing about lon/lat coordinate reference systems is that the cells represent different amounts of area. This has all sorts of implications for how we interpret visualizations of the data!




This might sound abstract – what we’re really curious about here is the area of the raster cells and any trend in cell size that is inherent to the current CRS. For an interactive visualization of how areas are distorted in different projections, I recommend Ningchuan Xiao’s [Map Projections visualizer](https://ncxiao.github.io/map-projections/index.html) ([Xiao, 2017](https://ncxiao.github.io/map-projections/index.html)). 

The plot below displays how cell sizes vary in the original CRS’s extent. The plot colors indicate cell size, with dark purple indicating the smallest size and yellow indicating the highest cell size. 

Below the plot, we’ve printed basic summary info of the cell area object created using `terra::cellSize()`. 

```r
cell_area <- terra::cellSize(fish)
terra::plot(cell_area,
	     # set title
     main = "Cell Size: Original CRS (EPSG:4326)")

```

</br>

<center>
<img src="/images/crs-examples/cell_size_og_crs.png"/>
<figcaption>What do you notice about how cell size changes in relation to the equator?</figcaption>
</center>



```r
print(cell_area)
```

<details>
<summary>
Output (cell area summary)
</summary>

```console

class       : SpatRaster 
dimensions  : 347, 720, 1  (nrow, ncol, nlyr)
resolution  : 0.5, 0.5  (x, y)
extent      : -180, 180, -85.5, 88  (xmin, xmax, ymin, ymax)
coord. ref. : lon/lat WGS 84 (EPSG:4326) 
source(s)   : memory
varname     : commercial_landings_2017 
name        :       area 
min value   :  122442386 
max value   : 3077249667 
	
```
</details>

The summary output shows us that the cell size, or surface area covered by individual raster cells, varies significantly, with a minimum area of 122 million square meters (m^2) and maximum area of 3 billion m^2. We checked that these were in square meters by using `terra::crs()` on the object. You can also run `terra::expanse()` on the `cell_area` object, and for an intuition check, the surface area of the Earth is 510 trillion m^2, which is close to what we get (around 509 trillion). This confirms that we are working in square meters. 

The plot shows us that the cell size is not consistent across the globe – cell size appears to decrease as we move from the equator to the poles. This is notable for several reasons: 

First, the poles may appear to have higher values than they actually do – the visualization shows us value (commercial landings in tonnes) per cell size. The same value visualized near the poles will appear higher than if it were visualized near the equator. 
We can think about this with an example commercial landings value of 200 tonnes and cell areas of 50 m^2 near the equator and 20 m^2 near the poles. The value will appear as a 4 near the equator and a 10 near the poles. Thus, this coarser resolution at the poles can lead to higher landings shown over a greater area than in reality.

This inconsistency in cell area may also hide some higher values near the equator, as each of those larger raster cells appear as uniformly sized pixels when plotted with the rest of the data.

[not sure if I should include quoted documentation about `cellSize()`… probably not tho? Piece about planar CRS vs not… EPSG units are in longitude/latitude (angular units, degrees, so it’s an angular (long/lat)) CRS … being different from planar (projected) CRSs. Note about how for both, raster cell sizes are not constant unless you’re specifically using an equal-area CRS (like mollweide??). 
]






Now we can explore the data within the map architecture. 

We can use `summary(fish)` for a basic statistical summary of the map’s values:

```r
# print out summary of value layer
summary(fish)
```
<details>
<summary>
Output (raster summary)
</summary>

```console
 commercial_landings_2017
 Min.   :     0.00       
 1st Qu.:     2.43       
 Median :    22.25       
 Mean   :   651.53       
 3rd Qu.:    84.65       
 Max.   :125112.30       
 NA's   :47150 

```
</details>


And we can use `terra::plot()` to visualize the data:

```r
# basic plot
terra::plot(fish)
```
</br>

<center>
<img src="/images/crs-examples/fish_base_plot.png"/>
<figcaption>Basic plot of commercial landings (tonnes) 2017 data.</figcaption>
</center>

This plot is not very helpful for visualizing general patterns in landings because a few very large values of landings are making the smaller values difficult to see. We can log-transform the data to get a better look at what’s going on:

```r
# log-transform and plot 
terra::plot(log(fish + 1),  main = "Log-transformed Commercial Landings (EPSG:4326)")
```

</br>

<center>
<img src="/images/crs-examples/fish_log_plot_og_crs.png"/>
<figcaption>Sea Around Us Catches by Fishing sector in the Global Ocean plot</figcaption>
</center>




According to this visualization, there are more fisheries landings closer to coasts, with notable aggregations around Northern Europe, East and Southeast Asia, and Alaska. 

These general patterns make sense given what we know about fisheries, but we also want to further confirm that we understand the map values and that the units make sense, i.e., tonnes, rather than kilotonnes. 

One way to do this is to see how many tonnes of fish were caught globally in 2017 and compare this to a secondary dataset.  To sum all values across all cells in the layer, we can use a global summary statistic (`sum` within `terra::global()`).

```r
# global operation: sum
terra::global(fish, "sum", na.rm = TRUE)
#> 86.3 million tonnes
```

<details>
<summary>
Output (Sum)
</summary>

```console

sum
<dbl>
commercial_landings_2017	86331119	
```
</details>

***Does this value make sense?***

To get a rough idea of whether the estimate of 86.3 million tonnes of commercial landings is sensible, we looked at [Sea Around Us](https://www.seaaroundus.org/) ‘s Tools & Data page, selecting [Fishing sector](https://www.seaaroundus.org/data/#/global?chart=catch-chart&dimension=sector&measure=tonnage&limit=10) for the dimension, as shown in the screenshot below. 

</br>
<center>
<img src="/images/crs-examples/saup_comparison.png"/>
<figcaption>Sea Around Us Catches by Fishing sector in the Global Ocean plot</figcaption> 
</center> 




The Sea Around Us data reports about 80 million tonnes, which is somewhat less than what we report (86.3 million); however, this seems reasonable considering differences in methodology. For example, our data is configured a bit differently from the SAUP data in that we included Illegal, Unreported, and Unregulated landings (IUU) in landings. This and other differences can easily lead to this level of difference, and regardless, we can assume that this is close enough to seem like a reasonable value. An example of a value that wouldn’t make sense in this context is one in a different order of magnitude, such as 1 billion, 10 thousand, or potentially 100 million above or below this estimate.



## CRS Projection: Mollweide

### Overview
After getting a better understanding of these data, we want to see how projecting it to a new CRS will alter the data. Specifically, we will project the data from EPSG:4326 to Mollweide and investigate how this alters the data through exploratory analyses of the raster framework and data.
SPOILER ALERT: Because we are working with count data (i.e., tonnes), this will result in an error! 

We often use the Mollweide projection in our research because it is an equal area projection that is easier to work with and does not visually distort the significance of the poles. 

For an interactive visualization of how areas are distorted in different projections, I recommend Ningchuan Xiao’s [Map Projections visualizer](https://ncxiao.github.io/map-projections/index.html). 


### Process

In the code chunk below, we’ll project the CRS from WGS 84 (EPSG:4326) to Mollweide – the projected CRS used in most OHI rasters. We’ll also plot the log-transformed projected data, as we saw when visualizing the data earlier, the non-transformed data is not very helpful for visualizing general patterns.

```r
# define Mollweide CRS specifications
moll <- "+proj=moll +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"

# project data to Mollweide
fish_moll <- terra::project(fish, terra::crs(moll))

# Let’s plot to see how this transformation impacted the data!

# plot data projected to Mollweide
terra::plot(log(fish_moll + 1), main = "Transformed CRS: Mollweide")

# compare to original CRS
terra::plot(log(fish + 1), main = "Original CRS: WGS 84 EPSG 4326")
```

Log-transformed raster of commercial fisheries landings (tonnes, 2017) projected to Mollweide:

</br>

<center>
<img src="/images/crs-examples/fish_log_plot_mollweide.png"/>
<figcaption>Log-transformed commercial landings data, projected to Mollweide</figcaption>
</center>

<\br>
Compared to the log-transformed landings data in its original CRS, EPSG:4326: 
<center>
<img src="/images/crs-examples/fish_log_plot_og_crs_simple.png"/>
<figcaption>Compared to log-transformed data in original CRS</figcaption>
</center>


When looking at the Mollweide plot, even when comparing it to the plot of the data in its original CRS, the values don’t appear to have changed dramatically. We can see that the shape is quite different though – we’ve gone from a rectangle to an oval, and can see the warping and changes around the edges, especially at the polar extremes. There are still aggregations of higher values around the coasts of Northern Europe, East and Southeast Asia, and Alaska. 

The projection also changed the resolution of the data!

We can see this by using `terra::cellSize()` again and printing out summary information:

```r
# calculate cell area
cell_area_moll <- terra::cellSize(fish_moll)

print(cell_area_moll)
```
<details>
<summary>
Output (cell area summary for data in Mollweide)
</summary>

```console
class       : SpatRaster 
dimensions  : 764, 1546, 1  (nrow, ncol, nlyr)
resolution  : 23330.19, 23330.19  (x, y)
extent      : -18037447, 18031019, -8861637, 8962624  (xmin, xmax, ymin, ymax)
coord. ref. : +proj=moll +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs 
source(s)   : memory
name        :      area 
min value   :         0 
max value   : 547291328 
```
</details>


We can also plot the cell area of the projected raster with respect to latitude, colored by raster cell size:

```r
# plot cell size of data projected to Mollweide
terra::plot(cell_area_moll, main = "Cell Size: Mollweide Projection")
```

</br>

<center>
<img src="/images/crs-examples/cell_size_mollweide.png"/>
<figcaption>Cell size of commercial landings data projected to Mollweide</figcaption>
</center>



With this plot, we can see that there is a consistent cell size across globe, or that this is an equal-area coordinate reference system. Based on the cell area summary, the yellow values in the center oval of the plot (which appears to cover the extent of the data plotted in the log-transformed plot) are mostly around 547 million m^2. 

These changes are interesting, but not unexpected for this kind of transformation. However, when we performed the same global summation calculation to determine the total sum of commercial landings in tonnes in 2017, we saw a remarkable (and concerning) difference:


```r
# Count the total tonnes
terra::global(fish_moll, "sum", na.rm = TRUE)
# 389.3 million
```

<details>
<summary>
Output (global summation of values (tonnes) in Mollweide projection of commercial landings data)
</summary>

```console
                               sum
commercial_landings_2017 389271065
```
</details>


389 million tonnes is a much higher value than the raw data's ~87 million value!!! Reprojecting the data impacted the values to a significant degree. 


When the data was projected, cell sizes changed and were also warped (increased and decreased in different areas) to be uniform across the globe. When we projected the data from EPSG:4326 to Mollweide, the count associated with one cell in the original raster was applied to multiple cells in the Mollweide CRS. This results in a large error in our data! 

For example, if a raster cell near the equator had a landings value of 100 tonnes and a cell area of 1 billion m^2, and that raster cell in EPSG:4326 corresponded to an equivalent of 2 raster cells in Mollweide with an area of 500 million m^2 each, the values wouldn’t be broken into 50 tonnes in one new cell and 50 tonnes in the other. Instead, they would both appear as 100 tonnes, for a total new value of 200 tonnes. 

We can tell that this type of inflation occurred based on how much higher the global summary value became. Many cells in the original raster were warped to fit into the corresponding Mollweide cells. 

## Solution: Convert Counts to Density

One way that we can work around this issue is to convert values from counts to density before projecting our data to a new CRS. This way, density will still be accurate, even if cell sizes change. If we need the final units to be in tonnes, we can multiply the density by the new cell size to get counts again. 

In the following chunk, we will calculate the density of commercial landings (in tonnes) per cell area (in m^2). We’ll then project this density raster from EPSG:4326 to Mollweide. The code for defining the `cell_area` and `moll` objects are the same as they were in earlier code chunks and are repeated here for reference. 


```r
# find size (area in square meters) of data in original crs
cell_area <- terra::cellSize(fish)

# get density (tonnes/area)
fish_density <- fish / cell_area

# define Mollweide CRS specifications
moll <- "+proj=moll +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"

# reproject to Mollweide
fish_density_moll <- terra::project(fish_density, crs(moll))
```
</br>
 
We can now find the area of the new cells using `terra::cellSize()` and multiply this by the projected density values to get counts (commercial landings in tonnes, our original units). 

```r
# get area of cells
new_cell_size <- terra::cellSize(fish_density_moll)


# multiply density by area to get count (tonnes)
new_tonnes <- fish_density_moll * new_cell_size

```

To check if this density-to-counts approach avoids the same errors that projecting the data without converting to density caused, we will perform a final global operation to get the total sum of all commercial landings values in the raster. This is one of those moments where we cross our fingers and hope this new approach solves the error! 

```r
# sum to check
terra::global(new_tonnes, "sum", na.rm = TRUE)
#> ~85 million!

```

<details>
<summary>
Output (cell area summary)
</summary>

```console
                              sum
commercial_landings_2017 85253920	
```
</details>

This total value is now around 85 million! Yay! While this is not exactly the same as the value we calculated in the original data (86 million), is significantly closer to it than the value of 389 million that we got by simply projecting the commercial landings (counts) data. This shows that converting counts to density *before* projecting to a new CRS is absolutely required if you do not want to introduce a massive error in your data. 


Beyond the potential for errors, density, or $\frac{tonnes}{ m^2}$ , can be visually less biased than counts ($tonnes$) because it automatically controls for differences in cell sizes when working with lat/lon CRS (or, any unequal area CRS).. 

If we had not converted to density before projecting the data to Mollweide, and continued to reproject to another CRS, the data would continue to be warped and transformed, echoing the original mistake. 





In the example below, we take the commercial landings (tonnes) data that was projected from EPSG:4326 to Mollweide without a density conversion intermediate step, and then reproject that problematic data to another CRS


```r
# Robinson projection
rob <- "+proj=robin +datum=WGS84 +units=m +no_defs"

fish_moll_rob <- terra::project(fish_moll, crs(rob))
plot(log(fish_moll_rob + 1))


terra::global(fish_moll_rob, "sum", na.rm = TRUE)

# now back to lat long:
fish_moll_rob_latlon <- project(fish_moll_rob, fish)

plot(log(fish_moll_rob_latlon + 1))
plot(log(fish + 1))

# check to see if it exactly matches the start
check <- fish_moll_rob_latlon - fish
plot(log(check + 1))
check

```



## References

Duncan, D. (2024). Ensuring Accuracy in Spatial Analysis. Ocean Health Index. <https://oceanhealthindex.org/news/crs_deep_dive/> 

National Oceanic and Atmospheric Administration. (n.d.). Commercial fishing (Landings and revenue). NOAA Fisheries Ecosystem and Socioeconomic Indicators. <https://ecowatch.noaa.gov/thematic/commercial-landings#:~:text=Commercial%20landings%20are%20the%20weight,processed%2C%20and%20sold%20for%20profit> 


Sea Around Us. (2024). Catches by Fishing sector in the Global Ocean [Data visualization]. Retrieved September 10, 2024, from <https://www.seaaroundus.org/data/#/global?chart=catch-chart&dimension=sector&measure=tonnage&limit=10>

Vox. (2016). Why all world maps are wrong [Video]. YouTube. <https://www.youtube.com/watch?v=kIID5FDi2JQ> 

Watson, R. (2017). A database of global marine commercial, small-scale, illegal and unreported fisheries catch 1950–2014. Scientific Data, 4, 170039


Xiao, N. (2017). Map projections [Data visualization]. <https://ncxiao.github.io/map-projections/index.html>  


**News Card Image:** Photo by <a href="https://unsplash.com/@nypl?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">The New York Public Library</a> on <a href="https://unsplash.com/photos/pN3nx7YJ_B4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
**Banner Image**: Photo by <a href="https://unsplash.com/@adolfofelix?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Adolfo Félix</a> on <a href="https://unsplash.com/photos/blue-earth-globe-on-table-4JL_VAgxwcU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>


