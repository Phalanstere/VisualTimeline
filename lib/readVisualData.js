/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */

var fs = require('fs'),
    Q = require('q'), 
    util = require('util'),
    ExifImage = require('exif').ExifImage;
    
    require('q-foreach')(Q);  // Extension für Q
    
    /////////// Image Object + helper
    Array.prototype.contains = function (elem) {
        "use strict";
        var q;
        for (q = 0; q < this.length; q++)
            {
            if (elem === this[q]) 
                {
                return true;
                }
            }
        
        return false;
    };
    
    function exif_to_timestamp(str)
        {
        "use strict";  
        var a = str.search(" "), sub1, sub2, date;
        sub1 = str.substr(0, a).replace(/:/g, "-");
        sub2 = str.substr(a+1, str.length);
        str = sub1 + "T" + sub2;
        return new Date(str).getTime();     
        }
    
    function exif_to_date(str)
        {
        "use strict";  
        var a = str.search(" "), sub1, sub2, date;
        sub1 = str.substr(0, a).replace(/:/g, "-");
        sub2 = str.substr(a+1, str.length);
        str = sub1 + "T" + sub2;
        return new Date(str);    
        }
    
    
    
    var ImageData = function(file, params) {
        "use strict";
        this.file = file;
        this.date = params.CreateDate;
        this.time = exif_to_timestamp(this.date);
        this.exif  = params;
    };



    ///////////////////////////////////
    var images = [];
    

    // liest die exif Daten des Bides ein
    function exif (file) {
    "use strict";    
    var deferred = Q.defer(), o = {};
    
    new ExifImage({ image : file }, function (error, data) {
      if (error) 
         {
         // callback.call("error " + file);
         deferred.reject("ERROR");     
         }
      if (data)
        {
        o.file = file;
        o.data = data;    
        deferred.resolve(o); 
        }
    });
    
    return deferred.promise;
    }
    

    function create_image(obj) {
     "use strict";
     var deferred = Q.defer(), img;
     img = new ImageData(obj.file, obj.data.exif);
     
     images.push(img);
     console.log( util.inspect(img) );  
     
     deferred.resolve();
     return deferred.promise;
    }
    

    
    // BEIM ERROR
    
    function next_image(data) {
       "use strict";
        console.log("IRRTUM - zum nächsten Bild " + data);   
    }

    // Hier der verkettete Aufruf FUNKTIONIERT    
    // var a = exif("images1/IMG_4358.jpg", next_image).then(create_image);


    // ARRAY VERSUCH


    function writeFile(callback) {
        var s = JSON.stringify(images);

        fs.writeFile('imageData.json', s, function (err) {
          if (err) return console.log(err);
          else
            { 
            console.log("ERFOLG");
            if (callback) callback.call(this, images);
            }
        });


    }

    var promises = [];
    
    function doSomething(el) {
        "use strict";
        promises.push( exif(el).then(create_image) );
    }
    

    
    // list.map( doSomething);

    function getImageData(array, callback)
    {
    array.map( doSomething);   
    // this is not fully satisfying - I collect the promises and then do the writeFile via timeout
    setTimeout(function(){
        "use strict";  
        Q.all(promises)
            .then(function (first) {
                writeFile();
            }, function (error) {
            // All of the promises were rejected.
        });

    },0);

    };



    getImageData(list);

   /////////////////////// OBSOLET //////////////////////////////


    function getImages(list, callback)
    {
        Q.forEach(list, function (el) {
          "use strict";   
          var defer = Q.defer();
          setTimeout(function () {
            doSomething(el);
            defer.resolve(el);
          }, 10);
    
          return defer.promise;
        }).then(function (resolutions)
        {
         "use strict";
         writeFile(callback);
         
        });
    }
    

    var list = ["images1/IMG_4358.jpg", "images1/IMG_4363.jpg", "images1/IMG_4370.jpg", "images1/IMG_4375.jpg" ];

    function test(images) {
        console.log("CALLBACK IMAGES " + images.length);
    }



    // getImages(list, test);

    module.exports = export = getImages;
