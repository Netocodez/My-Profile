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
    let typingTimer;

    function typeRole() {
        const currentRole = roles[roleIndex];
        const fullLength = currentRole.length;
        let speed = 100;

        if (!isDeleting) {
            roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === fullLength) {
                speed = 1500;
                isDeleting = true;
            }
        } else {
            roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            speed = 50;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 200;
            }
        }
        typingTimer = setTimeout(typeRole, speed);
    }

    typeRole();


    // --- 2. Mobile Menu Toggle & Close Logic ---
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle) {
        // Toggle Menu
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); 
            navLinks.classList.toggle('active');
            
            // Toggle between hamburger and X icon
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            }
        });

        // Close menu when a navigation link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    if (menuIcon) {
                        menuIcon.classList.add('fa-bars');
                        menuIcon.classList.remove('fa-times');
                    }
                }, 300);
            });
        });

        // Prevent clicking the mode switch from closing the menu
        const modeSwitchWrapper = document.querySelector('.mode-switch-wrapper');
        if (modeSwitchWrapper) {
            modeSwitchWrapper.addEventListener('click', (e) => {
                e.stopPropagation(); // Stops the "click outside" logic from firing
            });
        }

        // Close menu when clicking anywhere outside
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (navLinks.classList.contains('active') && !isClickInsideMenu && !isClickOnToggle) {
                navLinks.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
            }
        });
    }

    // --- 3. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 4. Dark/Light Mode Toggle with Local Storage ---
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    // Check for stored preference
    const storedTheme = localStorage.getItem('theme');
    
    // Apply theme on load
    if (storedTheme === 'light') {
        body.classList.add('light-mode');
        if (modeToggle) modeToggle.checked = true;
    } else {
        body.classList.remove('light-mode');
        if (modeToggle) modeToggle.checked = false;
    }

    // Event listener for the switch
    if (modeToggle) {
        modeToggle.addEventListener('change', () => {
            if (modeToggle.checked) {
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});