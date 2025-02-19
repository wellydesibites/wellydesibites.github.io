// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Add phone and social to mobile menu
    if(navLinks.classList.contains('active')) {
        const mobilePhone = document.createElement('li');
        mobilePhone.className = 'phone-number';
        mobilePhone.innerHTML = `
            <i class="fas fa-phone-alt"></i>
            <a href="tel:02108326153">0210 8326153</a>
        `;
        
        const mobileSocial = document.createElement('li');
        mobileSocial.className = 'social-icons';
        mobileSocial.innerHTML = `
            <a href="https://www.facebook.com/wellydesibites" target="_blank">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/wellydesibites" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>
        `;
        
        navLinks.appendChild(mobilePhone);
        navLinks.appendChild(mobileSocial);
    } else {
        const elements = document.querySelectorAll('.phone-number, .social-icons');
        elements.forEach(el => el.remove());
    }
});

// Form Submission
const enquiryForm = document.getElementById('enquiryForm');
enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic
    alert('Thank you for your enquiry! We will respond within 24 hours.');
    enquiryForm.reset();
});

// Initialize Carousels
document.addEventListener('DOMContentLoaded', () => {
    const googleCarousel = new Carousel('googleReviews');
    const facebookCarousel = new Carousel('facebookReviews');

    document.querySelectorAll('.next-review').forEach(btn => {
        btn.addEventListener('click', () => {
            const reviewSection = btn.closest('.review-section');
            if (reviewSection.id === 'googleReviews') {
                googleCarousel.next();
            } else if (reviewSection.id === 'facebookReviews') {
                facebookCarousel.next();
            }
        });
    });

    document.querySelectorAll('.prev-review').forEach(btn => {
        btn.addEventListener('click', () => {
            const reviewSection = btn.closest('.review-section');
            if (reviewSection.id === 'googleReviews') {
                googleCarousel.prev();
            } else if (reviewSection.id === 'facebookReviews') {
                facebookCarousel.prev();
            }
        });
    });
});

// Carousel Controller Class
class Carousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.items = this.container.querySelectorAll('.review');
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.showItem(this.currentIndex);
    }

    showItem(index) {
        this.items.forEach(item => {
            item.style.opacity = '0';
            item.classList.remove('active');
        });
        
        this.items[index].style.opacity = '1';
        this.items[index].classList.add('active');
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.showItem(this.currentIndex);
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.showItem(this.currentIndex);
    }
}

// Smooth Scroll with Header Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        const headerHeight = document.querySelector('.main-nav').offsetHeight;
        
        window.scrollTo({
            top: target.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
});
