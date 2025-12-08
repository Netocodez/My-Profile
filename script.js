document.addEventListener('DOMContentLoaded', function() {
    //const roleTextElement = document.getElementById('role-text');
    //const roles = ["Frontend Developer", "React Engineer", "UI Specialist", "Web Designer"];
    //let roleIndex = 0;

    const roles = [
        "Full Stack Developer",
        "Data Analytics Specialist",
        "Health Informatics & M&E Specialist",
        "Tech Lead"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const roleTextElement = document.getElementById("role-text");

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            // Typing forward
            roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            // When full word typed, pause before deleting
            if (charIndex === currentRole.length) {
                setTimeout(() => (isDeleting = true), 1000);
            }

        } else {
            // Deleting backward
            roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            // When fully deleted, move to next role
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
    }

    // speed (adjust if needed)
    // typing speed = 100ms
    // deleting speed = 60ms
    setInterval(typeRole, 100);

    // 2. Mobile Menu Toggle
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked (for single-page navigation)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. Smooth Scrolling (optional, since CSS scroll-behavior handles it, but good for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});