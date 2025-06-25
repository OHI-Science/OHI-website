# Ocean Health Index

Repository for the Ocean Health Index website.

## Running, Deploying & Developing

### Prerequisites

In order to build and run the website, Node.js and Hugo are both required.

### NOTE: DO NOT work from the server (use your local computer)

### Running

To run the server locally, run the following from the top level ohi-site directory,

```
hugo server --disableFastRender --noHTTPCache --cleanDestinationDir
```
`hugo server` will tell Hugo to run a server locally, the other code cleans things up.



If you run into an error that says you need npm install, then run this:
```
npm install
```
`npm install` will install all of the necessary third party packages used

#### Hugo build error 6/23/25
`ERROR deprecated: data.GetCSV was deprecated in Hugo v0.123.0 and subsequently removed. use resources.Get or resources.GetRemote with transform.Unmarshal.
ERROR deprecated: data.GetJSON was deprecated in Hugo v0.123.0 and subsequently removed. use resources.Get or resources.GetRemote with transform.Unmarshal.
Built in 2010 ms
Error: error building site: logged 2 error(s)`

We narrowed down that this error was likely happening because we had just installed the newest version of Hugo that was no longer compatible with the OHI website build. We then decided to downgrade Hugo to version 0.122.0, and that seemed to fix the error. The exact steps we took are as follows:

1. `brew uninstall hugo`
2. Download the 0.122.0 version from the [Hugo GitHub](https://github.com/gohugoio/hugo/releases/tag/v0.122.0). **Specifically, we downloaded hugo_extended_0.122.0_darwin-universal.tar.gz**
3. Extract the downloaded file
`tar -xvzf hugo_extended_0.122.0_darwin-universal.tar.gz`
4. For MacOS, manually put Hugo into your homebrew bin
`sudo mv hugo /opt/homebrew/bin/`

This threw a security issue about the developer not being verified. Because I felt confident about the GitHub download, I decided to allow the program to run anyways using this command:
5. `sudo xattr -rd com.apple.quarantine /opt/homebrew/bin/hugo` 

After that, hugo server ran as expected. 


### Building

Building the site creates a `public/` directory with all of the website assets (html, js, images, etc). To perform a build, run `hugo` from the project root. The contents of this folder are transferred to the server that's hosting the website. The server holding the website is using Apache as the web server instead of the built in Hugo one (the built in hugo server isn't meant for production use); Apache isn't familiar with the directory structure of hugo projects, hence the need for building.

