// Counter Animation for Stats Section
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / 200;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 10);
        } else {
            counter.innerText = target;
        }
    };

    updateCounter();
});

// Form Validation with Success/Failure Feedback
const form = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (!name || !email || !message) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill out all fields!';
    } else {
        formMessage.style.color = 'green';
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        form.reset();
    }
});

// Animate Progress Circles (Skills)
const skills = document.querySelectorAll('.circle');
skills.forEach(skill => {
    const percent = skill.getAttribute('data-percent');
    skill.style.setProperty('--percent', percent);
});