const listaProdutos = document.querySelector(".itens_produtos");
const elementoCestoProdutos = document.querySelector(".cesto_produtos");
const checkboxEstudante = document.querySelector("#estudante");
const inputCupao = document.querySelector("#cupao");
const botaoComprar = document.querySelector("#comprar");

if (!localStorage.getItem("produtos-selecionados")) {
    localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

function criarProduto(produto) {
    const article = document.createElement('article');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;
    article.append(titulo);

    const imagem = document.createElement('img');
    imagem.setAttribute('src', produto.image);
    article.append(imagem);

    const custo = document.createElement('h4');
    custo.textContent = `€${produto.price}`;
    article.append(custo);

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;
    article.append(descricao);

    const botao = document.createElement('button');
    botao.innerText = "+ Adicionar ao cesto";
    article.append(botao);
    botao.addEventListener('click', () => {
        adicionarAoCesto(produto);
    });

    return article;
}

function carregarProdutos(produtos_) {
    listaProdutos.innerHTML = ''; 
    produtos_.forEach(produto => {
        const article = criarProduto(produto);
        listaProdutos.append(article);
    });
}

function adicionarAoCesto(produto) {
    const cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));
    cesto.push(produto);
    localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));

    carregarCesto();
}

function criarProdutoCesto(produto) {
    const article = document.createElement('article');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;
    article.append(titulo);

    const imagem = document.createElement('img');
    imagem.setAttribute('src', produto.image);
    article.append(imagem);

    const custo = document.createElement('h4');
    custo.textContent = `€${produto.price}`;
    article.append(custo);

    const botaoRemover = document.createElement('button');
    botaoRemover.innerText = "- Remover do cesto";
    article.append(botaoRemover);
    botaoRemover.addEventListener('click', () => {
        removerDoCesto(produto);
    });

    return article;
}

function removerDoCesto(produtoARemover) {
    let listaProdutos = JSON.parse(localStorage.getItem('produtos-selecionados'));

    listaProdutos = listaProdutos.filter(produto => produto.title !== produtoARemover.title);

    localStorage.setItem('produtos-selecionados', JSON.stringify(listaProdutos));

    carregarCesto();
}

function atualizarPrecoTotal() {
    let listaProdutos = JSON.parse(localStorage.getItem("produtos-selecionados"));
    let totalPreco = listaProdutos.reduce((acc, produto) => acc + parseFloat(produto.price), 0);

    if (checkboxEstudante.checked) {
        totalPreco *= 0.9; // 10% de desconto
    }

    const cupao = inputCupao.value.trim();
    if (cupao === "DEISI2024") {
        totalPreco *= 0.8; // 20% de desconto
    }

    const totalElement = document.querySelector(".total-preco");
    totalElement.textContent = `Preço Total: €${totalPreco.toFixed(2)}`;
}

function carregarCesto() {
    elementoCestoProdutos.innerHTML = '';
    let listaProdutos = JSON.parse(localStorage.getItem('produtos-selecionados'));

    listaProdutos.forEach(produto => {
        const article = criarProdutoCesto(produto);
        elementoCestoProdutos.append(article);
    });

    atualizarPrecoTotal(); // Atualizar preço total sempre que o cesto for carregado
}

async function realizarCompra() {
    let listaProdutos = JSON.parse(localStorage.getItem("produtos-selecionados"));
    if (listaProdutos.length === 0) {
        alert("Seu cesto está vazio! Adicione produtos antes de comprar.");
        return;
    }

    let custoTotal = listaProdutos.reduce((acc, produto) => acc + parseFloat(produto.price), 0);

    if (checkboxEstudante.checked) {
        custoTotal *= 0.9; // 10% de desconto
    }

    const cupao = inputCupao.value.trim();
    if (cupao === "DEISI2024") {
        custoTotal *= 0.8; // 20% de desconto
    }

    const dadosCompra = {
        produtos: listaProdutos.map(produto => produto.title),
        total: custoTotal.toFixed(2),
        estudante: checkboxEstudante.checked,
        cupao: cupao
    };

    try {
        const response = await fetch("https://deisishop.pythonanywhere.com/buy/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosCompra)
        });

        if (!response.ok) {
            throw new Error(`Erro na compra: ${response.statusText}`);
        }

        const resultado = await response.json();

        alert(`Compra realizada com sucesso!\n\nID da compra: ${resultado.id}\nReferência de pagamento: ${resultado.referencia}\nTotal pago: €${resultado.total_recebido}`);

        localStorage.setItem("produtos-selecionados", JSON.stringify([]));
        carregarCesto();
    } catch (error) {
        console.error("Erro ao realizar a compra:", error);
        alert("Houve um erro ao processar a compra. Tente novamente.");
    }
}

async function obterProdutos() {
    try {
        const response = await fetch("https://deisishop.pythonanywhere.com/products/");
        if (!response.ok) {
            throw new Error(`Erro ao obter produtos: ${response.statusText}`);
        }
        const produtos = await response.json();
        carregarProdutos(produtos);
    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
    }
}

checkboxEstudante.addEventListener("change", atualizarPrecoTotal);
inputCupao.addEventListener("input", atualizarPrecoTotal);

// Inicialização da página
document.addEventListener('DOMContentLoaded', () => {
    obterProdutos(); 
    carregarCesto();
});
