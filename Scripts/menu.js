/**
* @Author: Justin Hershberger
* @Date:   24-03-2017
* @Filename: menu.js
* @Last modified by:   Justin Hershberger
* @Last modified time: 11-04-2017
*/


let Menu = (function() {
  let that = {};
  let x = 640;
  let y = 200;
  let th = Images.tile_height;
  let tw = Images.tile_width;
  let eh = Images.en_height;
  let ew = Images.en_width;

  let canvas = $('#menuCanvas')[0];
  let context = canvas.getContext('2d');

  let cont = $('.viewport');
  let cont_width = cont.width();

  //menu slime movement
  let slm_h = eh + 15;
  let slm_w = ew + 15;
  let slm_x = cont_width - slm_w;
  let slm_y = canvas.height - th - slm_h;
  let slm_dx = -3;
  let slm_alternate = 1;

  // menu fly movement
  let fly_x = cont_width + 600;
  let fly_dx = -2;
  let fly_y = 150 - eh;
  let fly_y_min = 0 + eh;
  let fly_y_max = 200;
  let fly_dy = 1;
  let fly_alternate = 1;

  //menu flag movement
  let flag_x = cont_width/6 * 4 + tw * 2;
  let flag_y = canvas.height/2 - th * 3;
  let flag_alternate = 1;

  //menu options
  let menu_count = 0;
  let arrow = new Image();
  let arrow_ready = false;

  arrow.onload = () => {
      arrow_ready = true;
  };

  arrow.src = 'Images/arrow.png';

  that.drawMenu = function() {
    if (bg_ready) {
      context.clearRect(0,0,canvas.width,canvas.height);
      context.drawImage(Images.bg,0,0,canvas.width, canvas.height);

      //draw a platform with the player on it
      context.drawImage(Images.grass_half_left, cont_width/6, canvas.height/2, tw, th);
      context.drawImage(Images.grass_half_mid, cont_width/6 + tw, canvas.height/2, tw, th);
      context.drawImage(Images.grass_half_right, cont_width/6 + tw * 2, canvas.height/2, tw, th);
      context.drawImage(Images.plr_front, cont_width/6 + tw, canvas.height/2 - th, tw, th);

      //draw a platform with a flag blowing in the wind
      context.drawImage(Images.grass_half_left, cont_width/6 * 4, canvas.height/2 - th * 2 , tw, th);
      context.drawImage(Images.grass_half_mid, cont_width/6 * 4 + tw, canvas.height/2 - th * 2, tw, th);
      context.drawImage(Images.grass_half_right, cont_width/6 * 4 + tw * 2, canvas.height/2 - th * 2, tw, th);

      //set up the flag animation
      switch(flag_alternate) {
        case 1:
          context.save();
          context.drawImage(Images.flag_red1, flag_x, flag_y, tw, th);
          context.restore();
          flag_alternate += 1;
          break;
        case 2:
          context.save();
          context.drawImage(Images.flag_red2, flag_x, flag_y, tw, th);
          context.restore();
          flag_alternate += 1;
          break;
        default:
          context.save();
          context.drawImage(Images.flag_red2, flag_x, flag_y, tw, th);
          context.restore();
          flag_alternate = 1;
          break;
      }

      //draw the ground as grass tiles
      for (let i=0; i < canvas.width; i+=tw) {
        context.drawImage(Images.grass_whole, i, canvas.height - th, tw, th);
      }

      //reset after the slime has been off screen for 2000 pixels
      if (slm_x + slm_dx < -2000) {
        slm_x = canvas.width - ew;
      }

      //reset after the fly has been off screen for 1000 pixels
      if (fly_x + fly_dx < -1000) {
        fly_x = canvas.width - ew;
      }

      //see if the fly is staying within the y bounds
      if (fly_y + fly_dy < fly_y_min || fly_y + fly_dy > fly_y_max) {
        fly_dy = -fly_dy;
      }


      //animate a slime enemy crawling  along the ground
      if (slm_alternate % 2 == 0) {
        context.save();
        context.drawImage(Images.slime_walk2, slm_x, slm_y, slm_w, slm_h);
        context.restore();

        slm_x += slm_dx; //pixels per second
        slm_alternate += 1;
      } else {
        context.save();
        context.drawImage(Images.slime_walk1, slm_x, slm_y, slm_w, slm_h);
        context.restore();

        slm_x += slm_dx; //pixels per second
        slm_alternate += 1;
      }

      //animate a fly enemy flying through the skies
      if (fly_alternate % 2 == 0) {
        context.save();
        context.drawImage(Images.fly_fly1, fly_x, fly_y , ew, eh);
        context.restore();

        fly_x += fly_dx; //pixels per second
        fly_y += fly_dy;
        fly_alternate += 0.5;
      } else {
        context.save();
        context.drawImage(Images.fly_fly2, fly_x, fly_y , ew, eh);
        context.restore();

        fly_x += fly_dx; //pixels per second
        fly_y += fly_dy;
        fly_alternate += 0.5;
      }


      //draw the menu options
      context.fillStyle = '#b3b3b3';
      context.textAlign = 'center';

      context.shadowColor = 'black';
      context.shadowBlur = 7;
      context.lineWidth = 5;

      context.font = '60px Calibri';
      context.strokeText('TBD', x, 100);
      context.fillText('TBD', x, 100);

      context.font = '30px Calibri';

      context.strokeText('Play', x, 200);
      context.fillText('Play', x, 200);

      context.strokeText('High Scores', x, 300);
      context.fillText('High Scores', x, 300);

      context.strokeText('Controls', x, 400);
      context.fillText('Controls', x, 400);

      context.font = '20px Calibri';

      context.strokeText('Press ENTER to select an option', x, 550);
      context.fillText('Press ENTER to select an option', x, 550);

      highlightOption(x,y);

      //switch back to the game's canvas
      canvas = $('#menuCanvas')[0];
      context = canvas.getContext('2d');
    } else {
      alert("bg.png not loaded properly");
    }
  }

  //this function displays which option the user is currently on
  function highlightOption(x,y) {
    switch (y) {
      case 200:
        context.save();
        context.drawImage(arrow, x-80, 140, 50, 100);
        context.restore();
        break;
      case 300:
        context.save();
        context.drawImage(arrow, x-120, 240, 50, 100);
        context.restore();
        break;
      case 400:

        context.save();
        context.drawImage(arrow, x-100, 340, 50, 100);
        context.restore();
        break;
      case 500:
        context.save();
        context.drawImage(arrow, x-80, 440, 50, 100);
        context.restore();
        break;

    }
  }

  that.selectOption = function() {
    switch (menu_count) {
      case 0: //play
        menu_count = 0;
        // num_play += 1;

        Game.menu_active = false;
        context.clearRect(0,0,canvas.width, canvas.height);
        // Game.map = Map.map();
        if (!Game.controls_active && !Game.high_scores_active){

          Game.game_active = true;
          $('#menuSprite').addClass('hidden');
          $('#controlsSprite').addClass('hidden');
        }
        Game.map.drawMap();
        $('.viewport').scrollLeft = 0;
        // console.log(Game.map);
        y = 200;
        // $('#gameCanvas').removeClass('hidden');
        // $('#blockCanvas').removeClass('hidden');

        break;
      case 1: //high_scores
        menu_count = 0;
        context.clearRect(0,0,canvas.width, canvas.height);
        HighScores.initialize();
        $('#menuSprite').addClass('hidden');
        // $('#controlsSprite').addClass('hidden');
        y = 200;
        break;
      case 2: //controls
        menu_count = 0;
        context.clearRect(0,0,canvas.width, canvas.height);
        $('#menuSprite').addClass('hidden');
        $('#controlsSprite').removeClass('hidden');
        // Controls.initialize();
        Game.controls_active = true;
        Game.menu_active = false;
        y = 200;
        break;
    }
  };

  //this is the down arrow highlight function, it will increment the options as
  //the user goes down the list
  that.dn_hlt = function() {
    //toggle the options arrow
    if (menu_count >= 2) {
      menu_count = 0;
    } else {
      menu_count += 1;
    }

    switch (menu_count) {
      case 0:
        highlightOption(x,200);
        y = 200;
        break;
      case 1:
        highlightOption(x,300);
        y = 300;
        break;
      case 2:
        highlightOption(x,400);
        y = 400;
        break;
    }


  };


  //This is the up highlight function, it will decrement as the user goes up
  that.up_hlt = function() {
    if (menu_count <= 0) {
      menu_count = 2;
    } else {
      menu_count -= 1;
    }

    switch (menu_count) {
      case 0:
        highlightOption(x,200);
        y = 200;
        break;
      case 1:
        highlightOption(x,300);
        y = 300;
        break;
      case 2:
        highlightOption(x,400);
        y = 400;
        break;
    }
  };

  return that;
}())
