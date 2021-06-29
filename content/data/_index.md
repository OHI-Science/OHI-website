---
headless: true
missingValueCode: 'NA'
goalIconsDirPath: '/images/goal-icons/'
dataFiles:
  scores: scores.csv
  goals: goalLabels.json
  regions: regions.topojson
---

# OHI data files

The front-matter in this markdown file (`content/data/_index.md`) configures properties of
the data files used in this website. The front-matter properties are:

- `headless`: This should always be set to `true`. This property is used by Hugo to make
  the data in this directory available to other parts of the website.
- `missingValueCode`: The string used to indicate a value is missing in the data (e.g.
  'NA').
- `goalIconsDirPath`: The directory, within the content directory, that stores the goal
  icons. Icons must be in SVG format.
- `dataFiles`: The list of data types that are used by the website, along with the file
  name of each type. These are described in detail below. The data types are: `scores`,
  `goals`, `regions`.

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

## `goals` (format: `JSON`)

The goals JSON file configures how the OHI goal information is presented on the website.
For each goal, including the overall index, the following properties can be configured:

- "id": The identifier code for the goal. This is the same identifier used in the scores
  CSV file (e.g. "FP")
- "label": The full name of the goal (e.g. "Food Provision")
- "icon": The file name of the icon that is associated with the goal. These icons must be
  SVG format. (e.g. "food-provision.svg"). Do not configure icons for sub-goals; sub-goals
  will use the parent goal icon.
- "description": A very short, one sentence description of the goal. (e.g. "This goal
  measures the amount of seafood sustainably harvested for use primarily in human
  consumption or export.")
- "color": A hex code that will be used to represent this goal. "#A7344E". Do not
  configure colours for sub-goals; sub-goals will use the parent goal colour.
- "parent": For sub-goals, give the id of the parent (e.g "BD")

Example:
```
[
  {
    "id": "Index",
    "label": "Overall Index",
    "icon": "",
    "description": "The Ocean Health Index (OHI) defines a healthy ocean to be one that sustainably delivers a range of benefits to people now and in the future."
  },
  {
    "id": "FP",
    "label": "Food Provision",
    "icon": "food-provision.svg",
    "description": "This goal measures the amount of seafood sustainably harvested for use primarily in human consumption or export.",
    "color": "#A7344E"
  },
  ...
]
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
