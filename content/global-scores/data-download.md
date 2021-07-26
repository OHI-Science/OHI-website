---
title: "Data Download"
name: "Data Download"
bg_image: "/images/banners/fish-school.jpg"
menu:
  main:
    parent: 'Global Scores'
    weight: 2
---
We enthusiastically support the use of our data, but please cite our work.

Global OHI assessments require synthesizing data from nearly one hundred sources. 
Data are prepared and scores calculated using freely available coding and version control software. In the interest of transparency and the promotion of scientific discovery, we freely provide the data and scripts used to calculate the global Ocean Health Index. 

We do not provide unaltered data obtained from other sources; to obtain these data you must go the original data sources we provide in methods documents.

<!---From http://stackoverflow.com/questions/31753897/2-column-section-in-r-markdown:
Put in your css file or directly in rmarkdown--->
<style>
  .col2 {
    columns: 2 200px;         /* number of columns and width in pixels*/
    -webkit-columns: 2 200px; /* chrome, safari */
    -moz-columns: 2 200px;    /* firefox */
  }
</style>

<br>

-----

<div class="col2">
**2020 Ocean Health Index scores**
The OHI 2020 assessment includes scores for years 2012 - 2020.

Every year we improve the Ocean Health Index by incorporating new data, knowledge, and feedback. In order to make scores comparable among years, we always recalculate previous year's results using the most recent methods and data. In addition to providing scores, we make all code available online on GitHub.  


- [Download scores from 2020 assessment](ADD LINK TO SCORES).
  - [Description of scores data](https://github.com/OHI-Science/ohi-global/blob/draft/yearly_results/README.md#global-ohi-score-metadata).
- [Methods](http://htmlpreview.github.io/?https://github.com/OHI-Science/ohi-global/published/documents/methods/Supplement.html)

<br>

**Calculating scores**

Coding scripts to prepare data:
- [data preparation (`ohiprep` repository)](https://github.com/OHI-Science/ohiprep_v2019) 
- [description of file organization] (https://github.com/OHI-Science/ohiprep_v2018/blob/gh-pages/src/dataOrganization_SOP.md#sop-for-data-management-for-ocean-health-index-assessments)

Coding scripts to calculate scores:
- [score calculation (`ohi-global` repository)](https://github.com/OHI-Science/ohi-global/releases)

A (very) detailed manual for conducting the global assessment:
- [OHI Global Guide](http://ohi-science.org/ohi-global-guide/index.html)

Extra data to large to host on GitHub:
- [Large data files](https://mazu.nceas.ucsb.edu/data/) 
</div>

</div>

<br>

---- 

