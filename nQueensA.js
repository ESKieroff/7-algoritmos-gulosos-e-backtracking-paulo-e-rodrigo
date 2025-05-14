

class nQueensA {

    constructor() {
        this.resolverOtimizado = this.resolverOtimizado.bind(this);
    }

resolverOtimizado(n) {
    const colunas = Array(n).fill(false);
    const diag1 = Array(2 * n - 1).fill(false); // linha + coluna
    const diag2 = Array(2 * n - 1).fill(false); // linha - coluna + n - 1
    const solucoes = [];
    const rainhas = [];

    function backtrack(linha) {
        if (linha === n) {
            solucoes.push([...rainhas]);
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
    return solucoes;
}
}

// Example usage:
const n = 4;
const nQueensA = new nQueensA();
const solucoes = nQueensA.resolverOtimizado(n);
console.log("Soluções encontradas:", solucoes);
