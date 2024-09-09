---
title: "Coordinate Reference Systems: Ensuring Accuracy in Spatial Analysis"
name: "A Mesophotic Dive into Coordinate Reference Systems"
bg_image: "/images/banners/orange_peel_earth_crop.jpg"
card_image: "/images/nasa_earth_from_space.jpg"
preview_text: ""
date: 2024-08-30
author: "Dustin Duncan"
menu:
  main:
    parent: 'News'
    weight: 2
---

<h1 style="margin-bottom: 0;">Ensuring Accuracy in Spatial Analysis</h1>
<div style="height: 10px;"></div>
<h4 style="margin-top: 0;">A Mesophotic Dive into Coordinate Reference Systems</h4>

{{<newsHead>}}

<div style="height: 10px;"></div>
<h5 style="margin-top: 0;">What is a Coordinate Reference System?</h5>

<p>Coordinate reference systems can refer to either geographic coordinate systems or projected coordinate systems. Geographic coordinate systems describe locations on earth using a three-dimensional reference, and are used along with a specified map projection to create a projected coordinate system, which describes the same information on a two-dimensional surface <a href="https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/coordinate-systems-and-projections.htm"> (1) </a>. Geographic coordinate systems use angular units such as degrees for measurement (often seen as lat/lon in R), and projected coordinate systems convert this information to linear units such as feet, meters, or kilometers as coordinates.</p>
<p>Coordinate reference systems require an origin (0,0) point, which is defined by projection parameters. The origin allows users to define where a point of interest exists on their map versus its real location on Earth. For example, (128, 14) has no meaning unless one knows where the origin point of a given map is. Defining the origin allows users to utilize different sources of spatial data by providing a framework for how they should be aligned and integrated <a href="https://www.earthdatascience.org/courses/earth-analytics/spatial-data-r/intro-to-coordinate-reference-systems/"> (2) </a>. Broadly, coordinate reference systems store and portray data in a manner which allows other spatial data to be seamlessly integrated into a map to provide meaningful interpretation.</p>

<div style="text-align: center;">
  <img src="/images/wgs_1984_Aitoff.jpg" alt="WGS84 Aitoff Projection" />
</div>

<div style="text-align: center; font-size: 0.7em;">
Example of the <a href="https://support.esri.com/en-us/knowledge-base/why-are-my-map-distance-and-area-measurements-wrong-whe-000011356"> WGS84 Aitoff Projection </a> by <a href="https://support.esri.com/en-us/overview">ESRI Technical Support, </a>  which is a compromise projection.
</div>

<div style="height: 10px;"></div>
<h5 style="margin-top: 0;">Widely used Coordinate Reference Systems</h5>

<p>Some of the most widely used geographic coordinate reference systems are WGS 84 (World Geodetic System 1984), NAD83 (North American Datum 1983) and UTM (Universal Transverse Mercator). In the United States, common projected coordinate systems are SPCS (State Plane Coordinate System) and LCC (Lambert Conformal Conic) <a href="https://www.geographyrealm.com/geographic-coordinate-system/"> (3) </a>. 
WGS 84 is the standard for GPS receivers and most GIS applications, making it the most commonly used geographic coordinate system. UTM is a common plane grid system, although the choice of projected coordinate system depends on the specific application.
</p>
<p>Different projected coordinate systems are used because the fundamental challenge of working with spatial data is representing 3D coordinates on a 2D plane. One could replicate this problem at home with an orange and some aluminum foil. Take a square of aluminum foil, draw three vertical and three horizontal lines on it, making a grid. It is impossible to wrap the orange in the aluminum foil while linking each pair of opposite lines without creasing or tearing the aluminum foil. Similarly, converting a 3D model of the Earth (an ellipsoid or sphere) to a 2D map must introduce some distortion to be used with confidence. Different map projections distort certain aspects of a map so that a user's target aspect of the 3D surface is portrayed accurately.</p>

<div style="height: 10px;"></div>
<h5 style="margin-top: 0;">Tradeoffs Between Coordinate Reference Systems</h5>

