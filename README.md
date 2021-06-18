# Ocean Health Index

Repository for the Ocean Health Index website.

### Running

To run the server, run the following from the top level ohi-site directory,

```
cd themes/ohi/ohi
hugo server --themesDir ../..
```


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
