document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuLinks = document.querySelectorAll('.mobile-menu nav ul li a');

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});