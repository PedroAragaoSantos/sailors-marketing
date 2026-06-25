/* ==========================================================================
   SAILORS MARKETING — REDESIGN V2 INTERACTIVE ENGINE
   Vanilla JS implementing Mouse Glow, Count-up, Accordions & Mobile Nav.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 0. INITIALIZE META PIXEL AND VISITOR TRACKING
    if (typeof SAILORS_CONFIG !== 'undefined') {
        // Dynamic Facebook Pixel loading
        if (SAILORS_CONFIG.metaPixelId) {
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', SAILORS_CONFIG.metaPixelId);
            fbq('track', 'PageView');
        }

        // Visitor page-view session tracking
        if (!sessionStorage.getItem('sailors_page_view_counted')) {
            let views = parseInt(localStorage.getItem('sailors_page_views') || '0');
            localStorage.setItem('sailors_page_views', views + 1);
            sessionStorage.setItem('sailors_page_view_counted', 'true');
        }
    }

    // 1. CUSTOM MOUSE GLOW FOLLOWER (Smooth easing)
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
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



    // 3. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        const toggleMenu = () => {
            navMenu.classList.toggle('active');
            // Toggle hamburger icon animation states if needed
            const bars = menuToggle.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'translateY(6px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        };

        menuToggle.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // 4. METRICS COUNT-UP ANIMATION (easeOutQuad)
    const statNumbers = document.querySelectorAll('.metric-number');

    const runCountUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds duration
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
                element.textContent = `+${target}`; // final check
            }
        };

        requestAnimationFrame(animate);
    };

    const confiaSection = document.querySelector('.section-confia');
    if (confiaSection && statNumbers.length > 0) {
        let statsAnimated = false;

        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => runCountUp(stat));
            }
        }, { threshold: 0.15 });

        statsObserver.observe(confiaSection);
    }

    // 5. ACCORDION TOGGLE LOGIC (Nossos Serviços)
    const serviceItems = document.querySelectorAll('.accordion-item');
    serviceItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const icon = item.querySelector('.accordion-icon');
        
        if (trigger) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other items
                serviceItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherTrigger = otherItem.querySelector('.accordion-trigger');
                    const otherIcon = otherItem.querySelector('.accordion-icon');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                    if (otherIcon) otherIcon.textContent = '+';
                });

                // Toggle this item
                if (!isActive) {
                    item.classList.add('active');
                    trigger.setAttribute('aria-expanded', 'true');
                    if (icon) icon.textContent = '−'; // minus icon
                } else {
                    item.classList.remove('active');
                    trigger.setAttribute('aria-expanded', 'false');
                    if (icon) icon.textContent = '+';
                }
            });
        }
    });

    // 6. ACCORDION TOGGLE LOGIC (Perguntas Frequentes FAQ)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const icon = item.querySelector('.faq-icon');
        
        if (trigger) {
            trigger.addEventListener('click', () => {
                const isFaqActive = item.classList.contains('faq-active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('faq-active');
                    const otherTrigger = otherItem.querySelector('.faq-trigger');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                    if (otherIcon) otherIcon.textContent = '+';
                });

                // Toggle this item
                if (!isFaqActive) {
                    item.classList.add('faq-active');
                    trigger.setAttribute('aria-expanded', 'true');
                    if (icon) icon.textContent = '−';
                } else {
                    item.classList.remove('faq-active');
                    trigger.setAttribute('aria-expanded', 'false');
                    if (icon) icon.textContent = '+';
                }
            });
        }
    });

    // 7. TOUCH SUPPORT FOR CASES CARDS IN MOBILE
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Check if device is touch based
            if (window.innerWidth <= 1024) {
                const overlay = card.querySelector('.case-hover-overlay');
                if (overlay && !overlay.contains(e.target)) {
                    // Toggle state on click for touch screens
                    const isActive = card.classList.contains('touch-active');
                    
                    // Reset all other touch active cards
                    caseCards.forEach(c => c.classList.remove('touch-active'));
                    
                    if (!isActive) {
                        card.classList.add('touch-active');
                        // Prevent click on background link if just activating hover overlay
                        e.preventDefault();
                    }
                }
            }
        });
    });

    // 8. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    const addRevealWithStagger = (selector, delayIncrement = 100) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('reveal');
            if (index > 0) {
                el.style.transitionDelay = `${index * delayIncrement}ms`;
            }
        });
    };

    // Add simple reveal to general block elements
    const generalTargets = document.querySelectorAll(
        '.hero-headline-v2, .hero-cta-btn, .hero-bottom-desc, .hero-top-meta, ' +
        '.section-label, .awesome-headline, .support-text-small, ' +
        '.posicionamento-buttons-vertical, .problema-content-right, .estrutura-text, .estrutura-buttons-vertical, ' +
        '.estrutura-images-block, .servicos-header, .accordion-container, ' +
        '.depoimentos-cta, .faq-accordion-container, .contatos-left, .contatos-right'
    );
    generalTargets.forEach(el => el.classList.add('reveal'));

    // Stagger grid/card items
    addRevealWithStagger('.logo-item', 80);
    addRevealWithStagger('.metric-item', 150);
    addRevealWithStagger('.case-card', 150);
    addRevealWithStagger('.depoimento-card', 150);
    addRevealWithStagger('.faq-item', 100);

    // Intersection Observer to trigger active state
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px' // triggers slightly before entering viewport
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 9. ESTRUTURA MULTI-SLOT SLIDESHOW (Independent staggered fade transition)
    const initMultiSlotSlideshow = () => {
        const slots = document.querySelectorAll('.slideshow-slot');
        slots.forEach((slot, slotIndex) => {
            const slides = slot.querySelectorAll('.slide');
            if (slides.length <= 1) return;

            let currentIndex = 0;
            // Stagger intervals: Slot 1 is 4.2s, Slot 2 is 5.0s, Slot 3 is 5.8s
            const intervalTime = 4200 + (slotIndex * 800);

            setInterval(() => {
                const activeSlide = slides[currentIndex];
                activeSlide.classList.remove('active');
                
                currentIndex = (currentIndex + 1) % slides.length;
                
                const nextSlide = slides[currentIndex];
                nextSlide.classList.add('active');
            }, intervalTime);
        });
    };
    initMultiSlotSlideshow();

    // 10. CONTACT MODAL FUNCTIONALITY (Popup & Background Blur)
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalForm = document.getElementById('modalContactForm');
    const ctaTriggers = document.querySelectorAll('.hero-cta-btn, .btn-posicionamento-primary, .btn-primary, .btn-primary-footer');

    if (contactModal) {
        const openModal = (e) => {
            if (e) e.preventDefault();
            contactModal.classList.add('active');
            document.body.classList.add('modal-open');
        };

        const closeModal = () => {
            contactModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        };

        // Attach click triggers to CTAs
        ctaTriggers.forEach(trigger => {
            trigger.addEventListener('click', openModal);
        });

        // Close on close button click
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Close on clicking outside the modal card
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal();
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Form submission handling (Save lead to dashboard + webhooks + success screen)
        if (modalForm) {
            modalForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const nomeVal = document.getElementById('formNome').value.trim();
                const empresaVal = document.getElementById('formEmpresa').value.trim();
                const cargoVal = document.getElementById('formCargo').value;
                const telefoneVal = document.getElementById('formTelefone').value.trim();
                const faturamentoVal = document.getElementById('formFaturamento').value;
                const desafioVal = document.getElementById('formDesafio').value.trim();

                const formData = {
                    data: new Date().toLocaleString('pt-BR'),
                    nome: nomeVal,
                    whatsapp: telefoneVal,
                    email: '', // Not collected in popup form
                    empresa: empresaVal,
                    instagram: '', // Not collected in popup form
                    cargo: cargoVal,
                    faturamento: faturamentoVal,
                    desafio: desafioVal
                };

                // 1. Save lead to localStorage for the admin panel dashboard
                try {
                    const leads = JSON.parse(localStorage.getItem('sailors_leads') || '[]');
                    leads.push(formData);
                    localStorage.setItem('sailors_leads', JSON.stringify(leads));
                } catch (err) {
                    console.error('Error saving lead to localStorage:', err);
                }

                // 2. Meta Pixel Lead event trigger
                if (typeof fbq === 'function') {
                    fbq('track', 'Lead', {
                        content_name: formData.cargo,
                        content_category: formData.faturamento
                    });
                }

                // 3. General Webhook dispatch (Google Sheets)
                if (typeof SAILORS_CONFIG !== 'undefined' && SAILORS_CONFIG.webhookUrl) {
                    fetch(SAILORS_CONFIG.webhookUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'text/plain' },
                        body: JSON.stringify(formData)
                    }).catch(err => console.error('Erro ao disparar webhook geral:', err));
                }

                // 4. Discord Webhook dispatch
                if (typeof SAILORS_CONFIG !== 'undefined' && SAILORS_CONFIG.discordWebhookUrl) {
                    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
                    const waLink = cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone;

                    const discordPayload = {
                        embeds: [{
                            title: "⚓ Novo Lead Capturado! (Pop-up LP) — Sailors Marketing",
                            color: 16736538, // #FF611A
                            fields: [
                                { name: "👤 Nome", value: formData.nome, inline: true },
                                { name: "💼 Empresa", value: formData.empresa, inline: true },
                                { name: "📝 Cargo", value: formData.cargo, inline: true },
                                { name: "💰 Faturamento Mensal", value: formData.faturamento, inline: true },
                                { name: "🟢 WhatsApp", value: `[Falar no WhatsApp](https://wa.me/${waLink}) (${formData.whatsapp})`, inline: true },
                                { name: "🎯 Desafio", value: formData.desafio, inline: false }
                            ],
                            footer: { text: "Sailors Lead System" },
                            timestamp: new Date().toISOString()
                        }]
                    };

                    fetch(SAILORS_CONFIG.discordWebhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(discordPayload)
                    }).catch(err => console.error('Erro ao disparar webhook do Discord:', err));
                }

                // Show success screen and hide form
                modalForm.style.display = 'none';
                const successState = document.getElementById('modalSuccessState');
                if (successState) {
                    successState.style.display = 'block';
                }

                // Close modal after 4.5 seconds and reset form
                setTimeout(() => {
                    closeModal();
                    setTimeout(() => {
                        modalForm.style.display = 'flex';
                        if (successState) {
                            successState.style.display = 'none';
                        }
                        modalForm.reset();
                    }, 400);
                }, 4500);
            });
        }
    }
});
