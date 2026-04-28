/* =========================================================
   Minanul Aziz — Personal Portfolio
   Lightweight vanilla JS for interactions:
   - Custom cursor (desktop only)
   - Scroll reveal + skill bar fill on intersection
   - Navbar shadow + active link spy
   - Smooth scroll for in-page anchors
   - Mobile drawer toggle
   - Scroll progress + back-to-top
   - Tilt-light effect on skill cards
   ========================================================= */

(() => {
    'use strict';

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Reveal on scroll ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach((el) => {
        const delay = el.dataset.delay || 0;
        el.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    /* ---------- Skill bar fill animation ---------- */
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.fill, 10) || 0;
                    el.style.width = `${target}%`;
                    skillObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.4 }
    );
    skillFills.forEach((el) => skillObserver.observe(el));

    /* ---------- Navbar scroll state + active link spy ---------- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = ['hero', 'about', 'skills', 'projects', 'contact']
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const setActive = (id) => {
        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
        });
    };

    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            navbar.classList.toggle('scrolled', y > 24);

            // Scroll progress
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const pct = Math.max(0, Math.min(100, (y / docH) * 100));
            document.querySelector('.scroll-progress').style.width = `${pct}%`;

            // Active section detection
            const triggerY = window.innerHeight * 0.35;
            let current = sections[0]?.id;
            for (const s of sections) {
                const rect = s.getBoundingClientRect();
                if (rect.top <= triggerY) current = s.id;
            }
            if (current) setActive(current);

            ticking = false;
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Smooth in-page anchor scroll (handles offset for fixed nav) ---------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href').slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
            // Close mobile drawer if open
            closeDrawer();
        });
    });

    /* ---------- Mobile drawer ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const drawer = document.getElementById('mobileDrawer');

    const openDrawer = () => {
        drawer.classList.add('open');
        menuToggle.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
    };
    const closeDrawer = () => {
        drawer.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
    };

    if (menuToggle && drawer) {
        menuToggle.addEventListener('click', () => {
            if (drawer.classList.contains('open')) closeDrawer();
            else openDrawer();
        });
    }

    /* ---------- Custom cursor (desktop pointer only) ---------- */
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (supportsHover) {
        document.body.classList.add('cursor-ready');
        const dot = document.querySelector('.cursor-dot');
        const ring = document.querySelector('.cursor-ring');

        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx;
        let ry = my;

        window.addEventListener('mousemove', (e) => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        });

        // Smooth follow for the ring
        const animateRing = () => {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateRing);
        };
        animateRing();

        // Hover state for interactive elements
        const hoverables = document.querySelectorAll('a, button, .skill-card, .project-card');
        hoverables.forEach((el) => {
            el.addEventListener('mouseenter', () => ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
        });
    }

    /* ---------- Tilt-light effect on skill cards ---------- */
    document.querySelectorAll('.skill-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });

    /* ---------- Subtle parallax for hero name on mouse move ---------- */
    if (supportsHover) {
        const hero = document.querySelector('.hero');
        const name = document.querySelector('.hero-name');
        if (hero && name) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const cx = (e.clientX - rect.left) / rect.width - 0.5;
                const cy = (e.clientY - rect.top) / rect.height - 0.5;
                name.style.transform = `translate(${cx * 8}px, ${cy * 6}px)`;
            });
            hero.addEventListener('mouseleave', () => {
                name.style.transform = 'translate(0, 0)';
            });
        }
    }
})();
