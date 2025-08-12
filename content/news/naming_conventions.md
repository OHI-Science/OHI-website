---
title: What's in a Name?
name:  Navigating Naming Convention and Definition Incongruity in Data Science
bg_image: "/images/naming_conventions/UN_flags.jpg"
preview_text: "The way data is recorded can be exceptionally varied and nuanced! So how can we make comparisons?"
date: 2025-08-07
author: Madison Enda
menu:
  main:
    parent: 'News'
    weight: 2 
editor_options: 
  markdown: 
    wrap: 72
---

## What's in a Name? Navigating Naming Convention Incongruity in Data Science

In any project, the data we work with represents more than just facts
and figures. It represents people, their places, their cultures ---
unique assemblages of environments and the communities that rely on
them. And the way they generate and record data is just as varied and
nuanced! So how can we make comparisons?

For those of us working in the research or data realm, we know all too
well the many different ways people may label and organize data, even
those in the same lab or working group. Here at **OHI**, we are
fortunate to have data that encompasses people groups and ecosystems
from all over the world, collected from a multitude of global data
sources. This complexity and diversity can also amplify a particularly
irksome challenge that we often face in synthesizing data sets:
**matching identifiers and naming conventions**.

In this post, I'm going to showcase just a couple of the issues that
I've encountered as an **OHI Fellow**, as well as functions and R
packages that came to my rescue! Hopefully, this information can help
you out too, if you ever find yourself in a frenzy of missing variables
or unmatched data frames.

## Country and Regional Identifiers

As you can imagine, variation in the spelling of country names is
derived from a wide variety of factors. Most prominently, researchers
tend to record labels and identifiers in their native languages, and
compilations of data translated from one language to another will differ
based on the type of translation.

For example, in an English translation:

-   Tone indicators may be included or omitted
-   Spelling may vary based on the English-speaking country of origin
-   The common name may appear over the formal name (e.g. `South Korea`
    vs `The Republic of Korea` / 대한민국)

To address these inconsistencies, people often choose a **single
standard of naming conventions** and convert any mismatches. This has
been especially helpful in my projects at **OHI**, and creates
**reproducible workflows** that other fellows can also use.

Rather than manually renaming countries or creating an extremely long
`case_when()` list, you can use the **`countrycode`** package!

### `countrycode()` to the Rescue

`countrycode()` from the [`countrycode`
package](https://www.rdocumentation.org/packages/countrycode/versions/1.6.1/topics/countrycode)
allows you to convert country names into **UN naming conventions** in
several different languages, including dialects.

> According to its [GitHub
> page](https://github.com/vincentarelbundock/countrycode), the package
> can "convert to and from 600+ variants of country names in different
> languages and formats."

It also supports:

-   40+ country **coding schemes**
-   Conversion **between names and codes**

At **OHI**, we use this to convert a mix of region codes (like UN
georegion IDs) into a unified naming standard --- making dataset joining
much easier.


````markdown
```{r}
# install.packages("countrycode")
library(countrycode)

# Example: Convert common names to ISO3C codes
countrycode(c("South Korea", "Germany", "Brazil"),
            origin = "country.name",
            destination = "iso3c")
```
````

## Taxonomy and Species Names

For many of the **OHI** goals--- such as:

-   [Artisanal Opportunities](https://oceanhealthindex.org/goals/artisanal-fishing-opportunities/)

-   [Food Provision](https://oceanhealthindex.org/goals/food-provision/)

-   [Biodiversity](https://oceanhealthindex.org/goals/biodiversity/)

-   [Sense of Place](https://oceanhealthindex.org/goals/sense-of-place/)

-   [Natural Products](https://oceanhealthindex.org/goals/natural-products/)

their score calculations involve marine organism data, typically
structured as observational records with species names and identifiers.
Like country names, these species labels often vary in format and
spelling.

If some organisms are recorded by species name while others are only
labeled by genus or a variation of the common name, it becomes
challenging to accurately analyze patterns in catch, population size, or
geographic distribution.

For example:

`Thunnus maccoyii-57`

`Thunnus spp`.

`Pacific Bluefin Tuna`

`Bluefin Tuna`

likely refer to the same or similar organisms, but inconsistent naming
makes them difficult to analyze or compare.

Sometimes you may not be able to get more specific information about a
species (e.g. inability to downscale broad categories, limitations in
metadata or data sharing agreements), but you can convert names to a
standardized framework, which allows for comparison.

### `rfishbase` for Marine Species

The [`rfishbase`
package](https://www.rdocumentation.org/packages/rfishbase/versions/5.0.1)
standardizes taxonomic and common names based on two updating databases:
FishBase and SeaLifeBase.

> According to its [GitHub page](https://github.com/ropensci/rfishbase)
> `rfishbase's` "simplified access protocol relies on `duckdbfs` for
> direct reads of tables".

This package is incredibly helpful for

-   Converting scientific names to common names (sci_to_common())

-   Retrieving multiple common names across languages (common_names())

-   Validating names to catch typos or outdated taxonomy
    (validate_names())

These functions helped me standardize species data and avoid issues like
double-counting or missing species entirely due to taxonomic changes.

````markdown
```{r}
# install.packages("rfishbase")
library(rfishbase)

# Get all common names for a species
common_names("Thunnus maccoyii")

# Convert scientific to common name
sci_to_common("Thunnus maccoyii") 

# Validate names
validate_names(c("Thunnus maccoyii", "Thunnus atlanticus", "Scomber
japonicus"))
```
````

## Wrapping Up

I hope these packages and tips help you as much as they've helped me
during my time as OHI Fellow!

Whether you're working with global region codes or marine biodiversity
data, there's likely an R package that can make your workflow more
efficient, more reproducible, and less frustrating.

Happy coding! ✨
