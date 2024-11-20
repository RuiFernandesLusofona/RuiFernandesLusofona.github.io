import { produtos } from './produtos.js';

const listaProdutos = document.querySelector("produtos")

function criarProduto(produto) {
    
}

function carregarProdutos(produtos) {
    produtos.forEach(produto => {

        criarProduto(produto)
        listaProdutos.append(criarProduto(produto))
    })
}

document.addEventListener('DOMContentLoaded', () => {

    carregarProdutos(produtos)
})

