AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Typed.js
document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('.typing-text', {
        strings: ['.NET Full Stack Developer', 'MVC & Core Expert', 'REST API Developer','Problem Solver','Tech Enthusiast'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });

// Enhanced Scroll Reveal Animations with Stagger
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add ripple effect on reveal
                if (entry.target.classList.contains('card')) {
                    entry.target.style.setProperty('--reveal-delay', Math.random() * 0.3 + 's');
                }
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Observe section titles
    document.querySelectorAll('.scroll-reveal-item').forEach(el => {
        observer.observe(el);
    });

    // Observe cards with stagger effect
    document.querySelectorAll('.card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.08}s`;
        el.style.setProperty('--card-index', index);
        observer.observe(el);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(el);
    });

    // Observe counters
    document.querySelectorAll('.counter').forEach(el => {
        observer.observe(el);
    });

    // Skill Progress Bar Animation on Scroll
    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const width = progressBar.style.width;
                    progressBar.style.setProperty('--progress-width', width);
                    progressBar.classList.add('animated');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-item').forEach(el => {
        skillObserver.observe(el);
    });

    // Parallax Scroll Effect
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-shapes .shape');

        parallaxElements.forEach((el, index) => {
            const speed = (index + 1) * 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

// Preloader
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});
$(document).ready(function () {
    const themeToggle = $('#theme-toggle');
    const body = $('body');

    // Check if theme is saved in localStorage
    let savedTheme = localStorage.getItem('theme');

    if (!savedTheme) {
        // If no saved theme, default to dark
        savedTheme = 'dark';
        localStorage.setItem('theme', 'dark');
    }

    // Apply the saved or default theme
    // Note: Dark is now default (no class or data-attribute), Light has data-theme="light"
    if (savedTheme === 'light') {
        body.attr('data-theme', 'light');
        themeToggle.prop('checked', false);
    } else {
        body.removeAttr('data-theme');
        themeToggle.prop('checked', true); // Checked = Dark Mode
    }

    // Listen for toggle changes
    themeToggle.on('change', function () {
        if ($(this).is(':checked')) {
            // Dark Mode
            body.removeAttr('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            // Light Mode
            body.attr('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile navbar if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarNav = document.querySelector('.navbar-collapse');
            if (navbarNav.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Get filter value
        const filterValue = this.getAttribute('data-filter');

        // Show/hide projects based on filter
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Counter Animation with enhanced effect
const counters = document.querySelectorAll('.counter');
const counterStates = new Map();

function startCounter(counter) {
    const counterId = counter.getAttribute('data-target');

    if (counterStates.get(counterId)) return;
    counterStates.set(counterId, true);

    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target + '+';
        }
    };

    updateCounter();
}

// Intersection Observer for Counters
const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Smooth Parallax Effect on Scroll with Mouse Movement
let ticking = false;
let mouseX = 0;
let mouseY = 0;

// Track mouse position for parallax effects
document.addEventListener('mousemove', function(e) {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

window.addEventListener('scroll', function () {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            const scrolled = window.pageYOffset;

            // Parallax for hero shapes with mouse influence
            const shapes = document.querySelectorAll('.hero-shapes .shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                const mouseInfluence = 20;
                const xMove = mouseX * mouseInfluence * (index + 1);
                const yMove = mouseY * mouseInfluence * (index + 1);
                shape.style.transform = `translateY(${scrolled * speed}px) translateX(${xMove}px) translateY(${yMove}px) rotate(${scrolled * 0.05 + mouseX * 10}deg)`;
            });

            // Parallax for quote corner
            const quoteCorner = document.querySelector('.hero-quote-corner');
            if (quoteCorner && scrolled < 500) {
                quoteCorner.style.transform = `translateY(${scrolled * 0.5}px)`;
            }

            // Navbar blur effect on scroll
            const navbar = document.querySelector('.navbar');
            if (scrolled > 50) {
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'var(--shadow-glow)';
            } else {
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'var(--shadow)';
            }

            ticking = false;
        });

        ticking = true;
    }
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simple validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const honeypot = document.getElementById('website').value;

    // Honeypot check
    if (honeypot) {
        formMessage.textContent = 'There was an error sending your message. Please try again.';
        formMessage.classList.add('alert-danger');
        formMessage.style.display = 'block';
        return;
    }

    if (!name || !email || !subject || !message) {
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.classList.add('alert-danger');
        formMessage.style.display = 'block';
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.classList.add('alert-danger');
        formMessage.style.display = 'block';
        return;
    }

    // Simulate form submission success
    formMessage.textContent = 'Your message has been sent successfully! I will get back to you soon.';
    formMessage.classList.remove('alert-danger');
    formMessage.classList.add('alert-success');
    formMessage.style.display = 'block';

    // Reset form
    contactForm.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Add subtle cursor trail effect
let cursorTrail = [];
const maxTrailLength = 15;

document.addEventListener('mousemove', function(e) {
    if (window.innerWidth > 768) { // Only on desktop
        cursorTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// Add loading animation enhancement
window.addEventListener('load', function() {
    // Add entrance animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});