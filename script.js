 // Verificar a disponibilidade de um produto no estoque
 const produtos = [
    { sku: 1001, nome: 'Camiseta', quantidade: 5 },
    { sku: 1002, nome: 'Calça', quantidade: 10 },
    { sku: 1003, nome: 'Vestido', quantidade: 3 }
];

function verificarEstoque() {
    const sku = parseInt(document.getElementById('skuProduto').value);
    const produto = produtos.find(p => p.sku === sku);

    if (produto) {
        document.getElementById('resultadoEstoque').innerText = `Produto "${produto.nome}" disponível em estoque: ${produto.quantidade} unidades.`;
    } else {
        document.getElementById('resultadoEstoque').innerText = 'Produto não encontrado no estoque.';
    }
}

// Calcular o valor total das parcelas de um financiamento
function calcularFinanciamento() {
    const valorProduto = parseFloat(document.getElementById('valorProduto').value);
    const numParcelas = parseInt(document.getElementById('numParcelas').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value) / 100;

    const P = valorProduto / numParcelas;
    const A = P * (((1 + taxaJuros) ** numParcelas - 1) / taxaJuros);

    document.getElementById('resultadoFinanciamento').innerText = `Valor total a ser pago: R$ ${A.toFixed(2)}`;
}

// Calcular o frete para uma entrega
const tabelaPrecos = {
    '0-1,0-5': 10.0,
    '0-1,6-10': 15.0,
    '1-5,0-5': 20.0,
    '1-5,6-10': 25.0,
    '5-10,0-5': 30.0,
    '5-10,6-10': 35.0
};

function calcularFrete() {
    const peso = parseFloat(document.getElementById('pesoPedido').value);
    const distancia = parseInt(document.getElementById('distanciaEntrega').value);

    let chave = '';

    if (peso <= 1) {
        chave += '0-1,';
    } else if (peso <= 5) {
        chave += '1-5,';
    } else if (peso <= 10) {
        chave += '5-10,';
    }

    if (distancia <= 5) {
        chave += '0-5';
    } else if (distancia <= 10) {
        chave += '6-10';
    }

    const frete = tabelaPrecos[chave] || 'Fora da área de entrega';

    document.getElementById('resultadoFrete').innerText = `Valor do frete: R$ ${frete}`;
}

// Atualizar o estoque após uma venda
function atualizarEstoque() {
    const sku = parseInt(document.getElementById('skuVenda').value);
    const quantidadeVendida = parseInt(document.getElementById('quantidadeVenda').value);

    const produto = produtos.find(p => p.sku === sku);

    if (produto && produto.quantidade >= quantidadeVendida) {
        produto.quantidade -= quantidadeVendida;
        document.getElementById('resultadoAtualizacaoEstoque').innerText = `Estoque atualizado: ${produto.nome} - ${produto.quantidade} unidades restantes.`;
    } else {
        document.getElementById('resultadoAtualizacaoEstoque').innerText = 'Quantidade insuficiente em estoque.';
    }
}

// Gerar relatório de vendas
const vendas = [
    { sku: 1001, quantidade: 2, valorTotal: 50.00, data: '2021-01-01' },
    { sku: 1002, quantidade: 1, valorTotal: 20.00, data: '2021-01-01' },
    { sku: 1003, quantidade: 5, valorTotal: 100.00, data: '2021-01-02' },
    { sku: 1001, quantidade: 1, valorTotal: 25.00, data: '2021-01-02' }
];

function gerarRelatorio() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;

    const vendasFiltradas = vendas.filter(venda => {
        return venda.data >= dataInicio && venda.data <= dataFim;
    });

    const relatorio = vendasFiltradas.reduce((acc, venda) => {
        if (!acc[venda.sku]) {
            acc[venda.sku] = { quantidade: 0, valorTotal: 0 };
        }
        acc[venda.sku].quantidade += venda.quantidade;
        acc[venda.sku].valorTotal += venda.valorTotal;
        return acc;
    }, {});

    let resultado = 'Relatório de Vendas:\n';
    let valorTotalGeral = 0;

    for (const sku in relatorio) {
        resultado += `SKU: ${sku}, Quantidade Vendida: ${relatorio[sku].quantidade}, Valor Total: R$ ${relatorio[sku].valorTotal.toFixed(2)}\n`;
        valorTotalGeral += relatorio[sku].valorTotal;
    }

    resultado += `Valor Total Vendido no Período: R$ ${valorTotalGeral.toFixed(2)}`;

    document.getElementById('resultadoRelatorio').innerText = resultado;
}