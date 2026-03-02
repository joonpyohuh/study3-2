// 스크롤 애니메이션 및 테마 토글
document.addEventListener('DOMContentLoaded', () => {
    // 섹션 나타나기 애니메이션
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 테마 토글 로직
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });

    // 헤더 스크롤 효과
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

    // --- 방명록 AI 감정 분석 로직 ---

    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookList = document.getElementById('guestbook-list');

    /**
     * 간단한 키워드 기반 감정 분석 함수
     * @param {string} text - 분석할 메시지
     * @returns {string} sentiment - 'positive', 'negative', 'neutral'
     */
    function analyzeSentiment(text) {
        // 긍정 키워드
        const positiveKeywords = ['좋다', '좋아', '최고', '멋지', '멋져', '응원', '대박', '사랑', '행복', '감사', '훌륭', '파이팅', '화이팅', '굿', '반갑', '반가워'];
        // 부정 키워드
        const negativeKeywords = ['싫다', '싫어', '별로', '나쁘', '최악', '짜증', '화나', '우울', '슬프', '망함', '부족', '아쉽', '노잼', '실망'];

        let score = 0;

        positiveKeywords.forEach(word => {
            if (text.includes(word)) score++;
        });

        negativeKeywords.forEach(word => {
            if (text.includes(word)) score--;
        });

        if (score > 0) return 'positive';
        if (score < 0) return 'negative';
        return 'neutral';

        /* 
         * [Gemini API 확장 가이드]
         * 나중에 실제 AI를 쓰고 싶다면 아래와 같이 fetch를 사용할 수 있습니다:
         * 
         * const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY', {
         *   method: 'POST',
         *   body: JSON.stringify({ contents: [{ parts: [{ text: `Analyze the sentiment of this Korean message: "${text}". Reply only with "positive", "negative", or "neutral".` }] }] })
         * });
         * const data = await response.json();
         * return data.candidates[0].content.parts[0].text.trim().toLowerCase();
         */
    }

    const sentimentMap = {
        'positive': '😊',
        'negative': '😡',
        'neutral': '😐'
    };

    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('visitor-name');
        const messageInput = document.getElementById('visitor-message');

        const name = nameInput.value;
        const message = messageInput.value;
        const date = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

        // 감정 분석 실행
        const sentiment = analyzeSentiment(message);
        const emoji = sentimentMap[sentiment];

        // 방명록 아이템 생성
        const item = document.createElement('div');
        item.className = 'guestbook-item';
        item.innerHTML = `
            <div class="guestbook-header">
                <span class="guestbook-name">${name} <span class="sentiment-emoji">${emoji}</span></span>
                <span class="guestbook-date">${date}</span>
            </div>
            <div class="guestbook-message">${message}</div>
        `;

        // 리스트 최상단에 추가
        guestbookList.prepend(item);

        // 입력창 초기화
        nameInput.value = '';
        messageInput.value = '';

        // 성공 알림 (선택 사항)
        console.log(`감정 분석 결과: ${sentiment}`);
    });
});
