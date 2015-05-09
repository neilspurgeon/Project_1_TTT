
// OOP Tic Tac Toe boilerplate code

// Execute this code only AFTER the document is ready
// Hint: use jQuery's `$(document).ready`
$(document).ready(function() {

  function Game() {
    //sets up the game 
    //creates the board, player1, player2
    this.board = new Board;                 
    this.player1 = new Player("x");         //access ex: game.player1, this.player1
    this.player2 = new Player("o");
    this.turnCounter = 1;                   //variable that increments turn on every move
    this.playerMove = this.player1; 
    this.$cell = $(".cell");                //sets variables for cells
    
    //scoreboard
    this.player1Score = 0;
    this.player2Score = 0;

    var _this = this;
    $("button").on("click", function (event) {
      _this.resetBoard();
    }); 
  }

  // Remember: prototypes are shared functions between all game instances
  Game.prototype.nextPlayer = function() {
    //Switch players
    //if turn count is even, player1 is selected
    if (this.turnCounter % 2 === 0) {
      this.playerMove = this.player1;       //access ex: game.nextPlayer(), this.nextPlayer()
    } else {
      this.playerMove = this.player2;
    }; 
  };

  Game.prototype.resetBoard = function (event) {
    var _this = this;
    this.$cell.removeClass(_this.player1["team"]).removeClass(_this.player2["team"]);
  };

  // `Game.prototype.init` kicks off a new game with a board and two players
  Game.prototype.init = function() { 
    //sets '_this' as game variable so it can be used inside 'this'  
    
    var _this = this;

    this.$cell.on("click", function (event) {
      if ((event.target).classList.contains("x") || (event.target).classList.contains("o")) {
        return;
      }

      $(event.target).addClass(_this.playerMove["team"]);
      _this.checkWin();
      _this.nextPlayer();
      _this.turnCounter += 1;
    });
  };

  // A starter Player constructor.          //why is this a constructor and not a protoype?
  function Player(team) {
    //assigns team variable to player
    this.team = team;
  };

  // A starter Board constructor.
  function Board() {
    //Tracks the cells of the board instance
    //this.$cells = ...

    // //log moves in array
    // this.boardMoves = [[null, null, null],
    //                    [null, null, null],
    //                    [null, null, null]]

    //Store any other properties that board may have below, such as a reset option
  };

  // Check for possible wins
  Game.prototype.checkWin = function () {
    var team = this.playerMove["team"];
    //check row 1
    if ( $("#one").hasClass(team) && $("#two").hasClass(team) && $("#three").hasClass(team) ) {
      this.setWin();
    } 
    //check row 2
    else if ( $("#four").hasClass(team) && $("#five").hasClass(team) && $("#six").hasClass(team) ) {
      this.setWin();
    } 
    //check row 3
    else if ( $("#seven").hasClass(team) && $("#eight").hasClass(team) && $("#nine").hasClass(team) ) {
      this.setWin();
    }
    //check col 1
    else if ( $("#one").hasClass(team) && $("#four").hasClass(team) && $("#seven").hasClass(team) ) {
      this.setWin();
    } 
    //check col 2
    else if ( $("#two").hasClass(team) && $("#five").hasClass(team) && $("#eight").hasClass(team) ) {
      this.setWin();
    } 
    //check col 3
    else if ( $("#three").hasClass(team) && $("#six").hasClass(team) && $("#nine").hasClass(team) ) {
      this.setWin();
    } 
    //check diag \
    else if ( $("#one").hasClass(team) && $("#five").hasClass(team) && $("#nine").hasClass(team) ) {
      this.setWin();
    } 
    //check diag /
    else if ( $("#seven").hasClass(team) && $("#five").hasClass(team) && $("#three").hasClass(team) ) {
      this.setWin();
    }
  }

  //Set winner
  Game.prototype.setWin = function () {
    if (this.playerMove === this.player1) {
      alert("Player one wins");
    } else {
      alert("Player two wins");
    }
    this.resetBoard();
  }

  // Start the game!
  var game = new Game();
  game.init();
});   
