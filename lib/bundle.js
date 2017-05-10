/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasePiece = function () {
  function BasePiece(grid) {
    _classCallCheck(this, BasePiece);

    this.startPos = [-1, 4];
    this.grid = grid;
    this.blocks = [];
    this.finalMove = false;
    this.gameOver = false;
    this.allPositions = this.getPositions(this.startPos);
    this.rotation = 0;
    this.drawCondition = this.drawCondition.bind(this);
    this.drawConditionDown = this.drawConditionDown.bind(this);
  }

  _createClass(BasePiece, [{
    key: 'draw',
    value: function draw() {
      for (var i = 0; i < this.allPositions.length; i++) {
        var pos = this.allPositions[i];
        var posX = BOARD_X + pos[1] * BLOCK_WIDTH;
        var posY = BOARD_Y + pos[0] * BLOCK_WIDTH;
        this.blocks[i] = (0, _util.drawBlock)(posX, posY, this.letter);
      }
    }
  }, {
    key: 'drawSide',
    value: function drawSide(circleNum) {
      for (var i = 0; i < this.allPositions.length; i++) {
        var pos = this.allPositions[i];
        var posX = this.sideX + pos[1] * BLOCK_WIDTH;
        var posY = this.sideY + this.sideDelta * circleNum + pos[0] * BLOCK_WIDTH;
        this.blocks[i] = (0, _util.drawBlock)(posX, posY, this.letter);
      }
    }
  }, {
    key: 'moveToCircle',
    value: function moveToCircle(circleNum) {
      for (var i = 0; i < this.allPositions.length; i++) {
        var pos = this.allPositions[i];
        this.blocks[i].x = this.sideX + pos[1] * BLOCK_WIDTH;
        this.blocks[i].y = this.sideY + this.sideDelta * circleNum + pos[0] * BLOCK_WIDTH;
      }
      stage.update();
    }
  }, {
    key: 'moveSideToTop',
    value: function moveSideToTop() {
      for (var i = 0; i < this.allPositions.length; i++) {
        var pos = this.allPositions[i];
        this.blocks[i].x = BOARD_X + pos[1] * BLOCK_WIDTH;
        this.blocks[i].y = BOARD_Y + pos[0] * BLOCK_WIDTH;
      }
      stage.update();
    }
  }, {
    key: 'move',
    value: function move(direction) {
      switch (direction) {
        case 'ArrowDown':
          this.generalMove(0, 1, [0, 1], this.drawConditionDown);
          return;
        case 'ArrowRight':
          this.generalMove(1, 1, [1, 0], this.drawCondition);
          return;
        case 'ArrowLeft':
          this.generalMove(1, -1, [-1, 0], this.drawCondition);
          return;
        case 'ArrowUp':
          this.rotate();
          return;
        case 'Space':
          this.slam();
          return;
        default:
          return;
      }
    }
  }, {
    key: 'slam',
    value: function slam() {
      while (!this.finalMove) {
        this.move('ArrowDown');
      }
    }
  }, {
    key: 'generalMove',
    value: function generalMove(index, posDelta, blocksDelta, conditionMethod) {
      var previousPositions = (0, _util.copyArr)(this.allPositions);

      for (var i = 0; i < this.allPositions.length; i++) {
        this.allPositions[i][index] += posDelta;
      }

      if (conditionMethod(previousPositions)) {
        return;
      }

      this.updateBlocks(blocksDelta);
    }
  }, {
    key: 'drawCondition',
    value: function drawCondition(previousPositions) {
      if (this.outOfBounds()) {
        this.allPositions = previousPositions;
        return true;
      }

      return false;
    }
  }, {
    key: 'drawConditionDown',
    value: function drawConditionDown(previousPositions) {
      if (this.tooClose()) {
        this.allPositions = previousPositions;
        document.removeEventListener('keydown', handleKeydown);
        this.setPositionsOnGrid();
        this.finalizeBlocks();
        this.finalMove = true;
        return true;
      } else if (this.outOfBounds()) {
        this.allPositions = previousPositions;
        return true;
      }
    }
  }, {
    key: 'outOfBounds',
    value: function outOfBounds() {
      for (var i = 0; i < this.allPositions.length; i++) {
        var row = this.allPositions[i][0];
        var col = this.allPositions[i][1];
        if ((0, _util.outsideGrid)(row, col)) {
          return true;
        }
        if (this.onTopOfBlock(row, col)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'tooClose',
    value: function tooClose() {
      for (var i = 0; i < this.allPositions.length; i++) {
        var row = this.allPositions[i][0];
        var col = this.allPositions[i][1];
        if (row < 0) {
          continue;
        } else if (row >= 20 || this.grid[row][col]) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'onTopOfBlock',
    value: function onTopOfBlock(row, col) {
      if (this.grid[row] && this.grid[row][col]) {
        return true;
      }
    }
  }, {
    key: 'updateBlocks',
    value: function updateBlocks(delta) {
      for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].x += BLOCK_WIDTH * delta[0];
        this.blocks[i].y += BLOCK_HEIGHT * delta[1];
      }
      stage.update();
    }
  }, {
    key: 'finalizeBlocks',
    value: function finalizeBlocks() {
      for (var i = 0; i < this.allPositions.length; i++) {
        var pos = this.allPositions[i];
        var posX = BOARD_X + pos[1] * BLOCK_WIDTH;
        var posY = BOARD_Y + pos[0] * BLOCK_HEIGHT;
        this.blocks[i].x = posX;
        this.blocks[i].y = posY;
      }
    }
  }, {
    key: 'setPositionsOnGrid',
    value: function setPositionsOnGrid() {
      for (var i = 0; i < this.allPositions.length; i++) {
        var row = this.allPositions[i][0];
        var col = this.allPositions[i][1];
        if (!this.grid[row]) {
          this.gameOver = true;
          return;
        }
        this.grid[row][col] = this.blocks[i];
      }
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      var previousPositions = (0, _util.copyArr)(this.allPositions);
      var deltas = this.getDeltas();

      this.updateAllPositions(deltas);

      if (this.drawCondition(previousPositions)) {
        return;
      }

      this.rotation = (this.rotation + 90) % 360;
      this.updateRotationBlocks(deltas);
    }
  }, {
    key: 'updateAllPositions',
    value: function updateAllPositions(deltas) {
      for (var i = 0; i < this.allPositions.length; i++) {
        this.allPositions[i][0] += deltas[i][1];
        this.allPositions[i][1] += deltas[i][0];
      }
    }
  }, {
    key: 'updateRotationBlocks',
    value: function updateRotationBlocks(deltas) {
      for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].x += BLOCK_WIDTH * deltas[i][0];
        this.blocks[i].y += BLOCK_HEIGHT * deltas[i][1];
      }

      stage.update();
    }
  }]);

  return BasePiece;
}();

exports.default = BasePiece;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIRECTIONS = exports.GAMEOVER = exports.UNINITIALIZED = exports.PAUSED = exports.RUNNING = undefined;
exports.copyArr = copyArr;
exports.outsideGrid = outsideGrid;
exports.drawBlock = drawBlock;
exports.createPiece = createPiece;

var _i_piece = __webpack_require__(4);

var _i_piece2 = _interopRequireDefault(_i_piece);

var _l_piece = __webpack_require__(6);

var _l_piece2 = _interopRequireDefault(_l_piece);

var _j_piece = __webpack_require__(5);

var _j_piece2 = _interopRequireDefault(_j_piece);

var _o_piece = __webpack_require__(7);

var _o_piece2 = _interopRequireDefault(_o_piece);

var _s_piece = __webpack_require__(8);

var _s_piece2 = _interopRequireDefault(_s_piece);

var _z_piece = __webpack_require__(10);

var _z_piece2 = _interopRequireDefault(_z_piece);

var _t_piece = __webpack_require__(9);

var _t_piece2 = _interopRequireDefault(_t_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RUNNING = exports.RUNNING = 'RUNNING';
var PAUSED = exports.PAUSED = 'PAUSED';
var UNINITIALIZED = exports.UNINITIALIZED = 'UNINITIALIZED';
var GAMEOVER = exports.GAMEOVER = 'GAMEOVER';

function copyArr(positions) {
  var newArr = [];

  for (var i = 0; i < positions.length; i++) {
    newArr[i] = positions[i].slice();
  }

  return newArr;
}

function outsideGrid(row, col) {
  if (row > 19 || col < 0 || col > 9) {
    return true;
  }
  return false;
}

function drawBlock(posX, posY, letter) {
  var block = new createjs.Bitmap('./images/' + letter + '_block.png');

  block.graphics = {};
  block.graphics.clear = function () {
    block.visible = false;
  };

  block.image.onload = function () {
    block.x = posX;
    block.y = posY;

    stage.addChild(block);
    stage.update();
  };

  return block;
}

var PIECES = ['L', 'I', 'J', 'O', 'S', 'Z', 'T'];
var DIRECTIONS = exports.DIRECTIONS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'];

function getRandomType() {
  var index = Math.floor(Math.random() * 7);
  return PIECES[index];
}

function createPiece(grid, type) {
  if (!type) {
    type = getRandomType();
  }
  // type = 'I';

  switch (type) {
    case 'I':
      return new _i_piece2.default(grid);
    case 'L':
      return new _l_piece2.default(grid);
    case 'J':
      return new _j_piece2.default(grid);
    case 'O':
      return new _o_piece2.default(grid);
    case 'S':
      return new _s_piece2.default(grid);
    case 'Z':
      return new _z_piece2.default(grid);
    case 'T':
      return new _t_piece2.default(grid);
    default:
      return;
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(3);

var _board2 = _interopRequireDefault(_board);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.board = new _board2.default();
    this.startScreen = document.querySelector('.start');
    this.pauseScreen = document.querySelector('.pause');
    this.startInterval = null;
    this.music = document.getElementsByTagName('audio')[0];

    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  _createClass(Game, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var bg = new Image();
      bg.src = './images/background.jpg';
      bg.onload = function () {
        var backgroundRect = new createjs.Shape();
        backgroundRect.graphics.beginBitmapFill(bg).drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        stage.addChild(backgroundRect);
        stage.update();
        _this.removeLoadingScreen();
        _this.showStartScreen();

        _this.startScreen.parentElement.addEventListener('click', _this.handleClick);
        document.addEventListener('keydown', _this.handleKeydown);
      };
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      switch (this.board.status) {
        case _util.UNINITIALIZED:
          this.board.init();
          this.hideStartScreen();
          break;
        case _util.RUNNING:
          this.board.pause();
          this.hideBoard();
          this.showPauseScreen();
          break;
        case _util.PAUSED:
          this.board.resume();
          this.showBoard();
          this.hidePauseScreen();
          break;
        case _util.GAMEOVER:
          this.board.endGame();
          this.hidePauseScreen();
          this.hideStartScreen();
          this.hideGameOverScreen();
          this.removeBoardFromStage();
          this.board = new _board2.default();
          this.board.init();
          break;
        default:
          return;
      }
    }
  }, {
    key: 'handleKeydown',
    value: function handleKeydown(e) {
      if (e.key === 'r') {
        if (this.board.status !== _util.UNINITIALIZED) {
          this.board.endGame();
          this.hidePauseScreen();
          this.hideStartScreen();
          this.hideGameOverScreen();
          this.removeBoardFromStage();
          this.board = new _board2.default();
          this.board.init();
        }
      } else if (e.key === 'q') {
        if (this.board.status !== _util.UNINITIALIZED) {
          this.board.endGame();
          this.hidePauseScreen();
          this.hideStartScreen();
          this.hideGameOverScreen();
          this.hideBoard();
          this.removeBoardFromStage();
          this.board = new _board2.default();
          this.showStartScreen();
        }
      }

      if (e.key === 'm') {
        this.music.paused ? this.music.play() : this.music.pause();
      }
    }
  }, {
    key: 'showStartScreen',
    value: function showStartScreen() {
      var _this2 = this;

      for (var i = 1; i < 4; i++) {
        document.querySelector('.piece-' + i + ' div').classList.remove('hide-back');
      }
      this.startScreen.parentElement.classList.add('remove-border');

      this.startInterval = setInterval(function () {
        if (Array.from(_this2.startScreen.classList).includes('hide-div')) {
          _this2.startScreen.classList.remove('hide-div');
        } else {
          _this2.startScreen.classList.add('hide-div');
        }
      }, 600);
    }
  }, {
    key: 'hideStartScreen',
    value: function hideStartScreen() {
      this.startScreen.parentElement.classList.remove('remove-border');
      clearInterval(this.startInterval);
      this.startScreen.classList.add('hide-div');
      for (var i = 1; i < 4; i++) {
        document.querySelector('.piece-' + i + ' div').classList.add('hide-back');
      }
    }
  }, {
    key: 'showPauseScreen',
    value: function showPauseScreen() {
      this.pauseScreen.classList.remove('hide-div');
    }
  }, {
    key: 'hidePauseScreen',
    value: function hidePauseScreen() {
      this.pauseScreen.classList.add('hide-div');
    }
  }, {
    key: 'hideGameOverScreen',
    value: function hideGameOverScreen() {
      document.querySelector('.gameover').classList.add('hide-div');
    }
  }, {
    key: 'hideBoard',
    value: function hideBoard() {
      for (var i = 1; i < stage.children.length; i++) {
        stage.children[i].visible = false;
      }
    }
  }, {
    key: 'showBoard',
    value: function showBoard() {
      for (var i = 1; i < stage.children.length; i++) {
        stage.children[i].visible = true;
      }
    }
  }, {
    key: 'removeBoardFromStage',
    value: function removeBoardFromStage() {
      var children = stage.children.slice();
      for (var i = 2; i < children.length; i++) {
        children[i].graphics.clear();
        stage.removeChild(children[i]);
      }

      stage.update();
    }
  }, {
    key: 'removeLoadingScreen',
    value: function removeLoadingScreen() {
      document.querySelector('.canvas-loading').classList.add('hide-div');
    }
  }]);

  return Game;
}();
// import Board from './board';
// import { RUNNING, PAUSED, UNINITIALIZED, GAMEOVER} from './util';
//
// export default class Game {
//   constructor () {
//     this.board = new Board();
//     this.startScreen = document.querySelector('.start');
//     this.pauseScreen = document.querySelector('.pause');
//     this.startInterval = null;
//     this.music = document.getElementsByTagName('audio')[0];
//     this.showStartScreen();
//
//     this.handleClick = this.handleClick.bind(this);
//     this.handleKeydown = this.handleKeydown.bind(this);
//   }
//
//   init () {
//     const bg = new Image();
//     bg.src = './images/background.jpg';
//     bg.onload = () => {
//       const backgroundRect = new createjs.Shape();
//       backgroundRect.graphics.beginBitmapFill(bg)
//       .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//       stage.addChild(backgroundRect);
//       stage.update();
//
//       this.startScreen.parentElement.addEventListener('click', this.handleClick);
//       document.addEventListener('keydown', this.handleKeydown);
//     }
//   }
//
//   handleClick (e) {
//       switch (this.board.status) {
//         case UNINITIALIZED:
//           this.board.init();
//           this.hideStartScreen();
//           break;
//         case RUNNING:
//           this.board.pause();
//           this.hideBoard();
//           this.showPauseScreen();
//           break;
//         case PAUSED:
//           this.board.resume();
//           this.showBoard();
//           this.hidePauseScreen();
//           break;
//         case GAMEOVER:
//           this.board.endGame();
//           this.hidePauseScreen();
//           this.hideStartScreen();
//           this.hideGameOverScreen();
//           this.removeBoardFromStage();
//           this.board = new Board();
//           this.board.init();
//           break;
//         default:
//           return;
//       }
//   }
//
//   handleKeydown (e) {
//     if (e.key === 'r') {
//       if (this.board.status !== UNINITIALIZED) {
//         this.board.endGame();
//         this.hidePauseScreen();
//         this.hideStartScreen();
//         this.hideGameOverScreen();
//         this.removeBoardFromStage();
//         this.board = new Board();
//         this.board.init();
//       }
//     } else if (e.key === 'q') {
//       if (this.board.status !== UNINITIALIZED) {
//         this.board.endGame();
//         this.hidePauseScreen();
//         this.hideStartScreen();
//         this.hideGameOverScreen();
//         this.hideBoard();
//         this.removeBoardFromStage();
//         this.board = new Board();
//         this.showStartScreen();
//       }
//     }
//
//     if (e.key === 'm') {
//       this.music.paused ? this.music.play() : this.music.pause();
//     }
//   }
//
//   showStartScreen () {
//     for (let i = 1; i < 4; i++) {
//       document.querySelector(`.piece-${i} div`).classList.remove('hide-back');
//     }
//     this.startScreen.parentElement.classList.add('remove-border');
//
//     this.startInterval = setInterval(() => {
//       if (Array.from(this.startScreen.classList).includes('hide-div')) {
//         this.startScreen.classList.remove('hide-div');
//       } else {
//         this.startScreen.classList.add('hide-div')
//       }
//     }, 600)
//   }
//
//   hideStartScreen () {
//     this.startScreen.parentElement.classList.remove('remove-border');
//     clearInterval(this.startInterval);
//     this.startScreen.classList.add('hide-div');
//     for (let i = 1; i < 4; i++) {
//       document.querySelector(`.piece-${i} div`).classList.add('hide-back');
//     }
//   }
//
//   showPauseScreen () {
//     this.pauseScreen.classList.remove('hide-div');
//   }
//
//   hidePauseScreen () {
//     this.pauseScreen.classList.add('hide-div');
//   }
//
//   hideGameOverScreen () {
//     document.querySelector('.gameover').classList.add('hide-div');
//   }
//
//   hideBoard () {
//     for (let i = 1; i < stage.children.length; i++) {
//       stage.children[i].visible = false;
//     }
//   }
//
//   showBoard () {
//     for (let i = 1; i < stage.children.length; i++) {
//       stage.children[i].visible = true;
//     }
//   }
//
//   removeBoardFromStage () {
//     const children = stage.children.slice();
//     for (let i = 2; i < children.length; i++) {
//       children[i].graphics.clear();
//       stage.removeChild(children[i]);
//     }
//
//     stage.update();
//   }
// }


exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.grid = [];
    this.gameOver = false;
    this.currentPiece = null;
    window.handleKeydown = this.handleKeydown.bind(this);
    this.completionInterval = null;
    this.descendInterval = null;
    this.scoreInterval = null;
    this.nextThree = [];
    this.setupGrid();
    this.status = _util.UNINITIALIZED;
    this.currentScore = 0;
    this.lastScore = 0;
    this.backToBackTetris = false;
    this.currentSpeed = 600;
    this.scoreDiv = document.querySelector('.current-score');
    this.scoreDiv.innerText = 0;
  }

  _createClass(Board, [{
    key: 'setupGrid',
    value: function setupGrid() {
      for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
          if (!this.grid[i]) {
            this.grid[i] = [];
          }
          this.grid[i][j] = false;
        }
      }
    }
  }, {
    key: 'init',
    value: function init() {
      this.draw();
      this.drawSideCircles();
      this.currentPiece = (0, _util.createPiece)(this.grid);
      this.getNextThreePieces();
      this.currentPiece.draw();
      this.addEventListeners();

      this.completionInterval = this.handlePieceCompletion();
      this.descendInterval = this.descendCurrentPiece();
      this.scoreInterval = this.updateScoreInterval();
      this.status = _util.RUNNING;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.status = _util.PAUSED;
      document.removeEventListener('keydown', handleKeydown);
    }
  }, {
    key: 'resume',
    value: function resume() {
      document.addEventListener('keydown', handleKeydown);
      this.status = _util.RUNNING;
    }
  }, {
    key: 'getNextThreePieces',
    value: function getNextThreePieces() {
      for (var i = 0; i < 3; i++) {
        var piece = (0, _util.createPiece)(this.grid);
        this.nextThree.push(piece);
        piece.drawSide(i);
      }
    }
  }, {
    key: 'getNextPiece',
    value: function getNextPiece() {
      var nextPiece = this.nextThree.shift();
      this.nextThree[0].moveToCircle(0);
      this.nextThree[1].moveToCircle(1);
      var lastPiece = (0, _util.createPiece)(this.grid);
      lastPiece.drawSide(2);
      this.nextThree.push(lastPiece);
      return nextPiece;
    }
  }, {
    key: 'drawSideCircles',
    value: function drawSideCircles() {
      var circle1 = new createjs.Shape();
      circle1.graphics.beginFill('black').drawCircle(825, 210, 70);
      stage.addChild(circle1);
      var circle2 = new createjs.Shape();
      circle1.graphics.beginFill('black').drawCircle(825, 353, 70);
      stage.addChild(circle1);
      var circle3 = new createjs.Shape();
      circle1.graphics.beginFill('black').drawCircle(825, 496, 70);
      stage.addChild(circle1);
      stage.update();
    }
  }, {
    key: 'handlePieceCompletion',
    value: function handlePieceCompletion() {
      var _this = this;

      return setInterval(function () {
        if (_this.currentPiece.gameOver) {
          _this.endGame();
        } else if (_this.status === _util.PAUSED) {
          return;
        } else if (_this.currentPiece.finalMove) {
          _this.clearLines();
          _this.currentPiece = _this.getNextPiece();
          _this.currentPiece.moveSideToTop();
          _this.addEventListeners();
        }
      }, 10);
    }
  }, {
    key: 'descendCurrentPiece',
    value: function descendCurrentPiece() {
      var _this2 = this;

      return setInterval(function () {
        if (_this2.status === _util.PAUSED) {
          return;
        } else if (!_this2.currentPiece.gameOver && !_this2.currentPiece.finalMove) {
          _this2.currentPiece.move('ArrowDown');
        }
      }, this.currentSpeed);
    }
  }, {
    key: 'updateScoreInterval',
    value: function updateScoreInterval() {
      var _this3 = this;

      return setInterval(function () {
        if (_this3.lastScore < _this3.currentScore) {
          _this3.lastScore += 10;
          _this3.scoreDiv.innerText = _this3.lastScore;
        }
      }, 50);
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      clearInterval(this.completionInterval);
      clearInterval(this.descendInterval);
      clearInterval(this.scoreInterval);
      document.removeEventListener('keydown', handleKeydown);
      this.status = _util.GAMEOVER;
      document.querySelector('.gameover').classList.remove('hide-div');
    }
  }, {
    key: 'draw',
    value: function draw() {
      var graphics = new createjs.Graphics().beginFill("black").drawRect(BOARD_X, BOARD_Y, BOARD_WIDTH, BOARD_HEIGHT);
      this.boardRect = new createjs.Shape(graphics);

      stage.addChild(this.boardRect);
      stage.update();
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      document.addEventListener('keydown', handleKeydown);
    }
  }, {
    key: 'handleKeydown',
    value: function handleKeydown(e) {

      if (_util.DIRECTIONS.includes(e.code)) {
        e.preventDefault();
        this.currentPiece.move(e.code);
      }
    }
  }, {
    key: 'clearLines',
    value: function clearLines() {
      var linesCleared = 0;

      for (var i = 19; i >= 0; i--) {
        while (this.shouldClearLine(i)) {
          this.clearLine(i);
          linesCleared++;
        }
      }
      if (linesCleared > 0) {
        this.updateScore(linesCleared);
      }
    }
  }, {
    key: 'updateScore',
    value: function updateScore(linesCleared) {
      var points = void 0;
      if (linesCleared === 4) {
        if (this.backToBackTetris) {
          points = 1200;
        } else {
          points = 800;
          this.backToBackTetris = true;
        }
      } else {
        points = linesCleared * 100;
        this.backToBackTetris = false;
      }

      this.currentScore += points;
      clearInterval(this.descendInterval);
      var level = this.currentScore / 250;
      if (level < 11) {
        this.currentSpeed = 600 - level * 48;
      }

      this.descendInterval = this.descendCurrentPiece();
    }
  }, {
    key: 'shouldClearLine',
    value: function shouldClearLine(i) {
      for (var j = 0; j < 10; j++) {
        if (!this.grid[i][j]) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'clearLine',
    value: function clearLine(i) {
      this.clearLineThenBringDown(i);
    }
  }, {
    key: 'clearLineThenBringDown',
    value: function clearLineThenBringDown(i) {
      var cascade = new Promise(function (res) {
        return res();
      });
      var whiteBlocks = [];

      for (var j = 0; j < 10; j++) {
        stage.removeChild(this.grid[i][j]);

        var whiteBlock = this.drawWhiteBlock(this.grid[i][j]);
        whiteBlocks.push(whiteBlock);

        this.grid[i][j] = false;
      }
      stage.update();

      this.clearWhiteBlocks(whiteBlocks, cascade);
      this.moveEverythingDown(i, cascade);
    }
  }, {
    key: 'clearWhiteBlocks',
    value: function clearWhiteBlocks(whiteBlocks, cascade) {
      cascade = cascade.then(function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            for (var i = 0; i < whiteBlocks.length; i++) {
              stage.removeChild(whiteBlocks[i]);
            }
            stage.update();
            resolve();
          }, 100);
        });
      });
    }
  }, {
    key: 'moveEverythingDown',
    value: function moveEverythingDown(clearedRow, cascade) {
      var _this4 = this;

      for (var i = clearedRow - 1; i >= 0; i--) {
        for (var j = 0; j < 10; j++) {
          if (this.grid[i][j]) {
            (function () {
              var block = _this4.grid[i][j];
              cascade = cascade.then(function () {
                return new Promise(function (resolve) {
                  setTimeout(function () {
                    block.y += BLOCK_WIDTH;
                    stage.update();
                    resolve();
                  }, 50);
                });
              });
              _this4.grid[i + 1][j] = _this4.grid[i][j];
              _this4.grid[i][j] = false;
            })();
          }
        }
      }
    }
  }, {
    key: 'drawWhiteBlock',
    value: function drawWhiteBlock(oldBlock) {
      var graphics = new createjs.Graphics().beginFill("white").beginStroke('black').drawRect(0, 0, BLOCK_WIDTH, BLOCK_HEIGHT);

      var block = new createjs.Shape(graphics);
      block.x = oldBlock.x;
      block.y = oldBlock.y;
      stage.addChild(block);
      stage.update();
      return block;
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_piece = __webpack_require__(0);

var _base_piece2 = _interopRequireDefault(_base_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IPiece = function (_BasePiece) {
  _inherits(IPiece, _BasePiece);

  function IPiece(grid) {
    _classCallCheck(this, IPiece);

    var _this = _possibleConstructorReturn(this, (IPiece.__proto__ || Object.getPrototypeOf(IPiece)).call(this, grid));

    _this.letter = 'i';
    _this.sideX = 690;
    _this.sideY = 268;
    _this.sideDelta = 144;
    return _this;
  }

  _createClass(IPiece, [{
    key: 'getPositions',
    value: function getPositions(startPos) {
      var positions = [startPos];

      for (var i = 1; i <= 3; i++) {
        positions.push([startPos[0] - i, startPos[1]]);
      }

      return positions;
    }
  }, {
    key: 'getDeltas',
    value: function getDeltas() {
      switch (this.rotation) {
        case 0:
          return [[0, 0], [1, 1], [2, 2], [3, 3]];
        case 90:
          return [[0, 0], [-1, -1], [-2, -2], [-3, -3]];
        case 180:
          return [[0, 0], [1, 1], [2, 2], [3, 3]];
        case 270:
          return [[0, 0], [-1, -1], [-2, -2], [-3, -3]];
        default:
          return;
      }
    }
  }]);

  return IPiece;
}(_base_piece2.default);

exports.default = IPiece;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_piece = __webpack_require__(0);

var _base_piece2 = _interopRequireDefault(_base_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JPiece = function (_BasePiece) {
  _inherits(JPiece, _BasePiece);

  function JPiece(grid) {
    _classCallCheck(this, JPiece);

    var _this = _possibleConstructorReturn(this, (JPiece.__proto__ || Object.getPrototypeOf(JPiece)).call(this, grid));

    _this.letter = 'j';
    _this.sideX = 671;
    _this.sideY = 249;
    _this.sideDelta = 144;
    return _this;
  }

  _createClass(JPiece, [{
    key: 'getPositions',
    value: function getPositions(startPos) {
      var positions = [];

      for (var i = 0; i <= 2; i++) {
        positions.push([startPos[0] - i, startPos[1] + 1]);
      }
      positions.push([startPos[0], startPos[1]]);

      return positions;
    }
  }, {
    key: 'getDeltas',
    value: function getDeltas() {
      switch (this.rotation) {
        case 0:
          return [[-1, 0], [0, 1], [1, 2], [0, -1]];
        case 90:
          return [[0, -2], [-1, -1], [-2, 0], [1, -1]];
        case 180:
          return [[2, 1], [1, 0], [0, -1], [1, 2]];
        case 270:
          return [[-1, 1], [0, 0], [1, -1], [-2, 0]];
        default:
          return;
      }
    }
  }]);

  return JPiece;
}(_base_piece2.default);

exports.default = JPiece;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_piece = __webpack_require__(0);

var _base_piece2 = _interopRequireDefault(_base_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LPiece = function (_BasePiece) {
  _inherits(LPiece, _BasePiece);

  function LPiece(grid) {
    _classCallCheck(this, LPiece);

    var _this = _possibleConstructorReturn(this, (LPiece.__proto__ || Object.getPrototypeOf(LPiece)).call(this, grid));

    _this.letter = 'l';
    _this.sideX = 678;
    _this.sideY = 251;
    _this.sideDelta = 144;
    return _this;
  }

  _createClass(LPiece, [{
    key: 'getPositions',
    value: function getPositions(startPos) {
      var positions = [startPos];

      for (var i = 1; i <= 2; i++) {
        positions.push([startPos[0] - i, startPos[1]]);
      }
      positions.push([startPos[0], startPos[1] + 1]);

      return positions;
    }
  }, {
    key: 'getDeltas',
    value: function getDeltas() {
      switch (this.rotation) {
        case 0:
          return [[0, -1], [1, 0], [2, 1], [-1, 0]];
        case 90:
          return [[1, -1], [0, 0], [-1, 1], [0, -2]];
        case 180:
          return [[1, 2], [0, 1], [-1, 0], [2, 1]];
        case 270:
          return [[-2, 0], [-1, -1], [0, -2], [-1, 1]];
        default:
          return;
      }
    }
  }]);

  return LPiece;
}(_base_piece2.default);

exports.default = LPiece;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_piece = __webpack_require__(0);

var _base_piece2 = _interopRequireDefault(_base_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LPiece = function (_BasePiece) {
  _inherits(LPiece, _BasePiece);

  function LPiece(grid) {
    _classCallCheck(this, LPiece);

    var _this = _possibleConstructorReturn(this, (LPiece.__proto__ || Object.getPrototypeOf(LPiece)).call(this, grid));

    _this.letter = 'o';
    _this.sideX = 675;
    _this.sideY = 238;
    _this.sideDelta = 144;
    return _this;
  }

  _createClass(LPiece, [{
    key: 'getPositions',
    value: function getPositions(startPos) {
      var positions = [startPos];

      positions.push([startPos[0] - 1, startPos[1]]);
      positions.push([startPos[0] - 1, startPos[1] + 1]);
      positions.push([startPos[0], startPos[1] + 1]);

      return positions;
    }
  }, {
    key: 'getDeltas',
    value: function getDeltas() {
      switch (this.rotation) {
        case 0:
          return [[0, 0], [0, 0], [0, 0], [0, 0]];
        case 90:
          return [[0, 0], [0, 0], [0, 0], [0, 0]];
        case 180:
          return [[0, 0], [0, 0], [0, 0], [0, 0]];
        case 270:
          return [[0, 0], [0, 0], [0, 0], [0, 0]];
        default:
          return;
      }
    }
  }]);

  return LPiece;
}(_base_piece2.default);

exports.default = LPiece;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_piece = __webpack_require__(0);

var _base_piece2 = _interopRequireDefault(_base_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SPiece = function (_BasePiece) {
  _inherits(SPiece, _BasePiece);

  function SPiece(grid) {
    _classCallCheck(this, SPiece);

    var _this = _possibleConstructorReturn(this, (SPiece.__proto__ || Object.getPrototypeOf(SPiece)).call(this, grid));

    _this.letter = 's';
    _this.sideX = 661;
    _this.sideY = 238;
    _this.sideDelta = 144;
    return _this;
  }

  _createClass(SPiece, [{
    key: 'getPositions',
    value: function getPositions(startPos) {
      var positions = [startPos];

      positions.push([startPos[0], startPos[1] + 1]);
      positions.push([startPos[0] - 1, startPos[1] + 1]);
      positions.push([startPos[0] - 1, startPos[1] + 2]);

      return positions;
    }
  }, {
    key: 'getDeltas',
    value: function getDeltas() {
      switch (this.rotation) {
        case 0:
          return [[0, -2], [-1, -1], [0, 0], [-1, 1]];
        case 90:
          return [[0, 2], [1, 1], [0, 0], [1, -1]];
        case 180:
          return [[0, -2], [-1, -1], [0, 0], [-1, 1]];
        case 270:
          return [[0, 2], [1, 1], [0, 0], [1, -1]];
        default:
          return;
      }
    }
  }]);

  return SPiece;
}(_base_piece2.default);

exports.default = SPiece;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_piece = __webpack_require__(0);

var _base_piece2 = _interopRequireDefault(_base_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TPiece = function (_BasePiece) {
  _inherits(TPiece, _BasePiece);

  function TPiece(grid) {
    _classCallCheck(this, TPiece);

    var _this = _possibleConstructorReturn(this, (TPiece.__proto__ || Object.getPrototypeOf(TPiece)).call(this, grid));

    _this.letter = 't';
    _this.sideX = 680;
    _this.sideY = 252;
    _this.sideDelta = 144;
    return _this;
  }

  _createClass(TPiece, [{
    key: 'getPositions',
    value: function getPositions(startPos) {
      var positions = [startPos];

      positions.push([startPos[0] - 1, startPos[1]]);
      positions.push([startPos[0] - 2, startPos[1]]);
      positions.push([startPos[0] - 1, startPos[1] + 1]);

      return positions;
    }
  }, {
    key: 'getDeltas',
    value: function getDeltas() {
      switch (this.rotation) {
        case 0:
          return [[0, -1], [1, 0], [2, 1], [0, 1]];
        case 90:
          return [[1, -1], [0, 0], [-1, 1], [-1, -1]];
        case 180:
          return [[1, 2], [0, 1], [-1, 0], [1, 0]];
        case 270:
          return [[-2, 0], [-1, -1], [0, -2], [0, 0]];
        default:
          return;
      }
    }
  }]);

  return TPiece;
}(_base_piece2.default);

exports.default = TPiece;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_piece = __webpack_require__(0);

var _base_piece2 = _interopRequireDefault(_base_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZPiece = function (_BasePiece) {
  _inherits(ZPiece, _BasePiece);

  function ZPiece(grid) {
    _classCallCheck(this, ZPiece);

    var _this = _possibleConstructorReturn(this, (ZPiece.__proto__ || Object.getPrototypeOf(ZPiece)).call(this, grid));

    _this.letter = 'z';
    _this.sideX = 660;
    _this.sideY = 239;
    _this.sideDelta = 144;
    return _this;
  }

  _createClass(ZPiece, [{
    key: 'getPositions',
    value: function getPositions(startPos) {
      var positions = [[startPos[0] - 1, startPos[1]]];

      positions.push([startPos[0] - 1, startPos[1] + 1]);
      positions.push([startPos[0], startPos[1] + 1]);
      positions.push([startPos[0], startPos[1] + 2]);

      return positions;
    }
  }, {
    key: 'getDeltas',
    value: function getDeltas() {
      switch (this.rotation) {
        case 0:
          return [[1, -1], [0, 0], [-1, -1], [-2, 0]];
        case 90:
          return [[-1, 1], [0, 0], [1, 1], [2, 0]];
        case 180:
          return [[1, -1], [0, 0], [-1, -1], [-2, 0]];
        case 270:
          return [[-1, 1], [0, 0], [1, 1], [2, 0]];
        default:
          return;
      }
    }
  }]);

  return ZPiece;
}(_base_piece2.default);

exports.default = ZPiece;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.CANVAS_WIDTH = 1000;
window.CANVAS_HEIGHT = 600;
window.BOARD_X = 350;
window.BOARD_Y = 0;
window.BOARD_WIDTH = 300;
window.BOARD_HEIGHT = 600;
window.BLOCK_WIDTH = BOARD_WIDTH / 10;
window.BLOCK_HEIGHT = BOARD_HEIGHT / 20;

document.addEventListener('DOMContentLoaded', function () {
  window.stage = new createjs.Stage("demoCanvas");
  new _game2.default().init();
});

//TODO: FIX PAUSE BUTTON

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map