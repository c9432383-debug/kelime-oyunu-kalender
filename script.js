// 1-5. Sınıf Müfredat Kelimeleri ve Görselleri
const baseWords = [
    // 1. Sınıf
    { word: "LALE", image: "🌷", level: 1 },
    { word: "ELMA", image: "🍎", level: 1 },
    { word: "OKUL", image: "🏫", level: 1 },
    { word: "EV", image: "🏠", level: 1 },
    { word: "KUŞ", image: "🐦", level: 1 },
    { word: "KİTAP", image: "📚", level: 1 },
    { word: "MASA", image: "🪑", level: 1 },
    { word: "KEDİ", image: "🐱", level: 1 },
    { word: "ARABA", image: "🚗", level: 1 },
    { word: "BALIK", image: "🐟", level: 1 },

    // 2. Sınıf
    { word: "ÇİÇEK", image: "🌸", level: 2 },
    { word: "GÜNEŞ", image: "☀️", level: 2 },
    { word: "ÇANTA", image: "🎒", level: 2 },
    { word: "DEFTER", image: "📓", level: 2 },
    { word: "ORMAN", image: "🌲", level: 2 },
    { word: "YILDIZ", image: "⭐", level: 2 },
    { word: "PENCERE", image: "🪟", level: 2 },
    { word: "SİNCAP", image: "🐿️", level: 2 },

    // 3. Sınıf
    { word: "KELEBEK", image: "🦋", level: 3 },
    { word: "ŞEMSİYE", image: "☂️", level: 3 },
    { word: "PAPAĞAN", image: "🦜", level: 3 },
    { word: "KARTAL", image: "🦅", level: 3 },
    { word: "TAVŞAN", image: "🐰", level: 3 },
    { word: "KAPLUMBAĞA", image: "🐢", level: 3 },

    // 4. Sınıf
    { word: "ÖĞRETMEN", image: "👩‍🏫", level: 4 },
    { word: "ARKADAŞ", image: "🤝", level: 4 },
    { word: "MATEMATİK", image: "📐", level: 4 },
    { word: "GÖKYÜZÜ", image: "🌤️", level: 4 },
    { word: "GEZEGEN", image: "🪐", level: 4 },
    { word: "TENEFFÜS", image: "🔔", level: 4 },
    { word: "BAYRAK", image: "🇹🇷", level: 4 },

    // 5. Sınıf
    { word: "KÜTÜPHANE", image: "🏛️", level: 5 },
    { word: "BİLGİSAYAR", image: "💻", level: 5 },
    { word: "CUMHURİYET", image: "🏛️", level: 5 },
    { word: "LABORATUVAR", image: "🔬", level: 5 },
    { word: "TEKNOLOJİ", image: "🤖", level: 5 },
    { word: "GÖKDELEN", image: "🏢", level: 5 },
    { word: "ASTRONOT", image: "👨‍🚀", level: 5 }
];

// Sınırsız kelime üretimi için Türkçe hece oluşturucu parçalar
const vowels = ['A', 'E', 'I', 'İ', 'O', 'Ö', 'U', 'Ü'];
const consonants = ['B', 'C', 'Ç', 'D', 'F', 'G', 'Ğ', 'H', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'Ş', 'T', 'V', 'Y', 'Z'];
const genericEmojis = ['✨', '🌟', '🎯', '🎨', '🧩', '🚀', '💡', '🏆', '⭐', '🎈'];

let currentTarget = null;
let currentInput = [];

// Tarayıcı hafızasından kayıtlı puanları yükle
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

// SINIRSIZ KELİME MOTORU
function loadNewWord() {
    currentInput = [];
    
    // %70 ihtimalle sabit müfredat kelimelerinden, %30 ihtimalle dinamik üretilen kelimelerden seçer
    const isBaseWord = Math.random() < 0.7;

    if (isBaseWord && baseWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * baseWords.length);
        const item = baseWords[randomIndex];
        currentTarget = {
            word: item.word,
            image: item.image,
            level: item.level,
            letters: item.word.split('')
        };
    } else {
        // Rastgele yeni bir heceli kelime oluştur (Sonsuz Mod)
        const generated = generateRandomTurkishWord();
        currentTarget = {
            word: generated.word,
            image: generated.image,
            level: 3,
            letters: generated.word.split('')
        };
    }

    document.getElementById('targetWordText').textContent = currentTarget.word;
    document.getElementById('targetImage').textContent = currentTarget.image;

    renderLetters();
    updateDisplay();
}

// Türkçe kurallarına uygun rastgele kelime üreteci
function generateRandomTurkishWord() {
    const syllableCount = Math.floor(Math.random() * 2) + 2; // 2 veya 3 heceli
    let word = "";

    for (let i = 0; i < syllableCount; i++) {
        const c = consonants[Math.floor(Math.random() * consonants.length)];
        const v = vowels[Math.floor(Math.random() * vowels.length)];
        word += c + v;
    }

    const randomEmoji = genericEmojis[Math.floor(Math.random() * genericEmojis.length)];
    return { word, image: randomEmoji };
}

function renderLetters() {
    const container = document.getElementById('lettersContainer');
    if (!container) return;
    container.innerHTML = '';

    // Harfleri karıştır
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

// TEKER TEKER SİLME (Geri Tuşu)
function clearInput() {
    if (currentInput.length === 0) return;
    
    const lastItem = currentInput.pop();
    const el = document.getElementById(`btn-${lastItem.index}`);
    if (el) {
        el.classList.remove('disabled');
    }
    
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
        score += 10 + (currentTarget.level * 2); 
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

/* --- KADIN SESİ DESTEĞİ --- */
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
