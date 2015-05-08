
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
    this.turnCounter = 1; //variable that increments turn on every move
    this.playerMove = this.player1; 
    this.$cell = $(".cell"); //sets variables for cells
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
  
  // Check for possible wins
  Game.prototype.checkWin = function () {
    var team = this.playerMove["team"];
    //check row 1
    if ( $("#one").hasClass(team) === true && $("#two").hasClass(team) === true && $("#three").hasClass(team) === true ) {
      alert("win");
    } 
    //check row 2
    else if ( $("#four").hasClass(team) === true && $("#five").hasClass(team) === true && $("#six").hasClass(team) === true ) {
      alert("win");
    } 
    //check row 3
    else if ( $("#seven").hasClass(team) === true && $("#eight").hasClass(team) === true && $("#nine").hasClass(team) === true ) {
      alert("win");
    }
    //check col 1
    else if ( $("#one").hasClass(team) === true && $("#five").hasClass(team) === true && $("#seven").hasClass(team) === true ) {
      alert("win");
    } 
    //check col 2
    else if ( $("#two").hasClass(team) === true && $("#five").hasClass(team) === true && $("#eight").hasClass(team) === true ) {
      alert("win");
    } 
    //check col 3
    else if ( $("#three").hasClass(team) === true && $("#six").hasClass(team) === true && $("#nine").hasClass(team) === true ) {
      alert("win");
    } 
    //check diag \
    else if ( $("#one").hasClass(team) === true && $("#five").hasClass(team) === true && $("#nine").hasClass(team) === true ) {
      alert("win");
    } 
    //check diag /
    else if ( $("#seven").hasClass(team) === true && $("#five").hasClass(team) === true && $("#three").hasClass(team) === true ) {
      alert("win");
    }
  }

  // `Game.prototype.init` kicks off a new game with a board and two players
  Game.prototype.init = function() { 
    //sets '_this' as game variable so it can be used inside 'this'  
    var _this = this;

    this.$cell.on("click", function (event) {
      $(event.target).css("backgroundColor", "black").addClass(_this.playerMove["team"]);
      _this.checkWin();
      _this.nextPlayer();
      _this.turnCounter += 1;
    });
 
  };

  // A starter Player constructor.
  function Player(team) {
    //assigns team variable to player
    this.team = team;
  };

  // A starter Board constructor.
  function Board() {
    //Tracks the cells of the board instance
    //this.$cells = ...

    //Store any other properties that board may have below, such as a reset option
  };

  // Start the game!
  var game = new Game();
  game.init();
});   
