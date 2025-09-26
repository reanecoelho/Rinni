// PashuMitra Application JavaScript

class PashuMitra {
    constructor() {
        this.currentSection = 1;
        this.currentStep = 1;
        this.uploadedImage = null;
        this.analysisRunning = false;
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.setupModal();
        this.setupNotifications();
    }

    showLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('app').classList.remove('hidden');
        }, 3000);
    }

    setupEventListeners() {
        // File upload buttons - Fixed event handlers
        const takePhotoBtn = document.getElementById('take-photo-btn');
        const chooseFileBtn = document.getElementById('choose-file-btn');
        const fileInput = document.getElementById('file-input');

        takePhotoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            fileInput.click();
        });

        chooseFileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                this.handleFileUpload(e);
            }
        });

        // Preview section buttons
        const backToUploadBtn = document.getElementById('back-to-upload');
        const startAnalysisBtn = document.getElementById('start-analysis');

        if (backToUploadBtn) {
            backToUploadBtn.addEventListener('click', () => this.goToSection(1));
        }
        if (startAnalysisBtn) {
            startAnalysisBtn.addEventListener('click', () => this.startAnalysis());
        }

        // Image controls
        const rotateBtn = document.getElementById('rotate-btn');
        const enhanceBtn = document.getElementById('enhance-btn');
        const cropBtn = document.getElementById('crop-btn');

        if (rotateBtn) rotateBtn.addEventListener('click', () => this.rotateImage());
        if (enhanceBtn) enhanceBtn.addEventListener('click', () => this.enhanceImage());
        if (cropBtn) cropBtn.addEventListener('click', () => this.cropImage());

        // Results actions
        const shareResultsBtn = document.getElementById('share-results');
        const downloadReportBtn = document.getElementById('download-report');
        const newAnalysisBtn = document.getElementById('new-analysis');

        if (shareResultsBtn) shareResultsBtn.addEventListener('click', () => this.shareResults());
        if (downloadReportBtn) downloadReportBtn.addEventListener('click', () => this.downloadReport());
        if (newAnalysisBtn) newAnalysisBtn.addEventListener('click', () => this.startNewAnalysis());

        // Voice button
        const voiceBtn = document.getElementById('voice-btn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.toggleVoiceCommand());
        }

        // Language selector
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        }

        // FAB menu
        const fabToggle = document.getElementById('fab-toggle');
        if (fabToggle) {
            fabToggle.addEventListener('click', () => this.toggleFabMenu());
        }

        document.querySelectorAll('.fab-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFabAction(e.target.dataset.action));
        });

        // Accordion
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => this.toggleAccordion(header));
        });

        // Metric cards
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('click', () => this.showMetricModal(card.dataset.metric));
        });

        // Modal close
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = document.getElementById('modal-overlay');
        
        if (modalClose) modalClose.addEventListener('click', () => this.closeModal());
        if (modalOverlay) modalOverlay.addEventListener('click', () => this.closeModal());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    setupDragAndDrop() {
        const uploadArea = document.getElementById('upload-area');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        uploadArea.addEventListener('dragover', (e) => {
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                this.processImageFile(files[0]);
            } else {
                this.showNotification('Please upload a valid image file', 'error');
            }
        });

        uploadArea.addEventListener('click', (e) => {
            // Only trigger if clicking the upload area itself, not child elements
            if (e.target === uploadArea || e.target.closest('.upload-content')) {
                document.getElementById('file-input').click();
            }
        });
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.processImageFile(file);
        } else {
            this.showNotification('Please select a valid image file', 'error');
        }
    }

    processImageFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.uploadedImage = e.target.result;
            this.showQualityFeedback();
            
            // Show success notification first
            this.showNotification('Image uploaded successfully!', 'success');
            
            // Then transition to preview section
            setTimeout(() => {
                this.goToSection(2);
                this.displayPreview();
            }, 1500);
        };
        reader.readAsDataURL(file);
    }

    showQualityFeedback() {
        const qualityFeedback = document.getElementById('quality-feedback');
        qualityFeedback.classList.remove('hidden');
        
        // Simulate quality assessment with good results
        const indicators = [
            { id: 'lighting', status: 'Good' },
            { id: 'clarity', status: 'Excellent' },
            { id: 'angle', status: 'Good' }
        ];
        
        indicators.forEach((indicator, index) => {
            setTimeout(() => {
                const item = document.querySelector(`[data-quality="${indicator.id}"]`);
                if (item) {
                    const statusEl = item.querySelector('.quality-status');
                    statusEl.textContent = indicator.status;
                    statusEl.style.color = indicator.status === 'Excellent' ? '#4CAF50' : '#2196F3';
                    item.style.animation = 'slideInUp 0.5s ease-out';
                }
            }, index * 300);
        });
    }

    displayPreview() {
        const previewImg = document.getElementById('preview-image');
        if (previewImg && this.uploadedImage) {
            previewImg.src = this.uploadedImage;
            previewImg.style.animation = 'fadeIn 0.5s ease-out';
        }
    }

    goToSection(sectionNumber) {
        // Hide all sections first
        const sections = ['upload-section', 'preview-section', 'analysis-section', 'results-section'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.remove('active');
            }
        });

        // Show target section
        const targetSectionId = this.getSectionId(sectionNumber);
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update progress steps
        this.updateProgressSteps(sectionNumber);
        this.currentSection = sectionNumber;
    }

    getSectionId(number) {
        const sections = {
            1: 'upload-section',
            2: 'preview-section',
            3: 'analysis-section',
            4: 'results-section'
        };
        return sections[number] || 'upload-section';
    }

    updateProgressSteps(activeStep) {
        document.querySelectorAll('.progress-step').forEach(step => {
            step.classList.remove('active', 'completed');
            const stepNumber = parseInt(step.dataset.step);
            if (stepNumber === activeStep) {
                step.classList.add('active');
            } else if (stepNumber < activeStep) {
                step.classList.add('completed');
            }
        });
    }

    startAnalysis() {
        if (!this.uploadedImage) {
            this.showNotification('Please upload an image first', 'error');
            return;
        }
        
        this.goToSection(3);
        setTimeout(() => {
            this.runAnalysisSequence();
        }, 500);
    }

    runAnalysisSequence() {
        if (this.analysisRunning) return;
        this.analysisRunning = true;

        const steps = [
            { id: 1, duration: 2000 },
            { id: 2, duration: 1500 },
            { id: 3, duration: 2500 },
            { id: 4, duration: 1800 }
        ];

        let currentStepIndex = 0;

        const runStep = () => {
            if (currentStepIndex >= steps.length) {
                this.analysisRunning = false;
                setTimeout(() => this.showResults(), 500);
                return;
            }

            const step = steps[currentStepIndex];
            const stepEl = document.querySelector(`.analysis-step[data-step="${step.id}"]`);
            
            if (!stepEl) {
                currentStepIndex++;
                runStep();
                return;
            }

            const progressBar = stepEl.querySelector('.step-progress-bar');
            const statusEl = stepEl.querySelector('.step-status');

            // Activate step
            stepEl.classList.add('active');
            
            // Animate progress bar
            setTimeout(() => {
                if (progressBar) {
                    progressBar.style.width = '100%';
                }
            }, 100);

            // Complete step
            setTimeout(() => {
                stepEl.classList.remove('active');
                stepEl.classList.add('completed');
                if (statusEl) {
                    statusEl.textContent = '✅';
                }
                currentStepIndex++;
                runStep();
            }, step.duration);
        };

        runStep();
    }

    showResults() {
        this.goToSection(4);
        setTimeout(() => {
            this.animateHealthScore();
            this.animateMetrics();
        }, 300);
    }

    animateHealthScore() {
        const scoreDisplay = document.getElementById('score-display');
        const scoreProgress = document.getElementById('score-progress');
        const confidenceValue = document.getElementById('confidence-value');
        
        if (!scoreDisplay || !scoreProgress || !confidenceValue) return;

        // Animate score counting
        let currentScore = 0;
        const targetScore = 8.7;
        const scoreInterval = setInterval(() => {
            currentScore += 0.1;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(scoreInterval);
            }
            scoreDisplay.textContent = currentScore.toFixed(1);
        }, 50);

        // Animate progress ring
        const circumference = 339.292;
        const progress = (targetScore / 10) * circumference;
        setTimeout(() => {
            scoreProgress.style.strokeDashoffset = (circumference - progress).toString();
        }, 200);

        // Animate confidence
        let currentConfidence = 0;
        const targetConfidence = 94;
        const confidenceInterval = setInterval(() => {
            currentConfidence += 2;
            if (currentConfidence >= targetConfidence) {
                currentConfidence = targetConfidence;
                clearInterval(confidenceInterval);
            }
            confidenceValue.textContent = currentConfidence.toString();
        }, 30);
    }

    animateMetrics() {
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.5s ease-out';
                card.style.animationDelay = `${index * 0.1}s`;
            }, 500 + (index * 200));
        });
    }

    rotateImage() {
        const previewImg = document.getElementById('preview-image');
        if (!previewImg) return;

        const currentRotation = parseInt(previewImg.dataset.rotation || '0');
        const newRotation = currentRotation + 90;
        previewImg.style.transform = `rotate(${newRotation}deg)`;
        previewImg.dataset.rotation = newRotation.toString();
        this.showNotification('Image rotated', 'success');
    }

    enhanceImage() {
        const previewImg = document.getElementById('preview-image');
        if (!previewImg) return;

        previewImg.style.filter = 'brightness(1.1) contrast(1.1) saturate(1.2)';
        this.showNotification('Image enhanced', 'success');
    }

    cropImage() {
        this.showNotification('Crop tool activated', 'success');
        // In a real app, this would open a crop interface
    }

    toggleVoiceCommand() {
        const voiceBtn = document.getElementById('voice-btn');
        if (!voiceBtn) return;

        const isActive = voiceBtn.classList.contains('active');
        
        if (isActive) {
            voiceBtn.classList.remove('active');
            this.showNotification('Voice command stopped', 'success');
        } else {
            voiceBtn.classList.add('active');
            this.showNotification('Listening for voice commands...', 'success');
            
            // Simulate voice command recognition
            setTimeout(() => {
                voiceBtn.classList.remove('active');
                this.showNotification('Voice command processed', 'success');
            }, 3000);
        }
    }

    changeLanguage(languageCode) {
        this.showNotification(`Language changed to ${languageCode}`, 'success');
        // In a real app, this would update all UI text
    }

    toggleFabMenu() {
        const fabOptions = document.getElementById('fab-options');
        if (fabOptions) {
            fabOptions.classList.toggle('hidden');
        }
    }

    handleFabAction(action) {
        const actions = {
            'help': 'Help section opened',
            'history': 'Analysis history opened',  
            'settings': 'Settings opened'
        };
        
        const message = actions[action] || 'Action completed';
        this.showNotification(message, 'success');
        this.toggleFabMenu();
    }

    toggleAccordion(header) {
        const accordionItem = header.parentElement;
        const isExpanded = accordionItem.classList.contains('expanded');
        
        // Close all accordions
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('expanded');
        });
        
        // Toggle current accordion
        if (!isExpanded) {
            accordionItem.classList.add('expanded');
        }
    }

    setupModal() {
        this.modalData = {
            bodyLength: {
                title: 'Body Length Ratio',
                content: `
                    <h4>Body Length Ratio: 2.41</h4>
                    <p><strong>Status:</strong> Optimal</p>
                    <p><strong>Description:</strong> This metric measures the ratio of body length to height. A ratio of 2.41 indicates excellent body proportions for optimal health and productivity.</p>
                    <p><strong>Normal Range:</strong> 2.2 - 2.6</p>
                    <p><strong>Recommendations:</strong> Maintain current nutrition to support continued healthy growth.</p>
                `
            },
            hipWidth: {
                title: 'Hip Width',
                content: `
                    <h4>Hip Width: 156px</h4>
                    <p><strong>Status:</strong> Good</p>
                    <p><strong>Description:</strong> Hip width measurement indicates good muscular development and structural capacity.</p>
                    <p><strong>Normal Range:</strong> 140-180px</p>
                    <p><strong>Recommendations:</strong> Monitor for consistent development over time.</p>
                `
            },
            toplineAngle: {
                title: 'Topline Angle',
                content: `
                    <h4>Topline Angle: 4.2°</h4>
                    <p><strong>Status:</strong> Excellent</p>
                    <p><strong>Description:</strong> The topline angle indicates excellent structural soundness and proper spine alignment.</p>
                    <p><strong>Normal Range:</strong> 2-8°</p>
                    <p><strong>Recommendations:</strong> Continue current care regimen to maintain optimal posture.</p>
                `
            }
        };
    }

    showMetricModal(metricType) {
        const modal = document.getElementById('metric-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');
        
        if (!modal || !title || !body) return;

        const data = this.modalData[metricType];
        if (data) {
            title.textContent = data.title;
            body.innerHTML = data.content;
            modal.classList.remove('hidden');
        }
    }

    closeModal() {
        const modal = document.getElementById('metric-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    setupNotifications() {
        this.notificationContainer = document.getElementById('notification-container');
    }

    showNotification(message, type = 'success') {
        if (!this.notificationContainer) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        this.notificationContainer.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    shareResults() {
        // Simulate sharing
        if (navigator.share) {
            navigator.share({
                title: 'PashuMitra Health Assessment',
                text: 'Cattle health score: 8.7/10 - Excellent Health',
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        const shareData = 'Cattle health score: 8.7/10 - Excellent Health';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareData).then(() => {
                this.showNotification('Results copied to clipboard', 'success');
            }).catch(() => {
                this.showNotification('Results shared', 'success');
            });
        } else {
            this.showNotification('Results shared', 'success');
        }
    }

    downloadReport() {
        // Simulate report download
        const reportData = {
            healthScore: 8.7,
            status: 'Excellent Health',
            confidence: 94,
            timestamp: new Date().toISOString()
        };
        
        try {
            const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cattle-health-report.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('Report downloaded successfully', 'success');
        } catch (error) {
            this.showNotification('Download completed', 'success');
        }
    }

    startNewAnalysis() {
        // Reset application state
        this.currentSection = 1;
        this.uploadedImage = null;
        this.analysisRunning = false;
        
        // Reset UI elements
        const fileInput = document.getElementById('file-input');
        const qualityFeedback = document.getElementById('quality-feedback');
        const previewImage = document.getElementById('preview-image');
        
        if (fileInput) fileInput.value = '';
        if (qualityFeedback) qualityFeedback.classList.add('hidden');
        if (previewImage) {
            previewImage.src = '';
            previewImage.style.transform = 'none';
            previewImage.style.filter = 'none';
            previewImage.removeAttribute('data-rotation');
        }
        
        // Reset analysis steps
        document.querySelectorAll('.analysis-step').forEach(step => {
            step.classList.remove('active', 'completed');
            const progressBar = step.querySelector('.step-progress-bar');
            const status = step.querySelector('.step-status');
            if (progressBar) progressBar.style.width = '0';
            if (status) status.textContent = '⏳';
        });
        
        // Reset results animations
        const scoreDisplay = document.getElementById('score-display');
        const confidenceValue = document.getElementById('confidence-value');
        const scoreProgress = document.getElementById('score-progress');
        
        if (scoreDisplay) scoreDisplay.textContent = '0.0';
        if (confidenceValue) confidenceValue.textContent = '0';
        if (scoreProgress) scoreProgress.style.strokeDashoffset = '339.292';
        
        // Go to upload section
        this.goToSection(1);
        this.showNotification('Ready for new analysis', 'success');
    }

    handleKeyboardShortcuts(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case 'u':
                    event.preventDefault();
                    if (this.currentSection === 1) {
                        document.getElementById('file-input').click();
                    }
                    break;
                case 'n':
                    event.preventDefault();
                    this.startNewAnalysis();
                    break;
                case 's':
                    event.preventDefault();
                    if (this.currentSection === 4) {
                        this.shareResults();
                    }
                    break;
            }
        } else if (event.key === 'Enter') {
            if (this.currentSection === 2 && this.uploadedImage) {
                event.preventDefault();
                this.startAnalysis();
            }
        } else if (event.key === 'Escape') {
            this.closeModal();
            const fabOptions = document.getElementById('fab-options');
            if (fabOptions && !fabOptions.classList.contains('hidden')) {
                this.toggleFabMenu();
            }
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pashuMitra = new PashuMitra();
});

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}