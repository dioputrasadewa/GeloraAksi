/* ===================================
   BEM GELORA AKSI - MODERN JAVASCRIPT
   Complete with all interactions,
   animations, and modern features
   =================================== */

'use strict';

// ===== GLOBAL VARIABLES =====
const body = document.body;
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const loadingScreen = document.getElementById('loading-screen');
const fabContainer = document.getElementById('fab-container');
const fabMain = document.getElementById('fab-main');
const backToTop = document.getElementById('back-to-top');
const scrollToTopBtn = document.getElementById('scroll-to-top');

// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
    // Hide loading screen after 5 seconds
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 800);
        }
    }, 5000);
    
    // Progress counter
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            if (progress <= 100) {
                loadingText.innerHTML = `Memuat ${progress}%`;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }
});

// ===== CUSTOM CURSOR =====
(function initCustomCursor() {
    // Only for desktop
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        body.appendChild(cursor);
        
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .tab-btn, .nav-link');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
})();

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ===== MOBILE MENU TOGGLE =====
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        body.style.overflow = '';
    }
});

// ===== ACTIVE NAV LINK ON SCROLL (SCROLL SPY) =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SMOOTH SCROLL TO RECRUITMENT (DAFTAR SEKARANG) =====
const btnDaftar = document.getElementById('btn-daftar');

if (btnDaftar) {
    btnDaftar.addEventListener('click', function(e) {
        e.preventDefault();
        
        const recruitmentSection = document.getElementById('recruitment');
        
        if (recruitmentSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = recruitmentSection.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Auto-activate Pengurus Inti tab after scroll
            setTimeout(() => {
                const pengurusIntiBtn = document.querySelector('[data-tab="pengurus-inti"]');
                if (pengurusIntiBtn && !pengurusIntiBtn.classList.contains('active')) {
                    pengurusIntiBtn.click();
                }
                
                // Add highlight effect
                recruitmentSection.style.animation = 'fadeIn 0.8s ease';
                setTimeout(() => {
                    recruitmentSection.style.animation = '';
                }, 800);
            }, 800);
        }
    });
}

// ===== DARK MODE TOGGLE =====
const html = document.documentElement;

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Update icon based on current theme
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    const currentTheme = html.getAttribute('data-theme');
    
    if (icon) {
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon();
        
        // Add transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}
/* ========================================
   RENCANA STRATEGIS - ACCORDION TOGGLE
   ======================================== */

/**
 * Toggle accordion untuk Rencana Strategis
 * @param {HTMLElement} element - Element yang diklik (strategis-header-main)
 */
function toggleStrategis(element) {
    // Get parent strategis-group
    const strategisGroup = element.closest('.strategis-group');
    
    // Get all strategis groups
    const allGroups = document.querySelectorAll('.strategis-group');
    
    // Check if clicked group is already active
    const isActive = strategisGroup.classList.contains('active');
    
    // OPTION 1: Close all other accordions (only one open at a time)
    // Uncomment lines below if you want only one accordion open at a time
    /*
    allGroups.forEach(group => {
        if (group !== strategisGroup) {
            group.classList.remove('active');
        }
    });
    */
    
    // OPTION 2: Allow multiple accordions open (default)
    // Toggle current accordion
    strategisGroup.classList.toggle('active');
    
    // Optional: Smooth scroll to accordion when opening
    if (!isActive) {
        setTimeout(() => {
            strategisGroup.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    }
}

/* ========================================
   INITIALIZE ON PAGE LOAD
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // OPTION A: Open first accordion by default
    const firstGroup = document.querySelector('.strategis-group');
    if (firstGroup) {
        firstGroup.classList.add('active');
    }
    
    // OPTION B: Open all accordions by default (uncomment if needed)
    /*
    const allGroups = document.querySelectorAll('.strategis-group');
    allGroups.forEach(group => {
        group.classList.add('active');
    });
    */
    
    // OPTION C: All closed by default (comment out OPTION A above)
    // No code needed, just comment out OPTION A
    
    // Add keyboard accessibility (Enter/Space to toggle)
    const headers = document.querySelectorAll('.strategis-header-main');
    headers.forEach(header => {
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleStrategis(this);
                
                // Update aria-expanded
                const group = this.closest('.strategis-group');
                const isExpanded = group.classList.contains('active');
                this.setAttribute('aria-expanded', isExpanded);
            }
        });
    });
    
    // Update aria-expanded on click
    headers.forEach(header => {
        header.addEventListener('click', function() {
            setTimeout(() => {
                const group = this.closest('.strategis-group');
                const isExpanded = group.classList.contains('active');
                this.setAttribute('aria-expanded', isExpanded);
            }, 50);
        });
    });
});

