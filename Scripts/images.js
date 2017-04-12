/**
* @Author: Justin Hershberger
* @Date:   25-03-2017
* @Filename: images.js
* @Last modified by:   Justin Hershberger
* @Last modified time: 26-03-2017
*/



let Images = (function () {
  let that = {};
  that.tile_width = 64;
  that.tile_height = 64;
  that.plr_height = 64;
  that.plr_width = 64;
  that.en_width = 32;
  that.en_height = 32;

/* #############################################################
        main background image
############################################################# */
  that.bg = new Image();
  that.bg_ready = false;

  that.bg.onload = () => {
      bg_ready = true;
      // console.log('hello');
  };

  that.bg.src = "Images/background/bg.png";

  /* #############################################################
          grass tiles
  ############################################################# */
  that.grass_left = new Image();
  that.gl_ready = false;

  that.grass_left.onload = () => {
    gl_ready = true;
  };

  that.grass_left.src = "Images/tiles/grassLeft.png";

  that.grass_mid = new Image();
  that.gm_ready = false;

  that.grass_mid.onload = () => {
    gm_ready = true;
  };

  that.grass_mid.src = "Images/tiles/grassMid.png";

  that.grass_right = new Image();
  that.gr_ready = false;

  that.grass_right.onload = () => {
    gr_ready = true;
  };

  that.grass_right.src = "Images/tiles/grassRight.png";

  that.grass_whole = new Image();
  that.gw_ready = false;

  that.grass_whole.onload = () => {
    gw_ready = true;
  };

  that.grass_whole.src = "Images/tiles/grass.png";

  /* #############################################################
          half grass tiles
  ############################################################# */
  that.grass_half_left = new Image();
  that.ghl_ready = false;

  that.grass_half_left.onload = () => {
    ghl_ready = true;
  };

  that.grass_half_left.src = "Images/tiles/grassHalfLeft.png";

  that.grass_half_mid = new Image();
  that.ghm_ready = false;

  that.grass_half_mid.onload = () => {
    ghm_ready = true;
  };

  that.grass_half_mid.src = "Images/tiles/grassHalfMid.png";

  that.grass_half_right = new Image();
  that.ghr_ready = false;

  that.grass_half_right.onload = () => {
    ghr_ready = true;
  };

  that.grass_half_right.src = "Images/tiles/grassHalfRight.png";


  /* #############################################################
          player tiles
  ############################################################# */
  that.plr_front = new Image();
  that.plrf_ready = false;

  that.plr_front.onload = () => {
    plrf_ready = true;
  };

  that.plr_front.src = "Images/player/p1_front.png";

  //player walking animation
  that.plr_walk1 = new Image();
  that.plrw1_ready = false;

  that.plr_walk1.onload = () => {
    plrw1_ready = true;
  };

  that.plr_walk1.src = "Images/player/p1_walk01.png";

  that.plr_walk2 = new Image();
  that.plrw2_ready = false;

  that.plr_walk2.onload = () => {
    plrw2_ready = true;
  };

  that.plr_walk2.src = "Images/player/p1_walk02.png";

  that.plr_walk3 = new Image();
  that.plrw3_ready = false;

  that.plr_walk3.onload = () => {
    plrw3_ready = true;
  };

  that.plr_walk3.src = "Images/player/p1_walk03.png";

  that.plr_walk4 = new Image();
  that.plrw4_ready = false;

  that.plr_walk4.onload = () => {
    plrw4_ready = true;
  };

  that.plr_walk4.src = "Images/player/p1_walk04.png";

  that.plr_walk5 = new Image();
  that.plrw5_ready = false;

  that.plr_walk5.onload = () => {
    plrw5_ready = true;
  };

  that.plr_walk5.src = "Images/player/p1_walk05.png";

  that.plr_walk6 = new Image();
  that.plrw6_ready = false;

  that.plr_walk6.onload = () => {
    plrw6_ready = true;
  };

  that.plr_walk6.src = "Images/player/p1_walk06.png";

  that.plr_walk7 = new Image();
  that.plrw7_ready = false;

  that.plr_walk7.onload = () => {
    plrw7_ready = true;
  };

  that.plr_walk7.src = "Images/player/p1_walk07.png";

  that.plr_walk8 = new Image();
  that.plrw8_ready = false;

  that.plr_walk8.onload = () => {
    plrw8_ready = true;
  };

  that.plr_walk8.src = "Images/player/p1_walk08.png";

  that.plr_walk9 = new Image();
  that.plrw9_ready = false;

  that.plr_walk9.onload = () => {
    plrw9_ready = true;
  };

  that.plr_walk9.src = "Images/player/p1_walk09.png";

  that.plr_walk10 = new Image();
  that.plrw10_ready = false;

  that.plr_walk10.onload = () => {
    plrw10_ready = true;
  };

  that.plr_walk10.src = "Images/player/p1_walk10.png";

  that.plr_walk11 = new Image();
  that.plrw11_ready = false;

  that.plr_walk11.onload = () => {
    plrw11_ready = true;
  };

  that.plr_walk11.src = "Images/player/p1_walk11.png";


  /* #############################################################
         box tiles
  ############################################################# */



  /* #############################################################
         enemy tiles
  ############################################################# */

  //slime
  that.slime_walk1 = new Image();
  that.slw1_ready = false;

  that.slime_walk1.onload = () => {
    slw1_ready = true;
  };

  that.slime_walk1.src = "Images/enemies/slimeWalk1.png";

  that.slime_walk2 = new Image();
  that.slw2_ready = false;

  that.slime_walk2.onload = () => {
    slw2_ready = true;
  };

  that.slime_walk2.src = "Images/enemies/slimeWalk2.png";

  //fly
  that.fly_fly1 = new Image();
  that.fly1_ready = false;

  that.fly_fly1.onload = () => {
    fly1_ready = true;
  };

  that.fly_fly1.src = "Images/enemies/flyFly1.png";

  that.fly_fly2 = new Image();
  that.fly2_ready = false;

  that.fly_fly2.onload = () => {
    fly2_ready = true;
  };

  that.fly_fly2.src = "Images/enemies/flyFly2.png";

  /* #############################################################
         flag tiles
  ############################################################# */
  that.flag_red1 = new Image();
  that.flg_r1 = false;

  that.flag_red1.onload = () => {
    that.flg_r1 = true;
  }

  that.flag_red1.src = "Images/flags/flagRed.png";

  that.flag_red2 = new Image();
  that.flg_r2 = false;

  that.flag_red2.onload = () => {
    that.flg_r2 = true;
  }

  that.flag_red2.src = "Images/flags/flagRed2.png";

  that.flag_red_hanging = new Image();
  that.flg_rh = false;

  that.flag_red_hanging.onload = () => {
    that.flg_rh = true;
  }

  that.flag_red_hanging.src = "Images/flags/flagRedHanging.png";

  return that;
}())
