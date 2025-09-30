document.addEventListener('DOMContentLoaded', function () {

    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // --- 0. NEW 'Typing' Preloader ---
    const preloader = document.querySelector('#preloader');
    const preloaderTimeline = gsap.timeline();

    preloaderTimeline
        .to(".preloader-text", {
            duration: 2.5,
            text: "Welcome to my Portfolio...", // Text to be typed
            ease: "none",
            delay: 0.5
        })
        .to(".preloader-text", { // Fades out the text after typing
            opacity: 0,
            duration: 1.0,
            ease: "power2.inOut"
        }, "+=0.5")
        .to('.preloader-panel.panel-left', {
            xPercent: -100,
            duration: 1.2,
            ease: "power3.inOut"
        })
        .to('.preloader-panel.panel-right', {
            xPercent: 100,
            duration: 1.2,
            ease: "power3.inOut"
        }, "<") // "<" starts this animation at the same time as the previous one
        .to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => preloader.style.display = 'none'
        });


    // --- 1. High-Performance Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('a, button, .menu-toggle, .magnetic-button, [data-tilt]');

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        cursor.style.transform = `translate3d(${clientX - 10}px, ${clientY - 10}px, 0)`;
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    // --- 2. Magnetic Buttons ---
    const magneticButtons = document.querySelectorAll('.magnetic-button');
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const { offsetX, offsetY, target } = e;
            const { clientWidth, clientHeight } = target;
            const x = (offsetX / clientWidth - 0.5) * 40; // Pull strength
            const y = (offsetY / clientHeight - 0.5) * 40;
            gsap.to(target, { x: x, y: y, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });

        button.addEventListener('mouseleave', function(e) {
            gsap.to(e.target, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });

    // --- 3. Navigation Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('header');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        header.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
       link.addEventListener('click', () => {
           header.classList.remove('active');
           navMenu.classList.remove('active');
           // Native scroll handles the rest
       });
    });
    
    // --- 4. GSAP SCROLL-TRIGGERED ANIMATIONS ---
    const startDelay = preloaderTimeline.duration() - 1;

    // Hero Section Animation
    gsap.from(".main-heading span", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: startDelay
    });
    gsap.from(".lead-text", { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: startDelay + 0.4 });
    gsap.from(".cta-button", { scale: 0, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: startDelay + 0.6 });
    gsap.from(".hero-image", { x: 100, opacity: 0, duration: 1.2, ease: "power3.out", delay: startDelay + 0.2 });
    
    // Section Title Animations
    Splitting(); // Initialize Splitting.js
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title.querySelectorAll('.char'), {
            y: 50,
            opacity: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
            }
        });
    });

    // Animate cards on scroll
    gsap.utils.toArray('.glass-card, .project-card').forEach(card => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            }
        });
    });

    // --- 5. VANILLA TILT.JS INITIALIZATION ---
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
        perspective: 1000,
    });
});