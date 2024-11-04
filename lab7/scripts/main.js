const elemento_mudar = document.querySelector('.mudar')
function mudar_texto() {
   if (elemento_mudar.textContent == "Obrigado por passares!") {
      elemento_mudar.textContent = "Passa por aqui!"
   }
   else {
      elemento_mudar.textContent = "Obrigado por passares!"
   }
}
elemento_mudar.addEventListener('mouseover', mudar_texto)
elemento_mudar.addEventListener('mouseout', mudar_texto)


const elemento_pintar = document.querySelector('.pintar');
const botao_red = document.querySelector('.red');
const botao_green = document.querySelector('.green');
const botao_blue = document.querySelector('.blue');
function pintar_red() {
   elemento_pintar.style.color = 'red';
}
botao_red.addEventListener('click', pintar_red)

function pintar_green() {
   elemento_pintar.style.color = 'green';
}
botao_green.addEventListener('click', pintar_green)

function pintar_blue() {
   elemento_pintar.style.color = 'blue';
}
botao_blue.addEventListener('click', pintar_blue)

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

const elemento_bgColor = document.querySelector('#bgColor');
const submitButton = document.querySelector('.submitButton');
function colorir_background() {
   const corEscolhida = elemento_bgColor.value;
   document.body.style.backgroundColor = corEscolhida;
}
submitButton.addEventListener('click', colorir_background);

const contarButton = document.querySelector('.contar');
const element_numero = document.querySelector('.number');
function contar_click(){
   let numeroAtual = parseInt(element_numero.textContent);
   numeroAtual += 1;
   element_numero.textContent = numeroAtual
}
contarButton.addEventListener('click', contar_click);
