# VisualTimeline

The basic idea of this package is to organize visual data on a timeline.
To this purpose the <a href = "https://github.com/almende/vis">vis timeline library</a> was used, as well as the <a href = "https://github.com/Phalanstere/ClusterPainter">cluster painter module</a> that dislays time clustered images.


<img src="http://burckhardt.ludicmedia.de/ClusterPainter/VisualTimebar2.png">

##Demo

You can find a demo <a href = "http://burckhardt.ludicmedia.de/visual_timeline/">here</a>


##Browser Integration

Download the *.zip file. 
Copy the the css and lib folder into your home directory.

Then create an index file. A minimal version looks like this.


```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>VisualTimeline</title>

    <link rel="stylesheet" href="css/clusterPainter.css">
    <link rel="stylesheet" href="css/visualTimeline.css">
    <link href="css/vis.min.css" rel="stylesheet" type="text/css" />
    
    <script src="lib/vis.min.js"></script> 
    <script src="lib/bundle.min.js"></script> 
    
	<div id="scenery"></div>	
	<div id = "timeline_trigger"></div>
	<div id="visualization"></div>

   
  </body>
</html>

```

This version does not allow any configuration of the \*.js object. However, it has the advantage that you are ready to use it without further ado.
The only thing you **have to do** is to copy all your images into an **images** folder and then write:

```html
node node_modules/cluster-painter/create_cluster.js
```

This demands that you have node.js installed.

If you want to improve the styling, you are free to do so.




##npm version


For simplicities sake - there are so many dependencies involved - the libary was conceived as an npm module that can be installed easily, via:

```html
	npm install visual-timeline
```
But soon there will be a conventional *.js libary added that works with a singe minified file.

However, to get a decent display, there are tow style sheet files to be added:

```html

    <link rel="stylesheet" href="node_modules/cluster-painter/css/clusterPainter.css">
    <link rel="stylesheet" href="node_modules/visual-timeline/css/visualTimeline.css">

```

In order to incorporate your images into the project, copy all your files in the **images** folder and run the following command:

```html
node node_modules/cluster-painter/create_cluster.js

``` 

To get the library running, create the following mininal framework

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>VisualTimeline</title>

    <link rel="stylesheet" href="node_modules/cluster-painter/css/clusterPainter.css">
    <link rel="stylesheet" href="node_modules/visual-timeline/css/visualTimeline.css">
    <link href="node_modules/vis/dist/vis.min.css" rel="stylesheet" type="text/css" />
    
    <script src="bundle.js"></script> 
    
	<div id="scenery"></div>	
	<div id = "timeline_trigger"></div>
	<div id="visualization"></div>

   
  </body>
</html>
```

Then add an index.js file and define your object:

 ```javascript
var vis   = require('./lib/vis.min.js');
var util            = require("util");
var $               = require('jquery');
var VisualTimebar   = require('./node_modules/visual-timeline/lib/VisualTimebar.js');
var ClusterPainter = require("cluster-painter");


$( document ).ready(function() {
    "use strict";
    var bar, params, cluster;

    cluster = new ClusterPainter({
                                       source: "cluster.json",  
                                       css_class: "standard",
                                       div: "scenery",
                                       type: "default"
                                       });


    params = {
        directories: ["images1"],
        clusterPainter: cluster
                 
        };

    bar = new VisualTimebar.Bar(params);


    });


```

This code snippet creates the cluster painter area and links the image clusters to the timeline.
Last thing you have to do is to browserify your project:


 ```html
browserify -t browserify-css index.js > bundle.js
```



Thast's it!

This README is a preliminary version that will be improved soon.

