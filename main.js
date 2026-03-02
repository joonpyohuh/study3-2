
class MemberCard extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    --primary-color: #003366;
                    --white-color: #ffffff;
                    --shadow-color: rgba(0, 0, 0, 0.1);
                }

                .card {
                    background-color: var(--white-color);
                    border-radius: 15px;
                    box-shadow: 0 10px 30px var(--shadow-color);
                    padding: 2rem;
                    text-align: center;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
                }
                .card img {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 1.5rem;
                    border: 5px solid var(--primary-color);
                }
                .card h3 {
                    margin: 0.5rem 0;
                    color: var(--primary-color);
                    font-size: 1.5rem;
                    font-weight: 700;
                }
                .card p {
                    margin: 0;
                    color: #777;
                    font-size: 1rem;
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

// Add scroll animations
document.addEventListener('DOMContentLoaded', () => {
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
});
