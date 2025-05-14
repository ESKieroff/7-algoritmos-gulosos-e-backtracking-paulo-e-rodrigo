function criarTabuleiro(n) {
    return Array.from({ length: n }, () => Array(n).fill(0));
}

function bloquear(tab, linha, col) {
    const n = tab.length;
    for (let i = linha + 1; i < n; i++) {
        tab[i][col] -= 1;
        if (col - (i - linha) >= 0) tab[i][col - (i - linha)] -= 1;
        if (col + (i - linha) < n) tab[i][col + (i - linha)] -= 1;
    }
}

function desbloquear(tab, linha, col) {
    const n = tab.length;
    for (let i = linha + 1; i < n; i++) {
        tab[i][col] += 1;
        if (col - (i - linha) >= 0) tab[i][col - (i - linha)] += 1;
        if (col + (i - linha) < n) tab[i][col + (i - linha)] += 1;
    }
}

function resolverComTabuleiro(n) {
    const tabuleiro = criarTabuleiro(n);
    const solucoes = [];

    function backtrack(linha) {
        if (linha === n) {
            const solucao = tabuleiro.map(row => row.indexOf(1));
            solucoes.push([...solucao]);
            return;
        }
        for (let col = 0; col < n; col++) {
            if (tabuleiro[linha][col] === 0) {
                tabuleiro[linha][col] = 1;
                bloquear(tabuleiro, linha, col);
                backtrack(linha + 1);
                desbloquear(tabuleiro, linha, col);
                tabuleiro[linha][col] = 0;
            }
        }
    }

    backtrack(0);
    return solucoes;
}