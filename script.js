// 1. Sınıf ilk okuma yazma gruplarına (E, L, A, K, İ, N, O, M, U, T) uygun kelimeler
const learningWords = [
    { word: "EL", letters: ['E', 'L'] },
    { word: "AL", letters: ['A', 'L'] },
    { word: "LA", letters: ['L', 'A'] },
    { word: "AN", letters: ['A', 'N'] },
    { word: "ALA", letters: ['A', 'L', 'A'] },
    { word: "LALE", letters: ['L', 'A', 'L', 'E'] },
    { word: "KALA", letters: ['K', 'A', 'L', 'A'] },
    { word: "KALE", letters: ['K', 'A', 'L', 'E'] },
    { word: "KEL", letters: ['K', 'E', 'L'] },
    { word: "LAK", letters: ['L', 'A', 'K'] },
    { word: "KANA", letters: ['K', 'A', 'N', 'A'] },
    { word: "KNALI", letters: ['K', 'A', 'N', 'A', 'L'] },
    { word: "AT", letters: ['A', 'T'] },
    { word: "ET", letters: ['E', 'T'] },
    { word: "TAT", letters: ['T', 'A', 'T'] },
    { word: "ATLA", letters: ['A', 'T', 'L', 'A'] },
    { word: "OL", letters: ['O', 'L'] },
    { word: "OLT", letters: ['O', 'L', 'T'] },
    { word: "MALT", letters: ['M', 'A', 'L', 'T'] }
];

let currentTarget = null;
let currentInput = [];
let score = 0;
let solvedCount = 0;

function initGame() {
    loadNewWord();
}

function loadNewWord() {
    currentInput = [];
    const randomIndex = Math.floor(Math.random() * learningWords.length);
    currentTarget = learningWords[randomIndex];

    document.getElementById('targetWordText').textContent = currentTarget.word;
    document.getElementById('solvedCount').textContent = solvedCount;
    document.getElementById('score').textContent = score;

    renderLetters();
    updateDisplay();
}

function renderLetters() {
    const container = document.getElementById('lettersContainer');
    container.innerHTML = '';

    // Harfleri karıştırarak butonlar oluştur
    const shuffledLetters = [...currentTarget.letters].sort(() => Math.random() - 0.5);

    shuffledLetters.forEach((letter, index) => {
        const btn = document.createElement('button');
        btn.classList.add('letter-btn');
        btn.textContent = letter;
        btn.id = `btn-${index}`;
        btn.onclick = () => selectLetter(letter, index);
        container.appendChild(btn);
    });
}

function selectLetter(letter, index) {
    currentInput.push({ letter, index });
    const btn = document.getElementById(`btn-${index}`);
    if (btn) btn.classList.add('disabled');
    updateDisplay();
}

function clearInput() {
    currentInput.forEach(item => {
        const el = document.getElementById(`btn-${item.index}`);
        if (el) el.classList.remove('disabled');
    });
    currentInput = [];
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('wordDisplay');
    if (currentInput.length === 0) {
        display.textContent = '_ '.repeat(currentTarget.word.length).trim();
    } else {
        display.textContent = currentInput.map(item => item.letter).join(' ');
    }
}

function submitWord() {
    const word = currentInput.map(item => item.letter).join('');

    if (word === currentTarget.word) {
        score += 10;
        solvedCount++;
        showMessage('Harikasın! Aferin sana! 🌟🎉');
        
        setTimeout(() => {
            loadNewWord();
        }, 1500);
    } else {
        showMessage('Tekrar dene, başarabilirsin! 💪');
        clearInput();
    }
}

function showMessage(msg) {
    const msgBox = document.getElementById('message');
    msgBox.textContent = msg;
    setTimeout(() => {
        msgBox.textContent = '';
    }, 1500);
}

initGame();
