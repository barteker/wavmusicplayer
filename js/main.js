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
    
    // What section video positioning
    const whatVideo = document.querySelector('.what-video');
    
    // Set video to final position
    if (whatVideo) {
        whatVideo.style.transform = 'translate(0%, -30%) scale(1.2)';
    }
    
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

    // Typewriter effect for feature titles
    function initTypewriterEffect() {
        const featureTitles = document.querySelectorAll('.feature-text h3, .and-more-text');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.classList.contains('typewriter')) {
                    // Add a small delay for staggered effect
                    setTimeout(() => {
                        entry.target.classList.add('typewriter');
                    }, 200);
                }
            });
        }, {
            threshold: 0.3, // Trigger when 30% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
        });
        
        featureTitles.forEach((title) => {
            observer.observe(title);
        });
    }
    
    // Initialize typewriter effect
    initTypewriterEffect();


}); 