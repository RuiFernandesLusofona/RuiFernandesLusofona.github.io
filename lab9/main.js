import {produtos} from './produtos.js';

const listaProdutos = document.querySelector("produtos")

document.addEventListener('DOMContentLoaded', () => {
    produtos.forEach(produto => {

        criarProduto(produto)
        listaProdutos.append(criarArticle(produto))

    })
})  