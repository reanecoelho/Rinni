// PashuMitra Application JavaScript
class PashuMitra {
    constructor() {
        this.currentStep = 1;
        this.uploadedImage = null;
        this.init();
    }

    init() {
        // Hide loading screen after animation
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('app').classList.remove('hidden');
        }, 3000);

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Upload functionality
        document.getElementById('upload-area').addEventListener('click', () => document.getElementById('file-input').click());
        document.getElementById('take-photo-btn').addEventListener('click', () => document.getElementById('file-input').click());
        document.getElementById('choose-file-btn').addEventListener('click', () => document.getElementById('file-input').click());
        document.getElementById('file-input').addEventListener('change', (e) => this.handleFileUpload(e));

        // Navigation
        document.getElementById('back-to-upload').addEventListener('click', () => this.goToSection(1));
        document.getElementById('start-analysis').addEventListener('click', () => this.startAnalysis());
        document.getElementById('new-analysis').addEventListener('click', () => this.goToSection(1));

        // Accordion
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.uploadedImage = URL.createObjectURL(file);
            document.getElementById('preview-image').src = this.uploadedImage;
            this.goToSection(2);
        }
    }

    goToSection(stepNumber) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        // Show target section
        const sectionId = ['upload', 'preview', 'analysis', 'results'][stepNumber - 1] + '-section';
        document.getElementById(sectionId).classList.add('active');
        
        // Update progress steps
        document.querySelectorAll('.progress-step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            if (stepNum < stepNumber) step.classList.add('completed');
            if (stepNum === stepNumber) step.classList.add('active');
        });

        this.currentStep = stepNumber;
    }

    async startAnalysis() {
        this.goToSection(3);
        const analysisSteps = document.querySelectorAll('.analysis-step');
        
        for (let i = 0; i < analysisSteps.length; i++) {
            analysisSteps[i].classList.add('active');
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate work
            analysisSteps[i].classList.replace('active', 'completed');
            analysisSteps[i].querySelector('.step-status').textContent = '✅';
        }

        this.showResults();
    }

    showResults() {
        this.goToSection(4);
        
        // Mock data
        const results = { score: 8.7, confidence: 94, bodyLength: 2.41, hipWidth: 156, toplineAngle: 4.2 };
        
        // Animate results
        this.animateValue('score-display', results.score, 1);
        this.animateValue('confidence-value', results.confidence, 0);
        this.animateValue('body-length-value', results.bodyLength, 2);
        this.animateValue('hip-width-value', results.hipWidth, 0);
        this.animateValue('topline-angle-value', results.toplineAngle, 1);

        // Animate progress circle
        const circle = document.getElementById('score-progress');
        const circumference = 339.292;
        const offset = circumference - (results.score / 10) * circumference;
        circle.style.strokeDashoffset = offset;
    }
    
    animateValue(id, end, decimals) {
        const element = document.getElementById(id);
        let start = 0;
        const duration = 2000;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));

        const timer = setInterval(() => {
            start += increment * (range / (duration / 20));
            if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
                start = end;
                clearInterval(timer);
            }
            element.textContent = start.toFixed(decimals);
        }, 20);
    }
}

// Initialize the app
new PashuMitra();
