---
title: "Coordinate Reference Systems: Ensuring Accuracy in Spatial Analysis"
name: "A Mesophotic Dive into Coordinate Reference Systems"
bg_image: "/images/banners/orange_peel_earth.jpg"
card_image: ""
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

<p>Coordinate reference systems can refer to either geographic coordinate systems or projected coordinate systems. Geographic coordinate systems are used along with a specified map projection to create a projected coordinate system, which displays data relative to other data on a two-dimensional surface [(1)](https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/coordinate-systems-and-projections.htm). Where geographic coordinate systems use angular units for measurement, projected coordinate reference systems use linear units such as feet, meters, or kilometers as coordinates.</p>
<p>Coordinate reference systems require an origin (0,0) point, which is defined by projection parameters and allows users to further define where a point of interest exists on their map versus its real location on Earth. For example, (128, 14) has no meaning to a user unless they know where the origin on the map is. Origins also allow users to utilize different sources of spatial data by defining how they should be aligned and integrated [(2)](https://www.earthdatascience.org/courses/earth-analytics/spatial-data-r/intro-to-coordinate-reference-systems/). Broadly, coordinate reference systems store data in a way that allows other spatial data to be seamlessly integrated into a map to provide meaningful interpretation.</p>

<div style="height: 10px;"></div>
<h5 style="margin-top: 0;">Widely used Coordinate Reference Systems</h5>

<p>Some of the more widely used geographic coordinate reference systems are WGS 84 (World Geodetic System 1984), NAD83 (North American Datum 1983) and UTM (Universal Transverse Mercator), whereas commonly used projected coordinate systems are SPCS (State Plane Coordinate System) in the United States, and LCC (Lambert Conformal Conic) [(3)](https://www.geographyrealm.com/geographic-coordinate-system/). 
WGS 84 is the most commonly used geographic coordinate system; it is used by GPS receivers and is the standard for most GIS applications. UTM is a common plane grid system, although generally which projected coordinate system is used depends on the specific application.</p>
<p>Different projected coordinate systems are used because one of the fundamental challenges of working with spatial data is representing 3D coordinates on a 2D plane. One could replicate this problem at home with an orange and some aluminum foil. Take a square of aluminum foil, draw three straight vertical lines and three straight horizontal lines, creating 12 squares on the foil. Then attempt to wrap the orange inside of it without creasing or tearing the aluminum foil. It is impossible to link both ends of each straight line without creasing or tearing the foil. Similarly, when converting a 3D representation of an ellipsoid or sphere (Earth) to a 2D representation of that same object (map of Earth), one must introduce some distortion to how the 3D object is presented in the 2D plane so that locations from the 2D plane accurately reflect those from the 3D plane. Different map projections distort certain aspects of a map so that the target aspect of the 3D surface is maintained.</p>

<div style="height: 10px;"></div>
<h5 style="margin-top: 0;">Tradeoffs Between Coordinate Reference Systems</h5>

<p>Tradeoffs between projected coordinate reference systems primarily refer to the type of distortion introduced. Different projections will either distort shape, area, distance, or direction. In addition, there are some projections that attempt to minimize overall distortion, which are called compromise projections [(4)](https://support.esri.com/en-us/gis-dictionary/compromise-projection).</p> 
<p>Conformal projections attempt to preserve local shapes and angles. One example is Lambert’s Conformal Conic projection, which maintains angles, shapes, and direction at small scales. However, distances, scale and area are increasingly distorted away from standard parallels [(5)](https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/lambert-conformal-conic.htm#:~:text=Lambert%20conformal%20conic%20is%20a,away%20from%20the%20standard%20parallels). Another example of a conformal projection is the Mercator projection. Both of these map projections are well suited to east-west orientation at mid-latitudes; the distortion present in either projection can be seen by comparing the size ratio of Greenland to Africa on one of these projections compared to an equal-area projection [(6)](https://map-projections.net/compare.php?p1=albers-equal-area-conic&p2=lambert-conformal-conic).</p> 
<p>The following three types of projections are relatively straightforward in what they attempt to preserve when displaying 3D data on a 2D plane: equal-area projections attempt to accurately represent areas of objects on a map. In preserving areas, these map projections may distort other aspects of the map [(7)](https://support.esri.com/en-us/gis-dictionary/equal-area-projection). Two examples of equal-area projections are Albers equal-area projection and Mollweide equal-area projection. Both of these trade off equivalence for general distortion of shape, angles, distance, and direction [(8)](https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/mollweide.htm). Equidistant projections attempt to maintain accurate distance and direction along certain lines or from specific points [(9)](https://support.esri.com/en-us/gis-dictionary/equidistant-projection). One of the most common equidistant projections is the Azimuthal Equidistant Projection, which preserves both distance and direction from the center point (aspect) of the map [(10)](https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/azimuthal-equidistant.htm#:~:text=The%20azimuthal%20equidistant%20projection%20preserves,any%20point%20on%20the%20globe). Equidistant projections are not typically conformal or equal area; additionally, scale is only true along straight lines from the center point, and all azimuthal projections preserve direction along these lines. Other map projections also are able to preserve compass bearing, such as the Mercator projection which was originally created for sea travel [(11)](https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/mercator.htm#:~:text=Sources-,Description,correctly%20defined%20at%20infinitesimal%20scale).</p> 

<div style="height: 10px;"></div>
<h5 style="margin-top: 0;">Picking a Coordinate Reference System</h5>

As coordinate reference systems were created for different use cases that have arisen, choosing a coordinate reference system boils down to defining what the user requires of their projection. Depending on the project or analysis, different projections will be more useful than others, and careful consideration of the type of analysis will help elucidate the projection that will be most applicable. 

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
