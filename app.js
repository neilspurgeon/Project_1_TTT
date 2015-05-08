
// OOP Tic Tac Toe boilerplate code

// Execute this code only AFTER the document is ready
// Hint: use jQuery's `$(document).ready`
$(document).ready(function() {

  function Game() {
    //sets up the game 
    //creates the board, player1, player2
    this.board = new Board;                 
    this.player1 = new Player("x");         //access ex: game.player1
    this.player2 = new Player("o");
    this.turnCounter = 1; //variable that increments turn on every move
    this.playerMove = this.player1;
    
    this.$cell = $(".cell"); //allows
  }

  // Remember: prototypes are shared functions between all game instances
  Game.prototype.nextPlayer = function() {
    //Switch players
    //if turn count is even, player1 is selected
    if (this.turnCounter % 2 === 0) {
      this.playerMove = this.player1;       //access ex: game.nextPlayer()
    } else {
      this.playerMove = this.player2;
    }; 
  };

  // `Game.prototype.init` kicks off a new game with a board and two players
  Game.prototype.init = function() {
    
    //sets '_this' as game variable so it can be used inside 'this'  
    var _this = this;

    this.$cell.on("click", function (event) {
      $(event.target).css("backgroundColor", "black").addClass('' + _this.playerMove["team"] + '');
      _this.nextPlayer();
      _this.turnCounter += 1;
    });
 
  };

  // A starter Player constructor.
  function Player(team) {
    //Is the player X or O?
    //this.team = ...
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
