const fs = require('fs');

class NQueensB {
    constructor(n) {
        this.n = n;
        this.tabuleiro = Array.from({ length: n }, () => Array(n).fill(0));
        this.solucoes = [];
    }

    bloquear(tab, linha, col) {
        const n = tab.length;
        for (let i = linha + 1; i < n; i++) {
            tab[i][col] -= 1;
            if (col - (i - linha) >= 0) tab[i][col - (i - linha)] -= 1;
            if (col + (i - linha) < n) tab[i][col + (i - linha)] -= 1;
        }
    }

    desbloquear(tab, linha, col) {
        const n = tab.length;
        for (let i = linha + 1; i < n; i++) {
            tab[i][col] += 1;
            if (col - (i - linha) >= 0) tab[i][col - (i - linha)] += 1;
            if (col + (i - linha) < n) tab[i][col + (i - linha)] += 1;
        }
    }

    resolver() {
        const n = this.n;
        const tabuleiro = Array.from({ length: n }, () => Array(n).fill(0));
        const solucoes = [];

        const backtrack = (linha) => {
            if (linha === n) {
                // Monta a solução visual
                const solucao = tabuleiro.map(row =>
                    row.map(cell => cell === 1 ? 'Q' : '.').join('')
                );
                solucoes.push(solucao);
                return;
            }
            for (let col = 0; col < n; col++) {
                if (tabuleiro[linha][col] === 0) {
                    tabuleiro[linha][col] = 1;
                    this.bloquear(tabuleiro, linha, col);
                    backtrack(linha + 1);
                    this.desbloquear(tabuleiro, linha, col);
                    tabuleiro[linha][col] = 0;
                }
            }
        };

        backtrack(0);
        this.solucoes = solucoes;
    }

    printSolutions() {
        if (this.solucoes.length === 0) {
            console.log("Nenhuma solução encontrada.");
            return;
        }
        this.solucoes.forEach((sol, idx) => {
            console.log(`Solução ${idx + 1}:`);
            sol.forEach(row => console.log(row));
            console.log('');
        });
    }

    printStats (tempoMs) {
        console.log(`Tempo de execução: ${tempoMs} ms`);
        console.log(`Número de soluções encontradas: ${this.solucoes.length}`);
    }
}

// Exemplo de uso no terminal:
const n = 14;
const nQueens = new NQueensB(n);
const inicio = performance.now();
nQueens.resolver();
const fim = performance.now();
nQueens.printStats(fim - inicio);

const solutionsText = nQueens.solucoes
    .map((sol, idx) => `Solução ${idx + 1}:\n${sol.join('\n')}\n`)
    .join('\n');
fs.writeFileSync('nQueensB.txt', solutionsText);

module.exports = NQueensB;