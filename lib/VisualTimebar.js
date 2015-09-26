/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */
/*global $, jQuery, alert, console, TimelineMax, Sine, Bounce */
var util            = require("util");
var fs              = require("browserify-fs");
var $               = require('jquery');
// var vis             = require('../node_modules/vis/dist/vis.min.js');
// var vis             = require('vis');
require("gsap");
// var vis             = require('vis');  // das dauert endlos lange


var VT = {};



VT.Bar = function(params) {
    "use strict";
    var self = this;
    
    this.cluster = [];
    
    this.trigger_cluster = function() {
            
        var items = [], cluster = self.clusterPainter.cluster, i, c, container, name;
        
        for (var i = 0; i < cluster.length; i++) {
          name = "#" + cluster[i].list.length;  
            
          var c = {
                  id: i,
                  content: name,
                      start:   cluster[i].time  
                      };  
               items.push(c);       
                };
            
            var items = new vis.DataSet(items);
            var options = {};
   
            // Create a Timeline
        var container = document.getElementById('visualization');
        
        var options = {
            maxHeight: 128
          };

        var timeline = new vis.Timeline(container, items, options);    
        
        
        $("#timeline_trigger").mouseenter(function(){
            $("#visualization").animate({
                bottom: "0%"
                
                }, 300);
        });
        
        $("#timeline_trigger").mouseleave(function(event){
            var tp = $("#visualization").position();
            if (event.clientY < tp.top)
                {
                $("#visualization").animate({
                    bottom: "-20%"
                    
                    }, 100);
                 }

        });
        
        
      timeline.on('select', function (properties) {
            var a = properties.items[0];
            self.clusterPainter.paint(a);
        }); 

        
    };
    
    
    this.load_image_data = function() {
        $.getJSON("server/cluster.json", function(json){
            
            self.cluster    = json;
            var cluster         = json;
            var items = [];
            
            for (var i = 0; i < cluster.length; i++) {
              var c = {
                      id: i,
                      content: 'item ' + i,
                      start:   cluster[i].time  
                      };  
               items.push(c);       
                };
            
            var items = new vis.DataSet(items);
            var options = {};
   
            // Create a Timeline
            var container = document.getElementById('visualization');
            var timeline = new vis.Timeline(container, items, options);
             
            });
    };
    


    
    
    // 
    this.init = function init() {
        self.clusterPainter = params.clusterPainter;  
        setTimeout(self.trigger_cluster, 2000);
        
        // self.load_image_data();
    };
    
    
    self.init();    
};
 


module.exports = exports = VT;


