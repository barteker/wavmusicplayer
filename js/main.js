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
}); 