/* ==========================================================================
   MALAYETECH SARL - Core JavaScript Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dynamic Header Scroll Effect ---
    const header = document.querySelector('.site-header');
    const scrollThreshold = 50;

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once at load

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Toggle menu icon between bars and times (close)
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // --- 3. WhatsApp Float & Popover ---
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const whatsappPopover = document.getElementById('whatsapp-popover');

    if (whatsappBtn && whatsappPopover) {
        whatsappBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            whatsappPopover.classList.toggle('active');
        });

        // Close popover when clicking anywhere else
        document.addEventListener('click', (e) => {
            if (whatsappPopover.classList.contains('active') && !whatsappPopover.contains(e.target) && !whatsappBtn.contains(e.target)) {
                whatsappPopover.classList.remove('active');
            }
        });
    }

    // --- 4. Testimonials Slider Carousel (Accueil) ---
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (testimonialSlides.length > 0) {
        let currentSlide = 0;

        const showSlide = (index) => {
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            testimonialSlides[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        };

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto play slider every 7 seconds
        let autoSlideInterval = setInterval(nextSlide, 7000);

        // Reset timer when clicking controls
        const resetInterval = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 7000);
        };

        if (nextBtn) nextBtn.addEventListener('click', resetInterval);
        if (prevBtn) prevBtn.addEventListener('click', resetInterval);
    }

    // --- 5. Service Request (Devis) Modal ---
    const devisModal = document.getElementById('devis-modal');
    const openDevisBtns = document.querySelectorAll('.open-devis-modal');
    const closeDevisBtn = document.getElementById('close-devis-modal');
    const devisForm = document.getElementById('modal-devis-form');

    if (devisModal) {
        openDevisBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                devisModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop scrolling behind modal
            });
        });

        const closeModal = () => {
            devisModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        };

        if (closeDevisBtn) closeDevisBtn.addEventListener('click', closeModal);

        devisModal.addEventListener('click', (e) => {
            if (e.target === devisModal) {
                closeModal();
            }
        });

        // Form Submit Handler
        if (devisForm) {
            devisForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('devis-name').value;
                const company = document.getElementById('devis-company').value || 'Particulier';
                const service = document.getElementById('devis-service').value;
                const message = document.getElementById('devis-message').value;

                // Simple user alert simulating message send
                alert(`Merci ${name} ! Votre demande de devis concernant le service "${service}" a été envoyée à MALAYETECH SARL. Notre équipe vous recontactera sous 24h.`);
                
                devisForm.reset();
                closeModal();
            });
        }
    }

    // --- 6. Portfolio / Realisations Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all filter buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // --- 7. Services Page Tabs ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Get target panel id
                const targetId = btn.getAttribute('data-tab');

                // Toggle buttons active state
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Show correct panel
                tabPanes.forEach(pane => {
                    if (pane.id === targetId) {
                        pane.classList.add('active');
                    } else {
                        pane.classList.remove('active');
                    }
                });
            });
        });

        // Deep linking functionality (open specific tab based on URL hash)
        const hash = window.location.hash;
        if (hash) {
            const targetTab = hash.substring(1);
            const matchingBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
            if (matchingBtn) {
                matchingBtn.click();
                // Smooth scroll to services tab navigation
                const tabsNav = document.querySelector('.services-tabs-container');
                if (tabsNav) {
                    setTimeout(() => {
                        tabsNav.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            }
        }
    }

    // --- 8. Standard Contact Form Validation & Success Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            alert(`Merci ${name} ! Votre message a bien été transmis à MALAYETECH SARL. Nous vous répondrons dans les plus brefs délais.`);
            contactForm.reset();
        });
    }
});
