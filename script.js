document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Altera o ícone de menu para 'X' e vice-versa
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Fecha o menu ao clicar em um link (para navegação na mesma página)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if(navLinks.classList.contains('active')) {
                   navLinks.classList.remove('active');
                   const icon = hamburger.querySelector('i');
                   icon.classList.remove('fa-times');
                   icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- INICIALIZAÇÃO DO PARTICLES.JS (com verificação) ---
    if (typeof particlesJS === 'function') {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#00aeff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#0077b6", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 4, "direction": "none", "out_mode": "out" } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } } }
        });
    } else {
        console.error('Erro: A biblioteca particles.js não foi carregada.');
    }

    // --- EFEITO TYPEWRITER (com verificação) ---
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const words = ["Inovação", "Tecnologia", "Soluções"];
        let i = 0, j = 0, currentWord = "", isDeleting = false;
        function type() {
            currentWord = words[i];
            if (isDeleting) j--; else j++;
            typewriterElement.innerHTML = currentWord.substring(0, j);
            if (!isDeleting && j === currentWord.length) {
                isDeleting = true; setTimeout(type, 2000);
            } else if (isDeleting && j === 0) {
                isDeleting = false; i = (i + 1) % words.length; setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 150);
            }
        }
        type();
    }

    // --- ANIMAÇÃO DE SCROLL (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.card, .case-item, .testimonial-card, .partner-item');
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
        const style = document.createElement('style');
        style.innerHTML = `.reveal-on-scroll { opacity: 0; transform: translateY(40px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; } .reveal-on-scroll.visible { opacity: 1; transform: translateY(0); }`;
        document.head.appendChild(style);
    }
    
    // --- CONTADOR ANIMADO (com verificação) ---
    const statsSection = document.querySelector('#stats');
    if (statsSection) {
         const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.counter').forEach(counter => {
                        const target = +counter.getAttribute('data-target'); let count = 0;
                        const updateCounter = () => {
                            const increment = target / 200;
                            if (count < target) {
                                count += increment; counter.innerText = Math.ceil(count); requestAnimationFrame(updateCounter);
                            } else { counter.innerText = target; }
                        };
                        updateCounter();
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // --- VALIDAÇÃO DO FORMULÁRIO (com verificação) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.');
            contactForm.reset();
        });
    }
});