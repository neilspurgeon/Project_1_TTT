// Execute this code only AFTER the document is ready
$(document).ready(function() {

  function Game() {
    // Sets up the game 
    // Creates the board, player1, player2
    // Players take in name variable for future planned functionality.
    var player1Name = "Player X";
    var player2Name = "Player O";
    this.$cell = $(".cell");
    this.board = new Board(this.$cell);                 
    this.player1 = new Player("x", player1Name);
    this.player2 = new Player("o", player2Name);
    this.turnCounter = 1; 
    this.currentPlayer = this.player1; 
    
    // Scoreboard
    this.player1Score = 0;
    this.player2Score = 0;

    // Binds resetBoard to button
    var _this = this;
    $("button").on("click", function (event) {
      _this.resetBoard();
    });
  }

  // Player Constructor
  // Assigns team variable to player
  // Name variable is not used yet.
  function Player(team, name) {
    this.team = team;
    this.name = name;
  }

  // Board Constructor
  // Renames game.$cell to $cell inside this function.
  // Triggers the fluidCells prototype and passes $cell
  // Will also store board moves.
  function Board($cell) {
   this.fluidCells($cell);
  }

  // switchPlayer Prototype
  // if turn count is even, player1 is selected. 
  Game.prototype.nextPlayer = function() {
    if (this.turnCounter % 2 === 0) {
      this.currentPlayer = this.player1;
    } else {
      this.currentPlayer = this.player2;
    }
  };

  // resetBoard Prototype
  // holds functionality for closeOverlay
  Game.prototype.resetBoard = function (event) {
    this.$cell.removeClass(this.player1["team"]).removeClass(this.player2["team"]);
    $(".cell-container, .board-lines").fadeTo(600, 1);
    $("#win-overlay").fadeOut(600);
    this.turnCounter = 1;
    this.currentPlayer = this.player1;
  };

  // init Prototype 
  // Kicks off a new game with a board and two players
  // '_this' temporarily hold 'this' inside event.target 
  Game.prototype.init = function() {  
    var _this = this;
    this.$cell.on("click", function (event) {
      if ((event.target).classList.contains("x") || (event.target).classList.contains("o")) {
        return;
      }
      $(event.target).addClass(_this.currentPlayer["team"]);
      _this.checkWin();
      _this.nextPlayer();
      _this.turnCounter += 1;
      _this.changeHover();
    });
  };

  // fluidCells Prototype
  // Sets initial cell height equal to cell width.
  // Listens for window resize and updates the height. 
  Board.prototype.fluidCells = function ($cell) {    
    $cell.css({ "height" : $cell.width() });    
    $(window).resize(function (event) {
      $cell.css({ "height" : $cell.width() });
    });
  };

  // setWin Prototype
  // Updates score, opens overlay, triggers closeOverlay
  Game.prototype.setWin = function () {
    if (this.currentPlayer === this.player1) {
       this.player1Score += 1;
       $("#player1-score").html(this.player1Score);
    } else {
      this.player2Score += 1;
      $("#player2-score").html(this.player2Score);
    }
    $("#win-overlay h1").html( this.currentPlayer["name"] + " won the game");
    $("#win-overlay").fadeIn(600);
    $(".cell-container, .board-lines").fadeTo(600, 0.1);
    this.closeOverlay();
  };

  // setTie ProtoType
  Game.prototype.setTie = function () {
    $("#win-overlay h1").html("Tie game");
    $("#win-overlay").fadeIn(600);
    $(".cell-container, .board-lines").fadeTo(600, 0.1);
    this.closeOverlay();
  };

  // closeOverlay Prototype
  // triggers resetBoard to close overlay and reset pieces
  Game.prototype.closeOverlay = function () {
    var _this = this;
    $("#win-overlay").on("click", function () {
       _this.resetBoard();      
    });
  };

  // changeHover
  // sets hover to 'xhover' if turn is even
  Game.prototype.changeHover = function () {
    if (this.turnCounter % 2 === 0) {
      this.$cell.addClass("ohover");
      this.$cell.removeClass("xhover");
    } else {
      this.$cell.addClass("xhover");
      this.$cell.removeClass("ohover");
    };
  };

  // checkWin Prototype
  // Sets team to either "x" or "o"
  // Moves through each row, collumn, and diagonal checking each for "o" or "x" class
  // Short circuits when a condition returns true.  
  Game.prototype.checkWin = function () {
    var team = this.currentPlayer["team"];
    
    // Checks row 1
    if ( $("li:nth-child(1)").hasClass(team) && $("li:nth-child(2)").hasClass(team) && $("li:nth-child(3)").hasClass(team) ) {
      return this.setWin();
    } // Checks row 2
    else if ( $("li:nth-child(4)").hasClass(team) && $("li:nth-child(5)").hasClass(team) && $("li:nth-child(6)").hasClass(team) ) {
      return this.setWin();
    } // Checks row 3
    else if ( $("li:nth-child(7)").hasClass(team) && $("li:nth-child(8)").hasClass(team) && $("li:nth-child(9)").hasClass(team) ) {
      return this.setWin();
    } // Checks col 1
    else if ( $("li:nth-child(1)").hasClass(team) && $("li:nth-child(4)").hasClass(team) && $("li:nth-child(7)").hasClass(team) ) {
      return this.setWin();
    } // Checks col 2
    else if ( $("li:nth-child(2)").hasClass(team) && $("li:nth-child(5)").hasClass(team) && $("li:nth-child(8)").hasClass(team) ) {
      return this.setWin();
    } // Checks col 3
    else if ( $("li:nth-child(3)").hasClass(team) && $("li:nth-child(6)").hasClass(team) && $("li:nth-child(9)").hasClass(team) ) {
      return this.setWin();
    } // Checks diag \
    else if ( $("li:nth-child(1)").hasClass(team) && $("li:nth-child(5)").hasClass(team) && $("li:nth-child(9)").hasClass(team) ) {
      return this.setWin();
    } // Checks diag /
    else if ( $("li:nth-child(7)").hasClass(team) && $("li:nth-child(5)").hasClass(team) && $("li:nth-child(3)").hasClass(team) ) {
      return this.setWin();
    } // Checks tie /
    else if (this.turnCounter === 9) {
      return this.setTie();
    }
  };

  // Starts game
  var game = new Game();
  game.init();
});   
