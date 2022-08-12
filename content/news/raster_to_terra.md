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
# Switching from the `raster` package to `terra` for spatial analysis

{{<newsHead>}}

Spatial data in `R` has a reputation for being tedious and time consuming. With so many file types (`.shp`, `.nc`, `.gpkg`, `.geojson`, and `.tif` to name a few), it can be challenging to wrangle data and metadata to execute analyses and visualize results. The [Ocean Health Index](https://oceanhealthindex.org/) has historically applied the `raster` package to monitor the relationship between the health of marine systems and human well-being for 220 regions. The Ocean Health Index program aims to continuously improve methodology while keeping up with the hip trends in environmental science, which motivated the switch from using `raster` to `terra`. The `terra` package is essentially the modern version of `raster`, but with faster processing speeds and more flexible functions. However, there were certainly some bumps along the road. Let's take a look at how we converted our workflows to calculate `soft bottom habitat destruction` and `sea level rise`, while implementing new data layers for `tidal flat habitat`.


<br>

## Converting existing workflows

### Soft Bottom Habitat Destruction

### Sea Level Rise

## Designing new workflows

### Tidal flat habitat (extent, trend, and condition)

The 2022 OHI analysis decided to include tidal flat as a new habitat type. This new habitat will affect the habitat subgoal of biodiversity, coastal protection goal, and carbon storage goal. We are also evaluating its potential as a resilience layer towards clean waters, by providing vital habitat for many filter feeding bivalves which have been shown to purify water such as oysters. 

#### Data exploration  

The data come from a paper published in 2018 in Nature, [The global distribution and trajectory of tidal flats](https://www.nature.com/articles/s41586-018-0805-8), which used satellite imagery and machine learning methods to classify tidal flat habitat from over 700,000 satellite images from 1984 to 2016. The final product of their analysis were 11 sets (1 for each time step) of global maps containing tidal flat habitat at 30 meter Ground Sample Distance (GSD; AKA resolution). This means that each pixel in each raster represented 30 m<sup>2</sup>, and contained either a value of 0 for "not tidal flat", or a 1 for "tidal flat." This is a massive amount of data, but thankfully, each of the 11 time steps were broken into 108 files with discrete spatial extents, making individual files easy to work with. 

So where to begin? Well first, we needed to access the data. The authors provide several options for [data access](https://www.intertidal.app/download) including through [Google Earth Engine](https://developers.google.com/earth-engine/datasets/tags/tidal-flats), [UNEP-WCMC Ocean Data Viewer](https://data.unep-wcmc.org/datasets/47), and finally through [direct download](https://www.intertidal.app/download/direct-download). We chose the direct download option and wrote a simple shell script that is executed in an R Markdown code chunk. 

<details>
<summary>
Click to see example download code!
</summary>

````
```{bash}
### Make the new directory and move into it
mkdir /path/to/directory/of/choice/tidal_flats && cd $_

### Declare an array of strings, one for each zip folder
declare -a StringArray=(
  "1984-1986" "1987-1989" "1990-1992" "1993-1995" "1996-1998" 
  "1999-2001" "2002-2004" "2005-2007" "2008-2010" "2011-2013" "2014-2016"
)

### Iterate through the array using for loop
for val in ${StringArray[@]}; do
  echo $val
  wget https://storage.googleapis.com/uq-intertidal/v1_1/global_intertidal/$val.zip
  unzip $val.zip -d ./$val
  rm $val.zip
done
```
````
</details>

With the data in hand, we first do some basic exploration and ensure it is what we expect, and that it makes sense. The `terra` package has some handy functions for doing this. After reading the first file of the first time step with `terra::rast()`, I used `terra::freq()` to check how many unique values there were, expecting only 0 or 1 based on the metadata. 

```r
image <- here::here("tidal_flats", "1984-1986", "-100_-20.tif") %>% 
  terra::rast() 
image
``` 

<details>
<summary>
Output (raster metadata)
</summary>

```console
class       : SpatRaster 
dimensions  : 74213, 74213, 1  (nrow, ncol, nlyr)
resolution  : 0.0002694946, 0.0002694946  (x, y)
extent      : -160, -140, -20, 0  (xmin, xmax, ymin, ymax)
coord. ref. : lon/lat WGS 84 (EPSG:4326) 
source      : -160_0.tif 
name        : classification
```
</details>

```r
terra::freq(image)
```

<details>
<summary>
Output (frequency table)
</summary>

```console
     layer value      count
[1,]     1     0 5507569369
```
</details>

Dang! All 0's. This is common with a global dataset, broken up into spatial tiles when what we are looking for is only along the intertidal region. There will be many tiles over nothing but ocean or land. While not a satisfying result for our first data exploration, it is something important to anticipate what you are looking for and what you might find. Lets take a look at this files spatial extent in relation to the global coastline. 

```r
library(rnaturalearth)
library(rnaturalearthdata)
library(tidyterra)

world <- ne_countries(scale = "medium", returnclass = "sf")

extent <- terra::ext(image)

extent_polygon <- terra::as.polygons(extent)

terra::crs(extent_polygon) <- "epsg:4326"

ggplot(data = world) +
  geom_sf() +
  tidyterra::geom_spatvector(data = extent_polygon, color = "Red", fill = NA)
``` 

<details>
<summary>
Output (extent plot)
</summary>

<img src="/images/terra_post/plot_1.png" style="width: 70%; height: 70%"/>
</details>

Now lets examine another raster to see what kind of unique value we get. 

```r
image <- here::here("tidal_flats", "1984-1986", "0_-20.tif") %>% 
  terra::rast() %>% 
  terra::freq()
``` 

<details>
<summary>
Output (frequency table)
</summary>

```console
     layer value      count
[1,]     1     0 5506916280
[2,]     1     1     653089
```
</details>

That is better! Now lets see where this file lands on the globe. 

<details>
<summary>
Output (extent plot)
</summary>

<img src="/images/terra_post/plot_2.png" style="width: 70%; height: 70%"/>
</details>

Now we can see that this tile falls along a section of coastline, and has both 0 and 1 values. Things look good so far. 

#### Designing a workflow

Now that we know our files contain what we expect, and have seen a few outputs, it is time to design a workflow that will allow us to extract the information we want from the files. For OHI, our first goal is to summarize the extent of habitat in each region, for each time step . Our ideal final product will have an extent measured in km<sup>2</sup>, the region ID, the year, and the habitat type. 

Even though each time step is broken into 108 files, the resolution still makes this data hard to work with. The `terra` package offers a solution to reduce resolution, often referred to as down-sampling. The function `terra::aggregate()` allows a user to specify how many pixels should be connected into one and what function to use on the pixels being aggregated. In our case we want to sum the pixels to retain all of the habitat information. We want to choose a resolution that will allow us to continue using the rasters for analysis without bogging down our computer. We chose to down-sample to ~1 km<sup>2</sup> resolution by choosing 30 pixels as our aggregation factor. Our final function then looks like:
```r
down_sampled_image <- terra::aggregate(x = image, fact = 30, fun = sum, na.rm = T)
```
The true resolution in km<sup>2</sup> can be found with a bit of simple math, 30 meters by 30 pixels is 900 meters so our new pixel has dimensios 900 x 900 meters. We then divide these new dimensions by by a pixel with an area of 1 km<sup>2</sup>: (900 * 900)/(1,000 * 1,000) = 0.81 km^2<sup>2</sup>. 

Our next goal is to convert pixel counts, into area. If the native raster cells are 30 m x 30 m, then a raster cell with a value of 1 would be equivalent to 0.0009 km<sup>2</sup> habitat area. This can be found by multiplying the pixel dimensions together and dividing by a pixel with an area of 1 km<sup>2</sup>: (30 * 30) / (1,000 * 1,000) = 0.0009 km<sup>2</sup>. The simplest way to convert to area in this scenario with `terra` is to simply multiply our down-sampled raster by 0.0009. 
```r
down_sampled_image <- down_sampled_image * 0.0009
```
This works because each pixel started out as a 0 or a 1, so the aggregated raster has values in multiples of 1. We can check this by again using `terra::freq()` to see that our new raster has values in multiples of 0.0009. We use the `digits` argument to make sure values are not rounded to 0. 
```r
terra::freq(down_sampled_image, digits = 6) 
```
<details>
<summary>
Output (frequency table)
</summary>

```console
     layer  value   count
[1,]     1 0.0000 6117245
[2,]     1 0.0009      61
[3,]     1 0.0018      59
(cropped for brevity)
```
</details>

Results look good! Just as expected, we now have raster cells at ~1 km<sup>2</sup> resolution, with cell values representing the area in km<sup>2</sup> of tidal flat habitat. In this case there are 61 cells which contained a single cell of tidal flat, prior to aggregation, 59 which had two, and so on.

Now we need to extract the values that fall with each OHI region polygon. To do this we use another package new to OHI, `exactextractr`. This package allows us to extract values from polygons and return an estimate if a polygon goes through a raster cell. This is handy for after aggregation as it allows us to maintain a higher level of precision. The `raster::extract()` function will only include a cell if the center of the cell falls inside a polygon. Our shapefile has separate polygons for a countries EEZ and for their land area. We want to use both because our data primarily goes through the intersection of these two polygons. Our function then looks like:
```r
regions_eez_and_land <- here::here('regions.shp') %>% 
  sf::read_sf() %>%
  dplyr::filter(rgn_type %in% c("eez", 'land')) %>% 
  sf::st_transform(crs = 4326)
  
dummy_df <- regions_eez_and_land %>% 
  tibble::as_tibble() %>% 
  dplyr::select(rgn_id, rgn_name) 
  
exactextractr::exact_extract(
 x = down_sampled_image, y = regions_eez_and_land, fun = 'sum'
)
```

Unfortunately, our regions file is not public, but this will work with any polygon shapefile with matching CRS. 

Now that we have a workflow that works on a single raster, all we have to do is desing a loop that goes through each file and outputs a simple `.csv` file.

```r 
tictoc::tic() # time this code 

folders <- here::here("tidal_flats") %>% 
  list.files()

j <- 1

### To run this code in parallel, 
### uncomment next two lines and comment out one after
### You loose the pretty output messages though

# doParallel::registerDoParallel(11)
# foreach::foreach (dir = folders) %dopar% {

for (dir in folders) { 
  
  files <- here::here("tidal_flats", dir) %>% 
    list.files()
  
  year = stringr::str_split(dir, pattern = "-", n = 2)[[1]][2]
  
  for (file in files){
    
    cat(j, "/", length(files), "\n")
    
    j <- j + 1
    
    fn <- file %>% 
      stringr::str_replace(
        pattern     = ".tif",
        replacement = paste0("_", year, ".csv"))
    
    ### make a new int folder to hold these 
    
    file_name <- here::here("int", "tf", fn)
    
    if(!file.exists(file_name)){
      
      cat(fn, " is being created!\n")
      
      cat("    down sampling...\n")
      
      image <- here::here(dir_data, "raw", "tidal_flats", dir, file) %>% 
        terra::rast() 
       
      down_sampled_image <- terra::aggregate(
        x = image, 
        fact = 30, 
        fun = sum,
        na.rm = T
      )

      cat("    converting to area (km2)...\n\n")
      
      down_sampled_image <- down_sampled_image * 0.0009
      
      cat("    extracting...\n")
      
      extracted_values <- exactextractr::exact_extract(
        x = down_sampled_image, y = regions_eez_and_land, fun = 'sum'
      )
      
      cbind("km2" = extracted_values, dummy_df) %>% 
        dplyr::group_by(rgn_id, rgn_name) %>% 
        dplyr::summarise(km2 = sum(km2)) %>% 
        dplyr::mutate(year = year, habitat = "tidal flat") %>% 
        readr::write_csv(file_name)
      
    } else {cat(paste0(fn, " already exists!\n"))}
  }
}
tictoc::toc()
```

There is a lot to take in there, but if you follow it line by line it isn't too bad. 

> __To recap:__  
> List folders (in each time step)     
> Outer loop goes through folders  
> List files in the folder  
> Find the year by splitting the folder name  
> Inner loop goes through each file in folder  
> Check if desired output already esists, if not, create it!  
> Create the SpatRaster  
> Down-sample resolution  
> Convert cell values to area  
> Extract area inside region polygons  
> Assign them back to our dummy dataframe with region information and summarize to the region level  
> Write the results!  


#### Checking results

Compare against the paper results.

