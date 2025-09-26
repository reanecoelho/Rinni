document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    const MOCK_DATA = {
        score: 8.7,
        confidence: 94,
        metrics: {
            bodyLength: 2.41,
            hipWidth: 156,
            toplineAngle: 4.2
        }
    };

    // --- DOM ELEMENTS ---
    const scoreDisplay = document.getElementById('score-display');
    const confidenceDisplay = document.getElementById('confidence-value');
    const scoreProgress = document.getElementById('score-progress');
    const bodyLengthDisplay = document.getElementById('body-length-value');
    const hipWidthDisplay = document.getElementById('hip-width-value');
    const toplineAngleDisplay = document.getElementById('topline-angle-value');
    const accordionHeader = document.querySelector('.accordion-header');
    
    // --- ANIMATION FUNCTIONS ---

    /**
     * Animates a number counting up from 0 to a target value.
     */
    function animateCountUp(element, target, decimals = 0, unit = '') {
        let current = 0;
        const duration = 2000; // Animation duration in ms
        const stepTime = 20;   // Update interval in ms
        const steps = duration / stepTime;
        const increment = (target - current) / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = `${current.toFixed(decimals)}${unit}`;
        }, stepTime);
    }

    /**
     * Animates the circular progress bar.
     */
    function animateProgressCircle(targetScore) {
        const radius = scoreProgress.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (targetScore / 10) * circumference;
        
        // This triggers the CSS transition
        scoreProgress.style.strokeDashoffset = offset;
    }

    // --- EVENT LISTENERS ---

    // Accordion functionality
    accordionHeader.addEventListener('click', () => {
        const accordionContent = document.querySelector('.accordion-content');
        accordionHeader.classList.toggle('active');
        if (accordionHeader.classList.contains('active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        } else {
            accordionContent.style.maxHeight = 0;
        }
    });

    // --- INITIALIZATION ---

    // Function to run all animations on page load
    function runAnimations() {
        // Animate the main score dial
        animateProgressCircle(MOCK_DATA.score);
        animateCountUp(scoreDisplay, MOCK_DATA.score, 1);
        
        // Animate the confidence percentage
        animateCountUp(confidenceDisplay, MOCK_DATA.confidence, 0, '%');

        // Animate the detailed metrics
        animateCountUp(bodyLengthDisplay, MOCK_DATA.metrics.bodyLength, 2);
        animateCountUp(hipWidthDisplay, MOCK_DATA.metrics.hipWidth, 0, 'px');
        animateCountUp(toplineAngleDisplay, MOCK_DATA.metrics.toplineAngle, 1, '°');
    }

    // Run animations after a short delay to ensure the page is rendered
    setTimeout(runAnimations, 500);
});
