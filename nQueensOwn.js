
class nQueensOwn {
  constructor(n) {
    this.n = n;
    this.board = Array.from({ length: n }, () => Array(n).fill(0));
    this.solutions = [];
  }

  isSafe(row, col) {
    for (let i = 0; i < row; i++) {
      if (this.board[i][col] === 1) return false;
      if (col - (row - i) >= 0 && this.board[i][col - (row - i)] === 1) return false;
      if (col + (row - i) < this.n && this.board[i][col + (row - i)] === 1) return false;
    }
    return true;
  }
  solveNQueensUtil(row) {
    if (row === this.n) {
      this.solutions.push(this.board.map(r => r.slice()));
      return;
    }
    for (let col = 0; col < this.n; col++) {
      if (this.isSafe(row, col)) {
        this.board[row][col] = 1;
        this.solveNQueensUtil(row + 1);
        this.board[row][col] = 0;
      }
    }
  }
  solveNQueens() {
    this.solveNQueensUtil(0);
    return this.solutions;
  }
  printSolutions() {
    this.solutions.forEach((solution, index) => {
      console.log(`Solution ${index + 1}:`);
      solution.forEach(row => console.log(row.join(" ")));
      console.log();
    });
  }
}
// Example usage:
const n = 4;
const nQueens = new nQueensOwn(n);
nQueens.solveNQueens();
nQueens.printSolutions();
