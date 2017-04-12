/**
* @Author: Justin Hershberger
* @Date:   24-03-2017
* @Filename: map.js
* @Last modified by:   Justin Hershberger
* @Last modified time: 03-04-2017
*/



let Map = (function() {
  let that = {};

  //tile widths and heights
  let th = Images.tile_height;
  let tw = Images.tile_width;
  let eh = Images.en_height;
  let ew = Images.en_width;

  //only horizontal scrolling for now
  let map_width = 16000; //tiles
  let map_height = 576;


  that.map_rows = map_height / th;
  that.map_cols = map_width / tw;
  let map = new Array(that.map_rows);

  //initialize a 2d array
  for(let i=0; i < that.map_rows; i++ ) {
    map[i] = new Array(that.map_cols);
  }

  //the end tile
  let end_x = 10000 - tw;
  let end_y = 576 - th * 2;

  function createMap() {
    //randomly determine the number of platforms in the map
    let num_low_plat = Math.floor(Math.random() * 20) + 10;
    let num_high_plat = Math.floor(Math.random() * num_low_plat - 2) + 5;

    //randomly draw platforms throughout the map
    for (let i=0; i < num_low_plat; i++) {

      //randomize an x coordinate for each platform
      let plat_x = Math.floor(Math.random() * that.map_cols) + 1;

      //randomize a y coordinate for each platform
      let plat_height = Math.floor(Math.random() * 2) + 3;

      //randomize x,y for higher platforms
      let high_plat_x = plat_x + Math.floor(Math.random() * 3) + 3;
      let high_plat_height = Math.floor(Math.random() * 2) + 5;

      if(!map[that.map_rows - plat_height][plat_x - 1] && !map[that.map_rows - plat_height][plat_x + 3] && !map[that.map_rows - plat_height + 1][plat_x + 3] && !map[that.map_rows - plat_height + 1][plat_x - 1] && !map[that.map_rows - plat_height - 1][plat_x + 3] && !map[that.map_rows - plat_height - 1][plat_x - 1]) {
        map[that.map_rows - plat_height][plat_x] = 'hlgrass';
        map[that.map_rows - plat_height][plat_x + 1] = 'hmgrass';
        map[that.map_rows - plat_height][plat_x + 2] = 'hrgrass';

        if (i <= num_high_plat) {

          map[that.map_rows - high_plat_height][high_plat_x] = 'hlgrass';
          map[that.map_rows - high_plat_height][high_plat_x + 1] = 'hmgrass';
          map[that.map_rows - high_plat_height][high_plat_x + 2] = 'hrgrass';
        }
      }
    }


    //this will make the floor all grass
    for (let i=0; i < that.map_cols; i++) {
      map[that.map_rows-1][i] = "grass";
    }

  }

  that.initialize = function() {
    // for (let r=0; r < that.map_rows; r++) {
    //   for(let c=0; c < that.map_cols; c++) {
    //     map[r][c] = "none";
    //   }
    // }
    createMap();

  };

  that.map = function() {
    return map;
  }

  return that;
}());
