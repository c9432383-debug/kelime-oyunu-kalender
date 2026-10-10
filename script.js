// Görsel destekli 1. ve 2. sınıf kelimeleri
const learningWords = [
    { word: "LALE", image: "🌷", letters: ['L', 'A', 'L', 'E'] },
    { word: "ELMA", image: "🍎", letters: ['E', 'L', 'M', 'A'] },
    { word: "OKUL", image: "🏫", letters: ['O', 'K', 'U', 'L'] },
    { word: "KİTAP", image: "📚", letters: ['K', 'İ', 'T', 'A', 'P'] },
    { word: "ÇİÇEK", image: "🌸", letters: ['Ç', 'İ', 'Ç', 'E', 'K'] },
    { word: "KELEBEK", image: "🦋", letters: ['K', 'E', 'L', 'E', 'B', 'E', 'K'] },
    { word: "ARABA", image: "🚗", letters: ['A', 'R', 'A', 'B', 'A'] },
    { word: "GÜNEŞ", image: "☀️", letters: ['G', 'Ü', 'N', 'E', 'Ş'] },
    { word: "YILDIZ", image: "⭐", letters: ['Y', 'I', 'L', 'D', 'I', 'Z'] },
    { word: "BALIK", image: "🐟", letters: ['B', 'A', 'L', 'I', 'K'] },
    { word: "KUŞ", image: "🐦", letters: ['K', 'U', 'Ş'] },
    { word: "EV", image: "🏠", letters: ['E', 'V'] },
    { word: "ÇANTA", image: "🎒", letters: ['Ç', 'A', 'N', 'T', 'A'] },
    { word: "DEFTER", image: "📓", letters: ['D', 'E', 'F', 'T', 'E', 'R'] }
];

let currentTarget = null;
let currentInput = [];

// Tarayıcı hafızasından puanları çek (Sıfırlanmasın diye)
let score = parseInt(localStorage.getItem('minikOkur_score')) || 0;
let solvedCount = parseInt(localStorage.getItem('minikOkur_solved')) || 0;
let wrongCount = parseInt(localStorage.getItem('minikOkur_wrong')) || 0;

function initGame() {
    updateStatsDisplay();
    loadNewWord();
    initCanvas();
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
    }
}

function updateStatsDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('solvedCount').textContent = solvedCount;
    document.getElementById('wrongCount').textContent = wrongCount;
    
    // Hafızaya kaydet
    localStorage.setItem('minikOkur_score', score);
    localStorage.setItem('minikOkur_solved', solvedCount);
    localStorage.setItem('minikOkur_wrong', wrongCount);
}

function resetStats() {
    if (confirm('Tüm puanlar sıfırlansın mı?')) {
        score = 0;
        solvedCount = 0;
        wrongCount = 0;
        updateStatsDisplay();
    }
}

function loadNewWord() {
    currentInput = [];
    const randomIndex = Math.floor(Math.random() * learningWords.length);
    currentTarget = learningWords[randomIndex];

    document.getElementById('targetWordText').textContent = currentTarget.word;
    document.getElementById('targetImage').textContent = currentTarget.image;

    renderLetters();
    updateDisplay();
}

function renderLetters() {
    const container = document.getElementById('lettersContainer');
    if (!container) return;
    container.innerHTML = '';

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
    if (!display) return;
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
        updateStatsDisplay();
        
        showMessage('Harikasın! Aferin sana! 👍🎉');
        speakText('Tebrikler!');
        triggerLikeFireworks();
        
        setTimeout(() => {
            loadNewWord();
        }, 1800);
    } else {
        wrongCount++;
        updateStatsDisplay();
        
        showMessage('Tekrar dene, başarabilirsin! 💪');
        speakText('Aaaaaa');
        clearInput();
    }
}

function showMessage(msg) {
    const msgBox = document.getElementById('message');
    if (msgBox) {
        msgBox.textContent = msg;
        setTimeout(() => {
            msgBox.textContent = '';
        }, 1500);
    }
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'tr-TR';
        utterance.rate = 0.95; 
        utterance.pitch = 1.8; 

        const voices = window.speechSynthesis.getVoices();
        const turkishVoices = voices.filter(v => v.lang.includes('tr') || v.lang.includes('TR'));
        
        const femaleVoice = turkishVoices.find(v => {
            const name = v.name.toLowerCase();
            return name.includes('female') || 
                   name.includes('kadın') || 
                   name.includes('filiz') || 
                   name.includes('yelda') || 
                   name.includes('ece') || 
                   name.includes('cemre') || 
                   name.includes('deniz') || 
                   name.includes('seda');
        });

        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }

        window.speechSynthesis.speak(utterance);
    }
}

/* --- LIKE (👍) ANİMASYON SİSTEMİ --- */
let canvas, ctx, particles = [];

function initCanvas() {
    canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    loop();
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function triggerLikeFireworks() {
    if (!canvas) return;
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
        const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.2;
        createLikeParticle(x, y);
    }
}

function createLikeParticle(x, y) {
    const count = 12;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2,
            alpha: 1,
            size: Math.random() * 20 + 24,
            decay: Math.random() * 0.015 + 0.01
        });
    }
}

function loop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.font = `${p.size}px sans-serif`;
        ctx.fillText('👍', p.x, p.y);
        ctx.restore();
    }

    requestAnimationFrame(loop);
}

initGame();