/* ========================================
   OPTIONAL: EXPAND/COLLAPSE ALL BUTTONS
   ======================================== */

/**
 * Expand all accordions
 */
function expandAllStrategis() {
    const allGroups = document.querySelectorAll('.strategis-group');
    allGroups.forEach(group => {
        group.classList.add('active');
    });
}

/**
 * Collapse all accordions
 */
function collapseAllStrategis() {
    const allGroups = document.querySelectorAll('.strategis-group');
    allGroups.forEach(group => {
        group.classList.remove('active');
    });
}

/* ========================================
   OPTIONAL: SEARCH/FILTER FUNCTIONALITY
   ======================================== */

/**
 * Filter strategis by search term
 * @param {string} searchTerm - Term to search for
 */
function filterStrategis(searchTerm) {
    const allGroups = document.querySelectorAll('.strategis-group');
    const term = searchTerm.toLowerCase().trim();
    
    if (term === '') {
        // Show all if search is empty
        allGroups.forEach(group => {
            group.style.display = 'block';
        });
        return;
    }
    
    allGroups.forEach(group => {
        const title = group.querySelector('.strategis-title').textContent.toLowerCase();
        const description = group.querySelector('.strategis-description').textContent.toLowerCase();
        const subUnits = Array.from(group.querySelectorAll('.sub-unit-card')).map(card => 
            card.textContent.toLowerCase()
        ).join(' ');
        
        const allText = title + ' ' + description + ' ' + subUnits;
        
        if (allText.includes(term)) {
            group.style.display = 'block';
            // Auto-expand matching groups
            group.classList.add('active');
        } else {
            group.style.display = 'none';
        }
    });
}

/* ========================================
   OPTIONAL: DEEP LINK SUPPORT
   ======================================== */

/**
 * Open specific accordion based on URL hash
 * Example: #rencana-strategis-kesma
 */
function handleDeepLink() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#rencana-strategis-')) {
        const id = hash.replace('#rencana-strategis-', '').toUpperCase();
        const allGroups = document.querySelectorAll('.strategis-group');
        
        allGroups.forEach(group => {
            const title = group.querySelector('.strategis-title').textContent;
            if (title.includes(id)) {
                group.classList.add('active');
                setTimeout(() => {
                    group.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
    }
}

// Handle deep link on load
document.addEventListener('DOMContentLoaded', handleDeepLink);

// Handle deep link on hash change
window.addEventListener('hashchange', handleDeepLink);

/* ========================================
   PERFORMANCE: LAZY LOAD SUB-UNITS
   ======================================== */

/**
 * Optional: Only render sub-units when accordion is opened
 * (Useful if you have many accordions with heavy content)
 */
function lazyLoadSubUnits() {
    const allGroups = document.querySelectorAll('.strategis-group');
    
    allGroups.forEach(group => {
        const header = group.querySelector('.strategis-header-main');
        let loaded = false;
        
        header.addEventListener('click', function() {
            if (!loaded && group.classList.contains('active')) {
                // Trigger any lazy loading here
                // Example: Load images, fetch data, etc.
                loaded = true;
            }
        });
    });
}

// Uncomment if you want to use lazy loading
// document.addEventListener('DOMContentLoaded', lazyLoadSubUnits);

// ===== RECRUITMENT TABS =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.recruitment-detail');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active-tab'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active-tab');
        }
    });
});

// ===== FLOATING ACTION BUTTON (FAB) =====
if (fabMain && fabContainer) {
    fabMain.addEventListener('click', (e) => {
        e.stopPropagation();
        fabContainer.classList.toggle('active');
    });
    
    // Close FAB when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target)) {
            fabContainer.classList.remove('active');
        }
    });
    
    // Scroll to top from FAB
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            fabContainer.classList.remove('active');
        });
    }
}

// ===== BACK TO TOP BUTTON =====
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== COUNTER ANIMATION (STATISTICS) =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter when section is visible
const statNumbers = document.querySelectorAll('.stat-number');
let counterTriggered = false;

function checkCounterVisibility() {
    if (counterTriggered) return;
    
    const statsSection = document.querySelector('.stats-grid');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
        counterTriggered = true;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat, target);
        });
    }
}

