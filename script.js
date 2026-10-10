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
    { word: "AT", letters: ['A', 'T'] },
    { word: "ET", letters: ['E', 'T'] },
    { word: "TAT", letters: ['T', 'A', 'T'] },
    { word: "ATLA", letters: ['A', 'T', 'L', 'A'] },
    { word: "OL", letters: ['O', 'L'] },
    { word: "MALT", letters: ['M', 'A', 'L', 'T'] }
];

let currentTarget = null;
let currentInput = [];
let score = 0;
let solvedCount = 0;

function initGame() {
    loadNewWord();
    initCanvas();
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
        
        // HAVAİ FİŞEK PATLAT!
        triggerFireworks();
        
        setTimeout(() => {
            loadNewWord();
        }, 1800);
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

/* --- HAVAİ FİŞEK VE PARTİKÜL ANİMASYON SİSTEMİ --- */
let canvas, ctx, particles = [];

function initCanvas() {
    canvas = document.getElementById('fireworksCanvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    loop();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function triggerFireworks() {
    // Ekranda farklı noktalardan 3 adet havai fişek patlat
    for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
        const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
        createFireworkExplosion(x, y);
    }
}

function createFireworkExplosion(x, y) {
    const particleCount = 60;
    const colors = ['#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#8b5cf6', '#eab308'];
    
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 4 + 2,
            decay: Math.random() * 0.015 + 0.01
        });
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // Yerçekimi etkisi
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    requestAnimationFrame(loop);
}

initGame();
