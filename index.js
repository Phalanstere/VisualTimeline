var util            = require("util");
var $               = require('jquery');
var VisualTimebar   = require('./lib/VisualTimebar.js');
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
    
    // now the cluster painter is produced
    


    });