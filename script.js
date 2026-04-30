document.addEventListener('DOMContentLoaded', () => {
    
    // Utility: Debounce function to limit the rate at which a function can fire.
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // --- Header shadow on scroll ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.35)';
            } else {
                header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
            }
        }, 10));
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn && mobileMenuOverlay) {
        const toggleMenu = () => {
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Allow default behavior for external links if any
            if (!targetId.startsWith('#')) return;

            e.preventDefault();
            
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Carousel Logic ---
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => {
            showSlide((currentSlide + 1) % slides.length);
        };

        const prevSlide = () => {
            showSlide((currentSlide - 1 + slides.length) % slides.length);
        };

        const startSlideShow = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetSlideShow = () => {
            clearInterval(slideInterval);
            startSlideShow();
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetSlideShow();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetSlideShow();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetSlideShow();
            });
        });

        startSlideShow();
    }

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            item.addEventListener('toggle', () => {
                if (item.open) {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.open) {
                            otherItem.removeAttribute('open');
                        }
                    });
                }
            });
        });
    }

    // --- Intersection Observer for Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once revealed, no need to observe anymore
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // 15% of the element must be visible
            rootMargin: '0px 0px -50px 0px' // Slightly earlier reveal
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

});
