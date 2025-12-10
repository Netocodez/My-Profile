document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Dynamic Typing Role Animation Logic ---
    const roleTextElement = document.getElementById("role-text");
    const roles = [
        "Full Stack Developer",
        "Data Analytics Specialist",
        "Health Informatics & M&E Specialist",
        "Tech Lead"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimer; // Use a timer variable for precise control

    function typeRole() {
        const currentRole = roles[roleIndex];
        const fullLength = currentRole.length;
        let speed = 100; // Default typing speed

        if (!isDeleting) {
            // Typing forward
            roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === fullLength) {
                // When full word typed, switch to deleting after a pause
                speed = 1500; // Pause for 1.5 seconds
                isDeleting = true;
            }

        } else {
            // Deleting backward
            roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            speed = 50; // Faster deleting speed

            if (charIndex === 0) {
                // When fully deleted, move to next role
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 200; // Short pause before typing next word
            }
        }

        // Clear the previous timer and set the new one with calculated speed
        typingTimer = setTimeout(typeRole, speed);
    }

    // Start the typing animation
    typeRole();


    // --- 2. Mobile Menu Toggle & Close ---
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked (for single-page navigation)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                // Use a short timeout to allow the smooth scroll to start before closing the menu
                setTimeout(() => {
                    navLinks.classList.remove('active');
                }, 300);
            });
        });
    }

    // --- 3. Smooth Scrolling (Fallback for CSS scroll-behavior) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 4. Dark/Light Mode Toggle with Local Storage ---
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    // Check for stored preference
    const currentMode = localStorage.getItem('theme');
    if (currentMode === 'light') {
        body.classList.add('light-mode');
        modeToggle.checked = true;
    } else {
        // Ensure 'theme' is set to 'dark' if no preference or if it was manually removed
        localStorage.setItem('theme', 'dark');
        body.classList.remove('light-mode');
        modeToggle.checked = false;
    }

    // Event listener for the switch
    modeToggle.addEventListener('change', () => {
        if (modeToggle.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // NOTE: The redundant mobile menu logic in your original section 4 has been removed.

});