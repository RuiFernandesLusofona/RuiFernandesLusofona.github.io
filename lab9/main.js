const listaProdutos = document.querySelector(".itens_produtos")
const elementoCestoProdutos = document.querySelector(".cesto_produtos");

if (!localStorage.getItem("produtos-selecionados")) {
    localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

function criarProduto(produto) {
    const article = document.createElement('article')

    const titulo = document.createElement('h3')
    titulo.textContent = produto.title
    article.append(titulo)

    const imagem = document.createElement('img')
    imagem.setAttribute('src', produto.image)
    article.append(imagem)

    const custo = document.createElement('h4')
    custo.textContent = produto.price
    article.append(custo)

    const descricao = document.createElement('p')
    descricao.textContent = produto.description
    article.append(descricao)

    const botao = document.createElement('button')
    botao.innerText = "+ Adicionar ao cesto";
    article.append(botao)
    botao.addEventListener('click', () => {
        adicionarAoCesto(produto);
    });

    return article;
}

function carregarProdutos(produtos_) {
    produtos_.forEach(produto => {

        const article = criarProduto(produto)
        listaProdutos.append(article)
    })
}

function adicionarAoCesto(produto) {
    const cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));
    cesto.push(produto);
    localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));

    carregarCesto()
}

function criarProdutoCesto(produto) {
    const article = document.createElement('article')

    const titulo = document.createElement('h3')
    titulo.textContent = produto.title
    article.append(titulo)

    const imagem = document.createElement('img')
    imagem.setAttribute('src', produto.image)
    article.append(imagem)

    const custo = document.createElement('h4')
    custo.textContent = produto.price
    article.append(custo)

    const botaoRemover = document.createElement('button');
    botaoRemover.innerText = "- Remover do cesto";
    article.append(botaoRemover);
    botaoRemover.addEventListener('click', () => {
        removerDoCesto(produto);
    });


    return article
}

function removerDoCesto(produtoARemover) {
    let listaProdutos = JSON.parse(localStorage.getItem('produtos-selecionados'));

    listaProdutos = listaProdutos.filter(produto => produto.title !== produtoARemover.title);

    localStorage.setItem('produtos-selecionados', JSON.stringify(listaProdutos));

    carregarCesto();
}

function carregarCesto() {

    elementoCestoProdutos.innerHTML = '';
    let listaProdutos = JSON.parse(localStorage.getItem('produtos-selecionados'));
    let totalPreco = 0;
    
    listaProdutos.forEach(produto => {

        const article = criarProdutoCesto(produto)
        elementoCestoProdutos.append(article)
        totalPreco += parseFloat(produto.price);
    })

    const totalElement = document.querySelector(".total-preco");
    if (!totalElement) {
        const novoTotalElement = document.createElement('h4');
        novoTotalElement.classList.add('total-preco');
        novoTotalElement.textContent = `Preço Total: €${totalPreco.toFixed(2)}`;
        elementoCestoProdutos.append(novoTotalElement);
    } else {
        totalElement.textContent = `Preço Total: €${totalPreco.toFixed(2)}`;
    }
}



document.addEventListener('DOMContentLoaded', () => {

    carregarProdutos(produtos)
    carregarCesto();
})
