// Genişletilmiş Sınırsız Soru Havuzu
const questions = [
    { clue: "Türkiye'nin başkenti neresidir?", word: "ANKARA", letters: ['K', 'A', 'R', 'A', 'N', 'A'] },
    { clue: "Yaz mevsiminde en çok tüketilen, içi kırmızı dışı yeşil meyve.", word: "KARPUZ", letters: ['Z', 'P', 'R', 'A', 'K', 'U'] },
    { clue: "Bilişim ve yazılım dünyasının vazgeçilmezi, akıllı makineler bilimi.", word: "YAPAY", letters: ['Y', 'P', 'A', 'A', 'Y'] },
    { clue: "Geceleri gökyüzünde parlayan, Dünyamızın uydusu.", word: "AY", letters: ['Y', 'A'] },
    { clue: "Masmavi suların, kumun ve güneşin tadının çıkarıldığı tatil yeri.", word: "SAHİL", letters: ['L', 'İ', 'H', 'A', 'S'] },
    { clue: "Sabahları kahvaltılarda tüketilen kahverengi veya beyaz kabuklu yiyecek.", word: "YUMURTA", letters: ['M', 'U', 'R', 'T', 'A', 'Y', 'U'] },
    { clue: "İstanbul'un iki yakasını birbirine bağlayan boğazdaki asma yapı.", word: "KÖPRÜ", letters: ['Ö', 'P', 'R', 'Ü', 'K'] },
    { clue: "Kış aylarında gökten yağan beyaz, soğuk örtü.", word: "KAR", letters: ['R', 'A', 'K'] },
    { clue: "Bilgi almak için sayfalarını çevirdiğimiz, basılı eser.", word: "KİTAP", letters: ['T', 'P', 'A', 'İ', 'K'] },
    { clue: "Güneş sistemimizin merkezindeki büyük yıldız.", word: "GÜNEŞ", letters: ['Ü', 'N', 'E', 'Ş', 'G'] },
    { clue: "En hızlı koşan, benekli vahşi kedi türü.", word: "ÇİTA", letters: ['İ', 'T', 'A', 'Ç'] },
    { clue: "Bilgisayarda ekranı kontrol etmeye yarayan fare benzeri cihaz.", word: "FARE", letters: ['A', 'R', 'E', 'F'] },
    { clue: "Türkiye'nin en kalabalık ve tarihi metropolü.", word: "İSTANBUL", letters: ['T', 'A', 'N', 'B', 'U', 'L', 'İ', 'S'] },
    { clue: "Geceleri karanlığı aydınlatan gök cismi.", word: "YILDIZ", letters: ['Y', 'I', 'L', 'D', 'I', 'Z'] },
    { clue: "Kahve yan ikramı olarak bilinen, Türk mutfağının geleneksel tatlısı.", word: "LOKUM", letters: ['L', 'O', 'K', 'U', 'M'] },
    { clue: "Doğanın uyanışını müjdeleyen, çiçeklerin açtığı mevsim.", word: "BAHAR", letters: ['B', 'A', 'H', 'A', 'R'] }
];

let currentQuestion = null;
let solvedCount = 0;
let currentInput = [];
let score = 0;
let timeLeft = 20;
let timerInterval;

function initGame() {
    loadRandomQuestion();
    startTimer();
}

function loadRandomQuestion() {
    currentInput = [];
    timeLeft = 20;
    
    const timerEl = document.getElementById('timer');
    if(timerEl) timerEl.textContent = timeLeft + 's';
    
    const countEl = document.getElementById('solvedCount');
    if(countEl) countEl.textContent = solvedCount;

    // Havuzdan rastgele soru seç
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    
    const clueEl = document.getElementById('clueText');
    if(clueEl) clueEl.textContent = currentQuestion.clue;
    
    renderLetters();
    updateDisplay();
}

function renderLetters() {
    const container = document.getElementById('lettersContainer');
    if (!container) return;
    container.innerHTML = '';
    
    // Harfleri karıştırarak butonlar oluştur
    const shuffledLetters = [...currentQuestion.letters].sort(() => Math.random() - 0.5);
    
    shuffledLetters.forEach((letter, index) => {
        const btn = document.createElement('button');
        btn.classList.add('letter-btn');
        btn.textContent = letter;
        btn.id = `btn-${index}`;
        btn.onclick = () => selectLetter(letter, index);
        container.appendChild(btn);
    });
}

function shuffleLetters() {
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
    const display = document.getElementById('wordDisplay');
    if (!display) return;
    if (currentInput.length === 0) {
        display.textContent = '_ '.repeat(currentQuestion.word.length).trim();
    } else {
        display.textContent = currentInput.map(item => item.letter).join(' ');
    }
}

function useHint() {
    if (score < 10) {
        showMessage('Yetersiz Puan!');
        return;
    }
    score -= 10;
    const scoreEl = document.getElementById('score');
    if(scoreEl) scoreEl.textContent = score;

    const currentWordSoFar = currentInput.map(i => i.letter).join('');
    const nextCharIndex = currentWordSoFar.length;
    
    if (nextCharIndex < currentQuestion.word.length) {
        const targetChar = currentQuestion.word[nextCharIndex];
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
    
    if (word === currentQuestion.word) {
        const gainedScore = timeLeft * 5 + 20;
        score += gainedScore;
        solvedCount++;
        
        const scoreEl = document.getElementById('score');
        if(scoreEl) scoreEl.textContent = score;
        
        showMessage(`Doğru! +${gainedScore} Puan 🎉`);
        
        // Zamanı sıfırla ve hemen yeni rastgele soruya geç
        clearInterval(timerInterval);
        setTimeout(() => {
            loadRandomQuestion();
            startTimer();
        }, 1200);
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
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    const mainEl = document.querySelector('main');
    if(mainEl) {
        mainEl.innerHTML = `
            <div style="text-align: center; padding: 40px 0;">
                <h2 style="color: #fbbf24; font-size: 2rem; margin-bottom: 16px;">SÜRE BİTTİ! ⌛</h2>
                <p style="font-size: 1.1rem; color: #9ca3af; margin-bottom: 8px;">Toplam Çözülen: <strong style="color:#38bdf8;">${solvedCount} Kelime</strong></p>
                <p style="font-size: 1.2rem; color: #9ca3af; margin-bottom: 24px;">Toplam Puanınız: <strong style="color:#10b981;">${score}</strong></p>
                <button class="btn btn-primary" onclick="location.reload()">Tekrar Oyna</button>
            </div>
        `;
    }
}

initGame();
