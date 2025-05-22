const fs = require('fs');
class nQueens {
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

  printStats(tempoMs) {
    console.log(`Quantidade de soluções encontradas: ${this.solutions.length}`);
    console.log(`Tempo decorrido: ${tempoMs.toFixed(2)} ms`);
  }
}

// Exemplo de uso:
const n = 8;
const nQ = new nQueens(n);
const inicio = performance.now();
nQ.solveNQueens();
const fim = performance.now();
nQ.printStats(fim - inicio);

// Salvar soluções em solutionsN.txt
const solutionsText = nQ.solutions
  .map((solution, idx) =>
    `Solução ${idx + 1}:\n` +
    solution.map(row =>
      row.map(cell => (cell === 1 ? 'Q' : '.')).join('')
    ).join('\n') +
    '\n'
  ).join('\n');
fs.writeFileSync('solutionsN.txt', solutionsText);

module.exports = nQueens;