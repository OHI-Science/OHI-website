# Ocean Health Index

Repository for the Ocean Health Index website.

### Running

To run the server, run the following from the top level ohi-site directory,

```
npm install
hugo server --disableFastRender --noHTTPCache --cleanDestinationDir
```

# Adding or updating content

The content for the website is all contained within the `/content/` directory. The
markdown uses the [commonMark syntax](https://commonmark.org/help/), with some additional
add-ons called "shortcodes". Content markdown files also use metadata at the start of the markdown file called front-matter.

## Front-matter

Front-matter is located at the top of each markdown file, between two `---` separators, in `yaml` format. The properties common to all pages are:

- title
- name
- bg_image

## Shortcodes

In addition to basic markdown formatting, the following codes can be used in any of the markdown content files:

### `{{< scoresGlobe >}}`
This code inserts the data visualization that shows the score for each region on an interactive globe, where the year and goal can be changed using inputs. The scores globe uses the data contained in the `content/data/scores.csv` file (see `content/data/_index.md` for details). There should only be a maximum of 1 scores globe on each page.

### `{{< csvTable path="path/to/table.csv" >}}`

Besides using [regular markdown table syntax](https://www.markdownguide.org/extended-syntax/#tables), tables can be built from a CSV file and added to pages using the `csvTable` shortcode. To add a CSV table to a markdown page, 

1. Create a CSV file and place it under the `content/data` directory, or in a sub-directory of `content/data`, such as `content/data/tables`.
2. In the goal page markdown file use the shortcode as `{{< csvTable path="tables/csv_name.csv" >}}`
3. If the CSV uses a separator other than a comma, then set the separator in the shortcode like so: `{{< csvTable path="my-table.csv" sep=";" >}}`
4. The contents of the table will be displayed in the page.

### `{{< regionsDropdown label="Select a region" >}}`

The `regionsDropdown` shortcode creates a dropdown with all of the OHI region names that are included in the `scores.csv` file. When a user selects one of the regions, then they are directed to the score page for that region. The `label` text option is optional.

### `{{< gauge regionId="0" goalCode="ICO" >}}`

The `gauge` shortcode renders a gauge visualization showing the score for the given region and given goal, for the most current year that is available in the `scores.csv` file. For the `regionId` property, use one of the numbers that are used to identify regions in `scores.csv`; use "0" for the global average. The `goalCode` property should similarly be set to one of the two to three digit letter codes used in `scores.csv`.

## Goal pages

Goal and sub-goal pages, including goal index page, require more front-matter than other content pages. In addition to the "title", "name", and "bg_image" properties, goal pages use the properties "id", "icon", "description", and "color". These extra properties control how the OHI goal information is presented on the website, including creating the data visualizations.

- "id": The identifier code for the goal. This ID must match the identifier used in the scores
  CSV file (e.g. "FP") - see `content/data/_index.md` for details
- "icon": The image path for icon that is associated with the goal. These icons must be SVG format. (e.g. "food-provision.svg"). \*
- "description": A very short, one sentence description of the goal. (e.g. "This goal measures the amount of seafood sustainably harvested for use primarily in human consumption or export.")
- "color": A hex code that will be used to represent this goal. e.g. "#A7344E". \*
- "weight": A number that gives the relative order of this goal compared to the others. Used for the display order when the goals are displayed as a list. \*

\* Do not configure color, weight, or icon properties for sub-goals; sub-goals will inherit the parent property.

Example:
```
---
title: "Goal: Food Provision"
name: "Food Provision"
bg_image: "/images/banners/fish-school.jpg"
id: "FP"
icon: "/images/goal-icons/food-provision.svg"
description: "This goal measures the amount of seafood sustainably harvested for use primarily in human consumption or export."
color: "#A7344E"
weight: 1
---
```

## Region pages

Region pages are the pages that show the scores and plots for a particular country or region. The markdown files that create these pages are automatically generated using the the R file `scripts/create-region-pages.Rmd`. This R code creates (or overwrites) each of the markdown pages using the values set in the `scores.csv` file.

If the `scores.csv` file is updated, or the region pages ever need to be re-created for any reason, run the R file `scripts/create-region-pages.Rmd` 

# Making changes to the menu

## Top-level items
- The top-level menu items, e.g. "Global Scores", "Methodology", etc. are listed in `config/_default/menus.yaml`
  - The name is the display name and the ID for each item
  - The weight is the order of each item relative to other items

## Items in the dropdown list
- The sub-menu items, e.g. "Scores", "Data download", etc. under "Global Scores" are specified in each associated markdown file.
- The `menu` property in the front matter of the markdown file contains the information needed to add a markdown page to the menu, for example:
```
menu:
  main:
    parent: 'About'
    weight: 2
```
- "main" specifies the name of the menu. This is the same menu name that is shown at the start of the `config/_default/menus.yaml` file.
- "parent" gives the name of the top-level item under which this page should be listed
- "weight" indicates the order of this page relative to other pages in the same dropdown menu

# Changing social media links

The website shows links to facebook and twitter. The URLs for these links can be configured in the file `config/_default/params.yaml`

# Making changes to the data

See `content/data/_index.md`

Remember that when the `scores.csv` file is updated, the region pages should be re-generated. See the "Region pages" section, above.
