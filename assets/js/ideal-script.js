// IDEAL Platform - Professional JavaScript

// Professional navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// Typing animation for intro title
function typeWriterIntro(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor
            const cursor = document.createElement('span');
            cursor.innerHTML = '|';
            cursor.style.animation = 'blink 1s infinite';
            element.appendChild(cursor);
        }
    }
    
    type();
}

// Counter animation function
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Intersection Observer for counter animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Slider functionality
function initSlider() {
    const slider = document.querySelector('.highlight-slider');
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.highlight-slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        // Update track position
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update slide visibility
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto-play slider
    setInterval(nextSlide, 4000);

    // Initialize
    updateSlider();
}

// Initialize intro title typing animation
window.addEventListener('load', () => {
    const introTitle = document.querySelector('.intro-title');
    if (introTitle) {
        const originalText = introTitle.textContent;
        setTimeout(() => {
            typeWriterIntro(introTitle, originalText, 100);
        }, 1500);
    }
    
    // Initialize counter animation
    initCounterAnimation();
    
    // Initialize slider
    initSlider();
});

// Check admin login status and update navigation
function updateNavigation() {
    const isLoggedIn = localStorage.getItem('ideal_admin_logged_in') === 'true';
    const adminTab = document.getElementById('adminTab');
    const loginBtn = document.querySelector('.btn-login');
    
    if (isLoggedIn) {
        // Show admin tab
        if (adminTab) adminTab.style.display = 'block';
        
        // Update login button to logout
        if (loginBtn) {
            loginBtn.textContent = 'Log Out';
            loginBtn.href = '#';
            loginBtn.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('ideal_admin_logged_in');
                localStorage.removeItem('ideal_admin_username');
                window.location.reload();
            };
        }
    } else {
        // Hide admin tab
        if (adminTab) adminTab.style.display = 'none';
        
        // Keep login button
        if (loginBtn) {
            loginBtn.textContent = 'Log In';
            loginBtn.href = 'login.html';
            loginBtn.onclick = null;
        }
    }
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
});
