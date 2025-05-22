const { performance } = require('perf_hooks');
const nQueens = require('./nQueens.js');
const NQueensA = require('./nQueensA.js');
const NQueensB = require('./nQueensB.js');

const n = 8; 

// nQueens (original)
const nQ = new nQueens(n);
let inicio = performance.now();
nQ.solveNQueens();
let fim = performance.now();
console.log('nQueens (original):');
nQ.printStats(fim - inicio);
console.log('--------------------------');

// NQueensA (otimizado)
const nQA = new NQueensA(n);
inicio = performance.now();
nQA.resolverOtimizado();
fim = performance.now();
console.log('NQueensA (otimizado):');
nQA.printStats(fim - inicio);
console.log('--------------------------');

// NQueensB (com bloqueio)
const nQB = new NQueensB(n);
inicio = performance.now();
nQB.resolver();
fim = performance.now();
console.log('NQueensB (bloqueio):');
nQB.printStats(fim - inicio);
console.log('--------------------------');