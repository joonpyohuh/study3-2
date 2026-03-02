class MemberCard extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .card {
                    background-color: var(--card-bg, #ffffff);
                    border-radius: 15px;
                    box-shadow: 0 10px 30px var(--shadow-color);
                    padding: 2rem;
                    text-align: center;
                    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
                }
                .card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 40px var(--shadow-color);
                }
                .card img {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 1.5rem;
                    border: 5px solid var(--primary-color);
                    transition: border-color 0.3s ease;
                }
                .card h3 {
                    margin: 0.5rem 0;
                    color: var(--primary-color);
                    font-size: 1.5rem;
                    font-weight: 700;
                    transition: color 0.3s ease;
                }
                .card p {
                    margin: 0;
                    color: var(--text-color);
                    opacity: 0.8;
                    font-size: 1rem;
                    transition: color 0.3s ease;
                }
            </style>
            <div class="card">
                <img src="${this.getAttribute('image')}" alt="${this.getAttribute('name')}">
                <h3>${this.getAttribute('name')}</h3>
                <p>${this.getAttribute('role')}</p>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('member-card', MemberCard);

// Add scroll animations and theme toggle
document.addEventListener('DOMContentLoaded', () => {
    // Scroll animations
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme
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
});
