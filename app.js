
// OOP Tic Tac Toe boilerplate code

// Execute this code only AFTER the document is ready
// Hint: use jQuery's `$(document).ready`
$(document).ready(function() {

  function Game() {
    //sets up the game 
    //creates the board, player1, player2
    this.$cell = $(".cell");                //sets variables for cells
    this.board = new Board(this.$cell);                 
    this.player1 = new Player("x");         //access ex: game.player1, this.player1
    this.player2 = new Player("o");
    this.turnCounter = 1;                   //variable that increments turn on every move
    this.playerMove = this.player1; 
    
    //scoreboard
    this.player1Score = 0;
    this.player2Score = 0;

    var _this = this;
    $("button").on("click", function (event) {
      _this.resetBoard();
    }); 
  }

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
    this.turnCounter = 1;
    this.playerMove = this.player1;
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


  // Board
  // This constructor takes in game.$cell and renames it $cell.
  // It then triggers the fluidCells prototype and passes $cell
  // This will also board moves...
  function Board($cell) {
   this.fluidCells($cell);
  };

  // fluidCells
  // This prototype of Board sets initial cell height equal to cell width.
  // It then listens for window resize and updates the height. 
  Board.prototype.fluidCells = function ($cell) {
    
    $cell.css({ "height" : $cell.width() });
    
    $(window).resize(function (event) {
      $cell.css({ "height" : $cell.width() });
    })
  }


  // checkWin
  // Sets team to either "x" or "o"
  // Moves through each row, collumn, and diagonal checking each for "o" or "x" class
  // Short circuits when a condition returns true.  
  Game.prototype.checkWin = function () {
    var team = this.playerMove["team"];
    
    //check row 1
    if ( $("li:nth-child(1)").hasClass(team) && $("li:nth-child(2)").hasClass(team) && $("li:nth-child(3)").hasClass(team) ) {
      return this.setWin();
    } 
    //check row 2
    else if ( $("li:nth-child(4)").hasClass(team) && $("li:nth-child(5)").hasClass(team) && $("li:nth-child(6)").hasClass(team) ) {
      return this.setWin();
    } 
    //check row 3
    else if ( $("li:nth-child(7)").hasClass(team) && $("li:nth-child(8)").hasClass(team) && $("li:nth-child(9)").hasClass(team) ) {
      return this.setWin();
    }
    //check col 1
    else if ( $("li:nth-child(1)").hasClass(team) && $("li:nth-child(4)").hasClass(team) && $("li:nth-child(7)").hasClass(team) ) {
      return this.setWin();
    } 
    //check col 2
    else if ( $("li:nth-child(2)").hasClass(team) && $("li:nth-child(5)").hasClass(team) && $("li:nth-child(8)").hasClass(team) ) {
      return this.setWin();
    } 
    //check col 3
    else if ( $("li:nth-child(3)").hasClass(team) && $("li:nth-child(6)").hasClass(team) && $("li:nth-child(9)").hasClass(team) ) {
      return this.setWin();
    } 
    //check diag \
    else if ( $("li:nth-child(1)").hasClass(team) && $("li:nth-child(5)").hasClass(team) && $("li:nth-child(9)").hasClass(team) ) {
      return this.setWin();
    } 
    //check diag /
    else if ( $("li:nth-child(7)").hasClass(team) && $("li:nth-child(5)").hasClass(team) && $("li:nth-child(3)").hasClass(team) ) {
      return this.setWin();
    }
    //checks tie /
    else if (this.turnCounter === 10) {
      return this.setTie();
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

  //setTie
  Game.prototype.setTie = function () {
    alert("Tie game");
    this.resetBoard();
  }


  // Start the game!
  var game = new Game();
  game.init();
});   
