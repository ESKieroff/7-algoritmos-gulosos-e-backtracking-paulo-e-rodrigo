const fs = require('fs');

class NQueensA {
    constructor(n) {
        this.n = n;
        this.solucoes = [];
    }

    resolverOtimizado() {
        const n = this.n;
        const colunas = Array(n).fill(false);
        const diag1 = Array(2 * n - 1).fill(false); // linha + coluna
        const diag2 = Array(2 * n - 1).fill(false); // linha - coluna + n - 1
        const solucoes = [];
        const rainhas = [];

        function backtrack(linha) {
            if (linha === n) {
                // Monta a solução visual
                const solucao = Array(n).fill().map((_, i) => {
                    let row = Array(n).fill('.');
                    row[rainhas[i]] = 'Q';
                    return row.join('');
                });
                solucoes.push(solucao);
                return;
            }

            for (let col = 0; col < n; col++) {
                const d1 = linha + col;
                const d2 = linha - col + n - 1;
                if (colunas[col] || diag1[d1] || diag2[d2]) continue;

                colunas[col] = diag1[d1] = diag2[d2] = true;
                rainhas.push(col);

                backtrack(linha + 1);

                colunas[col] = diag1[d1] = diag2[d2] = false;
                rainhas.pop();
            }
        }

        backtrack(0);
        this.solucoes = solucoes;
    }

    printStats(tempoMs) {
        console.log(`Quantidade de soluções encontradas: ${this.solucoes.length}`);
        console.log(`Tempo decorrido: ${tempoMs.toFixed(2)} ms`);
    }
}

// Exemplo de uso no terminal:
const n = 14;
const nQueens = new NQueensA(n);
const inicio = performance.now();
nQueens.resolverOtimizado();
const fim = performance.now();
nQueens.printStats(fim - inicio);

// Salvar soluções em solutionsA.txt
const solutionsText = nQueens.solucoes
    .map((sol, idx) => `Solução ${idx + 1}:\n${sol.join('\n')}\n`)
    .join('\n');
fs.writeFileSync('solutionsA.txt', solutionsText);