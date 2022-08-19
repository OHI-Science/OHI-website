---
title: "Shifting from Raster to Terra"
name: "Making the Spatial Switch"
bg_image: "/images/banners/disturbed-fish.jpg"
card_image: "/images/people/fellows_2022.jpg"
preview_text: "`raster` has been the go-to spatial analysis package in R since the dawn of time, but we converted our workflow to the more modern `terra` package. At the Ocean Health Index, we work with spatial data for a plethora of goals like mapping sea ice extent and habitat types that sequester carbon throughout the land and coastal nations. Let's dive into how we converted our code from `raster` to `terra`."
Date: 2022-08-11
author: Cullen Molitor, Juliet Cohen
menu:
  main:
    parent: 'News'
    weight: 2
---
# Switching from the `raster` package to `terra` for spatial analysis

{{<newsHead>}}

Spatial data in `R` has a reputation for being tedious and time consuming. With so many different spatial file types (`.shp`, `.nc`, `.gpkg`, `.geojson`, and `.tif` to name a few) with various resolutions and coordinate reference systems, it can be challenging to produce accurate maps. The Ocean Health Index has historically utilized the `raster` package to monitor the relationship between the health of marine systems and human well-being for 220 regions around the world. The Ocean Health Index aims to continuously improve methodology while keeping up with the hip trends in environmental science, which motivated the switch from using `raster` to `terra`. The `terra` package is essentially the modern version of `raster`, but with faster processing speeds and more flexible functions. 

Some examples of similar functions between `raster` and `terra` are as follows:

`raster`|`terra`|Use
--------|-------|---
`raster()`|`rast()`|Rasterize a spatial file (such as a `.tif` or a spatial dataframe) into a `rasterLayer` (for the `raster` package) or `spatRaster` (for the `terra` package)
`stack()`|`rast()`|Create raster stack to execute calculations across layers. `terra::rast()` is a more broadly applicable function since it can detect the quantity of `spatRasters` present, then automatically stacks them if there are multiple.
`calc()`|`app()`, `lapp()`, `focal()`, etc.|Execute a function across a raster or raster stack. `terra` has multiple functions with varying degrees of flexibility depending on if the function is applied across layers, and if the same function is applied to each layer.
`resample()`|`resample()`|Convert the origin and/or resolution of a raster to that of another. For example, you might want to add two rasters, but need to convert the first raster from a resolution of 0.5 meters to 0.01 meters to match the higher resolution of the second raster.
`extract()`|`extract()`|Pull values from a raster object where they intersect the locations of another spatial object, such as points that fall within polygons. For `raster()`, the spatial objects can be points, lines, and polygons. For `terra`, the second spatial object must be a vector or matrix/dataframe of coordinates. For example, the spatial object from which we are extracting is a geometry columns of polygons, the user cannot input the entire spatial dataframe, but rather needs to vectorize the geometry column of the polygons using `terra::vect()` then input that object into `terra::extract()`. 
`aggregate()`|`aggregate()`|Combine cells of a raster to create a new raster with a lower resolution (larger cells). Aggregation groups rectangular areas to create larger cells. The value for the resulting cells is computed with a user-specified function. Also know as down-sampling.  
`freq()`|`freq()`|Create a frequency table of the values of a raster. 

Let's take a look at how we converted our workflows to calculate **soft bottom habitat destruction** and implemented a new spatial extent layer for **tidal flat habitat** from scratch.

<br>

## Converting existing workflows

### Soft Bottom Habitat Destruction

