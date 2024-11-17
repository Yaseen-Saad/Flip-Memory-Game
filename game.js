let numCards = 8;
let cards = [];
let flippedCards = [];
let matchedCards = [];
let gameStarted = false;
let gameInterval;
let timer = 60;

let wonCount = 0;
let lostCount = 0;
let abandonedCount = 0;

const cardContainer = document.getElementById('card-container');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const pauseOverlay = document.getElementById('pause-overlay');
const gameStatsOverlay = document.getElementById('game-stats');
const timerBar = document.getElementById('timer-bar');
const wonCountElement = document.getElementById('won-count');
const lostCountElement = document.getElementById('lost-count');
const abandonedCountElement = document.getElementById('abandoned-count');

document.querySelectorAll('.level-btn').forEach(button => {
    button.addEventListener('click', () => {
        numCards = parseInt(button.getAttribute('data-level'));
        startScreen.style.display = 'none';
        gameScreen.style.display = 'grid';
        resetGame();
        startGame();
    });
});

document.getElementById('start-btn').addEventListener('click', () => {
    numCards = 8;
    startScreen.style.display = 'none';
    gameScreen.style.display = 'grid';
    resetGame();
    startGame();
});

document.getElementById('resume-btn').addEventListener('click', () => {
    pauseOverlay.classList.remove('show');
    gameInterval = setInterval(updateTimer, 1000);
});

document.getElementById('reset-btn').addEventListener('click', () => {
    resetGame();
    startGame();
    pauseOverlay.classList.remove('show');
});

document.getElementById('close-stats-btn').addEventListener('click', () => {
    gameStatsOverlay.classList.remove('show');
});

function startGame() {
    gameStarted = true;
    matchedCards = [];
    flippedCards = [];
    cards = generateCards(numCards);

    shuffleArray(cards);

    displayCards(cards);

    timer = 60;
    updateTimer();
    gameInterval = setInterval(updateTimer, 1000);
}

function resetGame() {
    clearInterval(gameInterval);
    timerBar.style.width = '100%';
    cardContainer.innerHTML = '';
    matchedCards = [];
    flippedCards = [];
    gameStarted = false;
}

function updateTimer() {
    timer--;
    const timerPercentage = (timer / 60) * 100;
    timerBar.style.width = timerPercentage + '%';

    if (timer <= 0) {
        endGame(false);
    }
}

function endGame(isWin) {
    clearInterval(gameInterval);
    if (isWin) {
        wonCount++;
        alert('You won!');
    } else {
        lostCount++;
        alert('You lost!');
    }
    updateStats();
    gameStatsOverlay.classList.add('show');
    resetGame();
    location.reload();
}

function updateStats() {
    wonCountElement.textContent = wonCount;
    lostCountElement.textContent = lostCount;
    abandonedCountElement.textContent = abandonedCount;
}

function generateCards(numCards) {
    let cardValues = [];
    let numPairs = numCards / 2;

    for (let i = 1; i <= numPairs; i++) {
        cardValues.push(i, i);
    }

    return cardValues.map(value => {
        return { value: value, flipped: false, matched: false };
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayCards(cards) {
    cardContainer.style.gridTemplateColumns = `repeat(${Math.sqrt(numCards)}, 1fr)`;

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-index', index);

        const flipper = document.createElement('div');
        flipper.classList.add('flipper');

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = '?';

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = card.value;

        flipper.appendChild(front);
        flipper.appendChild(back);
        cardElement.appendChild(flipper);

        cardElement.addEventListener('click', () => flipCard(card, cardElement));

        cardContainer.appendChild(cardElement);
    });
}

function flipCard(card, cardElement) {
    if (card.flipped || card.matched) return;

    card.flipped = true;
    flippedCards.push(card);

    cardElement.classList.add('flipped');

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    const firstCardElement = document.querySelector(`[data-index="${cards.indexOf(firstCard)}"]`);
    const secondCardElement = document.querySelector(`[data-index="${cards.indexOf(secondCard)}"]`);

    if (firstCard.value === secondCard.value) {
        firstCard.matched = true;
        secondCard.matched = true;
        matchedCards.push(firstCard, secondCard);

        if (matchedCards.length === numCards) {
            setTimeout(() => endGame(true), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;

            firstCardElement.classList.remove('flipped');
            secondCardElement.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

function pauseGame() {
    clearInterval(gameInterval);
    pauseOverlay.classList.add('show');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'p') {
        if (gameStarted) {
            pauseGame();
        }
    }
});