A GitHub Action will pick up new pushes to the main branch, attempt to build the site, and then transfer the content to the Apache server. Actions can be viewed on the [Actions](https://github.com/OHI-Science/OHI-website/actions) page; to see the logs from an action select the name from the list.

Since this is more of a deployment thing, building will be a rare action done manually (I like to run a build to make sure it works before pushing).

### Developing

The workflow development can be summarized as a series of steps below

```
1. Clone the repository
2. Checkout the `dev` branch
3. Make changes
4. Push to develop [dev.oceanhealthindex.org is updated]
5. Repeat 3-4 n times
6. Pull request to the `main` branch
6. Merge develop to main [oceanhealthindex.org is updated]
```
The goal is to first get the content deployed on the `preview.` site before making production-wide changes. The pull request is flexible and a direct merge with `main` without review should suffice if needed.

### Deployment

There are two websites that the OHI website is deployed to

`oceanhealthindex.org`: This is the main website that users see; it has its source built from the `main` branch

`preview.oceanhealthindex.org`: The preview branch is meant to see the site _before_ it gets to production; it's built off of the `dev` branch.

Two separate GitHub actions are run, depending on which branch the code is being pushed to. These scripts can be found under the `.github` folder and their logs can be checked in the main [Actions](https://github.com/OHI-Science/OHI-website/actions) interface.

## Adding or updating content

The content for the website is all contained within the `/content/` directory. The
markdown uses the [commonMark syntax](https://commonmark.org/help/), with some additional
add-ons called "shortcodes". Content markdown files also use metadata at the start of the markdown file called "front-matter". 

### Updating scores
Replace content/data/scores.csv with the latest update from ohi-global (e.g., ohi-global/yearly_results/global2024/OHI_final_formatted_scores_2024-09-11.csv) and change the name to scores.

Open content/data/index.md
and change the name of this variable in the header material 
"dataVersion: "2024-10-25""

Run these scripts: scripts/create-region-pages.Rmd and create-scores-table.Rmd

## Front-matter

Front-matter is located at the top of each markdown file, between two `---` separators, in `yaml` format. The properties common to all pages are:

- `title`: The full title of the page to show in the page header.
- `name`: The short name of the page to use in menus, etc. May be the same as title.
- `bg_image`: The image to use in the page's header, and also any cards that link to this page
- `card_image`: An alternative image to use instead of `bg_image` in any cards that link to this page
- `description`: An optional, very brief summary of the page contents. This will be displayed in any cards that link to this page
- `toc`: Set to `true` to add a table of contents to the page. The page will use a 2-col layout instead of a 3-col layout. This only works for single pages (pages that aren't named `index.md` or `_index.md`)
- `cards`: Set to `false` to hide the cards at the bottom of the page that link to subpages. Only applies to pages named `_index.md`
- `cards_title`: Add a title above the cards. Only applies to pages named `_index.md`
- `card_text`: Add an optional summary of the page content that will be displayed on **all** cards that link to this page.

## Shortcodes (markdown extensions)

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

### `{{< aster regionId="0" linkTo="methodology" >}}`

The `aster` shortcode renders an aster plot (aka a flower plot) where each 'petal' is represents the score for a particular goal for the given region. Data for the aster plot come from the `scores.csv` file. For the `regionId` property, use one of the numbers that are used to identify regions in `scores.csv`; use "0" for the global average. The `linkTo` property can be set to either `"methodology"` or `"score"` - this configured which type of goal page to navigate to when you click on one of the petals. `"methodology"` links to the goal pages that are under `content/goals`, `"score"` links to the goal pages that are under `content/global-scores/goal-scores`.

### `{{<button text="Learn More" link="inform" icon="images/path/to/icon.svg" >}}`

Add a link that looks like a button in markdown using the `button` code, or add a button to download an image or data.
- To link to an external page, make sure that the `link` property starts with `http` or `https`.
- To link to an internal page, the path can have one of the following formats: `learn`, `learn.md`, `ohi+/conduct/learn.md` (useful if there are two pages with the same name in different directories) `learn.md#introduction` (to link to a specific part of a page).
- To make a link to download an image or data, the path should start with `data/` or `image/`, for example `data/scores.csv`)

### `{{<peopleCards path="people.csv">}}`

The `peopleCards` shortcode adds the widget that's on the `People` page under `About`. To change the people that appear in the widget change the `people.csv` file or create a new one.

### `{{<news>}}`

The news shortcode renders the news page. It should _only_ be used in that context.

### `{{<contributors path="contributors.json">}}`

The `contributors` shortcode is used to render a list of all the OHI contributors. The csv file specified in the call contains information about the various people involved in the project.

### `{{<newsHead>}}`

The `newsHead` shortcode is responsible for displaying the author and date that a news article was published. It appears at the top of _each_ news page. New news pages should have this shortcode at the top of the page for author & datetime attributes.

### Other shortcodes

Hugo has some other, built-in shortcodes. See https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes

### Other markdown extensions

- Add emojis with the syntax: `:emoji-name:`. You can add any of the emojis listed [here](https://www.webfx.com/tools/emoji-cheat-sheet/).
- The markdown extensions listed here are also supported: https://github.com/yuin/goldmark/#built-in-extensions

### Adding photo credits

If a new image is used as a banner image and photo attributes need to be given to it, add a record to `content/data/photo-credits.json`.

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

Run code in scripts/create-region-pages.Rmd.  This updates the region pages as well as creates an updated trend.csv file for data analysis.

# Adding individual commits from dev to main
eg. in the case of adding a blog post but other changes have occurred since working on it that you don't also want to push

1. Go into the main branch within your version of the OHI-website project: `git checkout main`
2. Find the commit numbers you want to add. For example, if you're trying to add a blog post, go to the commit history for your blog post file. NOTE: be sure to have committed all supplementary file commits with any of your main blog post document commits; otherwise, you'll need to search for commits where you edited supplmentary files as well.
3. Use `git cherry-pick long-commit-number`, replacing long-commit-number with your earliest commit number. Proceed to repeat this with every relevant commit chronologically (not sure if this matters, but it is what we did before and it worked).
4. Lastly, push all of these changes: `git push origin main`

These instructions were adapted from [here](https://mattstauffer.com/blog/how-to-merge-only-specific-commits-from-a-pull-request/), under "How to use `git cherry-pick`."
