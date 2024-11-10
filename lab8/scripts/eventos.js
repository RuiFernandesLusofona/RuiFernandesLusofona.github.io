// Função para adicionar uma nova fruta à lista
document.getElementById('adicionar-fruta').addEventListener('click', function() {
    const frutaInput = document.getElementById('nova-fruta');
    const novaFruta = frutaInput.value.trim();
    if (novaFruta) {
        const lista = document.getElementById('fruta-list');
        const li = document.createElement('li');
        li.textContent = novaFruta;
        lista.appendChild(li);
        frutaInput.value = '';
    }
});

// Evento de mouseover para destacar a fruta
const listaFrutas = document.getElementById('fruta-list');
listaFrutas.addEventListener('mouseover', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.add('highlight');
    }
});

// Evento de mouseout para remover o destaque
listaFrutas.addEventListener('mouseout', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.remove('highlight');
    }
});

// Evento de click para mostrar um alerta com o nome da fruta
listaFrutas.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        alert('Você clicou na fruta: ' + event.target.textContent);
    }
});

// Evento keydown para alterar a cor do fundo ao pressionar uma tecla
document.addEventListener('keydown', function(event) {
    document.body.style.backgroundColor = event.key === 'r' ? '#ffcccc' : 
                                            event.key === 'g' ? '#ccffcc' : 
                                            event.key === 'b' ? '#ccccff' : 
                                            '#f0f8ff'; // Cor padrão
});

// Evento de mudança no input de nova fruta
document.getElementById('nova-fruta').addEventListener('change', function() {
    alert('O texto foi alterado para: ' + this.value);
});

// Evento submit do formulário (caso queira implementar um formulário)
document.getElementById('nova-fruta').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('adicionar-fruta').click();
        event.preventDefault(); // Impede o comportamento padrão do Enter
    }
});