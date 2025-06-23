// Typing Animation
function initTypingAnimation() {
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    if (!typedTextSpan || !cursorSpan) return;
    
    const textArray = ["AI Solutions", "Web Apps", "Mobile Apps", "Smart Systems"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start animation
    if (textArray.length) setTimeout(type, newTextDelay + 250);
}

// Initialize particles.js
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#64ffda" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#64ffda", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            }
        });
    }
}

// Cube rotation animation
function initCubeAnimation() {
    const cube = document.querySelector('.cube');
    if (!cube) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cubeX = 0;
    let cubeY = 0;
    const sensitivity = 0.1;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2);
        mouseY = (e.clientY - window.innerHeight / 2);
    });
    
    function animateCube() {
        cubeX += (mouseX - cubeX) * sensitivity;
        cubeY += (mouseY - cubeY) * sensitivity;
        
        cube.style.transform = `rotateY(${cubeX / 20}deg) rotateX(${-cubeY / 20}deg)`;
        
        requestAnimationFrame(animateCube);
    }
    
    animateCube();
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();
    initParticles();
    initCubeAnimation();
    
    // Add delay to animations for staggered effect
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    document.querySelectorAll('.skill-item').forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.1}s`;
    });
});