<p>Tradeoffs between projected coordinate systems primarily refer to the type of distortion introduced. Different projections will either distort shape, area, distance, or direction. In addition, compromise projections are those which attempt to minimize overall distortion <a href="https://support.esri.com/en-us/gis-dictionary/compromise-projection"> (4) </a>.</p> 
<p>Conformal projections attempt to preserve local shapes and angles. For example, Lambert’s Conformal Conic projection maintains angles, shapes, and direction at small scales, yet increasingly distorts distances, scale, and area further away from standard parallels <a href="https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/lambert-conformal-conic.htm#:~:text=Lambert%20conformal%20conic%20is%20a,away%20from%20the%20standard%20parallels"> (5) </a>. Another well known conformal projection is the Mercator projection. Both of these map projections are well suited to east-west orientation at mid-latitudes. The distortion present in either projection can be seen by comparing the size of Greenland to Africa on a Mercator map in contrast to an equal-area projection <a href="https://map-projections.net/compare.php?p1=albers-equal-area-conic&p2=lambert-conformal-conic"> (6) </a>.</p> 
<p>The three other types of projections are relatively straightforward in what they attempt to preserve when displaying 3D data on a 2D plane. Equal-area projections attempt to accurately represent areas of objects on a map. In preserving areas, these may distort shapes, angles, or distances of the map <a href="https://support.esri.com/en-us/gis-dictionary/equal-area-projection"> (7) </a>. Two examples are the Albers and Mollweide equal-area projections. Both of these trade off equivalence for general distortion of shape, angles, distance, and direction <a href="https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/mollweide.htm"> (8) </a>. Equidistant projections attempt to maintain accurate distance and direction along certain lines or from specific points <a href="https://support.esri.com/en-us/gis-dictionary/equidistant-projection"> (9) </a>. One of the most common is the Azimuthal Equidistant Projection, which preserves both distance and direction from the center point of the map (aspect) <a href="https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/azimuthal-equidistant.htm#:~:text=The%20azimuthal%20equidistant%20projection%20preserves,any%20point%20on%20the%20globe"> (10) </a>. Equidistant projections are not typically conformal or equal area, and scale is only true along straight lines from the center point. Finally, some map projections are able to preserve compass bearing, such as the Mercator projection which was originally created for sea travel <a href="https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/mercator.htm#:~:text=Sources-,Description,correctly%20defined%20at%20infinitesimal%20scale"> (11) </a>.</p> 

<div style="text-align: center;">
  <img src="/images/mercator_projection.jpg" alt="Mercator Projection" />
</div>

<div style="text-align: center; font-size: 0.7em;">
Example of the <a href="https://docs.qgis.org/3.34/en/docs/gentle_gis_introduction/coordinate_reference_systems.html#id3"> Mercator Projection </a> by <a href="https://docs.qgis.org/3.34/en/docs/index.html"> QGIS Documentation, </a>  preserving angles at the expense of relative areas.
</div>

<div style="height: 10px;"></div>
<h5 style="margin-top: 0;">Picking a Coordinate Reference System</h5>

</p> As coordinate reference systems were created for different use cases, choosing a coordinate reference system boils down to defining what the user requires of their projection. Depending on the project or analysis, different projections will be more useful than others, so careful consideration of the type of analysis will elucidate which projection will be most suitable. </p>


## References

1. *Azimuthal equidistant.* [Azimuthal equidistant-ArcGIS Pro | Documentation. (n.d.).](https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/azimuthal-equidistant.htm#:~:text=The%20azimuthal%20equidistant%20projection%20preserves,any%20point%20on%20the%20globe) 

2. *Coordinate reference system and spatial projection.* [Earth Data Science - Earth Lab. (2017, February 15). ](https://www.earthdatascience.org/courses/earth-analytics/spatial-data-r/intro-to-coordinate-reference-systems/)

3. *Coordinate systems, map projections, and transformations.* [Coordinate systems, map projections, and transformations-ArcGIS Pro | Documentation. (n.d.).](https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/coordinate-systems-and-projections.htm)

4. **Dempsey, C.** (2022, July 1). *Geographic Coordinate Systems.* [Geography Realm.]( https://www.geographyrealm.com/geographic-coordinate-system/)

5. *GIS Dictionary.* [Compromise Projection Definition. (n.d.).]( https://support.esri.com/en-us/gis-dictionary/compromise-projection )

6. *GIS Dictionary.* [Equal-Area Projection Definition. (n.d.).]( https://support.esri.com/en-us/gis-dictionary/equal-area-projection )

7. *GIS Dictionary.* [Equidistant Projection Definition. (n.d.).]( https://support.esri.com/en-us/gis-dictionary/equidistant-projection )

8. **Jung, T.** (n.d.). [Compare map projections. Albers vs. Lambert conformal conic: Compare Map Projections.]( https://map-projections.net/compare.php?p1=albers-equal-area-conic&p2=lambert-conformal-conic )

9. *Lambert conformal conic.* [Lambert conformal conic-ArcGIS Pro | Documentation. (n.d.).]( https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/lambert-conformal-conic.htm#:~:text=Lambert%20conformal%20conic%20is%20a,away%20from%20the%20standard%20parallels )

10. *Mercator.* [Mercator-ArcGIS Pro | Documentation. (n.d.).]( https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/mercator.htm#:~:text=Sources-,Description,correctly%20defined%20at%20infinitesimal%20scale )

11. *Mollweide.* [Mollweide-ArcGIS Pro | Documentation. (n.d.).]( https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/mollweide.htm) 


Code for the visualization in this blog post can be found in the [website GitHub repository](https://github.com/OHI-Science/OHI-website/blob/dev/scripts/lsp_blogpost_visualization.Rmd).

This post was created by the [2024 OHI Fellows](https://oceanhealthindex.org/about/ohifellows/).
