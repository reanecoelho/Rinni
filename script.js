document.addEventListener('DOMContentLoaded', () => {

    /**
     * Animates a number counting up from 0 to a target value.
     * @param {HTMLElement} element - The element whose textContent will be animated.
     * @param {number} target - The final number.
     * @param {number} decimals - Number of decimal places.
     * @param {string} unit - A unit to append (e.g., '%', 'px').
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
     * Animates the circular progress bar based on a score out of 10.
     * @param {HTMLElement} progressCircle - The SVG circle element.
     * @param {number} targetScore - The score to represent (0-10).
     */
    function animateProgressCircle(progressCircle, targetScore) {
        if (!progressCircle) return;
        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (targetScore / 10) * circumference;
        
        progressCircle.style.strokeDashoffset = offset;
    }

    // --- Main Function to Run All Animations ---
    function runAnimations() {
        // Score Dial Animation
        const scoreDisplay = document.getElementById('score-display');
        const scoreProgress = document.getElementById('score-progress');
        const scoreValue = parseFloat(scoreDisplay.dataset.value);
        
        animateCountUp(scoreDisplay, scoreValue, 1);
        animateProgressCircle(scoreProgress, scoreValue);

        // Metrics Animation
        const bodyLength = document.getElementById('body-length-value');
        const hipWidth = document.getElementById('hip-width-value');
        const toplineAngle = document.getElementById('topline-angle-value');
        const confidence = document.getElementById('confidence-value');

        animateCountUp(bodyLength, parseFloat(bodyLength.dataset.value), 2);
        animateCountUp(hipWidth, parseInt(hipWidth.dataset.value), 0, ' px');
        animateCountUp(toplineAngle, parseFloat(toplineAngle.dataset.value), 1, '°');
        animateCountUp(confidence, parseInt(confidence.dataset.value), 0, '%');
    }

    // Run animations after a short delay for a smoother effect
    setTimeout(runAnimations, 500);
});
