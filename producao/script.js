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

    // 10. FULLSCREEN STEP FORM (Typeform-style)
    const stepFormOverlay = document.getElementById('stepFormOverlay');
    const stepFormClose = document.getElementById('stepFormClose');
    const stepForm = document.getElementById('stepForm');
    const stepProgressBar = document.getElementById('stepProgressBar');
    const stepPrev = document.getElementById('stepPrev');
    const stepNext = document.getElementById('stepNext');
    const ctaTriggers = document.querySelectorAll('.hero-cta-btn, .btn-posicionamento-primary, .btn-primary, .btn-primary-footer');

    if (stepFormOverlay) {
        const totalSteps = 5;
        let currentStep = 1;

        const getAllSteps = () => stepFormOverlay.querySelectorAll('.stepform-step[data-step]');

        const showStep = (stepNum) => {
            const steps = getAllSteps();
            steps.forEach(s => s.classList.remove('active'));

            const target = stepFormOverlay.querySelector(`.stepform-step[data-step="${stepNum}"]`);
            if (target) {
                target.classList.remove('active');
                // Force reflow to restart animation
                void target.offsetWidth;
                target.classList.add('active');

                // Focus input if step has one
                const input = target.querySelector('.stepform-input');
                if (input) setTimeout(() => input.focus(), 100);
            }

            // Update progress bar
            if (stepNum === 'success') {
                stepProgressBar.style.width = '100%';
            } else {
                stepProgressBar.style.width = `${(stepNum / totalSteps) * 100}%`;
            }

            // Update nav button states
            if (stepPrev) stepPrev.disabled = (stepNum === 1 || stepNum === 'success');
            if (stepNext) stepNext.disabled = (stepNum === totalSteps || stepNum === 'success');

            // Hide nav on success
            const navEl = document.getElementById('stepFormNav');
            if (navEl) navEl.style.display = (stepNum === 'success') ? 'none' : 'flex';

            currentStep = stepNum;
        };

        const validateCurrentStep = () => {
            if (currentStep === 'success') return false;

            const step = stepFormOverlay.querySelector(`.stepform-step[data-step="${currentStep}"]`);
            if (!step) return false;

            const input = step.querySelector('.stepform-input');
            if (input && !input.value.trim()) {
                input.style.borderBottomColor = '#ff4444';
                setTimeout(() => { input.style.borderBottomColor = ''; }, 1500);
                input.focus();
                return false;
            }

            const hiddenInput = step.querySelector('input[type="hidden"]');
            if (hiddenInput && !hiddenInput.value) {
                // Flash options to indicate selection needed
                const options = step.querySelectorAll('.stepform-option-btn');
                options.forEach(opt => {
                    opt.style.borderColor = '#ff4444';
                    setTimeout(() => { opt.style.borderColor = ''; }, 1500);
                });
                return false;
            }

            return true;
        };

        const goToNextStep = () => {
            if (currentStep === 'success') return;
            if (!validateCurrentStep()) return;

            const nextStep = currentStep + 1;
            if (nextStep > totalSteps) {
                submitForm();
            } else {
                showStep(nextStep);
            }
        };

        const goToPrevStep = () => {
            if (currentStep === 'success' || currentStep <= 1) return;
            showStep(currentStep - 1);
        };

        const openStepForm = (e) => {
            if (e) e.preventDefault();
            stepFormOverlay.classList.add('active');
            document.body.classList.add('stepform-open');
            currentStep = 1;
            showStep(1);
        };

        const closeStepForm = () => {
            stepFormOverlay.classList.remove('active');
            document.body.classList.remove('stepform-open');
            // Reset form after animation
            setTimeout(() => {
                if (stepForm) stepForm.reset();
                // Clear hidden inputs
                const hiddenInputs = stepForm.querySelectorAll('input[type="hidden"]');
                hiddenInputs.forEach(i => { i.value = ''; });
                // Clear selected options
                const selectedOpts = stepForm.querySelectorAll('.stepform-option-btn.selected');
                selectedOpts.forEach(o => o.classList.remove('selected'));
                // Reset to step 1
                const steps = getAllSteps();
                steps.forEach(s => s.classList.remove('active'));
                currentStep = 1;
                stepProgressBar.style.width = '0%';
            }, 500);
        };

        const submitForm = () => {
            const nomeVal = document.getElementById('formNome').value.trim();
            const empresaVal = document.getElementById('formEmpresa').value.trim();
            const cargoVal = document.getElementById('formCargo').value;
            const telefoneVal = document.getElementById('formTelefone').value.trim();
            const faturamentoVal = document.getElementById('formFaturamento').value;

            const formData = {
                data: new Date().toLocaleString('pt-BR'),
                nome: nomeVal,
                whatsapp: telefoneVal,
                email: '',
                empresa: empresaVal,
                instagram: '',
                cargo: cargoVal,
                faturamento: faturamentoVal,
                desafio: ''
            };

            // 1. Save lead to localStorage for admin panel
            try {
                const leads = JSON.parse(localStorage.getItem('sailors_leads') || '[]');
                leads.push(formData);
                localStorage.setItem('sailors_leads', JSON.stringify(leads));
            } catch (err) {
                console.error('Error saving lead to localStorage:', err);
            }

            // 2. Meta Pixel Lead event
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {
                    content_name: formData.cargo,
                    content_category: formData.faturamento
                });
            }

            // 3. Google Sheets Webhook
            if (typeof SAILORS_CONFIG !== 'undefined' && SAILORS_CONFIG.webhookUrl) {
                fetch(SAILORS_CONFIG.webhookUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify(formData)
                }).catch(err => console.error('Erro ao disparar webhook geral:', err));
            }

            // 4. Discord Webhook
            if (typeof SAILORS_CONFIG !== 'undefined' && SAILORS_CONFIG.discordWebhookUrl) {
                const cleanPhone = formData.whatsapp.replace(/\D/g, '');
                const waLink = cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone;

                const discordPayload = {
                    embeds: [{
                        title: "⚓ Novo Lead Capturado! (Step Form LP) — Sailors Marketing",
                        color: 16736538,
                        fields: [
                            { name: "👤 Nome", value: formData.nome, inline: true },
                            { name: "💼 Empresa", value: formData.empresa, inline: true },
                            { name: "📝 Cargo", value: formData.cargo, inline: true },
                            { name: "💰 Faturamento Mensal", value: formData.faturamento, inline: true },
                            { name: "🟢 WhatsApp", value: `[Falar no WhatsApp](https://wa.me/${waLink}) (${formData.whatsapp})`, inline: true }
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

            // Show success screen
            showStep('success');

            // Auto-close after 4.5 seconds
            setTimeout(() => {
                closeStepForm();
            }, 4500);
        };

        // Attach CTA triggers
        ctaTriggers.forEach(trigger => {
            trigger.addEventListener('click', openStepForm);
        });

        // Close button
        if (stepFormClose) {
            stepFormClose.addEventListener('click', closeStepForm);
        }

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && stepFormOverlay.classList.contains('active')) {
                closeStepForm();
            }
        });

        // Navigation arrows
        if (stepPrev) stepPrev.addEventListener('click', goToPrevStep);
        if (stepNext) stepNext.addEventListener('click', goToNextStep);

        // Ok buttons
        const okBtns = stepFormOverlay.querySelectorAll('.stepform-ok-btn');
        okBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                goToNextStep();
            });
        });

        // Enter key on inputs
        stepFormOverlay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('stepform-input')) {
                e.preventDefault();
                goToNextStep();
            }
        });

        // Option button selection (Cargo & Faturamento)
        const optionContainers = stepFormOverlay.querySelectorAll('.stepform-options');
        optionContainers.forEach(container => {
            const buttons = container.querySelectorAll('.stepform-option-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Clear previous selection in this group
                    buttons.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');

                    // Set hidden input value
                    const step = btn.closest('.stepform-step');
                    const hiddenInput = step.querySelector('input[type="hidden"]');
                    if (hiddenInput) {
                        hiddenInput.value = btn.getAttribute('data-value');
                    }

                    // Auto-advance after short delay
                    setTimeout(() => {
                        goToNextStep();
                    }, 400);
                });
            });
        });

        // Keyboard shortcuts for options (A, B, C, D, E)
        document.addEventListener('keydown', (e) => {
            if (!stepFormOverlay.classList.contains('active')) return;
            if (currentStep === 'success') return;

            const step = stepFormOverlay.querySelector(`.stepform-step[data-step="${currentStep}"]`);
            if (!step) return;

            const options = step.querySelectorAll('.stepform-option-btn');
            if (options.length === 0) return;

            const keyMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4 };
            const idx = keyMap[e.key.toLowerCase()];
            if (idx !== undefined && idx < options.length) {
                options[idx].click();
            }
        });
    }
});
