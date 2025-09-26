// PashuMitra Application JavaScript
class PashuMitra {
    constructor() {
        this.currentStep = 1;
        this.uploadedImage = null;
        this.init();
    }

    init() {
        // This is the function that hides the loading screen
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const app = document.getElementById('app');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            if (app) {
                app.classList.remove('hidden');
            }
        }, 3000); // Hides after 3 seconds

        this.setupEventListeners();
    }

    setupEventListeners() {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const backButton = document.getElementById('back-to-upload');
        const analyzeButton = document.getElementById('start-analysis');

        if (uploadArea) {
            uploadArea.addEventListener('click', () => fileInput.click());
        }
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        }
        if (backButton) {
            backButton.addEventListener('click', () => this.goToSection(1));
        }
        if (analyzeButton) {
            analyzeButton.addEventListener('click', () => alert("Analysis would start now!"));
        }
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.uploadedImage = URL.createObjectURL(file);
            document.getElementById('preview-image').src = this.uploadedImage;
            this.goToSection(2);
        } else {
            alert("Please select a valid image file.");
        }
    }

    goToSection(stepNumber) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        // Show target section
        const sectionId = ['upload', 'preview'][stepNumber - 1] + '-section';
        document.getElementById(sectionId).classList.add('active');

        // Update progress steps
        document.querySelectorAll('.progress-step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === stepNumber) {
                step.classList.add('active');
            }
        });
        this.currentStep = stepNumber;
    }
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PashuMitra();
});
