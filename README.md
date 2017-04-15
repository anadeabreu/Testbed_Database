# Testbed_Database

Testbed and database for "Look Around You: Saliency Maps for Omnidirectional Images in VR Applications" QoMex 2017.  
Ana De Abreu, Cagri Ozcinar, Aljosa Smolic

## General description
The designed testbed, is a [WebVR application](https://webvr.info/) running on Three.js, a JavaScript library that facilitates the 3D rendering in the browser. We used Firefox Nightly builds as the browser. The benefit of using WebVR is that this testbed is not constraint to a particular HMD, but it can be used in many virtual reality headset; e.g., Oculus Rift, HTC Vive, Samsung Gear VR, or Google Cardboard. 

The developed testbed collects head-tracking information. In particular, at every animation frame, the proposed testbed is able to collect the points that delimit the FOV as well as its center point. This information, together with the time stamp is stored in a CSV file for each omnidirectional image.

## Content:

This code folder contains the following files:

(1) index.html -- Main file of the application.  
(2) panos.json -- Metadata that contains the attributions for each image. In particular: image title, author, source (linked to original Flickr page).  
(3) js  -- Folder containing Javascript code. main.js is the code created for the application, the other js files have been created by other authors (attributions have been kept on each file).  
(4) images -- Folder containg the images used in the application. We have considered XX indoor and outdoor omnidirectional images in equirectangular format with 6K x 3K resolution. We have used Y images downloaded from the social photography site Flickr, in particular from the Equirectangular [Flickr group](https://www.flickr.com/groups/equirectangular/). While collecting the images from Flickr, we have only considered images under the Creative Commons license.  
(5) StatsFiles -- Database as csv files. Each file specifies the ODI showing time 10000 (10s) or 20000 (20s).  
Each line shows:  counter -- imageName -- time stamp -- viewport center X -- viewport center Y

## Getting started

In order to see the application, we recommend Firefox Nightly builds as the browser. 
A demo for this testbed is available [online](https://www.scss.tcd.ie/~deabreua/visualAttentionVR/).
