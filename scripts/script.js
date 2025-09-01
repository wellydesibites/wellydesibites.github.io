// WellyDesiBites - Optimized JavaScript
// Enhanced functionality with better error handling and performance

// Global variables
let currentReviewIndex = {
    googleReviews: 0,
    facebookReviews: 0
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    try {
        // Initialize all components
        initializeNavigation();
        initializeReviews();
        initializeContactForm();
        initializeSmoothScrolling();
        initializeLazyLoading();
        initializePerformanceOptimizations();
        
        console.log('WellyDesiBites website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            updateMobileMenu();
        });
    }
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.main-nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });
}

// Update mobile menu with contact info
function updateMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    if (navLinks.classList.contains('active')) {
        // Add mobile contact elements
        addMobileContactElements();
    } else {
        // Remove mobile contact elements
        removeMobileContactElements();
    }
}

function addMobileContactElements() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    // Check if elements already exist
    if (navLinks.querySelector('.mobile-phone') || navLinks.querySelector('.mobile-social')) {
        return;
    }
    
    const mobilePhone = document.createElement('li');
    mobilePhone.className = 'mobile-phone';
    mobilePhone.innerHTML = `
        <a href="tel:+642108326153" class="mobile-contact-link">
            <i class="fas fa-phone-alt" aria-hidden="true"></i>
            <span>0210 8326153</span>
        </a>
    `;
    
    const mobileSocial = document.createElement('li');
    mobileSocial.className = 'mobile-social';
    mobileSocial.innerHTML = `
        <div class="mobile-social-links">
            <a href="https://wa.me/642108326153?text=I'm%20interested%20in%20your%20cakes" target="_blank" rel="noopener" aria-label="Contact us on WhatsApp">
                <i class="fab fa-whatsapp" aria-hidden="true"></i>
            </a>
            <a href="https://www.facebook.com/wellydesibites" target="_blank" rel="noopener" aria-label="Follow us on Facebook">
                <i class="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
            <a href="https://www.instagram.com/wellydesibitesnz" target="_blank" rel="noopener" aria-label="Follow us on Instagram">
                <i class="fab fa-instagram" aria-hidden="true"></i>
            </a>
        </div>
    `;
    
    navLinks.appendChild(mobilePhone);
    navLinks.appendChild(mobileSocial);
}

function removeMobileContactElements() {
    const elements = document.querySelectorAll('.mobile-phone, .mobile-social');
    elements.forEach(el => el.remove());
}

// Reviews functionality - FIXED VERSION
function initializeReviews() {
    try {
        // Initialize review carousels
        initializeReviewCarousel('googleReviews');
        initializeReviewCarousel('facebookReviews');
        
        // Set up auto-rotation (optional - can be disabled)
        // setInterval(() => {
        //     nextReview('googleReviews');
        // }, 8000);
        
        // setInterval(() => {
        //     nextReview('facebookReviews');
        // }, 10000);
        
    } catch (error) {
        console.error('Error initializing reviews:', error);
    }
}

function initializeReviewCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const reviews = carousel.querySelectorAll('.review');
    if (reviews.length === 0) return;
    
    // Show first review initially
    showReview(carouselId, 0);
    
    // Create indicators
    createCarouselIndicators(carouselId, reviews.length);
    
    console.log(`Initialized ${carouselId} with ${reviews.length} reviews`);
}

function showReview(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const reviews = carousel.querySelectorAll('.review');
    const indicators = document.querySelectorAll(`#${carouselId}Indicators .indicator`);
    
    if (reviews.length === 0) return;
    
    // Ensure index is within bounds
    if (index < 0) index = 0;
    if (index >= reviews.length) index = reviews.length - 1;
    
    // Hide all reviews first
    reviews.forEach(review => {
        review.style.display = 'none';
        review.classList.remove('active');
    });
    
    // Show current review
    if (reviews[index]) {
        reviews[index].style.display = 'block';
        reviews[index].classList.add('active');
    }
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    // Update current index
    currentReviewIndex[carouselId] = index;
    
    console.log(`Showing review ${index + 1} of ${reviews.length} in ${carouselId}`);
}

function nextReview(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const reviews = carousel.querySelectorAll('.review');
    if (reviews.length === 0) return;
    
    const nextIndex = (currentReviewIndex[carouselId] + 1) % reviews.length;
    showReview(carouselId, nextIndex);
}

function previousReview(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const reviews = carousel.querySelectorAll('.review');
    if (reviews.length === 0) return;
    
    const prevIndex = (currentReviewIndex[carouselId] - 1 + reviews.length) % reviews.length;
    showReview(carouselId, prevIndex);
}

function createCarouselIndicators(carouselId, totalReviews) {
    const indicatorsContainer = document.getElementById(`${carouselId}Indicators`);
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalReviews; i++) {
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        indicator.setAttribute('data-index', i);
        indicator.addEventListener('click', () => {
            showReview(carouselId, i);
        });
        indicatorsContainer.appendChild(indicator);
    }
}

// Contact form functionality
function initializeContactForm() {
    const enquiryForm = document.getElementById('enquiryForm');
    if (!enquiryForm) return;
    
    enquiryForm.addEventListener('submit', handleFormSubmission);
    
    // Add real-time validation
    addFormValidation(enquiryForm);
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const submitButton = e.target.querySelector('button[type="submit"]');
        
        // Disable submit button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            showSuccessMessage('Thank you for your enquiry! We will respond within 24 hours.');
            e.target.reset();
            
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Enquiry';
            }
        }, 1500);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage('Sorry, there was an error sending your enquiry. Please try again.');
        
        // Re-enable submit button
        const submitButton = e.target.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Enquiry';
        }
    }
}

function addFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validate required fields
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Validate email
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    // Validate phone
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Lazy loading functionality
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Preload critical images
    preloadCriticalImages();
    
    // Add loading states
    addLoadingStates();
}

function preloadCriticalImages() {
    const criticalImages = [
        'images/BirthdayCakes/20241122_194732.avif',
        'images/AnniversaryCakes/20241015_234134.avif',
        'images/Cupcakes/cupcakes-1.avif'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

function addLoadingStates() {
    // Add loading state to images
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            img.addEventListener('load', function() {
                this.classList.remove('loading');
            });
        }
    });
}

// Utility functions
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            hideNotification(notification);
        });
    }
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Export functions for global access
window.WellyDesiBites = {
    nextReview,
    previousReview,
    showReview,
    showSuccessMessage,
    showErrorMessage
};

// Add CSS for notifications and loading states
const additionalStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 16px 20px;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid #4CAF50;
}

.notification-error {
    border-left: 4px solid #f44336;
}

.notification-info {
    border-left: 4px solid #2196F3;
}

.notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.notification-message {
    margin-right: 16px;
    color: #333;
}

.notification-close {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-close:hover {
    color: #333;
}

.field-error {
    color: #f44336;
    font-size: 0.875rem;
    margin-top: 4px;
}

input.error, textarea.error {
    border-color: #f44336;
}

.mobile-contact-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    color: #333;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.mobile-contact-link:hover {
    background-color: #f5f5f5;
}

.mobile-social-links {
    display: flex;
    gap: 16px;
    padding: 12px 16px;
}

.mobile-social-links a {
    color: #333;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.mobile-social-links a:hover {
    color: #ff6b6b;
}

img.loading {
    opacity: 0.6;
    transition: opacity 0.3s ease;
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
}

.indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ddd;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.indicator.active {
    background-color: #ff6b6b;
}

.indicator:hover {
    background-color: #ff5252;
}

@media (max-width: 768px) {
    .notification {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);
