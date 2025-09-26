document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const uploadSection = document.getElementById('uploadSection');
    const previewSection = document.getElementById('previewSection');
    const resultsSection = document.getElementById('resultsSection');
    
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    const previewImage = document.getElementById('previewImage');

    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const analyzeAnotherBtn = document.getElementById('analyzeAnotherBtn');

    // --- FUNCTIONS ---

    // Function to switch between sections
    function showSection(section) {
        uploadSection.classList.remove('active');
        previewSection.classList.remove('active');
        resultsSection.classList.remove('active');
        section.classList.add('active');
    }

    // Handle file selection
    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                showSection(previewSection);
            };
            reader.readAsDataURL(file);
        }
    }

    // Animate numbers counting up
    function animateCountUp(element, target, decimals = 0, unit = '') {
        let current = 0;
        const increment = target / 100;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            element.textContent = `${current.toFixed(decimals)}${unit}`;
        }, 20);
    }
    
    // --- EVENT LISTENERS ---

    // Trigger file input
    uploadArea.addEventListener('click', () => imageInput.click());

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFile(e.dataTransfer.files[0]);
    });

    // Handle file input change
    imageInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

    // Button clicks
    changePhotoBtn.addEventListener('click', () => showSection(uploadSection));
    analyzeAnotherBtn.addEventListener('click', () => showSection(uploadSection));

    analyzeBtn.addEventListener('click', () => {
        // Show results and start animations
        showSection(resultsSection);
        
        // Mock data for demonstration
        const mockResults = {
            score: 8.7,
            confidence: 94,
            bodyLength: 2.41
        };

        animateCountUp(document.getElementById('overallScore'), mockResults.score, 1);
        animateCountUp(document.getElementById('confidenceMetric'), mockResults.confidence, 0, '%');
        animateCountUp(document.getElementById('bodyLengthMetric'), mockResults.bodyLength, 2);
    });

    // --- INITIAL STATE ---
    showSection(uploadSection);
});
