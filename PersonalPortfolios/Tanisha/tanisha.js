// Typing Effect for Dynamic Text
const dynamicText = document.querySelector('.dynamic-text');
const phrases = ["UI/UX Design", "Frontend Development", "Color Harmony"];
let phraseIndex = 0;
let letterIndex = 0;

function typePhrase() {
    if (letterIndex < phrases[phraseIndex].length) {
        dynamicText.textContent += phrases[phraseIndex].charAt(letterIndex);
        letterIndex++;
        setTimeout(typePhrase, 100);
    } else {
        setTimeout(erasePhrase, 2000);
    }
}

function erasePhrase() {
    if (letterIndex > 0) {
        dynamicText.textContent = phrases[phraseIndex].substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(erasePhrase, 50);
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typePhrase, 1000);
    }
}

typePhrase();

// Filter Projects
const filterButtons = document.querySelectorAll('.filter-buttons button');
const projectCards = document.querySelectorAll('.project-cards .card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        const category = button.getAttribute('data-category');
        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact Form Validation
const form = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (!name || !email || !message) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill out all fields.';
    } else {
        formMessage.style.color = 'green';
        formMessage.textContent = 'Message sent successfully!';
        form.reset();
    }
});

// Animate Progress Bars on Scroll
const skillGrid = document.querySelector('.skill-grid');
const progressBars = document.querySelectorAll('.progress');

function animateProgressBars() {
    const gridPosition = skillGrid.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (gridPosition < screenHeight - 50) {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0'; // Reset progress bar
            setTimeout(() => (bar.style.width = width), 300); // Animate to final width
        });
    }
}

window.addEventListener('scroll', animateProgressBars);
