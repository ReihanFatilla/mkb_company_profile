/* ========================================
   CORE INTERACTION CONTROLLER
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    initNavbarScroll();
    initSmoothScroll();
    initActiveNav();
    initCounters();
    initMobileMenu();
    initRevealSystem();

});

/* ========================================
   NAVBAR SCROLL EFFECT
======================================== */

function initNavbarScroll() {
    const navbar = document.querySelector(".custom-navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(11, 29, 42, 0.98)";
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
        } else {
            navbar.style.background = "rgba(11, 29, 42, 0.9)";
            navbar.style.boxShadow = "none";
        }
    });
}

/* ========================================
   SMOOTH SCROLL (PRECISION)
======================================== */

function initSmoothScroll() {
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* ========================================
   ACTIVE NAV LINK (SCROLL TRACKING)
======================================== */

function initActiveNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
}

/* ========================================
   COUNTER ANIMATION (ON VIEWPORT)
======================================== */

function initCounters() {
    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = +el.getAttribute("data-target");
    let count = 0;
    const speed = target / 100;

    const update = () => {
        count += speed;
        if (count < target) {
            el.innerText = Math.floor(count);
            requestAnimationFrame(update);
        } else {
            el.innerText = target + "+";
        }
    };

    update();
}

/* ========================================
   MOBILE MENU UX
======================================== */

function initMobileMenu() {
    const links = document.querySelectorAll(".nav-link");
    const navCollapse = document.querySelector(".navbar-collapse");

    links.forEach(link => {
        link.addEventListener("click", () => {
            if (navCollapse.classList.contains("show")) {
                new bootstrap.Collapse(navCollapse).hide();
            }
        });
    });
}

/* ========================================
   REVEAL ANIMATION SYSTEM (HOOK)
======================================== */

function initRevealSystem() {
    const elements = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
}

/* Scroll Progress Indicator */
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "3px";
progressBar.style.background = "#c8a96a";
progressBar.style.zIndex = "9999";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = (scroll / height) * 100 + "%";
});

/* Cursor Glow */
const cursor = document.createElement("div");
cursor.style.position = "fixed";
cursor.style.width = "12px";
cursor.style.height = "12px";
cursor.style.borderRadius = "50%";
cursor.style.background = "#c8a96a";
cursor.style.pointerEvents = "none";
cursor.style.zIndex = "9999";
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});