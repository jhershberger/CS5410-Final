/**
* @Author: Justin Hershberger
* @Date:   24-03-2017
* @Filename: render.js
* @Last modified by:   Justin Hershberger
* @Last modified time: 12-04-2017
*/



let Graphics = (function(){
  let that = {};
  let canvas = $('#gameCanvas')[0];
  let context = canvas.getContext('2d');
  let cont = $('.viewport');
  that.initial_cont_width = cont.width();
  that.cont_width = $('.viewport').width();
  let tw = Images.tile_width;
  let th = Images.tile_height;
  let ew = Images.en_width;
  let eh = Images.en_height;
  let pad_x = 500;
  that.map_width = 16000;
  that.map_height = canvas.height;
  that.xView = 0;
  let map = Map.map();

  that.rectangle = function(left, top, width, height) {
    let that = {};
    that.left = left;
    that.top = top;
    that.width = width;
    that.height = height;

    that.right = that.left + that.width;
    that.bottom = that.top + that.height;

    that.set = function(left, top) {
      that.left = left;
      that.top = top;
      that.right = that.left + that.width;
      that.bottom = that.top + that.height;
      // return that;
    }

    that.within = function(rect) {
      if (rect.left <= that.left && rect.right >= that.right && rect.top <= that.top && rect.bottom >= that.bottom){
        return true;
      } else {
        return false;
      }
    }

    return that;
  };


  that.camera = function(xView, yView, canvas_width, canvas_height, tot_width, tot_height) {
    let that = {};

    //the xView and yView are the position of the camera
    that.xView = xView;
    that.yView = yView;

    //the padding is how close the player can get to the width to start scrolling
    that.xPad = pad_x;

    that.wView = canvas_width;
    that.hView = canvas_height;

    //the track is the focus of the camera, our player
    that.track = Game.plr;

    that.viewport = Graphics.rectangle(that.xView, that.yView, that.wView, that.hView);
    that.mapRect = Graphics.rectangle(0, 0, tot_width, tot_height);

    that.update = function(){
      if(Game.plr.pos.x - that.xView + that.xPad > that.wView) {
        //update the xView by scrolling
        that.xView = Game.plr.pos.x - (that.wView - that.xPad);
      } else if (Game.plr.pos.x - that.xPad < that.xView) {
        that.xView = Game.plr.pos.x - that.xPad;
      }

      //update the viewport
      that.viewport = Graphics.rectangle(that.xView, that.yView, canvas.width, canvas.height);

      //check to make sure the camera only shows views within the map
      if (!that.viewport.within(that.mapRect)) {
        if(that.viewport.left < that.mapRect.left){

          that.xView = that.mapRect.left;
        }
				if(that.viewport.top < that.mapRect.top) {

          that.yView = that.mapRect.top;
        }
				if(that.viewport.right > that.mapRect.right) {

          that.xView = that.mapRect.right - canvas.width;
        }
				if(that.viewport.bottom > that.mapRect.bottom){

          that.yView = that.mapRect.bottom - that.hView;
        }
      }

    }

    return that;
  }

  /* ####################################################
            Player rendering
  #################################################### */
  that.player = function() {
    let that = {};
    let speed = 5;
    let friction = 0.98;
    that.pos = {x: tw, y: canvas.height-th*2};
    let keyLeft = false;
    let keyRight = false;
    let keyUp = false;
    let walk_count = 0;
    let scroll_count = 1;

    //jump animation
    let max_jump = 20; //pixels
    let jump_dy = 2; //pixels per second;
    let jump_y = that.pos.y;
    let jump_desc = false;
    that.on_ground = true;
    that.gravity = 0.5;
    that.velocity_y = 0.0;

    //set up an array of player images to animate their movement
    let plr_animations = [];

    //push all of the animation for walking on the plr_animations array
    plr_animations.push(Images.plr_walk1);
    plr_animations.push(Images.plr_walk2);
    plr_animations.push(Images.plr_walk3);
    plr_animations.push(Images.plr_walk4);
    plr_animations.push(Images.plr_walk5);
    plr_animations.push(Images.plr_walk6);
    plr_animations.push(Images.plr_walk7);
    plr_animations.push(Images.plr_walk8);
    plr_animations.push(Images.plr_walk9);
    plr_animations.push(Images.plr_walk10);
    plr_animations.push(Images.plr_walk11);


    //add the player's event listener
    $(document).keydown(function(e) {
      if (e.keyCode == Controls.left) {
        keyLeft = true;
      } else if (e.keyCode == Controls.right) {
        keyRight = true;
      } else if (e.keyCode == Controls.jump) { // up arrow
        keyUp = true;
      }

    }).keyup(function(e) {
      if (e.keyCode == Controls.left) { //left arrow
        keyLeft = false;
        walk_count = 0;
      } else if (e.keyCode == Controls.right) { //right arrow
        keyRight = false;
        walk_count = 0;
      } else if (e.keyCode == Controls.jump) { // up arrow
        keyUp = false;
      }
    })

    that.drawPlayer = function(xView, yView) {
      context.save();
      context.clearRect(xView,yView,canvas.width,canvas.height);

      if(keyLeft) {
        that.moveLeft();
        if (walk_count + 1 > 10) {
          walk_count = 0;
        } else {

          walk_count += 1;
        }
      }

      if(keyRight) {
        that.moveRight();
        if (walk_count + 1 > 10) {
          walk_count = 0;
        } else {

          walk_count += 1;
        }
      }

      //see if the user is jumping on any platforms
      Game.on_platform = false;
      that.detectPlatform();

      //see if the user pressed up to jump
      if(keyUp) {
        that.jump();
      } else {
        if (that.velocity_y < -6.0) {
          that.velocity_y = -6.0;
        }
      }

      context.drawImage(plr_animations[walk_count], that.pos.x - xView, that.pos.y - yView, tw, th);
      context.restore();
    };

    that.moveLeft = function(elapsedTime) {
      if (that.pos.x - (speed * friction) >= 0) {

        that.pos.x -= (speed * friction);
      } else {
        that.pos.x = 0;
      }
    };

    that.moveRight = function(elapsedTime) {
      if (that.pos.x + (speed * friction) >= Graphics.map_width - tw) {
        that.pos.x = Graphics.map_width - tw;
      } else {
        that.pos.x += (speed * friction);
      }

    };

    that.jump = function() {
      if (that.on_ground || Game.on_platform) {

        that.velocity_y = -15;
        Game.on_platform = false;
        that.on_ground = false;
      }
    };

    that.detectPlatform = function(){
      for (let i=0; i < Map.map_rows; i++){
        for (let j=0; j < Map.map_cols; j++){
          if (map[i][j] == 'hlgrass' && Game.on_platform == false) {
            if(that.pos.x > j*64 - 30 && that.pos.x < (j*64 + (3*64) - 20)&& that.pos.y > i*64 - 64 && that.pos.y < i*64 - 50) {
              Game.on_platform = true;
              that.on_ground = true;
              that.velocity_y = 0.0;
              that.gravity = 0.0;

              //place the player on the platform
              that.pos.y = i*64 - 64;
            } else {
              Game.on_platform = false;
              that.gravity = 0.5;
            }
          }
        }
      }

    };

    return that;
  }


  /* ####################################################
            Map rendering
  #################################################### */
  that.map = function() {
    let that = {};
    Map.initialize();


    //this will create the overall map and draw it to a new canvas of the map's size
    let temp_context = document.createElement('canvas').getContext('2d');
		temp_context.canvas.width = 16000; //pixels
		temp_context.canvas.height = 576; //pixels

	  temp_context.save();

    //draw the background
    temp_context.drawImage(Images.bg, 0,0, temp_context.canvas.width, temp_context.canvas.height);

    //draw the grass floor
    for(let i=0; i < Map.map_rows; i++ ){
      for (let j=0; j < Map.map_cols; j++){
        if (map[i][j] == "grass"){
          temp_context.drawImage(Images.grass_whole, j * 64, i*64 , tw, th);
        }
        if (map[i][j] == 'hlgrass') {
          temp_context.drawImage(Images.grass_half_left, j*64, i*64, tw, th);
        }
        if (map[i][j] == 'hmgrass') {
          temp_context.drawImage(Images.grass_half_mid, j*64, i*64, tw, th);
        }
        if (map[i][j] == 'hrgrass') {
          temp_context.drawImage(Images.grass_half_right, j*64, i*64, tw, th);
        }
      }
    }


		temp_context.restore();

		// store the map as an image
		that.map_view = new Image();
    that.map_view.setAttribute('crossOrigin', 'anonymous');
		that.map_view.src = temp_context.canvas.toDataURL("image/png");

		// clear context
		temp_context = null;

    that.drawMap = function(xView, yView) {
      canvas = $('#mapCanvas')[0];
      context = canvas.getContext('2d');

      //this is the x,y within the overall image that I'm showing in the canvas
      let viewport_x = xView;
      let viewport_y = yView;

      let viewport_width = canvas.width;
      let viewport_height = canvas.height;

      // if viewportped image is smaller than canvas we need to change the source dimensions
			if(that.map_view.width - viewport_x < viewport_width){
				viewport_width = that.map_view.width - viewport_x;
			}
			if(that.map_view.height - viewport_y < viewport_height){
				viewport_height = that.map_view.height - viewport_y;
			}

			// location on canvas to draw the viewport image
			dx = 0;
			dy = 0;

			// match destination with source to not scale the image
			dWidth = viewport_width;
			dHeight = viewport_height;

			context.drawImage(that.map_view, viewport_x, viewport_y, viewport_width, viewport_height, dx, dy, dWidth, dHeight);

      canvas = $('#gameCanvas')[0];
      context = canvas.getContext('2d');
    };

    return that;
  };

  return that;
}());
