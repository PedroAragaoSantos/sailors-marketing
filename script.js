/* ==========================================================================
   SAILORS MARKETING — THE EXACT PROMPT INTERACTIVE ENGINE
   Vanilla JS implementing Slideshow, Dynamic words, IntersectionObserver reveals,
   Infinite looping carousels fallback, Feeds switcher, Count-up & Form logic.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 0. UNIQUE SESSION TRACKING
    if (!sessionStorage.getItem('sailors_session_viewed')) {
        sessionStorage.setItem('sailors_session_viewed', 'true');
        let views = parseInt(localStorage.getItem('sailors_page_views') || '0');
        localStorage.setItem('sailors_page_views', (views + 1).toString());
    }

    // 1. CUSTOM MOUSE GLOW FOLLOWER (Smooth easing)
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const updateGlowPosition = () => {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
            requestAnimationFrame(updateGlowPosition);
        };
        updateGlowPosition();
    }

    // 2. HERO SLIDESHOW (Crossfade every 4000ms)
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length > 0) {
        let currentSlideIndex = 0;
        setInterval(() => {
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add('active');
        }, 4000);
    }

    // 3. NAVBAR STICKY EFFECT ON SCROLL
    const navbar = document.querySelector('.navbar');
    const checkNavbarSticky = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    };
    window.addEventListener('scroll', checkNavbarSticky);
    checkNavbarSticky();

    // 4. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        const toggleMenu = () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        };

        menuToggle.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 5. SCROLL-TRIGGERED ENTRANCE ANIMATIONS (IntersectionObserver with will-change removal)
    // Targets all reveal classes
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom, .reveal-fade');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Trigger animation by adding class
                element.classList.add('reveal-active');
                
                // performance optimization: Remove will-change after transition completes
                element.addEventListener('transitionend', function handler(e) {
                    if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
                        element.style.willChange = 'auto';
                        element.removeEventListener('transitionend', handler); // Clean listener
                    }
                });

                // Fail-safe: remove will-change after a threshold anyway
                setTimeout(() => {
                    element.style.willChange = 'auto';
                }, 1000);

                // Stop observing once animated
                observer.unobserve(element);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 6. DYNAMIC ANIMATING WORD (crescer -> expandir -> vender -> comunicar)
    const dynamicWord = document.getElementById('dynamicWord');
    if (dynamicWord) {
        const words = ['crescer', 'expandir', 'vender', 'comunicar'];
        let wordIndex = 0;

        setInterval(() => {
            // Step 1: Fade out
            dynamicWord.classList.add('fade-out');

            // Step 2: Update content and fade back in after 400ms transition completes
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                dynamicWord.textContent = words[wordIndex];
                dynamicWord.classList.remove('fade-out');
            }, 400);
        }, 1900); // 1500ms display time + 400ms transition time = 1900ms cycle
    }

    // 7. FEEDS CARROSSEL (Manual navigation - 1 feed at a time)
    const feedTrack = document.getElementById('feedTrack');
    const feedSlides = document.querySelectorAll('.feed-slide');
    const prevBtn = document.getElementById('feedPrevBtn');
    const nextBtn = document.getElementById('feedNextBtn');

    if (feedTrack && feedSlides.length > 0 && prevBtn && nextBtn) {
        let currentFeedIndex = 0;
        const totalFeeds = feedSlides.length;

        const updateFeedCarousel = () => {
            const shiftPercentage = currentFeedIndex * 100;
            feedTrack.style.transform = `translateX(-${shiftPercentage / totalFeeds}%)`;
            
            // Toggle active classes on slides
            feedSlides.forEach((slide, index) => {
                if (index === currentFeedIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        };

        nextBtn.addEventListener('click', () => {
            currentFeedIndex = (currentFeedIndex + 1) % totalFeeds;
            updateFeedCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentFeedIndex = (currentFeedIndex - 1 + totalFeeds) % totalFeeds;
            updateFeedCarousel();
        });
    }

    // 8. STATISTICS COUNT-UP ANIMATION (Animate in 1.5s with easeOutQuad)
    const statNumbers = document.querySelectorAll('.stat-number');

    const runCountUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 1500; // Exact 1.5s specification match
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing: easeOutQuad
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * target);
            
            element.textContent = `+${currentValue}`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = `+${target}`; // Secure target stop
            }
        };

        requestAnimationFrame(animate);
    };

    const statsSection = document.querySelector('.stats-box-neon');
    if (statsSection) {
        let statsAnimated = false;

        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => runCountUp(stat));
            }
        }, { threshold: 0.15 });

        statsObserver.observe(statsSection);
    }

    // 9. FORM VALIDATION & SUCCESS FEEDBACK ON CONTACTS
    const contactForm = document.getElementById('contactForm');
    const formSuccessCard = document.getElementById('formSuccessCard');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    if (contactForm && formSuccessCard) {
        
        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        };

        const validatePhone = (phone) => {
            const digits = phone.replace(/\D/g, '');
            return digits.length >= 8;
        };

        const markFieldGroupError = (input, hasError) => {
            const formGroup = input.closest('.form-group');
            if (hasError) {
                formGroup.classList.add('has-error');
            } else {
                formGroup.classList.remove('has-error');
            }
        };

        // Live clean error
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                markFieldGroupError(input, false);
            });
        });

        // Submit listener
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim().length < 3) {
                markFieldGroupError(nameInput, true);
                isFormValid = false;
            }

            const emailInput = document.getElementById('email');
            if (!validateEmail(emailInput.value.trim())) {
                markFieldGroupError(emailInput, true);
                isFormValid = false;
            }

            const phoneInput = document.getElementById('phone');
            if (!validatePhone(phoneInput.value.trim())) {
                markFieldGroupError(phoneInput, true);
                isFormValid = false;
            }

            const messageInput = document.getElementById('message');
            if (messageInput.value.trim().length < 5) {
                markFieldGroupError(messageInput, true);
                isFormValid = false;
            }

            if (isFormValid) {
                const submitBtn = contactForm.querySelector('.btn-submit');
                const submitSpan = submitBtn.querySelector('span');
                const prevText = submitSpan.textContent;

                // Animate loader
                submitBtn.style.pointerEvents = 'none';
                submitSpan.textContent = 'Lançando Âncora...';
                submitBtn.style.backgroundColor = 'var(--accent-teal)';

                setTimeout(() => {
                    formSuccessCard.classList.add('active');
                    contactForm.reset();
                    
                    submitBtn.style.pointerEvents = 'auto';
                    submitSpan.textContent = prevText;
                    submitBtn.style.backgroundColor = '';
                }, 1500);
            }
        });

        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', () => {
                formSuccessCard.classList.remove('active');
            });
        }
    }

    // 10. TEAM CAROUSEL (Geometric card-by-card horizontal sliding with progress dots)
    const teamTrack = document.getElementById('teamTrack');
    const teamPrevBtn = document.getElementById('teamPrevBtn');
    const teamNextBtn = document.getElementById('teamNextBtn');
    const teamDotsContainer = document.getElementById('teamDots');
    const teamCards = document.querySelectorAll('.team-card');
    
    if (teamTrack && teamCards.length > 0 && teamPrevBtn && teamNextBtn) {
        let currentIndex = 0;
        
        const getVisibleCards = () => {
            const width = window.innerWidth;
            if (width > 1024) return 4;
            if (width > 768) return 3;
            return 1.3; // mobile (shows one full card and cuts off the next slightly)
        };
        
        const getMaxIndex = () => {
            return Math.max(0, teamCards.length - Math.floor(getVisibleCards()));
        };
        
        const updateDots = () => {
            if (!teamDotsContainer) return;
            teamDotsContainer.innerHTML = '';
            
            const maxIndex = getMaxIndex();
            const totalDots = maxIndex + 1;
            
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('team-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarousel();
                });
                teamDotsContainer.appendChild(dot);
            }
        };
        
        const updateCarousel = () => {
            const cardWidth = teamCards[0].offsetWidth;
            const width = window.innerWidth;
            const gap = width > 1024 ? 24 : (width > 768 ? 20 : 16); // Match gap sizes in CSS
            const maxIndex = getMaxIndex();
            
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            const offset = currentIndex * (cardWidth + gap);
            teamTrack.style.transform = `translateX(-${offset}px)`;
            
            // Toggle active dots
            const dots = teamDotsContainer.querySelectorAll('.team-dot');
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Toggle disabled states on buttons
            if (currentIndex === 0) {
                teamPrevBtn.classList.add('disabled');
            } else {
                teamPrevBtn.classList.remove('disabled');
            }
            
            if (currentIndex >= maxIndex) {
                teamNextBtn.classList.add('disabled');
            } else {
                teamNextBtn.classList.remove('disabled');
            }
        };
        
        teamNextBtn.addEventListener('click', () => {
            const maxIndex = getMaxIndex();
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        teamPrevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        // Touch support for swiping on mobile
        let startX = 0;
        let isSwiping = false;
        
        teamTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        }, { passive: true });
        
        teamTrack.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            const diffX = startX - e.touches[0].clientX;
            
            if (Math.abs(diffX) > 50) {
                const maxIndex = getMaxIndex();
                if (diffX > 0 && currentIndex < maxIndex) {
                    currentIndex++;
                    updateCarousel();
                    isSwiping = false;
                } else if (diffX < 0 && currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                    isSwiping = false;
                }
            }
        }, { passive: true });
        
        teamTrack.addEventListener('touchend', () => {
            isSwiping = false;
        });
        
        // Handle window resize dynamically
        window.addEventListener('resize', () => {
            updateDots();
            updateCarousel();
        });
        
        // Initial setup
        updateDots();
        updateCarousel();
    }
});
