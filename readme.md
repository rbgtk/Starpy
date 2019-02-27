# Starpy

Something I put together for fun with a little demo ;-)

## Requirements

The Stars.py script requires you to install both PIL and Numpy. You can install them with the following commands:

`pip install Pillow`
`pip install numpy`

## Introduction

The python script will take an image and find the pixels that are brighter than a certain threshold.
Depending on the picture provided, you will most likely have clusters of pixels per star in the image.
Therefor, the script will also calculate the average centers for each of these clusters.
This result gets outputted to a json file that can then be used by wallpaper.js to animate the background. 

In the init function of Wallpaper, the javascript will asynchronously get the JSON file for the coordinates you generated earlier.
It will then start to build up the connections that will be drawn around the mouse on the canvas.

## How to use

Much still needs more documentation, but this is the rough idea:

1. Take an image, such as the one provided in **/demo/images/background.png**
2. Open it in an editor, my suggestion would be GIMP since it's free and open source software (go FOSS!)
3. Create an overlay for it, covering the parts that don't have stars in (see **/demo/images/background-overlay.png**)
4. Run `python stars.py demo/images/background-overlay.png`
5. You get a result, move it to your webfolder like, for example, **demo/json/background-0.7.json**
6. Adjust the parameter in wallpaper.js to the name of the json file (minus the extension)
7. Refresh your browser and watch some constellations appear

Note that the stars.py script can be adjust to your liking, if you want higher or lower thresholds.
This can be parameterized later, but I haven't gotten around to it yet since I'm just undusting this little project for demonstration.

Enjoy playing, feel free to share!
