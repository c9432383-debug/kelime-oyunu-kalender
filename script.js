// Örnek Kelime Havuzu ve Ayarlar
const targetLetters = ['A', 'L', 'M', 'A', 'K', 'S'];
const validWords = ['ELMA', 'ALMAK', 'MASA', 'KAS', 'LAMA', 'KALA', 'SALA', 'MALA', 'AKSA', 'ALMA'];

let currentInput = [];
let score = 0;
let timeLeft = 60;
let timerInterval;

const wordDisplay = document.getElementById('wordDisplay');
const lettersContainer = document.getElementById('lettersContainer');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const messageBox = document.getElementById('message');

function initGame() {
    renderLetters();
    startTimer();
    updateDisplay();
}

function renderLetters() {
    lettersContainer.innerHTML = '';
    targetLetters.forEach((letter, index) => {
        const btn = document.createElement('button');
        btn.classList.add('letter-btn');
        btn.textContent = letter;
        btn.id = `btn-${index}`;
        btn.onclick = () => selectLetter(letter, index);
        lettersContainer.appendChild(btn);
    });
}

function selectLetter(letter, index) {
    currentInput.push({ letter, index });
    document.getElementById(`btn-${index}`).classList.add('disabled');
    updateDisplay();
}

function clearInput() {
    currentInput.forEach(item => {
        document.getElementById(`btn-${item.index}`).classList.remove('disabled');
    });
    currentInput = [];
    updateDisplay();
}

function updateDisplay() {
    if (currentInput.length === 0) {
        wordDisplay.textContent = '_ '.repeat(4).trim();
    } else {
        wordDisplay.textContent = currentInput.map(item => item.letter).join('');
    }
}

function submitWord() {
    const word = currentInput.map(item => item.letter).join('');
    
    if (word.length < 2) {
        showMessage('Çok kısa!');
        return;
    }

    if (validWords.includes(word)) {
        const gainedScore = word.length * 10;
        score += gainedScore;
        scoreDisplay.textContent = score;
        showMessage(`Tebrikler! +${gainedScore} Puan`);
    } else {
        showMessage('Geçersiz kelime!');
    }

    clearInput();
}

function showMessage(msg) {
    messageBox.textContent = msg;
    setTimeout(() => {
        messageBox.textContent = '';
    }, 1500);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showMessage('Süre Bitti! Toplam Puan: ' + score);
            disableAll();
        }
    }, 1000);
}

function disableAll() {
    document.querySelectorAll('.letter-btn, .btn').forEach(btn => {
        btn.disabled = true;
    });
}

window.onload = initGame;
