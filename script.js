AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Typed.js
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed('.typing-text', {
        strings: ['.Net Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Tech Innovator'],
        typeSpeed: 70,
        backSpeed: 50,
        loop: true
    });
});

// Preloader
window.addEventListener('load', function() {
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
    if (savedTheme === 'dark') {
        body.attr('data-theme', 'dark');
        themeToggle.prop('checked', true); // Make sure toggle matches dark theme
    } else {
        body.removeAttr('data-theme');
        themeToggle.prop('checked', false);
    }

    // Listen for toggle changes
    themeToggle.on('change', function () {
        if ($(this).is(':checked')) {
            body.attr('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.removeAttr('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
    button.addEventListener('click', function() {
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

// Counter Animation
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function startCounters() {
    if (counterStarted) return;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounters(), 20);
        } else {
            counter.innerText = target + '+';
        }
    });
    
    counterStarted = true;
}

// Check if counters are in viewport
function checkCounters() {
    const countersSection = document.getElementById('achievements');
    const countersPosition = countersSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (countersPosition < screenPosition) {
        startCounters();
    }
}

window.addEventListener('scroll', checkCounters);

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
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