---
headless: true
dataVersion: "2021-07-02"
missingValueCode: 'NA'
dataFiles:
  scores: scores.csv
  regions: regions.topojson
---

# OHI data files

The front-matter in this markdown file (`content/data/_index.md`) configures properties of
the data files used in this website. The front-matter properties are:

- `headless`: This should always be set to `true`. This property is used by Hugo to make
  the data in this directory available to other parts of the website.
- `dataVersion`: If one of the data files are updated, then this data version code should
  be updated as well. It doesn't matter what the code is, as long as it's different from
  the last code. This is so that any data stored in a user's browser gets updated when a
  new version is available.
- `missingValueCode`: The string used to indicate a value is missing in the data (e.g.
  'NA').
- `dataFiles`: The list of data types that are used by the website, along with the file
  name of each type. These are described in detail below. The data types are: `scores`
  and `regions`.

# Updating the data

To update the data that the website uses, add it to this directory (`content/data/`). If
the file name has changed, then update the file name listed under `dataFiles` in the
front-matter of this markdown file.

## `scores` (format: `CSV`)

The scores CSV file contains the index score values for each region, dimension, and year.
The headers for the CSV must be: scenario, goal, long_goal, dimension, region_id,
region_name, value.

Example:
```
scenario,goal,long_goal,dimension,region_id,region_name,value
2012,AO,Artisanal opportunities,future,0,Global average,79.53
2012,AO,Artisanal opportunities,future,1,Cocos Islands,100
...
```

## `regions` (format: `topojson`)

Regions is a topojson file with the features used to create the global scores map.
Features in this file should be as simplified as possible. Each feature should contain the
following properties:
- "rgn_nam": The full name of the region
- "rgn_id": The ID of the region. This ID should match the `region_ID`s in the scores CSV
  file.
- "rgn_typ": The type of feature, either 'land', 'land-disputed', or 'land-noeez' for land
  features; 'fao' or 'eez-ccamlr' for water features that are not OHI regions; or 'eez',
  'eez-disputed', or 'eez-inland' for OHI region features.

Example:

```
{
  "type": "Topology",
  "arcs": [...],
  "transform": {...},
  "objects": {
    "regions_gcs": {
      "type": "GeometryCollection",
      "geometries": [
        {
          "arcs": [ ... ],
          "type": "MultiPolygon",
          "properties": {
            "rgn_typ": "land-noeez",
            "rgn_id": "255",
            "rgn_nam": "Azerbaijan",
            "rgn_key": "AZE"
          }
        },
        ...
    }
  }
}
```
