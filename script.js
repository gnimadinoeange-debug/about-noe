// ============================================
// ANIMATIONS ULTRA-SOPHISTIQUÉES & INTERACTIONS CURSEUR
// ============================================

// Variables globales
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');
const skillCards = document.querySelectorAll('.skill-card-3d');
const cursorGlow = document.querySelector('.cursor-glow');
const buttons = document.querySelectorAll('.btn');

// ============================================
// 1. CURSEUR PERSONNALISÉ AVEC GLOW
// ============================================
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.classList.add('active');
        cursorGlow.style.left = e.clientX - 15 + 'px';
        cursorGlow.style.top = e.clientY - 15 + 'px';
    }

    // Parallax sur les blobs
    const blobs = document.querySelectorAll('.blob');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

document.addEventListener('mouseleave', () => {
    if (cursorGlow) {
        cursorGlow.classList.remove('active');
    }
});

// ============================================
// 2. EFFET MAGNÉTIQUE SUR LES BOUTONS
// ============================================
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ============================================
// 3. NAVIGATION MOBILE
// ============================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// 4. ANIMATIONS D'APPARITION AU SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments
document.querySelectorAll('.timeline-card, .info-card, .about-card, .story-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// 5. ANIMATION DES MOTS DANS LE TITRE
// ============================================
const words = document.querySelectorAll('.word');
words.forEach((word, index) => {
    word.style.animation = `slideInLeft 0.8s ease-out ${0.1 * (index + 1)}s backwards`;
});

// ============================================
// 6. EFFET 3D SUR L'IMAGE DE PROFIL
// ============================================
const imageCard = document.querySelector('.image-card');
if (imageCard) {
    imageCard.addEventListener('mousemove', (e) => {
        const rect = imageCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateX = (y - rect.height / 2) / 10;
        const rotateY = (rect.width / 2 - x) / 10;
        
        imageCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
    });

    imageCard.addEventListener('mouseleave', () => {
        imageCard.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    });
}

// ============================================
// 7. ANIMATION DU SCROLL NAVBAR
// ============================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// 8. GESTION DU FORMULAIRE DE CONTACT
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        
        // Animation du bouton
        button.textContent = 'Envoi en cours...';
        button.disabled = true;
        
        // Simulation d'envoi
        setTimeout(() => {
            button.textContent = 'Message envoyé ✓';
            button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            
            // Réinitialisation après 3 secondes
            setTimeout(() => {
                contactForm.reset();
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// ============================================
// 9. EFFET DE SURVOL SUR LES CARTES DE COMPÉTENCES
// ============================================
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// ============================================
// 10. ANIMATIONS CSS DYNAMIQUES
// ============================================
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px) rotateY(20deg);
        }
        to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
        }
    }

    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 5px rgba(0, 86, 179, 0.3);
        }
        50% {
            box-shadow: 0 0 20px rgba(0, 168, 255, 0.6);
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty));
        }
    }

    .btn:active {
        transform: scale(0.98);
    }

    .nav-link.active {
        color: var(--primary);
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ============================================
// 11. DÉTECTION DE LA SECTION ACTIVE
// ============================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// 12. SMOOTH SCROLL POUR LES ANCRES
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 13. EFFET DE PARTICULES AU CLIC
// ============================================
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        createRipple(e);
        createParticles(e);
    }
});

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function createParticles(event) {
    const particleCount = 8;
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const tx = Math.cos(angle) * velocity * 30;
        const ty = Math.sin(angle) * velocity * 30;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Style pour les particules
const particleStyle = document.createElement('style');
particleStyle.innerHTML = `
    .particle {
        position: fixed;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: particleFloat 1s ease-out forwards;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// ============================================
// 14. EFFET HOVER SUR LES CARTES DE CONTACT
// ============================================
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.animation = 'slideInLeft 0.3s ease-out';
    });
});

// ============================================
// 15. ANIMATION DE TEXTE AU SCROLL
// ============================================
const storyParagraphs = document.querySelectorAll('.story-paragraph');
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
            textObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

storyParagraphs.forEach(paragraph => {
    textObserver.observe(paragraph);
});

// ============================================
// 16. INITIALISATION AU CHARGEMENT
// ============================================
window.addEventListener('load', () => {
    // Animation d'entrée de la page
    document.body.style.animation = 'fadeIn 0.5s ease-out';
    
    // Initialiser les animations des éléments visibles
    observer.observe(document.querySelector('.hero'));
});

// Animation de fade in
const fadeInStyle = document.createElement('style');
fadeInStyle.innerHTML = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(fadeInStyle);

// ============================================
// 17. EFFET DE GLOW SUR LES INPUTS
// ============================================
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 0 3px rgba(0, 86, 179, 0.2), 0 0 20px rgba(0, 86, 179, 0.3)';
    });

    input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});

// ============================================
// 18. ANIMATION DE DÉFILEMENT FLUIDE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.timeline-card, .skill-card-3d, .info-card');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop > (window.innerHeight || document.documentElement.clientHeight);
    };

    const displayScrollElement = () => {
        scrollElements.forEach((element) => {
            if (elementInView(element, 1.25)) {
                element.classList.add('scrolled');
            } else if (elementOutofView(element)) {
                element.classList.remove('scrolled');
            }
        });
    };

    window.addEventListener('scroll', () => {
        displayScrollElement();
    });
});

console.log('Portfolio ultra-sophistiqué chargé avec interactions curseur avancées!');
