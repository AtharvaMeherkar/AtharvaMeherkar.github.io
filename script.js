// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // 'X' icon when open
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Hamburger icon when closed
            }
        });

        // Close mobile menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    } else {
        console.warn("Menu toggle or navigation links not found. Mobile menu functionality may be impaired.");
    }

    // --- Scroll-triggered Animations (Intersection Observer) ---
    const sections = document.querySelectorAll('section.section-animate');
    const projectCards = document.querySelectorAll('.project-card');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // The hero section's children have their own animations, so don't unobserve it immediately
                // For other sections, unobserve once visible
                if (entry.target.id !== 'hero') {
                    observer.unobserve(entry.target); 
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Staggered animation for project cards
    const projectCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply animation class with delay
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the card is visible
    });

    projectCards.forEach(card => {
        // Set initial state to paused, animation will be triggered by observer
        card.style.animationPlayState = 'paused';
        projectCardObserver.observe(card);
    });
});