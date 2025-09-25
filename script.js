// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');

// ===== DOM CONTENT LOADED EVENT =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== INITIALIZE WEBSITE =====
function initializeWebsite() {
    setupNavigation();
    setupImageSlider();
    setupScrollReveal();
    setupContactForm();
    setupPortfolioFilter();
    setupFAQ();
    setupAchievementCounters();
    setupSmoothScrolling();
    
    console.log('🎉 Website initialized successfully!');
}

// ===== NAVIGATION =====
function setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// ===== IMAGE SLIDER =====
function setupImageSlider() {
    const slider = document.getElementById('imageSlider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    // Create dots
    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto-play slider
    startSlideShow();
    
    // Pause on hover
    if (slider) {
        slider.addEventListener('mouseenter', stopSlideShow);
        slider.addEventListener('mouseleave', startSlideShow);
    }
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (slides[slideIndex]) slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
    
    currentSlide = slideIndex;
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// ===== CONTACT FORM VALIDATION =====
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');
    
    // Character counter for message
    if (messageTextarea && charCounter) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCounter.textContent = `${count}/500`;
            
            if (count > 500) {
                charCounter.style.color = 'var(--error-color)';
                this.value = this.value.substring(0, 500);
            } else if (count > 450) {
                charCounter.style.color = 'var(--error-color)';
            } else {
                charCounter.style.color = 'var(--text-light)';
            }
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    if (nameInput) nameInput.addEventListener('blur', () => validateName());
    if (emailInput) emailInput.addEventListener('blur', () => validateEmail());
    if (phoneInput) phoneInput.addEventListener('blur', () => validatePhone());
    if (subjectSelect) subjectSelect.addEventListener('change', () => validateSubject());
    if (messageTextarea) messageTextarea.addEventListener('blur', () => validateMessage());
}

function validateForm() {
    let isValid = true;
    
    if (!validateName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePhone()) isValid = false;
    if (!validateSubject()) isValid = false;
    if (!validateMessage()) isValid = false;
    
    return isValid;
}

function validateName() {
    const nameInput = document.getElementById('name');
    const errorSpan = document.getElementById('name-error');
    
    if (!nameInput || !errorSpan) return true;
    
    const name = nameInput.value.trim();
    
    if (name.length < 2) {
        showError(nameInput, errorSpan, 'Name must be at least 2 characters long');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError(nameInput, errorSpan, 'Name can only contain letters and spaces');
        return false;
    }
    
    clearError(nameInput, errorSpan);
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const errorSpan = document.getElementById('email-error');
    
    if (!emailInput || !errorSpan) return true;
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError(emailInput, errorSpan, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError(emailInput, errorSpan, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailInput, errorSpan);
    return true;
}

function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const errorSpan = document.getElementById('phone-error');
    
    if (!phoneInput || !errorSpan) return true;
    
    const phone = phoneInput.value.trim();
    
    // Phone is optional, so only validate if provided
    if (phone && !/^[\+]?[\d\s\-\(\)]+$/.test(phone)) {
        showError(phoneInput, errorSpan, 'Please enter a valid phone number');
        return false;
    }
    
    clearError(phoneInput, errorSpan);
    return true;
}

function validateSubject() {
    const subjectSelect = document.getElementById('subject');
    const errorSpan = document.getElementById('subject-error');
    
    if (!subjectSelect || !errorSpan) return true;
    
    if (!subjectSelect.value) {
        showError(subjectSelect, errorSpan, 'Please select a subject');
        return false;
    }
    
    clearError(subjectSelect, errorSpan);
    return true;
}

function validateMessage() {
    const messageTextarea = document.getElementById('message');
    const errorSpan = document.getElementById('message-error');
    
    if (!messageTextarea || !errorSpan) return true;
    
    const message = messageTextarea.value.trim();
    
    if (message.length < 10) {
        showError(messageTextarea, errorSpan, 'Message must be at least 10 characters long');
        return false;
    }
    
    if (message.length > 500) {
        showError(messageTextarea, errorSpan, 'Message cannot exceed 500 characters');
        return false;
    }
    
    clearError(messageTextarea, errorSpan);
    return true;
}

function showError(input, errorSpan, message) {
    input.classList.add('error');
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
}

function clearError(input, errorSpan) {
    input.classList.remove('error');
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage();
        
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }, 2000);
}

function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('form-success');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function resetForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('form-success');
    
    if (form && successMessage) {
        form.style.display = 'block';
        successMessage.style.display = 'none';
        form.reset();
        
        // Clear all error states
        const errorSpans = form.querySelectorAll('.error-message');
        const inputs = form.querySelectorAll('input, select, textarea');
        
        errorSpans.forEach(span => {
            span.textContent = '';
            span.style.display = 'none';
        });
        
        inputs.forEach(input => input.classList.remove('error'));
        
        // Reset character counter
        const charCounter = document.getElementById('char-counter');
        if (charCounter) {
            charCounter.textContent = '0/500';
            charCounter.style.color = 'var(--text-light)';
        }
    }
}

