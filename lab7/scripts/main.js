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

