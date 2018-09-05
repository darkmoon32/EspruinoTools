/**
 Copyright 2014 Gordon Williams (gw@pur3.co.uk)

 This Source Code is subject to the terms of the Mozilla Public
 License, v2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
 
 ------------------------------------------------------------------
  Handle loading of Board's JSON files (containing things like binary URLs)
 ------------------------------------------------------------------
**/
"use strict";
(function(){
  
  function init() {
    Espruino.Core.Config.add("BOARD_JSON_URL", {
      section : "Board",
      name : "Board JSON URL",
      description : "Where to search online for board JSON files - these contain links to up to date firmware as well as detailed information about the board's hardware",
      type : "string",
      defaultValue : "https://raw.githubusercontent.com/darkmoon32/espruino-description-files/master/"
    });
    
    
    Espruino.addProcessor("environmentVar", function(env, callback) {
      if (env!==undefined && env.BOARD!==undefined) {
        var jsonPath = env.JSON_URL || Espruino.Config.BOARD_JSON_URL+"/"+env.BOARD+".json";
        console.log("Loading "+jsonPath);
        Espruino.Core.Utils.getJSONURL(jsonPath, function(data){
          console.log("Board JSON loaded");
          for (var key in data)
            env[key] = data[key];
          Espruino.callProcessor("boardJSONLoaded", env, callback);          
        });
      } else
        callback(env);
    }); 
  }
  
  Espruino.Plugins.BoardJSON = {
    init : init,
  };
}());