window.addEventListener('scroll', checkCounterVisibility);
checkCounterVisibility(); // Check on load

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Mengirim...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            alert('Pesan berhasil dikirim! Terima kasih telah menghubungi kami.');
            
            // Reset form
            contactForm.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // In real implementation, you would send data to server:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Handle success
            // })
            // .catch(error => {
            //     // Handle error
            // });
            
        }, 2000);
    });
}

// ===== PARALLAX EFFECT =====
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Cards parallax
    const cards = document.querySelectorAll('.program-card, .nilai-card');
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            const speed = 0.05 + (index * 0.02);
            const offset = (window.innerHeight - rect.top) * speed;
            card.style.transform = `translateY(-${offset}px)`;
        }
    });
}

// Throttle parallax for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            parallaxEffect();
            ticking = false;
        });
        ticking = true;
    }
});

// ===== AOS (ANIMATE ON SCROLL) INITIALIZATION =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 50,
        anchorPlacement: 'top-bottom',
        disable: function() {
            return window.innerWidth < 768; // Disable on mobile for performance
        }
    });
    
    // Refresh AOS on window resize
    window.addEventListener('resize', () => {
        AOS.refresh();
    });
}

// ===== IMAGE ZOOM (ORGANOGRAM) =====
const organogramWrapper = document.querySelector('.organogram-wrapper');

if (organogramWrapper) {
    organogramWrapper.addEventListener('click', function() {
        const img = this.querySelector('.organogram-img');
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: zoom-out;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        `;
        
        // Clone image
        const imgClone = img.cloneNode();
        imgClone.style.cssText = `
            max-width: 95%;
            max-height: 95%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        `;
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border: none;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 1.5rem;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
            closeBtn.style.transform = 'scale(1.1)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            closeBtn.style.transform = 'scale(1)';
        });
        
        modal.appendChild(imgClone);
        modal.appendChild(closeBtn);
        body.appendChild(modal);
        
        // Prevent body scroll
        body.style.overflow = 'hidden';
        
        // Close modal
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                body.style.overflow = '';
            }, 300);
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === closeBtn || e.target.parentElement === closeBtn) {
                closeModal();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
}

// ===== FORM VALIDATION =====
const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    // Real-time validation
    input.addEventListener('blur', function() {
        validateInput(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateInput(this);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check if required
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Field ini wajib diisi';
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Format email tidak valid';
        }
    }
    
    // Show/hide error
    if (!isValid) {
        input.classList.add('error');
        showError(input, errorMessage);
    } else {
        input.classList.remove('error');
        removeError(input);
    }
    
    return isValid;
}

function showError(input, message) {
    removeError(input); // Remove existing error first
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #f44336;
        font-size: 0.875rem;
        margin-top: 5px;
        animation: fadeIn 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    input.parentElement.appendChild(errorDiv);
    input.style.borderColor = '#f44336';
}

function removeError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.borderColor = '';
}

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizedScroll = throttle(() => {
    scrollActive();
    checkCounterVisibility();
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Optimize resize events
const optimizedResize = debounce(() => {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250);

window.addEventListener('resize', optimizedResize);

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        body.style.overflow = '';
    }
    
    // ESC to close FAB
    if (e.key === 'Escape' && fabContainer.classList.contains('active')) {
        fabContainer.classList.remove('active');
    }
});

// ===== PREVENT RIGHT CLICK ON IMAGES (OPTIONAL) =====
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ===== CONSOLE MESSAGE =====
console.log('%c🔥 BEM GELORA AKSI 🔥', 'color: #470000; font-size: 24px; font-weight: bold;');
console.log('%cWebsite developed with ❤️ by Tim IT BEM', 'color: #fefbe8; font-size: 14px;');
console.log('%cKabinet BEM KM FV UNY 2026', 'color: #ffd700; font-size: 12px;');

// ===== SERVICE WORKER (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// ===== ONLINE/OFFLINE STATUS =====
window.addEventListener('online', () => {
    console.log('🟢 Online');
    showNotification('Koneksi internet tersambung', 'success');
});

window.addEventListener('offline', () => {
    console.log('🔴 Offline');
    showNotification('Koneksi internet terputus', 'error');
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== ADD ANIMATION KEYFRAMES DYNAMICALLY =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE ALL ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ All scripts loaded successfully!');
    
    // Add loaded class to body
    setTimeout(() => {
        body.classList.add('loaded');
    }, 100);
});

// ===== EXPORT FUNCTIONS (IF NEEDED) =====
window.BEM = {
    showNotification,
    animateCounter,
    debounce,
    throttle
};