// ===== PORTFOLIO FILTER =====
function setupPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0 || projectCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== PROJECT MODAL =====
const projectData = {
    project1: {
        title: 'E-Commerce Store',
        description: 'A modern, responsive e-commerce platform built with HTML5, CSS3, and JavaScript. Features include product catalog, shopping cart, user authentication, and payment integration.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage', 'Responsive Design'],
        features: [
            'Product catalog with search and filter functionality',
            'Shopping cart with add/remove/update capabilities',
            'User authentication system',
            'Responsive design for all devices',
            'Local storage for cart persistence'
        ],
        challenges: 'Implementing a robust shopping cart system and ensuring cross-browser compatibility.',
        demoUrl: '#',
        githubUrl: '#'
    },
    project2: {
        title: 'Restaurant Website',
        description: 'Beautiful restaurant website with menu display, online reservation system, and contact information. Built with modern web technologies and optimized for performance.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Flexbox'],
        features: [
            'Interactive menu with categories',
            'Online reservation form with validation',
            'Image gallery with lightbox effect',
            'Contact form with Google Maps integration',
            'Mobile-first responsive design'
        ],
        challenges: 'Creating an elegant image gallery and implementing smooth animations.',
        demoUrl: '#',
        githubUrl: '#'
    },
    project3: {
        title: 'Dashboard App',
        description: 'Interactive business dashboard with real-time data visualization, charts, and analytics. Perfect for monitoring business metrics and KPIs.',
        technologies: ['JavaScript', 'Chart.js', 'CSS3', 'HTML5', 'JSON'],
        features: [
            'Real-time data visualization',
            'Interactive charts and graphs',
            'Responsive grid layout',
            'Data filtering and sorting',
            'Export functionality'
        ],
        challenges: 'Implementing real-time data updates and creating responsive chart layouts.',
        demoUrl: '#',
        githubUrl: '#'
    },
    project4: {
        title: 'Portfolio Website',
        description: 'Personal portfolio website showcasing web development skills and projects. Features modern design, smooth animations, and responsive layout.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Animations', 'Grid Layout'],
        features: [
            'Modern, clean design',
            'Smooth scroll animations',
            'Project showcase with filtering',
            'Contact form with validation',
            'SEO optimized'
        ],
        challenges: 'Creating smooth animations and optimizing for performance.',
        demoUrl: '#',
        githubUrl: '#'
    },
    project5: {
        title: 'Calculator App',
        description: 'Advanced calculator application with scientific functions, history tracking, and keyboard support. Built with vanilla JavaScript.',
        technologies: ['JavaScript', 'CSS3', 'HTML5', 'Local Storage', 'Event Handling'],
        features: [
            'Basic and scientific calculations',
            'Calculation history',
            'Keyboard support',
            'Memory functions',
            'Responsive design'
        ],
        challenges: 'Implementing complex mathematical operations and managing calculation state.',
        demoUrl: '#',
        githubUrl: '#'
    },
    project6: {
        title: 'Blog Platform',
        description: 'Modern blogging platform with content management system, user authentication, and responsive design. Perfect for content creators.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage', 'Markdown'],
        features: [
            'Rich text editor',
            'Post management system',
            'Search functionality',
            'Category and tag system',
            'Responsive design'
        ],
        challenges: 'Implementing a rich text editor and managing post data efficiently.',
        demoUrl: '#',
        githubUrl: '#'
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody || !projectData[projectId]) return;
    
    const project = projectData[projectId];
    
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p class="project-description">${project.description}</p>
        
        <h3>Technologies Used</h3>
        <div class="modal-tech-tags">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <h3>Key Features</h3>
        <ul class="feature-list">
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <h3>Challenges & Solutions</h3>
        <p>${project.challenges}</p>
        
        <div class="modal-buttons">
            <a href="${project.demoUrl}" class="btn btn-primary" target="_blank">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank">
                <i class="fab fa-github"></i> View Code
            </a>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

// ===== FAQ FUNCTIONALITY =====
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// ===== ACHIEVEMENT COUNTERS =====
function setupAchievementCounters() {
    const counters = document.querySelectorAll('.achievement-number');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.7
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, stepTime);
}

// ===== SCROLL REVEAL ANIMATION =====
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length === 0) return;
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Add scroll reveal class to elements that should animate
    const animateElements = document.querySelectorAll('.skill-card, .achievement-card, .project-card, .timeline-content');
    animateElements.forEach(el => {
        el.classList.add('scroll-reveal');
        revealObserver.observe(el);
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images (if needed)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here if needed
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
function setupAccessibility() {
    // Add keyboard navigation for interactive elements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Ensure all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex') && !element.disabled) {
            element.setAttribute('tabindex', '0');
        }
    });
}

// ===== ANALYTICS & TRACKING =====
function trackEvent(eventName, eventData = {}) {
    // Add your analytics tracking code here
    console.log(`Event tracked: ${eventName}`, eventData);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);
    
    // Example: Custom analytics
    // analytics.track(eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            page_url: window.location.pathname
        });
    }
    
    if (e.target.matches('.nav-link')) {
        trackEvent('navigation_click', {
            link_text: e.target.textContent.trim(),
            link_url: e.target.href
        });
    }
    
    if (e.target.matches('.project-card')) {
        trackEvent('project_view', {
            project_name: e.target.querySelector('h3')?.textContent.trim()
        });
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    if (e.target.matches('#contactForm')) {
        trackEvent('form_submit', {
            form_name: 'contact_form',
            page_url: window.location.pathname
        });
    }
});

// ===== CONSOLE MESSAGES =====
console.log(`
🎨 Mary's Portfolio Website
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Features loaded:
   • Responsive Navigation
   • Image Slider
   • Form Validation
   • Portfolio Filter
   • Smooth Scrolling
   • Accessibility Enhancements
   • Performance Optimizations

🚀 Website ready for interaction!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// ===== SERVICE WORKER REGISTRATION (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}