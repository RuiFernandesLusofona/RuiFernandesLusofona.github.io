
// 1
const elementoMudar = document.querySelector('.mudar');
const mudarTexto = () => {
   elementoMudar.textContent =
      elementoMudar.textContent === "Obrigado por passares!"
         ? "Passa por aqui!"
         : "Obrigado por passares!";
};

elementoMudar.addEventListener('mouseover', mudarTexto);
elementoMudar.addEventListener('mouseout', mudarTexto);


// 2
const elemento_pintar = document.querySelector('.pintar');
const botoes = document.querySelectorAll('.botao');

botoes.forEach((botao) => {
   botao.addEventListener('click', () => {
      const cor = botao.dataset.color; // Acessa o valor do data-color
      elemento_pintar.style.color = cor; // Aplica a cor ao elemento
   });
});


// 3
const elemento_random = document.querySelector('#random');
function colorir_random() {
   // Define o valor mínimo para cada componente (quanto maior, mais clara a cor)
   const minimo = 128;

   // Gera componentes de cor RGB com valores aleatórios entre minimo e 255
   const r = minimo + Math.floor(Math.random() * (256 - minimo));
   const g = minimo + Math.floor(Math.random() * (256 - minimo));
   const b = minimo + Math.floor(Math.random() * (256 - minimo));

   // Converte os valores RGB para o formato hexadecimal
   const cor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
   elemento_random.style.backgroundColor = cor;
}
elemento_random.addEventListener('keydown', colorir_random)


// 4
document.querySelector('select').onchange = function () {
   document.querySelector('body').style.backgroundColor = this.value;
}

// 5
const contarButton = document.querySelector('.contar');
const element_numero = document.querySelector('.number');

let numeroAtual = parseInt(localStorage.getItem('contador')) || 0;
element_numero.textContent = numeroAtual;

function contar_click() {
   numeroAtual += 1;
   element_numero.textContent = numeroAtual;

   localStorage.setItem('contador', numeroAtual);
}

contarButton.addEventListener('click', contar_click);

// 6
document.querySelector('form').onsubmit = (e) => {
   e.preventDefault();

   const nome = document.querySelector('#nome').value;
   const idade = document.querySelector('#idade').value;

   const mensagem = `Olá, o ${nome} tem ${idade}!`;
   document.querySelector('#mensagem').innerText = mensagem;
};

// 7
let counter = 0;

function count() {
   counter++;
   document.getElementById("counterDisplay").innerText = counter;
}

setInterval(count, 1000);
