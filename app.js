// PashuMitra Application JavaScript - Refactored for Clarity and Performance

document.addEventListener('DOMContentLoaded', () => {
    // A single object to manage the entire application
    const App = {
        // --- STATE MANAGEMENT ---
        state: {
            currentStep: 1,
            uploadedFile: null,
            uploadedImageUrl: null,
            analysisResult: null,
            isFabMenuOpen: false,
        },

        // --- DOM ELEMENT SELECTORS ---
        elements: {
            loadingScreen: document.getElementById('loading-screen'),
            appContainer: document.getElementById('app'),
            sections: document.querySelectorAll('.section'),
            progressSteps: document.querySelectorAll('.progress-step'),
            uploadArea: document.getElementById('upload-area'),
            fileInput: document.getElementById('file-input'),
            previewImage: document.getElementById('preview-image'),
            analysisSteps: document.querySelectorAll('.analysis-step'),
            scoreDisplay: document.getElementById('score-display'),
            scoreProgress: document.getElementById('score-progress'),
            healthStatus: document.getElementById('health-status'),
            confidenceValue: document.getElementById('confidence-value'),
            metricCards: document.querySelectorAll('.metric-card'),
            recommendationsContent: document.getElementById('recommendations-content'),
            fabToggle: document.getElementById('fab-toggle'),
            fabOptions: document.getElementById('fab-options'),
            modal: document.getElementById('main-modal'),
            modalTitle: document.getElementById('modal-title'),
            modalBody: document.getElementById('modal-body'),
            notificationContainer: document.getElementById('notification-container'),
        },

        // --- INITIALIZATION ---
        init() {
            this.showLoadingScreen();
            this.bindEventListeners();
            console.log("PashuMitra App Initialized 🐄");
        },

        showLoadingScreen() {
            setTimeout(() => {
                this.elements.loadingScreen.style.display = 'none';
                this.elements.appContainer.classList.remove('hidden');
                this.showNotification('Welcome to PashuMitra! 🎉', 'success');
            }, 3000); // Simulate loading time
        },

        // --- EVENT BINDING ---
        bindEventListeners() {
            // Upload functionality
            this.elements.uploadArea.addEventListener('click', () => this.elements.fileInput.click());
            document.getElementById('take-photo-btn').addEventListener('click', () => this.handleCameraAccess());
            document.getElementById('choose-file-btn').addEventListener('click', () => this.elements.fileInput.click());
            this.elements.fileInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files[0]));

            // Drag and drop
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                this.elements.uploadArea.addEventListener(eventName, this.preventDefaults, false);
            });
            ['dragenter', 'dragover'].forEach(eventName => {
                this.elements.uploadArea.addEventListener(eventName, () => this.elements.uploadArea.classList.add('dragover'), false);
            });
            ['dragleave', 'drop'].forEach(eventName => {
                this.elements.uploadArea.addEventListener(eventName, () => this.elements.uploadArea.classList.remove('dragover'), false);
            });
            this.elements.uploadArea.addEventListener('drop', (e) => this.handleFileSelect(e.dataTransfer.files[0]));

            // Navigation
            document.getElementById('back-to-upload').addEventListener('click', () => this.goToStep(1));
            document.getElementById('start-analysis').addEventListener('click', () => this.runAnalysis());
            document.getElementById('new-analysis').addEventListener('click', () => this.resetApp());

            // Modals, FAB, Accordion
            this.elements.fabToggle.addEventListener('click', () => this.toggleFabMenu());
            this.elements.modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal());
            this.elements.modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
            document.querySelectorAll('.accordion-header').forEach(header => header.addEventListener('click', () => this.toggleAccordion(header.parentElement)));
            this.elements.metricCards.forEach(card => card.addEventListener('click', (e) => this.showMetricDetails(e.currentTarget.dataset.metric)));
            document.querySelectorAll('.fab-option').forEach(btn => btn.addEventListener('click', (e) => this.handleFabAction(e.currentTarget.dataset.action)));
        },

        preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        },

        // --- CORE APP FLOW ---
        goToStep(step) {
            this.state.currentStep = step;
            // Update section visibility
            this.elements.sections.forEach(s => s.classList.remove('active'));
            document.getElementById(this.getSectionIdForStep(step)).classList.add('active');

            // Update progress nav
            this.elements.progressSteps.forEach(p => {
                const stepNum = parseInt(p.dataset.step);
                p.classList.remove('active', 'completed');
                if (stepNum < step) p.classList.add('completed');
                else if (stepNum === step) p.classList.add('active');
            });
        },

        getSectionIdForStep(step) {
            return ['upload-section', 'preview-section', 'analysis-section', 'results-section'][step - 1];
        },
        
        handleCameraAccess() {
            this.elements.fileInput.setAttribute('capture', 'environment');
            this.elements.fileInput.click();
        },

        handleFileSelect(file) {
            if (!file || !file.type.startsWith('image/')) {
                this.showNotification('Please select a valid image file.', 'error');
                return;
            }
            this.state.uploadedFile = file;
            this.state.uploadedImageUrl = URL.createObjectURL(file);
            this.elements.previewImage.src = this.state.uploadedImageUrl;
            this.goToStep(2);
        },

        async runAnalysis() {
            this.goToStep(3);
            const analysisSteps = [
                { el: this.elements.analysisSteps[0], duration: 1500 },
                { el: this.elements.analysisSteps[1], duration: 1500 },
                { el: this.elements.analysisSteps[2], duration: 1500 },
                { el: this.elements.analysisSteps[3], duration: 2000 },
            ];

            for (const step of analysisSteps) {
                step.el.classList.add('active');
                step.el.querySelector('.step-status').innerHTML = '⏳';
                await new Promise(resolve => setTimeout(resolve, step.duration));
                step.el.classList.remove('active');
                step.el.classList.add('completed');
                step.el.querySelector('.step-status').innerHTML = '✅';
            }
            this.generateMockResults();
            this.displayResults();
        },

        generateMockResults() {
            this.state.analysisResult = {
                score: 8.7,
                confidence: 94,
                status: 'Excellent Health',
                statusClass: 'success',
                metrics: {
                    bodyLength: { value: 2.41, unit: '', status: 'Optimal', statusClass: 'success' },
                    hipWidth: { value: 156, unit: 'px', status: 'Good', statusClass: 'info' },
                    toplineAngle: { value: 4.2, unit: '°', status: 'Excellent', statusClass: 'success' }
                },
                recommendations: 'Animal shows excellent conformation. Continue current nutrition and care regimen. Monitor for any changes in posture or movement.'
            };
        },
        
        displayResults() {
            this.goToStep(4);
            const { score, confidence, status, statusClass, metrics, recommendations } = this.state.analysisResult;
            
            // Animate score circle
            const circumference = 408;
            const offset = circumference - (score / 10) * circumference;
            this.elements.scoreProgress.style.strokeDashoffset = offset;

            // Animate counting numbers
            this.animateCount(this.elements.scoreDisplay, score, 1);
            this.animateCount(this.elements.confidenceValue, confidence, 0);

            // Update status
            this.elements.healthStatus.textContent = status;
            this.elements.healthStatus.className = `status status--${statusClass}`;

            // Update metric cards
            Object.keys(metrics).forEach(key => {
                const card = document.querySelector(`.metric-card[data-metric="${key}"]`);
                if (card) {
                    this.animateCount(card.querySelector('.metric-value'), metrics[key].value, key === 'bodyLength' ? 2 : 0, metrics[key].unit);
                    const statusEl = card.querySelector('.metric-status');
                    statusEl.textContent = metrics[key].status;
                    statusEl.className = `metric-status status status--${metrics[key].statusClass}`;
                }
            });
            
            this.elements.recommendationsContent.textContent = recommendations;
        },
        
        resetApp() {
            this.state.currentStep = 1;
            this.state.uploadedFile = null;
            this.state.uploadedImageUrl = null;
            this.state.analysisResult = null;
            this.elements.fileInput.value = ''; // Clear file input
            this.elements.analysisSteps.forEach(s => s.classList.remove('active', 'completed'));
            this.elements.scoreProgress.style.strokeDashoffset = 408;
            this.goToStep(1);
        },

        // --- UI & UX HELPERS ---
        animateCount(element, target, decimals = 0, unit = '') {
            let start = 0;
            const duration = 1500;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = (target - start) / steps;
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    start = target;
                    clearInterval(timer);
                }
                element.textContent = `${start.toFixed(decimals)}${unit}`;
            }, stepTime);
        },

        toggleFabMenu() {
            this.state.isFabMenuOpen = !this.state.isFabMenuOpen;
            this.elements.fabOptions.classList.toggle('hidden', !this.state.isFabMenuOpen);
            this.elements.fabToggle.classList.toggle('active', this.state.isFabMenuOpen);
        },
        
        handleFabAction(action) {
            this.toggleFabMenu();
            switch(action) {
                case 'help':
                    this.showModal('PashuMitra Help', `
                        <h4>How to Use:</h4>
                        <ol>
                            <li><strong>Upload:</strong> Take or select a clear, side-profile photo of the cattle in good light.</li>
                            <li><strong>Preview:</strong> Confirm the image is correct.</li>
                            <li><strong>Analyze:</strong> Our AI will assess the image.</li>
                            <li><strong>Results:</strong> Get an instant health score and recommendations.</li>
                        </ol>
                    `);
                    break;
                case 'history':
                    this.showNotification('Analysis history coming soon!', 'info');
                    break;
            }
        },

        toggleAccordion(item) {
            item.classList.toggle('expanded');
        },

        showMetricDetails(metric) {
            const details = {
                bodyLength: { title: 'Body Length Ratio', content: 'This measures the ratio of the body length to height. An optimal ratio indicates good frame proportions for health and productivity.' },
                hipWidth: { title: 'Hip Width', content: 'This indicates structural capacity and muscle development. Adequate width is important for mobility and calving ease.' },
                toplineAngle: { title: 'Topline Angle', content: 'This measures the straightness of the back. A level topline is a key indicator of good structural integrity and soundness.' }
            };
            if (details[metric]) {
                this.showModal(details[metric].title, `<p>${details[metric].content}</p>`);
            }
        },

        showModal(title, bodyHtml) {
            this.elements.modalTitle.textContent = title;
            this.elements.modalBody.innerHTML = bodyHtml;
            this.elements.modal.classList.remove('hidden');
        },

        closeModal() {
            this.elements.modal.classList.add('hidden');
        },

        showNotification(message, type = 'info', duration = 3000) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            const icons = { success: '✅', error: '❌', info: 'ℹ️' };
            notification.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;
            this.elements.notificationContainer.appendChild(notification);
            setTimeout(() => notification.remove(), duration);
        }
    };

    // Start the application
    App.init();
});
