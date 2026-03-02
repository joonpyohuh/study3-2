/**
 * Heo Junpyo Portfolio - Main JS
 * Includes: Weather, Three.js Animation, AI Sentiment, Fortune Teller
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollAnimations();
    initThreeJS();
    initWeather();
    initFortuneTeller();
    initGuestbook();
});

// --- Theme Management ---
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        // Notify Three.js if needed
    });
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const observerOptions = { threshold: 0.15 };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'var(--shadow)';
        }
    });
}

// --- Three.js Hero Animation ---
function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Geometry: A wireframe torus knot for a modern look
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    // Wireframe particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x3b82f6
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    camera.position.z = 30;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        if (mouseX > 0) {
            particlesMesh.rotation.y = mouseX * 0.0001;
            particlesMesh.rotation.x = -mouseY * 0.0001;
        }

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}

// --- Weather Feature ---
async function initWeather() {
    const weatherHeader = document.getElementById('weather-header');
    const weatherDetail = document.getElementById('weather-detail');

    try {
        // Fetch weather for Seoul (default) using wttr.in JSON format
        const response = await fetch('https://wttr.in/Seoul?format=j1');
        const data = await response.json();
        
        const current = data.current_condition[0];
        const temp = current.temp_C;
        const desc = current.weatherDesc[0].value;
        const weatherCode = current.weatherCode;

        // Map weather code to Emoji
        const emojiMap = {
            '113': '☀️', // Sunny
            '116': '⛅', // Partly cloudy
            '119': '☁️', // Cloudy
            '122': '☁️', // Overcast
            '143': '🌫️', // Mist
            '176': '🌦️', // Patchy rain possible
            '200': '⛈️', // Thundery outbreaks possible
            'default': '🌡️'
        };
        const emoji = emojiMap[weatherCode] || emojiMap['default'];

        // Inject into Header
        weatherHeader.innerHTML = `<span>${emoji} Seoul ${temp}°C</span>`;

        // Inject into Hero Detail
        weatherDetail.innerHTML = `
            <div class="weather-icon">${emoji}</div>
            <div class="weather-info">
                <h3>Today's Weather in Seoul</h3>
                <p>${desc}</p>
                <div class="weather-temp">${temp}°C</div>
            </div>
        `;
    } catch (error) {
        console.error('Weather Fetch Error:', error);
        weatherHeader.innerHTML = '<span>🌡️ Seoul (Offline)</span>';
        weatherDetail.style.display = 'none';
    }
}

// --- Fortune Teller ---
function initFortuneTeller() {
    const fortuneText = document.getElementById('fortune-text');
    const fortuneBtn = document.getElementById('get-fortune');

    const fortunes = [
        "오늘은 예상치 못한 곳에서 행운이 찾아올 거예요! 🍀",
        "코딩 에러가 한 번에 해결되는 마법 같은 날입니다. ✨",
        "새로운 인연이 당신의 성장을 도와줄 거예요. 🤝",
        "오늘은 휴식이 최고의 생산성입니다. 푹 쉬어보세요! 😴",
        "당신의 노력이 곧 결실을 맺을 징조가 보입니다. 🍎",
        "주변 사람들에게 따뜻한 말 한마디를 건네보세요. ☀️",
        "도전하고 싶었던 일이 있다면 바로 오늘 시작하세요! 🚀",
        "맛있는 음식이 당신의 하루를 완벽하게 만들어줄 겁니다. 🍕",
        "데이터 속에서 보석 같은 통찰력을 발견할 날이에요. 💎",
        "팀원들과의 협업이 빛을 발하는 하루가 될 거예요. 🌟"
    ];

    fortuneBtn.addEventListener('click', () => {
        fortuneBtn.disabled = true;
        fortuneText.innerHTML = '<span class="loading-dots">AI가 운세를 분석 중입니다</span>';
        
        setTimeout(() => {
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            fortuneText.textContent = randomFortune;
            fortuneBtn.disabled = false;
            fortuneBtn.textContent = '다시 뽑기 🔮';
        }, 1500);
    });
}

// --- Guestbook Logic ---
function initGuestbook() {
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookList = document.getElementById('guestbook-list');

    function analyzeSentiment(text) {
        const positiveKeywords = ['좋다', '좋아', '최고', '멋지', '멋져', '응원', '대박', '사랑', '행복', '감사', '훌륭', '파이팅', '화이팅', '굿', '반갑', '반가워'];
        const negativeKeywords = ['싫다', '싫어', '별로', '나쁘', '최악', '짜증', '화나', '우울', '슬프', '망함', '부족', '아쉽', '노잼', '실망'];

        let score = 0;
        positiveKeywords.forEach(word => { if (text.includes(word)) score++; });
        negativeKeywords.forEach(word => { if (text.includes(word)) score--; });

        if (score > 0) return '😊';
        if (score < 0) return '😡';
        return '😐';
    }

    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('visitor-name');
        const messageInput = document.getElementById('visitor-message');
        const emoji = analyzeSentiment(messageInput.value);
        const date = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

        const item = document.createElement('div');
        item.className = 'guestbook-item';
        item.innerHTML = `
            <div class="guestbook-header">
                <span class="guestbook-name">${nameInput.value} <span class="sentiment-emoji">${emoji}</span></span>
                <span class="guestbook-date">${date}</span>
            </div>
            <div class="guestbook-message">${messageInput.value}</div>
        `;

        guestbookList.prepend(item);
        nameInput.value = '';
        messageInput.value = '';
    });
}
