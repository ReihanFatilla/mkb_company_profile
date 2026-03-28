/* ========================================
   CUSTOM MOTION ENGINE
   (LIGHTWEIGHT GSAP-LIKE SYSTEM)
======================================== */

class MotionEngine {

    constructor() {
        this.animations = [];
        this.init();
    }

    init() {
        this.observeElements();
        this.loop();
    }

    /* ========================================
       ELEMENT OBSERVER
    ======================================== */
    observeElements() {
        const elements = document.querySelectorAll("[data-motion]");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        elements.forEach(el => observer.observe(el));
    }

    /* ========================================
       ANIMATION REGISTRY
    ======================================== */
    animate(el) {

        const type = el.dataset.motion;

        switch(type) {

            case "fade-up":
                this.fadeUp(el);
                break;

            case "fade-in":
                this.fadeIn(el);
                break;

            case "slide-left":
                this.slideLeft(el);
                break;

            case "scale":
                this.scale(el);
                break;

        }
    }

    /* ========================================
       ANIMATION TYPES
    ======================================== */

    fadeUp(el) {
        el.style.opacity = 0;
        el.style.transform = "translateY(40px)";

        this.tween(el, {
            opacity: 1,
            y: 0,
            duration: 800
        });
    }

    fadeIn(el) {
        el.style.opacity = 0;

        this.tween(el, {
            opacity: 1,
            duration: 600
        });
    }

    slideLeft(el) {
        el.style.opacity = 0;
        el.style.transform = "translateX(60px)";

        this.tween(el, {
            opacity: 1,
            x: 0,
            duration: 700
        });
    }

    scale(el) {
        el.style.opacity = 0;
        el.style.transform = "scale(0.9)";

        this.tween(el, {
            opacity: 1,
            scale: 1,
            duration: 700
        });
    }

    /* ========================================
       TWEEN ENGINE
    ======================================== */

    tween(el, props) {

        const start = performance.now();

        const animate = (time) => {

            let progress = (time - start) / props.duration;
            progress = Math.min(progress, 1);

            const ease = this.easeOutCubic(progress);

            if (props.opacity !== undefined) {
                el.style.opacity = ease;
            }

            let transform = "";

            if (props.y !== undefined) {
                transform += `translateY(${(1 - ease) * 40}px) `;
            }

            if (props.x !== undefined) {
                transform += `translateX(${(1 - ease) * 60}px) `;
            }

            if (props.scale !== undefined) {
                transform += `scale(${0.9 + (0.1 * ease)})`;
            }

            el.style.transform = transform;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    /* ========================================
       EASING FUNCTION
    ======================================== */

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    /* ========================================
       LOOP (FUTURE EXTENSIONS)
    ======================================== */

    loop() {
        requestAnimationFrame(() => this.loop());
    }
}

/* INIT ENGINE */
document.addEventListener("DOMContentLoaded", () => {
    new MotionEngine();
});