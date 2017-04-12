/**
* @Author: Justin Hershberger
* @Date:   24-03-2017
* @Filename: main.js
* @Last modified by:   Justin Hershberger
* @Last modified time: 12-04-2017
*/


let Game = (function() {
  let that = {};
  let inputDispatch = {};
  let previousTime = performance.now();
  let elapsedTime = 0;
  let canvas = $('#gameCanvas')[0];
  let context = canvas.getContext('2d');
  that.menu_active = false;
  that.controls_active = false;
  that.high_scores_active = false;
  that.game_active = false;
  that.plr = null;
  that.map = null;
  that.camera = null;
  that.on_platform =false;

  function update(elapsedTime) {
    if (that.camera){

      that.camera.update();
    }

    that.plr.velocity_y += that.plr.gravity;
    that.plr.pos.y += that.plr.velocity_y;

    if (that.plr.pos.y >= canvas.height - 128 && that.on_platform == false) {
      that.plr.on_ground = true;
      that.plr.velocity_y = 0.0;
      that.plr.pos.y = canvas.height - 128;
    }
  }

  function render(elapsedTime) {
    if (that.menu_active) {
      $('#controlsSprite').addClass('hidden');
      Menu.drawMenu();
    }

    if (that.controls_active) {

      Controls.drawControls();
      // inputDispatch[13] = Controls.selectOption();
      if (Controls.enter_active) {
        Controls.selectOption();
      }
    }

    if (that.high_scores_active) {

      HighScores.drawHighScores();
    }

    if (that.game_active && !that.menu_active && that.camera) {
      context.clearRect(0,0,canvas.width, canvas.height);
      that.map.drawMap(that.camera.xView, that.camera.yView);
      that.plr.drawPlayer(that.camera.xView, that.camera.yView);

      //on down arrow
      inputDispatch[40] = 0;

      //on up arrow
      // inputDispatch[38] = 0;

      //on enter
      inputDispatch[13] = 0;

    }

  }

  function gameLoop(time) {
    elapsedTime = time - previousTime;

    previousTime = time;

    update(elapsedTime);
    render(elapsedTime);

    requestAnimationFrame(gameLoop);
  }

  function keyDown(e) {
    if (inputDispatch.hasOwnProperty(e.keyCode)) {
        inputDispatch[e.keyCode](elapsedTime);
    }
  }

  that.initialize = function() {
    window.addEventListener('keydown', keyDown, true);

    that.plr = Graphics.player();
    that.map = Graphics.map();
    that.camera = Graphics.camera(0,0, canvas.width, canvas.height, 100048, canvas.height);
    // console.log(that.plr.pos.x);

    let esc = function() {
      //on down arrow
      inputDispatch[40] = Menu.dn_hlt;

      //on up arrow
      inputDispatch[38] = Menu.up_hlt;

      //on enter
      inputDispatch[13] = Menu.selectOption;

      that.menu_active = true;
      that.controls_active = false;
      that.high_scores_active = false;
      Controls.enter_active = 0;

    }
    esc();

    inputDispatch[27] = esc;



    // that.map.drawMap();

    // Map.initialize();
    requestAnimationFrame(gameLoop);
  }

  return that;
}())
