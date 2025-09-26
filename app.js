// PashuMitra Application JavaScript

class PashuMitra {
    constructor() {
        this.currentStep = 1;
        this.uploadedImage = null;
        this.init();
    }

    init() {
        // Hide loading screen after 3 seconds
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('app').classList.remove('hidden');
        }, 3000);

        this.setupEventListeners();
    }

    setupEventListeners() {
        // --- UPLOAD PAGE ---
        const uploadArea = document.getElementById('upload-area');
        const takePhotoBtn = document.getElementById('take-photo-btn');
        const chooseFileBtn = document.getElementById('choose-file-btn');
        const fileInput = document.getElementById('file-input');

        uploadArea.addEventListener('click', () => fileInput.click());
        takePhotoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput.click();
        });
        chooseFileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput.click();
        });
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // You can add event listeners for other sections (preview, analysis, results) here
        // For now, this setup makes the first page interactive.
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.uploadedImage = URL.createObjectURL(file);
            console.log("Image selected:", file.name);
            alert("Image selected successfully! The next step would show a preview.");
            // To see the next step, you would call: this.goToSection(2);
        } else {
            alert("Please select a valid image file.");
        }
    }

    goToSection(stepNumber) {
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(sec => sec.classList.remove('active'));

        // Show the target section
        const sectionId = ['upload', 'preview', 'analysis', 'results'][stepNumber - 1] + '-section';
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update progress stepper
        const progressSteps = document.querySelectorAll('.progress-step');
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            if (stepNum < stepNumber) {
                step.classList.add('completed');
            } else if (stepNum === stepNumber) {
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