The way OHI historically calculated soft bottom habitat destruction was by using annual fisheries catch data as a proxy for trawling and dredging activity, because these types of fishing severely disturb benthic habitat. The fisheries catch data is rasterized and overlaid onto polygons of exclusive economic zones for all OHI regions, then spatially standardized by summing each fishing coordinate within the exclusive economic sozne and dividing that sum by the kilometers squared of softbottom habitat. In 2022, OHI switched the data source from fisheries catch to apparent fishing effort for trawling and dredging from [Global Fishing Watch](www.globalfishingwatch.org) using their new [API](https://github.com/GlobalFishingWatch/gfwr). This data comes in units of hours of fishing effort associated with the latitude and longitude of each fishing detection, the geartype used, and a timestamp.

While initially cleaning the Global Fishing Watch data, we separate it into different dataframes for trawling and dredging since we need to process the geartypes differently. In order to convert the fishing effort coordinates into annual `spatRasters`, we use the following approach:

```r
years = as.factor(2012:2020) 

for(i in years){
  # trawling data:
  trawl_annual_raster <- fish_effort_trawl_annual %>%
    dplyr::filter(year == i) %>%
    dplyr::select(-year) %>%
    terra::rast(type = "xyz", crs = "EPSG:4326", digits = 6, extent = NULL)
  
  fn <- paste0("fish_effort_trawl_", i, ".tif")
  
  # save annual raster file for trawling:
  terra::writeRaster(
    trawl_annual_raster, 
    filename = here::here('data', 'int', 'fish_effort_annual', 'trawling', i, fn), 
    overwrite = TRUE
  )
}
```

`terra` processes this dataframe into a `spatRaster` object because we simplified it into just 3 columns: x, y, and fishing effort, and with the argument `type = "xyz"` we specified that there's an x value, y value, and other value (z) at that coordinate. Note that the `WGS84` coordinate reference system is specified using the simple `"EPSG:4326"` syntax, rather than the complex `proj4` format that `raster::raster()` prefers: `"+proj=longlat +datum=WGS84 +ellps=WGS84 +towgs84=0,0,0"`. We run the same code for the dredging dataframe. 

Next, we subset the trawling data by filtering for just bottom trawling and exclude mid-water trawling, since bottom trawling is the trawling method that damages the seafloor. We do this by multiplying this trawling effort `spatRaster` by another `spatRaster` that represents the proportion of bottom trawling to mid-water trawling at each coordinate, provided by Watson and Tidd (2018). In order to multiply these `spatRasters`, we first want to interpolate the bottom trawling proportion raster as accurately as possible. This interpolation takes 2 steps:

**1. Use the local mean of surrounding cells to fill in `NA` values (nearest neighbor) using `terra::focal()`.**

```r
trawl_depth_proportion_interpolated <- terra::focal(
  x = trawl_depth_proportion,
  w = 5, # sets a 5 cell window around NA pixel
  fun = "mean",
  na.policy = "only", # only interpolate NA values
  na.rm = T,
  overwrite = TRUE
)
```

**2. Interpoalte all remaining `NA` values using the `terra::global()` function.**

`global()` can be used similarly to `terra::app()` for simple functions, such as calculating the mean of all non-`NA` values in the entire raster layer:

```r
global_trawl_proportion_avg <- terra::global(
  trawl_depth_proportion_interpolated, 
  fun = "mean",
  na.rm = TRUE
)
  
trawl_depth_proportion_interpolated[is.na(trawl_depth_proportion_interpolated)] <- 
  global_trawl_proportion_avg[1,1]
```

In order to check if any `NA` values remain, we can use other arguments for `terra::global()` that returns the sum of all `NA` values in the `spatRaster`:

```r
terra::global(
  trawl_depth_proportion_interpolated, 
  fun = "isNA"
)
```

Next, we want to resample that `spatRaster` to up-sample the resolution to match that of the other raster, which has a higher resolution of 0.01 meters:

```r
# resample the interpolated trawling proportion data
# match the resolution of the GFW fishing effort data
trawl_depth_proportion_resampled <- terra::resample(
  x = trawl_depth_proportion_interpolated,
  y = fish_effort_trawl, # use the GFW data as the sample geometry
  method = "near" # nearest neighbor calculation to up-sample
) 
```

Next, we need to match the `spatRaster` extents, which is the minimum and maximum coordinates in both the x and y directions (xmin, xmax, ymin, ymax). We use `terra::extend()` for this. First extend one `spatRaster` to the extent of the other, and then vice versa to ensure that each of the four dimensions are maximized and consistent with the other `spatRaster`. If we were to use the `raster` package, the equivalent (but slower) function goes by the same name. Both packages also have the function `crop()` that reduces the extent of a larger rater to that of a smaller raster.

```r
trawl_depth_proportion_extended <- terra::extend(
  trawl_depth_proportion_raster,
  fish_effort_raster
)

fish_effort_extended <- terra::extend(
  fish_effort_raster, 
  trawl_depth_proportion_extended
)
```

In order to check if the extents match, we can use `terra::compareGeom()` to return `TRUE` or `FALSE`:

```r
terra::compareGeom(
  fish_effort_extended, 
  trawl_depth_proportion_extended, 
  stopOnError = FALSE # makes the function return FALSE if the extents are different
)

```

There is no direct equivalent `raster` function for `terra::compareGeom()`, and it's quite handy! One annual map of fishing effort looks like this:

<center>
<img src="/images/terra_post/map_2017.png" style="width: 70%; height: 70%"/>
</center>

Next, we use `writeRaster()` to re-write the two extended `spatRasters` as `.tif` files to the same directory so we can read them in as `spatRasters` in our next loop. 

The last step before multiplying the `spatRasters` is to stack them. With the `raster` package, we would use `stack()`. With `terra`, we simply read in the `spatRasters` simultaneously from the same directory using the familiar function `rast()` and the result is a `spatRaster` object with two layers that have matching resolutions, origins, and extents!

```r
# define the 2 raster filepaths as an object 
rasters <- here::here('data', 'int', 'fish_effort_annual', 'trawling', i, 'extended') %>% 
  list.files(pattern = ".tif", full = TRUE)

# stack the spatRasters, with each spatRaster representing 1 layer:
trawl_stack <- terra::rast(rasters)
```

Finally, it's time to multiply the `spatRasters`! There are a few options for multiplying, summing, taking the mean of two rasters, or executing custom functions in the `terra` package. For example, you could use `app()`, `lapp()`, `sapp()`, etc. You should choose your calculation function depending on:
1. If you are calculating through layers, across only one layer, if you are using the same calculation on all layers or not (for example, if you have three layers you might execute `x * y * z` or `x * y + z`)
2. If your function is simple (like "sum" or "mean") or a complex custom function that would take much more compute to execute over a large, global `spatRaster`.

Since we are working with only two layers and are executing a basic multiplication, we can use the simplest option: `app()` or have a little more fun with the syntax and use `lapp()` like so:

```r
trawling_corrected <- terra::lapp(
  trawl_stack, 
  fun = function(x,y){return(x*y)}
)
```

If we were working with `rasterLayers` in the `raster` package, we would have used the general function `calc()` for simple calculations.

After cleaning up the dredging `spatRaster`, we want to add the fishing effort associated with each cell to our corrected trawling raster, so we stack them as we did before and execute simple addition across layers:

```r
all_fishing <- terra::app(
  effort_stack, 
  fun = "sum", 
  na.rm = TRUE
)
```

In order to pair the trawling and dredging fishing effort with the 220 OHI regions, we extract the trawling and dredging points from the exclusive economic zone polygons that are associated with each region. In `raster` and `terra`, we would use their respective functions both called `extract()`. `terra::extract()` allows for more flexibility in extracting the proportion of cells that fall within the polygons, if they are on the borders. However, our experience with these functions is that they are very slow to execute.
> `exact_extractr::exact_extract()` offers _much_ faster processing speeds, but requires different syntax. This function allows the user different options for the output that range in complexity. For example, one can extract a list of dataframes, each of which contains the cell values and weight (coverage proportion) for one polygon. The user can then use those values and weights as they want. Alternatively, `exact_extractr()` can do a weighted calculation for us, with arguments that specfies a _weighted_ function and the data to use as weights.

```r
years_all <-  as.factor(2012:2020)

for (i in years_all) {
  
  print(paste("Processing ", i, " fishing effort."))
  
  # read in the annual fishing raster for all regions
  # this represents corrected trawling plus dredging data 
  fishing_raster <- terra::rast(paste0(filepath, filename, i, ".tif"))
  
  # extract the fishing effort that falls within the polygons of OHI regions
  extracted <- exactextractr::exact_extract(fishing_raster, ohi_regions_filtered)

  # sum effort by polygon and append polygon dataframes into 1
  all_polygon_effort <- data.frame()

  for (j in seq_along(extracted)) {
    
    df <- extracted[[j]]
    
    weighted_effort_polygon <- df %>%
      # weight the fishing effort within each cell by the porportional coverage of the cell
      mutate(effort = value*coverage_fraction,
             polygon_id = j) %>%
      select(polygon_id, effort) %>%
      group_by(polygon_id) %>%
      summarize(effort_sum = sum(effort, na.rm = TRUE))
    # bind the polygon-specific sum to the master dataframe of polygon sums
    all_polygon_effort <- rbind(all_polygon_effort, weighted_effort_polygon)
    
  }

  # bind regional id's to the polygon id's
  rgn_id <- ohi_regions_filtered$rgn_id
  regional_polygon_effort <- cbind(all_polygon_effort, rgn_id)

  regional_polygon_effort <- regional_polygon_effort %>%
    group_by(rgn_id) %>%
    # combine each land and eez polygon for the same region
    # some of the fishing points landed just on the border of these polygons
    # meaning they are associated with land when they should be in the EEZ
    summarize(effort_sum = sum(effort_sum, na.rm = TRUE)) %>% 
    mutate(year = i)

  # convert this raster info into a csv that represents fishing effort
  # for each OHI region for year i 
  write.csv(regional_polygon_effort, file = paste0(filepath, filename, i, ".csv"),
  row.names = FALSE)
  print(paste0("Saved ", i, " fishing effort csv to ", filepath, filename, i, ".csv"))
}
```

That about covers it for fishing effort rasters. You can find the complete script [here](https://github.com/OHI-Science/ohiprep_v2022/tree/gh-pages/globalprep/hab_prs_hd_subtidal_soft_bottom/v2022) on the OHI github repository for the 2022 assessment. Let's move on to tidal flats!

## Designing new workflows

### Tidal flat habitat (extent, trend, and condition)

The 2022 OHI analysis decided to include tidal flat as a new habitat type. Tidal flat is defined as sand, rock, or mud flats that undergo regular tidal inundation. The data come from a paper published in 2018 in Nature, [The global distribution and trajectory of tidal flats](https://www.nature.com/articles/s41586-018-0805-8), which used satellite imagery and machine learning methods to classify tidal flat habitat from over 700,000 satellite images from 1984 to 2016. The paper found that: 

> "Extensive degradation from coastal development, reduced sediment delivery from major rivers, sinking of riverine deltas, increased coastal erosion, and sea-level rise signal a continuing negative trajectory for tidal flat ecosystems around the world."

This new habitat type will affect the following goals:  

> habitat (subgoal of biodiversity)  
> coastal protection   
> carbon storage  

#### Data exploration  

The final product of published analysis were 11 sets (1 for each time step) of global maps containing tidal flat habitat at 30 meter Ground Sample Distance (GSD; AKA resolution). This means that each pixel in each raster represented 30 m<sup>2</sup>, and contained either a value of 0 for "not tidal flat", or a 1 for "tidal flat." This is a massive amount of data, but thankfully, each of the 11 time steps were broken into 108 files with discrete spatial extents, making individual files easy to work with. 

So where to begin? Well first, we needed to access the data. The authors provide several options for [data access](https://www.intertidal.app/download) including through [Google Earth Engine](https://developers.google.com/earth-engine/datasets/tags/tidal-flats), [UNEP-WCMC Ocean Data Viewer](https://data.unep-wcmc.org/datasets/47), and finally through [direct download](https://www.intertidal.app/download/direct-download). We chose the direct download option and wrote a simple shell script that is executed in an R Markdown code chunk. 

````bash
```{bash}
### Make the new directory and move into it
mkdir /<path>/<to>/<directory>/<of>/<choice>/tidal_flats && cd $_

### Declare an array of strings, one for each time step
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

With the data in hand, we first do some basic exploration and ensure it is what we expect, and that it makes sense. The `terra` package has some handy functions for doing this. After reading the first file of the first time step with `terra::rast()`, I used `terra::freq()` to check how many unique values there were, expecting only 0 or 1 based on the metadata. 

```r
image <- here::here("tidal_flats", "1984-1986", "-100_-20.tif") %>% 
  terra::rast() 
image # print the raster metadata
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

Dang! All 0's. This is common with a global dataset, broken up into spatial tiles when what we are looking for is only along the intertidal region. There will be many tiles over nothing but ocean or land. While not a satisfying result for our first data exploration, it is something important to anticipate what you are looking for and what you might find. Lets take a look at this files spatial extent in relation to the global coastline to make sure that our results match what we now expect of it. 

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

<center>
<img src="/images/terra_post/plot_1.png"/>
</center>

Looks like our intuition matches the result! This plot shows the extent only covers open ocean. 

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

```r
extent_polygon <- terra::ext(image) %>% 
  terra::as.polygons()

terra::crs(extent_polygon) <- "epsg:4326"

ggplot(data = world) +
  geom_sf() +
  tidyterra::geom_spatvector(data = extent_polygon, color = "Red", fill = NA)
``` 

<center>
<img src="/images/terra_post/plot_2.png"/>
</center>

Now we can see that this tile falls along a section of coastline, and has both 0 and 1 values. Things look good so far. 

#### Designing a workflow

Now that we know our files contain what we expect, and have seen a few outputs, it is time to design a workflow that will allow us to extract the information we want from the files. For OHI, our goal is to summarize the extent of habitat in each region, for each time step. Our ideal final product will have an extent measured in km<sup>2</sup>, the region ID, the year, and the habitat type. 

Even though each time step is broken into 108 files, the resolution still makes this data hard to work with. The `terra` package offers a solution to reduce resolution, often referred to as down-sampling. The function `terra::aggregate()` allows a user to specify how many pixels should be connected into one and what function to use on the pixels being aggregated. In our case we want to sum the pixels to retain all of the habitat information. We want to choose a resolution that will allow us to continue using the rasters for analysis without bogging down our computer. We chose to down-sample to ~1 km<sup>2</sup> resolution by choosing 30 pixels as our aggregation factor. Our final function then looks like:

```r
down_sampled_image <- terra::aggregate(
  x = image, 
  fact = 30, 
  fun = sum, 
  na.rm = T
)
```

The true resolution in km<sup>2</sup> can be found with a bit of simple math, 30 meters by 30 pixels is 900 meters so our new pixel has dimensios 900 x 900 meters. We then divide these new dimensions by by a pixel with an area of 1 km<sup>2</sup>: (900 * 900)/(1,000 * 1,000) = 0.81 km^2<sup>2</sup>. 

Our next goal is to convert pixel counts into area. If the native raster cells are 30 x 30 meters, then a raster cell with a value of 1 would be equivalent to 0.0009 km<sup>2</sup> habitat area. This can be found by multiplying the pixel dimensions together and dividing by a pixel with an area of 1 km<sup>2</sup>: (30 * 30) / (1,000 * 1,000) = 0.0009 km<sup>2</sup>. The simplest way to convert to area in this scenario with `terra` is to simply multiply our down-sampled raster by 0.0009. 

```r
down_sampled_image <- down_sampled_image * 0.0009
```

This works because each pixel started out as a 0 or a 1, so the aggregated raster has values in multiples of 1. We can check this by again using `terra::freq()` to see that our new raster has values in multiples of 0.0009. We use the `digits` argument to make sure values are not rounded to 0 in the output table. 

```r
terra::freq(
  down_sampled_image, 
  digits = 6
) 
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

Now we need to extract the values that fall with each OHI region polygon. To do this we use another package new to OHI, `exactextractr`. As we saw above in the soft bottom habitat analysis, this package allows us to extract values from polygons and return an estimate if a polygon goes through a raster cell. This is handy to implement after aggregation as it allows us to maintain a higher level of precision. The `raster::extract()` function will only include a cell if the center of the cell falls inside a polygon. Our shapefile has separate polygons for all regions' EEZ's and for their land area. We want to use both because our data primarily goes through the intersection of these two polygons. 

The first thing we need to do is [download](https://oceanhealthindex.org/global-scores/data-download/) the OHI region [polygon file](https://mazu.nceas.ucsb.edu/data/). 

````bash
```{bash}
mkdir /<path>/<to>/<directory>/<of>/<choice>/regions && cd $_
wget https://ohi.nceas.ucsb.edu/data/data/regions.zip
unzip regions.zip 
rm regions.zip
```
````

Next we read in the data and filter for what we want. We also create a dummy dataframe to use when reconstructing the extracted values into a usable data format. 

```r
regions_eez_and_land <- here::here('regions', 'regions.shp') %>% 
  sf::read_sf() %>%
  dplyr::filter(rgn_type %in% c("eez", 'land')) %>% 
  sf::st_transform(crs = 4326)
  
dummy_df <- regions_eez_and_land %>% 
  tibble::as_tibble() %>% 
  dplyr::select(rgn_id, rgn_name) 
```

We use the sum of values in our extraction because our downsampled image has also been converted to area in each pixel. The sum will give us the total area inside each polygon. Our function to extract values then looks like:

```r
exactextractr::exact_extract(
 x = down_sampled_image, 
 y = regions_eez_and_land, 
 fun = 'sum'
)
```

Now that we have a workflow that works on a single raster, all we have to do is design a loop that goes through each file and outputs a simple `.csv` file.

```r 
dir.create("int") # create an empty intermediate output folder

tictoc::tic() # time this code 

folders <- here::here("tidal_flats") %>% 
  list.files()

j <- 1

### To run this code in parallel, 
### Uncomment next two lines and comment out one after
### You will loose the pretty output messages :(

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
    
    ### make a new int folder to hold the output
    
    file_name <- here::here("int", "tidal_flat", fn)
    
    if(!file.exists(file_name)){
      
      cat(fn, " is being created!\n")
      
      cat("    down sampling...\n")
      
      image <- here::here("tidal_flats", dir, file) %>% 
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
> List raw data folders       
> Outer loop iterates through folders  
> List files in the folder  
> Find the year by splitting the folder name  
> Inner loop iterates through files in folder   
> Check if desired output already esists, if not, create it!  
> Create the SpatRaster  
> Down-sample resolution  
> Convert cell values to area  
> Extract area inside region polygons  
> Assign values to dummy dataframe 
> Summarize to the region level  
> Write the results!  

#### Consolidate results

The end result of the above workflow produces a single `.csv` file for every raster in every time step with the extent of tidal wetland in every OHI region. We also know that each raster only covers a 1/108 chunk of the globe, which means there are a lot of 0 values in each of the files. These can be further condensed and summarized with a simple for loop. 

```r
dir.create("output") # create an empty output folder

### list csv files with extracted tidal flat values
files <- here::here("int", "tidal_flat") %>% 
  list.files(full.names = T)

### make an empty tibble to fill through iteration
output <- dplyr::tibble()

### loop through files
for (file in files) {
  
  ### read in files, suppress messages with col_types argument
  tmp <- readr::read_csv(file, col_types = cols()) 
  
  ### bind temporary output to complete output
  output <- rbind(output, tmp) 
}

### summarize results and write final output
final <- output %>%
  dplyr::group_by(rgn_id, year, habitat) %>%
  dplyr::summarise(km2 = sum(km2, na.rm = T)) %>% 
  dplyr::filter(rgn_id != 213) %>% 
  readr::write_csv(here::here('output', "tidal_flat_extent.csv"))
```

Now we have a single `.csv` file with every OHI region  listed a single time for each time step, and a corresponding tidal flat extent for that region. This data is then used as a new layer when calculating the OHI scores. 

__[Check out the full data prep used in the 2022 OHI assessment here.](https://github.com/OHI-Science/ohiprep_v2022/tree/gh-pages/globalprep/hab_tidal_flat/v2022)__ 

## References

* Daniel Baston (2022). _exactextractr: Fast Extraction from Raster Datasets using Polygons_. R package version 0.8.2, <https://CRAN.R-project.org/package=exactextractr>.

* Global Fishing Watch. [2022]. www.globalfishingwatch.org

* Hijmans R (2022). _terra: Spatial Data Analysis_. R package version 1.6-3, <https://CRAN.R-project.org/package=terra>.

* Murray, N.J., Phinn, S.R., DeWitt, M. et al. The global distribution and trajectory of tidal flats. Nature 565, 222–225 (2019). https://doi.org/10.1038/s41586-018-0805-8

* R Core Team (2022). R: A language and environment for statistical computing. R Foundation for Statistical Computing, Vienna, Austria. URL https://www.R-project.org/.

* Watson, R. A. and Tidd, A. 2018. Mapping nearly a century and a half of global marine fishing: 1869–2015. Marine Policy, 93, pp. 171-177. [(Paper URL)](https://www.sciencedirect.com/science/article/pii/S0308597X18300605?via%3Dihub)

* Wickham H, Averick M, Bryan J, Chang W, McGowan LD, François R, Grolemund G, Hayes A, Henry L, Hester J, Kuhn M, Pedersen TL, Miller E, Bache SM, Müller K, Ooms J, Robinson D, Seidel DP, Spinu V, Takahashi K, Vaughan D, Wilke
  C, Woo K, Yutani H (2019). “Welcome to the tidyverse.” _Journal of Open Source Software_, *4*(43), 1686. doi:10.21105/joss.01686 <https://doi.org/10.21105/joss.01686>.
  

---

This post was created by the [2022 OHI Fellows](https://oceanhealthindex.org/about/ohifellows/).

---