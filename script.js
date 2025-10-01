// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    const pages = document.querySelectorAll('.page');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger icon
        hamburger.classList.toggle('active');
    });

    // Page navigation function
    function showPage(targetPage) {
        // Hide all pages and remove active class from nav links
        pages.forEach(page => {
            page.classList.remove('active');
            page.style.opacity = '0';
        });
        navLinksItems.forEach(link => link.classList.remove('active'));
        
        // Show target page and add active class
        const targetElement = document.getElementById(targetPage);
        const navElement = document.querySelector(`[data-page="${targetPage}"]`);
        
        if (targetElement && navElement) {
            setTimeout(() => {
                targetElement.classList.add('active');
                targetElement.style.opacity = '1';
                navElement.classList.add('active');
            }, 150);
        }
        
        // Close mobile menu
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Trigger animations for the new page
        setTimeout(() => {
            const fadeElements = document.querySelectorAll(`#${targetPage} .fade-in-up`);
            fadeElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    el.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }, index * 200);
            });
        }, 200);
    }

    // Add click handlers for navigation
    document.addEventListener('click', function(e) {
        if (e.target.hasAttribute('data-page')) {
            e.preventDefault();
            const targetPage = e.target.getAttribute('data-page');
            showPage(targetPage);
        }
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Image slider functionality
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slides');
    const dots = document.querySelectorAll('.dot');
    let slideInterval;

    function showSlide(index) {
        // Hide all slides and remove active class from dots
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide and activate corresponding dot
        if (slides[index] && dots[index]) {
            setTimeout(() => {
                slides[index].classList.add('active');
                slides[index].style.opacity = '1';
                dots[index].classList.add('active');
            }, 300);
        }
        
        currentSlideIndex = index;
    }

    // Global functions for slider navigation
    window.changeSlide = function(direction) {
        currentSlideIndex += direction;
        
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }
        if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }
        
        showSlide(currentSlideIndex);
        resetSlideTimer();
    };

    window.currentSlide = function(index) {
        showSlide(index - 1);
        resetSlideTimer();
    };

    // Auto-advance slider
    function startSlideTimer() {
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    function resetSlideTimer() {
        clearInterval(slideInterval);
        startSlideTimer();
    }

    // Start the slider
    if (slides.length > 0) {
        startSlideTimer();
    }

    // Pause slider on hover
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            startSlideTimer();
        });
    }

    // Stats counter animation
    function animateStats() {
        const stats = [
            { id: 'stat1', target: 150, suffix: '+', duration: 2000 },
            { id: 'stat2', target: 50000, suffix: '+', duration: 2500 },
            { id: 'stat3', target: 5000, suffix: '+', duration: 2200 },
            { id: 'stat4', target: 95, suffix: '%', duration: 1800 }
        ];

        stats.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (!element) return;
            
            const target = stat.target;
            const suffix = stat.suffix;
            const duration = stat.duration;
            let current = 0;
            const increment = target / (duration / 50);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target.toLocaleString() + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.ceil(current).toLocaleString() + suffix;
                }
            }, 50);
        });
    }

    // Trigger stats animation when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Enhanced form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formElements = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            organization: document.getElementById('organization'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message')
        };

        // Real-time validation
        Object.keys(formElements).forEach(key => {
            const element = formElements[key];
            if (element && key !== 'organization') { // organization is optional
                element.addEventListener('blur', () => {
                    validateField(element, key);
                });
                
                element.addEventListener('input', () => {
                    clearError(element);
                });
            }
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Reset all errors
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
                const errorMsg = group.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.style.display = 'none';
                }
            });
            
            // Validate each required field
            isValid &= validateField(formElements.name, 'name');
            isValid &= validateField(formElements.email, 'email');
            isValid &= validateField(formElements.subject, 'subject');
            isValid &= validateField(formElements.message, 'message');
            
            if (isValid) {
                submitForm();
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });

        function validateField(element, type) {
            if (!element) return false;
            
            const value = element.value.trim();
            let isValid = true;
            let errorMessage = '';
            
            switch (type) {
                case 'name':
                    if (!value) {
                        errorMessage = 'Please enter your full name';
                        isValid = false;
                    } else if (value.length < 2) {
                        errorMessage = 'Name must be at least 2 characters long';
                        isValid = false;
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!value) {
                        errorMessage = 'Please enter your email address';
                        isValid = false;
                    } else if (!emailRegex.test(value)) {
                        errorMessage = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;
                    
                case 'subject':
                    if (!value) {
                        errorMessage = 'Please select a subject';
                        isValid = false;
                    }
                    break;
                    
                case 'message':
                    if (!value) {
                        errorMessage = 'Please enter your message';
                        isValid = false;
                    } else if (value.length < 10) {
                        errorMessage = 'Message must be at least 10 characters long';
                        isValid = false;
                    } else if (value.length > 1000) {
                        errorMessage = 'Message must be less than 1000 characters';
                        isValid = false;
                    }
                    break;
            }
            
            if (!isValid) {
                showError(element, errorMessage);
            }
            
            return isValid;
        }

        function submitForm() {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.style.background = '#ffa726';
            
            // Simulate form submission
            setTimeout(() => {
                // Show success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#4caf50';
                
                // Show success message
                showSuccessMessage();
                
                setTimeout(() => {
                    // Reset form and button
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    
                    hideSuccessMessage();
                }, 3000);
            }, 2000);
        }

        function showSuccessMessage() {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #4caf50;
                color: white;
                padding: 2rem 3rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                text-align: center;
                animation: fadeInUp 0.5s ease-out;
            `;
            successDiv.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 0.5rem;">Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon!</p>
            `;
            document.body.appendChild(successDiv);
        }

        function hideSuccessMessage() {
            const successMsg = document.querySelector('.success-message');
            if (successMsg) {
                successMsg.style.animation = 'fadeOut 0.3s ease-in forwards';
                setTimeout(() => {
                    document.body.removeChild(successMsg);
                }, 300);
            }
        }
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
        
        // Add shake animation
        formGroup.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            formGroup.style.animation = '';
        }, 500);
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        fadeInObserver.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero && window.scrollY < hero.offsetHeight) {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Smooth reveal animations on page load
    setTimeout(() => {
        const homeElements = document.querySelectorAll('#home .fade-in-up');
        homeElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }, index * 200);
        });
    }, 500);

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Arrow keys for slider navigation
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });

    // Add loading states and error handling
    window.addEventListener('error', function(e) {
        console.log('Error caught:', e.error);
    });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Page loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Remove any loading spinners
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    img.loaded {
        transition: filter 0.3s ease;
    }
`;
document.head.appendChild(style);