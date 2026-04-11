document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================================
       1. CREATION ET PLACEMENT DU BOUTON DE THEME
       ========================================================= */
    const themeBtn = document.createElement("button");
    themeBtn.id = "theme-toggle";
    themeBtn.innerHTML = "🌙";
    themeBtn.classList.add("theme-btn");

    const burgerMenu = document.getElementById("burger-menu");
    const navbar = document.querySelector(".navbar");

    // On insère le bouton juste avant le menu burger comme demandé
    if (navbar && burgerMenu) {
        navbar.insertBefore(themeBtn, burgerMenu);
    }

    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === "dark") {
            body.classList.add("dark-mode");
            themeBtn.innerHTML = "☀️";
        } else {
            body.classList.remove("dark-mode");
            themeBtn.innerHTML = "🌙";
        }
    };

    const savedTheme = localStorage.getItem("portfolio-theme") || "light";
    applyTheme(savedTheme);

    themeBtn.addEventListener("click", () => {
        const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        applyTheme(newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
    });


    /* =========================================================
       2. GESTION DU MENU BURGER (Navigation Mobile)
       ========================================================= */
    const navMenu = document.getElementById("zone");
    const navLinks = document.querySelectorAll(".zone li a");

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener("click", () => {
            burgerMenu.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Fermeture automatique quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                burgerMenu.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }


    /* =========================================================
       3. DEFILEMENT FLUIDE (Smooth Scroll)
       ========================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajusté pour ton header
                    behavior: "smooth"
                });
            }
        });
    });


    /* =========================================================
       4. ANIMATIONS D'APPARITION (Intersection Observer)
       ========================================================= */
    // On cible tes cartes de compétences et les éléments de ta timeline
    const animElements = document.querySelectorAll(".card, .timeline-item, .part1, .part2");

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // On peut arrêter d'observer une fois l'élément apparu
                appearanceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => {
        el.classList.add("hidden"); // Ajoute la classe de base pour cacher
        appearanceObserver.observe(el);
    });

});
const navbar = document.querySelector(".nav"); // au lieu de .navbar