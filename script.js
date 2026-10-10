// 1. Sınıftan 5. Sınıfa Kadar Aşamalı Kelime ve Görsel Havuzu
const learningWords = [
    // --- 1. SINIF SEVİYESİ (Temel Sesler ve Heceler) ---
    { word: "LALE", image: "🌷", level: 1, letters: ['L', 'A', 'L', 'E'] },
    { word: "ELMA", image: "🍎", level: 1, letters: ['E', 'L', 'M', 'A'] },
    { word: "OKUL", image: "🏫", level: 1, letters: ['O', 'K', 'U', 'L'] },
    { word: "EV", image: "🏠", level: 1, letters: ['E', 'V'] },
    { word: "KUŞ", image: "🐦", level: 1, letters: ['K', 'U', 'Ş'] },
    { word: "KİTAP", image: "📚", level: 1, letters: ['K', 'İ', 'T', 'A', 'P'] },
    { word: "MASA", image: "🪑", level: 1, letters: ['M', 'A', 'S', 'A'] },
    { word: "KEDİ", image: "🐱", level: 1, letters: ['K', 'E', 'D', 'İ'] },

    // --- 2. SINIF SEVİYESİ (Okul ve Çevre) ---
    { word: "ÇİÇEK", image: "🌸", level: 2, letters: ['Ç', 'İ', 'Ç', 'E', 'K'] },
    { word: "ARABA", image: "🚗", level: 2, letters: ['A', 'R', 'A', 'B', 'A'] },
    { word: "GÜNEŞ", image: "☀️", level: 2, letters: ['G', 'Ü', 'N', 'E', 'Ş'] },
    { word: "BALIK", image: "🐟", level: 2, letters: ['B', 'A', 'L', 'I', 'K'] },
    { word: "ÇANTA", image: "🎒", level: 2, letters: ['Ç', 'A', 'N', 'T', 'A'] },
    { word: "DEFTER", image: "📓", level: 2, letters: ['D', 'E', 'F', 'T', 'E', 'R'] },
    { word: "ORMAN", image: "🌲", level: 2, letters: ['O', 'R', 'M', 'A', 'N'] },

    // --- 3. SINIF SEVİYESİ (Doğa ve Kavramlar) ---
    { word: "KELEBEK", image: "🦋", level: 3, letters: ['K', 'E', 'L', 'E', 'B', 'E', 'K'] },
    { word: "YILDIZ", image: "⭐", level: 3, letters: ['Y', 'I', 'L', 'D', 'I', 'Z'] },
    { word: "PENCERE", image: "🪟", level: 3, letters: ['P', 'E', 'N', 'C', 'E', 'R', 'E'] },
    { word: "SİNCAP", image: "🐿️", level: 3, letters: ['S', 'İ', 'N', 'C', 'A', 'P'] },
    { word: "ŞEMSİYE", image: "☂️", level: 3, letters: ['Ş', 'E', 'M', 'S', 'İ', 'Y', 'E'] },
    { word: "PAPAĞAN", image: "🦜", level: 3, letters: ['P', 'A', 'P', 'A', 'Ğ', 'A', 'N'] },
    { word: "KARTAL", image: "🦅", level: 3, letters: ['K', 'A', 'R', 'T', 'A', 'L'] },

    // --- 4. SINIF SEVİYESİ (Dersler, Bilim ve Değerler) ---
    { word: "ÖĞRETMEN", image: "👩‍🏫", level: 4, letters: ['Ö', 'Ğ', 'R', 'E', 'T', 'M', 'E', 'N'] },
    { word: "ARKADAŞ", image: "🤝", level: 4, letters: ['A', 'R', 'K', 'A', 'D', 'A', 'Ş'] },
    { word: "MATEMATİK", image: "📐", level: 4, letters: ['M', 'A', 'T', 'E', 'M', 'A', 'T', 'İ', 'K'] },
    { word: "GÖKYÜZÜ", image: "🌤️", level: 4, letters: ['G', 'Ö', 'K', 'Y', 'Ü', 'Z', 'Ü'] },
    { word: "GEZEGEN", image: "🪐", level: 4, letters: ['G', 'E', 'Z', 'E', 'G', 'E', 'N'] },
    { word: "TENEFFÜS", image: "🔔", level: 4, letters: ['T', 'E', 'N', 'E', 'F', 'F', 'Ü', 'S'] },
    { word: "BAYRAK", image: "🇹🇷", level: 4, letters: ['B', 'A', 'Y', 'R', 'A', 'K'] },

    // --- 5. SINIF SEVİYESİ (Ortaokul Başlangıcı ve Genel Kültür) ---
    { word: "KÜTÜPHANE", image: "🏛️", level: 5, letters: ['K', 'Ü', 'T', 'Ü', 'P', 'H', 'A', 'N', 'E'] },
    { word: "BİLGİSAYAR", image: "💻", level: 5, letters: ['B', 'İ', 'L', 'G', 'İ', 'S', 'A', 'Y', 'A', 'R'] },
    { word: "CUMHURİYET", image: "🏛️", level: 5, letters: ['C', 'U', 'M', 'H', 'U', 'R', 'İ', 'Y', 'E', 'T'] },
    { word: "LABORATUVAR", image: "🔬", level: 5, letters: ['L', 'A', 'B', 'O', 'R', 'A', 'T', 'U', 'V', 'A', 'R'] },
    { word: "TEKNOLOJİ", image: "🤖", level: 5, letters: ['T', 'E', 'K', 'N', 'O', 'L', 'O', 'J', 'İ'] },
    { word: "GÖKDELEN", image: "🏢", level: 5, letters: ['G', 'Ö', 'K', 'D', 'E', 'L', 'E', 'N'] },
    { word: "ASTRONOT", image: "👨‍🚀", level: 5, letters: ['A', 'S', 'T', 'R', 'O', 'N', 'O', 'T'] }
];

let currentTarget = null;
let currentInput = [];

// Tarayıcı hafızasından puanları çek
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
        score += 10 + (currentTarget.level * 2); // Seviye arttıkça daha çok puan
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
