// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    
    // Track mouse movement for glow effect
    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        header.style.setProperty('--mouse-x', `${x}%`);
        header.style.setProperty('--mouse-y', `${y}%`);
        
        // Update the glow filter
        const glowFilter = document.querySelector('#glow');
        const colorMatrix = glowFilter.querySelector('feColorMatrix');
        const blur = glowFilter.querySelector('feGaussianBlur');
        
        // Calculate distance from center
        const distance = Math.sqrt(
            Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
        );
        
        // Adjust glow intensity based on mouse distance from center
        const intensity = Math.max(0, 1 - (distance / 15)); // Even smaller radius
        colorMatrix.setAttribute('values', `
            0 0 0 0 0
            0 ${1 + intensity * 2} 0 0 0
            0 0 0 0 0
            0 0 0 1 0
        `);
        blur.setAttribute('stdDeviation', 0.3 + intensity * 1.2);
    });
    
    // Add subtle glow to the title on hover
    const title = document.querySelector('h1');
    title.addEventListener('mouseover', () => {
        title.style.textShadow = '0 0 20px rgba(0, 255, 157, 0.5)';
    });
    
    title.addEventListener('mouseout', () => {
        title.style.textShadow = '0 0 10px rgba(0, 255, 157, 0.3)';
    });
    
    // Parallax scrolling effect
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const parallaxSection = document.querySelector('.parallax-section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
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
    });

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