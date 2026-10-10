const questions = [
    {
        clue: "Türkiye'nin başkenti neresidir?",
        word: "ANKARA",
        letters: ['K', 'A', 'R', 'A', 'N', 'A']
    },
    {
        clue: "Yaz mevsiminde en çok tüketilen, içi kırmızı dışı yeşil meyve.",
        word: "KARPUZ",
        letters: ['Z', 'P', 'R', 'A', 'K', 'U']
    },
    {
        clue: "Bilişim ve yazılım dünyasının vazgeçilmezi, akıllı makineler bilimi.",
        word: "YAPAY",
        letters: ['Y', 'P', 'A', 'A', 'Y']
    },
    {
        clue: "Geceleri gökyüzünde parlayan, Dünyamızın uydusu.",
        word: "AY",
        letters: ['Y', 'A']
    },
    {
        clue: "Masmavi suların, kumun ve güneşin tadının çıkarıldığı tatil yeri.",
        word: "SAHİL",
        letters: ['L', 'İ', 'H', 'A', 'S']
    }
];

let currentQuestionIndex = 0;
let currentInput = [];
let score = 0;
let timeLeft = 20;
let timerInterval;

function initGame() {
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    currentInput = [];
    timeLeft = 20;
    
    const timerEl = document.getElementById('timer');
    if(timerEl) timerEl.textContent = timeLeft + 's';
    
    const qNumEl = document.getElementById('questionNum');
    if(qNumEl) qNumEl.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
    
    const q = questions[currentQuestionIndex];
    const clueEl = document.getElementById('clueText');
    if(clueEl) clueEl.textContent = q.clue;
    
    renderLetters();
    updateDisplay();
    startTimer();
}

function renderLetters() {
    const container = document.getElementById('lettersContainer');
    if (!container) return;
    container.innerHTML = '';
    const q = questions[currentQuestionIndex];
    
    q.letters.forEach((letter, index) => {
        const btn = document.createElement('button');
        btn.classList.add('letter-btn');
        btn.textContent = letter;
        btn.id = `btn-${index}`;
        btn.onclick = () => selectLetter(letter, index);
        container.appendChild(btn);
    });
}

function shuffleLetters() {
    const q = questions[currentQuestionIndex];
    q.letters.sort(() => Math.random() - 0.5);
    renderLetters();
    clearInput();
}

function selectLetter(letter, index) {
    currentInput.push({ letter, index });
    const btn = document.getElementById(`btn-${index}`);
    if(btn) btn.classList.add('disabled');
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
    const q = questions[currentQuestionIndex];
    const display = document.getElementById('wordDisplay');
    if (!display) return;
    if (currentInput.length === 0) {
        display.textContent = '_ '.repeat(q.word.length).trim();
    } else {
        display.textContent = currentInput.map(item => item.letter).join(' ');
    }
}

function useHint() {
    const q = questions[currentQuestionIndex];
    if (score < 10) {
        showMessage('Yetersiz Puan!');
        return;
    }
    score -= 10;
    const scoreEl = document.getElementById('score');
    if(scoreEl) scoreEl.textContent = score;

    const currentWordSoFar = currentInput.map(i => i.letter).join('');
    const nextCharIndex = currentWordSoFar.length;
    
    if (nextCharIndex < q.word.length) {
        const targetChar = q.word[nextCharIndex];
        const btnElements = document.querySelectorAll('.letter-btn');
        for (let btn of btnElements) {
            if (btn.textContent === targetChar && !btn.classList.contains('disabled')) {
                const btnId = parseInt(btn.id.replace('btn-', ''));
                selectLetter(targetChar, btnId);
                break;
            }
        }
    }
}

function submitWord() {
    const word = currentInput.map(item => item.letter).join('');
    const q = questions[currentQuestionIndex];
    
    if (word === q.word) {
        clearInterval(timerInterval);
        const gainedScore = timeLeft * 5 + 20;
        score += gainedScore;
        const scoreEl = document.getElementById('score');
        if(scoreEl) scoreEl.textContent = score;
        showMessage(`Doğru! +${gainedScore} Puan 🎉`);
        
        currentQuestionIndex++;
        setTimeout(loadQuestion, 1500);
    } else {
        showMessage('Yanlış kelime, tekrar dene!');
    }
}

function showMessage(msg) {
    const msgBox = document.getElementById('message');
    if(msgBox) {
        msgBox.textContent = msg;
        setTimeout(() => {
            msgBox.textContent = '';
        }, 1500);
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        const timerEl = document.getElementById('timer');
        if(timerEl) timerEl.textContent = timeLeft + 's';

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showMessage('Süre Bitti! Diğer soruya geçiliyor...');
            currentQuestionIndex++;
            setTimeout(loadQuestion, 1500);
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    const mainEl = document.querySelector('main');
    if(mainEl) {
        mainEl.innerHTML = `
            <div style="text-align: center; padding: 40px 0;">
                <h2 style="color: #fbbf24; font-size: 2rem; margin-bottom: 16px;">OYUN BİTTİ! 🏆</h2>
                <p style="font-size: 1.2rem; color: #9ca3af; margin-bottom: 24px;">Toplam Puanınız: <strong style="color:#10b981;">${score}</strong></p>
                <button class="btn btn-primary" onclick="location.reload()">Tekrar Oyna</button>
            </div>
        `;
    }
}

// Doğrudan başlat (Bekleme yapmadan direkt çalışır)
initGame();
