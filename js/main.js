// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    
    // Track mouse movement for glow effect across entire page
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    });
    
    // Add subtle glow to the title on hover
    const title = document.querySelector('h1');
    if (title) {
        title.addEventListener('mouseover', () => {
            title.style.textShadow = '0 0 20px rgba(0, 255, 157, 0.5)';
        });
        
        title.addEventListener('mouseout', () => {
            title.style.textShadow = '0 0 10px rgba(0, 255, 157, 0.3)';
        });
    }
    
    // Parallax scrolling effect
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const parallaxSection = document.querySelector('.parallax-section');
    
    // Why W/AV parallax layers
    const whyParallaxLayers = document.querySelectorAll('.why-parallax-layer');
    const whyWavSection = document.querySelector('.why-wav');
    
    // What section video parallax
    const whatVideo = document.querySelector('.what-video');
    const whatSection = document.querySelector('.what-section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Original parallax section
        if (parallaxSection) {
            const sectionTop = parallaxSection.offsetTop;
            const sectionHeight = parallaxSection.offsetHeight;
            
            // Only apply parallax when the section is in view
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                
                // Calculate how far through the section we've scrolled (0 to 1)
                const scrollPercent = (scrollPosition - sectionTop) / sectionHeight;
                
                // Apply different scroll speeds to each layer
                parallaxLayers.forEach((layer, index) => {
                    const speed = 0.2 * (index + 1); // Different speeds for each layer
                    const yPos = -(scrollPercent * 100 * speed);
                    layer.style.transform = `translateY(${yPos}px)`;
                });
            }
        }
        
        // Why W/AV parallax section
        if (whyWavSection) {
            const sectionTop = whyWavSection.offsetTop;
            const sectionHeight = whyWavSection.offsetHeight;
            
            // Only apply parallax when the section is in view
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                
                // Calculate how far through the section we've scrolled (0 to 1)
                const scrollPercent = (scrollPosition - sectionTop) / sectionHeight;
                
                // Apply different scroll speeds to each layer
                whyParallaxLayers.forEach((layer, index) => {
                    const speed = 0.15 * (index + 1); // Slightly slower speeds for subtle effect
                    const yPos = -(scrollPercent * 100 * speed);
                    layer.style.transform = `translateY(${yPos}px)`;
                });
            }
        }
        
        // What section video - set to final position (no parallax)
        if (whatVideo) {
            // Set video to final position: translateX: 0%, translateY: -30%, scale: 1.2
            whatVideo.style.transform = 'translate(0%, -30%) scale(1.2)';
        }
    });
    
    // Why WAV title animations - separate scroll listener for better performance
    function checkWhyCardAnimations() {
        const whyCards = document.querySelectorAll('.why-card');
        const baseTriggerPoint = window.innerHeight * 0.7; // Base trigger at 20% from top
        const staggerDelay = 60; // 100px delay between each card
        
        whyCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + cardRect.height / 2;
            const triggerPoint = baseTriggerPoint + (index * staggerDelay); // Add staggered delay
            
            // Check if the card's center has passed its individual trigger point
            if (cardCenter <= triggerPoint && !card.classList.contains('animate')) {
                card.classList.add('animate');
            }
        });
    }
    
    // Check animations on scroll
    window.addEventListener('scroll', checkWhyCardAnimations);
    
    // Check animations on initial load (in case elements are already in view)
    window.addEventListener('load', checkWhyCardAnimations);
    
    // Also check after a short delay to ensure everything is rendered
    setTimeout(checkWhyCardAnimations, 100);

    // Carousel functionality
    const modal = document.getElementById('carouselModal');
    const modalImage = document.getElementById('carouselImage');
    const closeBtn = document.querySelector('.carousel-close');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.dataset.image,
        alt: item.querySelector('img').alt
    }));

    // Open modal when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateModalImage();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Previous image
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateModalImage();
    });

    // Next image
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateModalImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                modal.classList.remove('active');
                document.body.style.overflow = '';
                break;
            case 'ArrowLeft':
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateModalImage();
                break;
            case 'ArrowRight':
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateModalImage();
                break;
        }
    });

    function updateModalImage() {
        const image = images[currentImageIndex];
        modalImage.src = image.src;
        modalImage.alt = image.alt;
    }
}); 