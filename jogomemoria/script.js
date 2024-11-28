const animals = [
    'baleia.png', 'baleia.png',
    'coala.png', 'coala.png',
    'elefante.png', 'elefante.png',
    'gato.png', 'gato.png',
    'girafa.png', 'girafa.png',
    'jacare.png', 'jacare.png',
    'leao.png', 'leao.png',
    'macaco.png', 'macaco.png',
    'panda.png', 'panda.png',
    'urso.png', 'urso.png'
];

let flippedCards = []; // Armazena as cartas viradas
let matchedCards = []; // Armazena as cartas que foram correspondidas
let attempts = 0; // Contador de tentativas
let gameOver = false; // Flag para verificar se o jogo foi finalizado

// Função para embaralhar as cartas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
}

// Função para gerar as cartas no HTML
function generateCards() {
    const gameBoard = document.querySelector('.game-board');
    
    // Limpa as cartas anteriores do tabuleiro
    gameBoard.innerHTML = '';

    // Resetando o estado do jogo
    matchedCards = [];
    flippedCards = [];
    attempts = 0;
    gameOver = false; // Jogo ainda não foi finalizado

    shuffleArray(animals); // Embaralha as cartas

    // Cria as 20 cartas
    animals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('card'); 
        card.classList.add('shuffle-animation'); 
        card.setAttribute('data-animal', animal); // Adiciona o nome do animal como atributo

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.style.backgroundImage = `url('carta.png')`;

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.style.backgroundImage = `url('${animal}')`;

        card.appendChild(cardBack);
        card.appendChild(cardFront);

        // Adiciona o evento de clique nas cartas
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    // Adiciona a animação de embaralhamento
    setTimeout(() => {
        gameBoard.classList.remove('shuffle-animation'); // Remove a animação após o tempo
    }, 1000); // Tempo da animação
}

// Função para virar a carta
function flipCard(event) {
    if (gameOver) return; // Se o jogo acabou, não permite mais virar cartas

    const clickedCard = event.target.closest('.card');
    
    // Evita clicar em cartas já combinadas ou clicadas mais de uma vez
    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped') || matchedCards.includes(clickedCard)) {
        return;
    }

    // Adiciona a classe 'flipped' para virar a carta
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    // Se duas cartas estiverem viradas, verifica a correspondência
    if (flippedCards.length === 2) {
        attempts++; // Aumenta a contagem de tentativas
        setTimeout(checkMatch, 1000); // Aguarda 1 segundo para verificar
    }
}

// Função para verificar se as cartas viradas correspondem
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-animal') === card2.getAttribute('data-animal')) {
        // Se as cartas combinarem, adiciona à lista de cartas combinadas
        matchedCards.push(card1, card2);
    } else {
        // Se as cartas não combinarem, vira as cartas de volta
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = []; // Reseta o array de cartas viradas

    // Verifica se o jogo foi concluído (todas as cartas combinadas)
    if (matchedCards.length === animals.length) {
        gameOver = true; // Marca o jogo como finalizado
        alert(`Parabéns! Você completou o jogo em ${attempts} tentativas.`);
    }
}

// Adiciona o evento de clique ao botão para embaralhar
document.getElementById('shuffleButton').addEventListener('click', generateCards);

// Gera as cartas quando a página for carregada
window.onload = generateCards;
