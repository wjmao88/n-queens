/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/* global Board, _ */

var boardIteration = function(board, callback) {
  _.each(board.rows(), function(row, rowIndex) {
    _.each(row, function(item, colIndex) {
      callback(rowIndex, colIndex);
    });
  });
};

window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});
  var found = false;
  var findSolution = function (numRooks) {
    if (numRooks === 0) {
      return true;
    }

    boardIteration(board, function(rowIndex, colIndex) {
      if (!found && !board.hasRowConflictAt(rowIndex) && !board.hasColConflictAt(colIndex)) {
        //try putting a rook here
        board.togglePiece(rowIndex, colIndex);
        //see if it is possible to get a solution from this point on
        found = findSolution(numRooks - 1);
        if (!found) {
          //did not find a solution from here
          //undo put a rook here
          board.togglePiece(rowIndex, colIndex);
        }
      }
    });
    return found;
  };

  findSolution(n);

  // Returns rook solutions
  if (found) {
    return board.rows();
  } else {
    return null;
  }
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  console.log('============= START ' + n + ' =============');
  if (n === 1){
    return 1;
  }
  var board = new Board({'n': n});
  var counter = 0;

  var findSolution = function (numRooks) {
    // Base Case: All rooks have been placed
    if (numRooks === 0) {
      // Increment counter indicating solution found
      counter++;
      return;
    }

    // Increment across board
    boardIteration(board, function(rowIndex, colIndex) {
      if (board.rows()[rowIndex][colIndex] !== 0){
        return;
      }
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasRowConflictAt(rowIndex) && !board.hasColConflictAt(colIndex)) {
        findSolution(numRooks - 1);
      }
      board.togglePiece(rowIndex, colIndex);
    });
  };

  // Start solution search
  findSolution(n);
  console.log('============= END ' + n + ' =' + counter);
  for (var i = n; i >= 1; i--) {
    counter = counter / i;
  }
  return counter;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  console.log('============= START ' + n + ' =============');
  if (n === 1 || n === 0){
    return 1;
  }
  var counter = 0;
  var rowPrune = [];
  var colPrune = [];
  var majorPrune = [];
  var minorPrune = [];

  var loopCounter = 0;

  var findSolution = function (numRooks) {
    // Base Case: All rooks have been placed
    if (numRooks === 0) {
      // Increment counter indicating solution found
      //console.log('Solution: ' + board.rows());
      counter++;
      return;
    }


    // Increment across board
    for (var rowIndex = 0; rowIndex < n; rowIndex++){
      if (rowPrune[rowIndex]){
        break;
      }
      for (var colIndex = 0; colIndex < n; colIndex++){
        if (!colPrune[colIndex] &&
            !majorPrune[colIndex - rowIndex] &&
            !minorPrune[colIndex + rowIndex]) {

          rowPrune[rowIndex] = true;
          colPrune[colIndex] = true;
          majorPrune[colIndex - rowIndex] = true;
          minorPrune[colIndex + rowIndex] = true;

          findSolution(numRooks - 1);

          rowPrune[rowIndex] = false;
          colPrune[colIndex] = false;
          majorPrune[colIndex - rowIndex] = false;
          minorPrune[colIndex + rowIndex] = false;
        }
      }
    }
  };

  // Start solution search
  var begin = new Date().getTime();
  findSolution(n);
  console.log('duration: ' + (new Date().getTime() - begin));
  return counter;
};
