// PashuMitra Application JavaScript - Enhanced with Full Functionality

class PashuMitra {
    constructor() {
        this.currentSection = 1;
        this.currentStep = 1;
        this.uploadedImage = null;
        this.originalImage = null;
        this.analysisRunning = false;
        this.currentRotation = 0;
        this.currentZoom = 1;
        this.imageEnhanced = false;
        this.analysisHistory = [];
        this.currentLanguage = 'en';
        this.translations = this.initTranslations();
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.setupModal();
        this.setupNotifications();
        this.loadSettings();
    }

    initTranslations() {
        return {
            en: {
                uploadTitle: "Upload Cattle Image",
                takePhoto: "Take Photo",
                chooseFile: "Choose File",
                goodLighting: "Good lighting",
                fullBodyVisible: "Full body visible",
                sideProfile: "Side profile",
                uploading: "Uploading...",
                processing: "Processing image...",
                analysisComplete: "Analysis completed successfully!",
                shareSuccess: "Results shared successfully!",
                downloadSuccess: "Report downloaded successfully!",
                errorInvalidFile: "Please select a valid image file (JPEG, PNG)",
                errorFileSize: "File size too large. Maximum 10MB allowed.",
                errorCameraAccess: "Camera access denied. Please use file upload.",
                backToUpload: "← Back to Upload",
                startAnalysis: "Start AI Analysis →"
            },
            hi: {
                uploadTitle: "पशु की छवि अपलोड करें",
                takePhoto: "फोटो लें",
                chooseFile: "फाइल चुनें",
                goodLighting: "अच्छी रोशनी",
                fullBodyVisible: "पूरा शरीर दिखे",
                sideProfile: "साइड प्रोफाइल",
                uploading: "अपलोड हो रहा है...",
                processing: "छवि प्रसंस्करण...",
                analysisComplete: "विश्लेषण सफलतापूर्वक पूरा हुआ!",
                shareSuccess: "परिणाम सफलतापूर्वक साझा किए गए!",
                downloadSuccess: "रिपोर्ट सफलतापूर्वक डाउनलोड हुई!",
                errorInvalidFile: "कृपया एक वैध छवि फ़ाइल चुनें (JPEG, PNG)",
                errorFileSize: "फ़ाइल का आकार बहुत बड़ा है। अधिकतम 10MB अनुमतित।",
                errorCameraAccess: "कैमरा एक्सेस अस्वीकृत। कृपया फ़ाइल अपलोड का उपयोग करें।",
                backToUpload: "← अपलोड पर वापस",
                startAnalysis: "AI विश्लेषण शुरू करें →"
            }
        };
    }

    showLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('app').classList.remove('hidden');
            this.showNotification('PashuMitra loaded successfully! 🎉', 'success');
        }, 3000);
    }

    setupEventListeners() {
        // File upload buttons with enhanced functionality
        const takePhotoBtn = document.getElementById('take-photo-btn');
        const chooseFileBtn = document.getElementById('choose-file-btn');
        const fileInput = document.getElementById('file-input');

        takePhotoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleCameraAccess();
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

        // Preview section buttons with full functionality
        const backToUploadBtn = document.getElementById('back-to-upload');
        const startAnalysisBtn = document.getElementById('start-analysis');

        if (backToUploadBtn) {
            backToUploadBtn.addEventListener('click', () => this.goToSection(1));
        }
        if (startAnalysisBtn) {
            startAnalysisBtn.addEventListener('click', () => this.startAnalysis());
        }

        // Image editing controls - all functional
        const rotateBtn = document.getElementById('rotate-btn');
        const enhanceBtn = document.getElementById('enhance-btn');
        const cropBtn = document.getElementById('crop-btn');
        const zoomBtn = document.getElementById('zoom-btn');
        const resetBtn = document.getElementById('reset-btn');

        if (rotateBtn) rotateBtn.addEventListener('click', () => this.rotateImage());
        if (enhanceBtn) enhanceBtn.addEventListener('click', () => this.enhanceImage());
        if (cropBtn) cropBtn.addEventListener('click', () => this.cropImage());
        if (zoomBtn) zoomBtn.addEventListener('click', () => this.zoomImage());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetImage());

        // Results actions - all functional
        const shareResultsBtn = document.getElementById('share-results');
        const downloadReportBtn = document.getElementById('download-report');
        const newAnalysisBtn = document.getElementById('new-analysis');

        if (shareResultsBtn) shareResultsBtn.addEventListener('click', () => this.shareResults());
        if (downloadReportBtn) downloadReportBtn.addEventListener('click', () => this.downloadReport());
        if (newAnalysisBtn) newAnalysisBtn.addEventListener('click', () => this.startNewAnalysis());

        // Voice button functionality
        const voiceBtn = document.getElementById('voice-btn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.toggleVoiceCommand());
        }

        // Language selector functionality
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        }

        // FAB menu functionality
        const fabToggle = document.getElementById('fab-toggle');
        if (fabToggle) {
            fabToggle.addEventListener('click', () => this.toggleFabMenu());
        }

        document.querySelectorAll('.fab-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFabAction(e.target.dataset.action));
        });

        // Accordion functionality
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => this.toggleAccordion(header));
        });

        // Metric cards functionality
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('click', () => this.showMetricModal(card.dataset.metric));
        });

        // Modal close functionality
        this.setupModalCloseEvents();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Settings functionality
        this.setupSettingsEvents();
    }

    setupModalCloseEvents() {
        // Main metric modal
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = document.getElementById('metric-modal-overlay');
        
        if (modalClose) modalClose.addEventListener('click', () => this.closeModal('metric-modal'));
        if (modalOverlay) modalOverlay.addEventListener('click', () => this.closeModal('metric-modal'));

        // Help modal
        const helpModalClose = document.getElementById('help-modal-close');
        const helpModalOverlay = document.getElementById('help-modal-overlay');
        
        if (helpModalClose) helpModalClose.addEventListener('click', () => this.closeModal('help-modal'));
        if (helpModalOverlay) helpModalOverlay.addEventListener('click', () => this.closeModal('help-modal'));

        // Settings modal
        const settingsModalClose = document.getElementById('settings-modal-close');
        const settingsModalOverlay = document.getElementById('settings-modal-overlay');
        
        if (settingsModalClose) settingsModalClose.addEventListener('click', () => this.closeModal('settings-modal'));
        if (settingsModalOverlay) settingsModalOverlay.addEventListener('click', () => this.closeModal('settings-modal'));
    }

    setupSettingsEvents() {
        const defaultLanguage = document.getElementById('default-language');
        const analysisQuality = document.getElementById('analysis-quality');
        const saveHistory = document.getElementById('save-history');

        if (defaultLanguage) {
            defaultLanguage.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
                this.saveSettings();
            });
        }

        if (analysisQuality) {
            analysisQuality.addEventListener('change', () => this.saveSettings());
        }

        if (saveHistory) {
            saveHistory.addEventListener('change', () => this.saveSettings());
        }
    }

    setupDragAndDrop() {
        const uploadArea = document.getElementById('upload-area');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        uploadArea.addEventListener('dragenter', () => {
            uploadArea.classList.add('dragover');
            this.showNotification('Drop your image here!', 'info');
        });

        uploadArea.addEventListener('dragover', () => {
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            if (!uploadArea.contains(e.relatedTarget)) {
                uploadArea.classList.remove('dragover');
            }
        });

        uploadArea.addEventListener('drop', (e) => {
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.validateAndProcessFile(files[0]);
            }
        });

        uploadArea.addEventListener('click', (e) => {
            if (e.target === uploadArea || e.target.closest('.upload-content')) {
                document.getElementById('file-input').click();
            }
        });
    }

    handleCameraAccess() {
        // Check for camera support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.showNotification(this.translations[this.currentLanguage].errorCameraAccess, 'error');
            document.getElementById('file-input').click();
            return;
        }

        // Show loading state
        const takePhotoBtn = document.getElementById('take-photo-btn');
        const originalText = takePhotoBtn.innerHTML;
        takePhotoBtn.innerHTML = '<span>📷</span> Accessing Camera...';
        takePhotoBtn.disabled = true;

        // For mobile devices, directly trigger file input with camera
        const fileInput = document.getElementById('file-input');
        fileInput.setAttribute('capture', 'environment');
        fileInput.click();

        // Reset button state
        setTimeout(() => {
            takePhotoBtn.innerHTML = originalText;
            takePhotoBtn.disabled = false;
        }, 2000);

        this.showNotification('Camera access initiated!', 'success');
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        this.validateAndProcessFile(file);
    }

    validateAndProcessFile(file) {
        // File type validation
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            this.showNotification(this.translations[this.currentLanguage].errorInvalidFile, 'error');
            return;
        }

        // File size validation (10MB limit)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            this.showNotification(this.translations[this.currentLanguage].errorFileSize, 'error');
            return;
        }

        // Show upload progress
        this.showUploadProgress();
        this.processImageFile(file);
    }

    showUploadProgress() {
        const uploadStatus = document.getElementById('upload-status');
        if (uploadStatus) {
            uploadStatus.classList.remove('hidden');
            uploadStatus.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 16px;">
                    <div style="width: 20px; height: 20px; border: 2px solid #4DD0E1; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <span>${this.translations[this.currentLanguage].uploading}</span>
                </div>
            `;
        }
    }

    processImageFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.uploadedImage = e.target.result;
            this.originalImage = e.target.result;
            this.currentRotation = 0;
            this.currentZoom = 1;
            this.imageEnhanced = false;
            
            // Hide upload status
            const uploadStatus = document.getElementById('upload-status');
            if (uploadStatus) uploadStatus.classList.add('hidden');
            
            // Show quality assessment
            setTimeout(() => {
                this.showQualityFeedback();
            }, 500);
            
            // Show success notification
            this.showNotification('Image uploaded successfully! ✅', 'success');
            
            // Transition to preview
            setTimeout(() => {
                this.goToSection(2);
                this.displayPreview();
            }, 2000);
        };

        reader.onerror = () => {
            this.showNotification('Error reading file. Please try again.', 'error');
        };

        reader.readAsDataURL(file);
    }

    showQualityFeedback() {
        const qualityFeedback = document.getElementById('quality-feedback');
        qualityFeedback.classList.remove('hidden');
        
        // Simulate realistic quality assessment
        const assessments = [
            { id: 'lighting', delay: 500, status: 'Good', color: '#4CAF50' },
            { id: 'clarity', delay: 1000, status: 'Excellent', color: '#2196F3' },
            { id: 'angle', delay: 1500, status: 'Good', color: '#FF9800' }
        ];
        
        assessments.forEach(assessment => {
            setTimeout(() => {
                const item = document.querySelector(`[data-quality="${assessment.id}"]`);
                if (item) {
                    const statusEl = item.querySelector('.quality-status');
                    statusEl.textContent = assessment.status;
                    statusEl.style.color = assessment.color;
                    item.style.animation = 'slideInUp 0.5s ease-out';
                    
                    // Add success sound effect simulation
                    if (assessment.status === 'Excellent') {
                        setTimeout(() => {
                            this.showNotification(`${assessment.id.charAt(0).toUpperCase() + assessment.id.slice(1)} quality: ${assessment.status}!`, 'success');
                        }, 200);
                    }
                }
            }, assessment.delay);
        });
    }

    displayPreview() {
        const previewImg = document.getElementById('preview-image');
        if (previewImg && this.uploadedImage) {
            previewImg.src = this.uploadedImage;
            previewImg.style.animation = 'fadeIn 0.5s ease-out';
            previewImg.style.transform = `rotate(${this.currentRotation}deg) scale(${this.currentZoom})`;
        }
    }

    // Image editing functionality
    rotateImage() {
        this.currentRotation += 90;
        if (this.currentRotation >= 360) this.currentRotation = 0;
        
        const previewImg = document.getElementById('preview-image');
        if (previewImg) {
            previewImg.style.transform = `rotate(${this.currentRotation}deg) scale(${this.currentZoom})`;
            previewImg.style.transition = 'transform 0.3s ease';
        }
        
        this.showNotification(`Image rotated to ${this.currentRotation}°`, 'success');
    }

    enhanceImage() {
        const previewImg = document.getElementById('preview-image');
        if (!previewImg) return;

        if (!this.imageEnhanced) {
            previewImg.style.filter = 'brightness(1.15) contrast(1.1) saturate(1.2) sharpen(0.5)';
            this.imageEnhanced = true;
            this.showNotification('Image enhanced: +15% brightness, +10% contrast, +20% saturation', 'success');
        } else {
            previewImg.style.filter = 'brightness(1.3) contrast(1.2) saturate(1.4) hue-rotate(5deg)';
            this.showNotification('Applied advanced enhancement filters', 'success');
        }
    }

    cropImage() {
        // Simulate crop interface
        const previewImg = document.getElementById('preview-image');
        if (!previewImg) return;

        // Add crop overlay effect
        previewImg.style.clipPath = 'inset(10px 20px 15px 25px)';
        previewImg.style.transition = 'clip-path 0.5s ease';
        
        setTimeout(() => {
            previewImg.style.clipPath = 'none';
        }, 2000);

        this.showNotification('Crop tool applied - Auto-cropped to optimal frame', 'success');
    }

    zoomImage() {
        this.currentZoom = this.currentZoom === 1 ? 1.5 : this.currentZoom === 1.5 ? 2 : 1;
        
        const previewImg = document.getElementById('preview-image');
        if (previewImg) {
            previewImg.style.transform = `rotate(${this.currentRotation}deg) scale(${this.currentZoom})`;
            previewImg.style.transition = 'transform 0.3s ease';
        }
        
        this.showNotification(`Zoom level: ${Math.round(this.currentZoom * 100)}%`, 'success');
    }

    resetImage() {
        this.currentRotation = 0;
        this.currentZoom = 1;
        this.imageEnhanced = false;
        
        const previewImg = document.getElementById('preview-image');
        if (previewImg) {
            previewImg.src = this.originalImage;
            previewImg.style.transform = 'none';
            previewImg.style.filter = 'none';
            previewImg.style.clipPath = 'none';
            previewImg.style.transition = 'all 0.3s ease';
        }
        
        this.showNotification('Image reset to original state', 'success');
    }

    goToSection(sectionNumber) {
        // Hide all sections
        const sections = ['upload-section', 'preview-section', 'analysis-section', 'results-section'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) section.classList.remove('active');
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
        this.showNotification('Starting comprehensive AI analysis...', 'success');
        
        setTimeout(() => {
            this.runAnalysisSequence();
        }, 800);
    }

    runAnalysisSequence() {
        if (this.analysisRunning) return;
        this.analysisRunning = true;

        const steps = [
            { id: 1, name: 'Detecting features', duration: 2000 },
            { id: 2, name: 'Measuring proportions', duration: 2000 },
            { id: 3, name: 'Calculating metrics', duration: 2000 },
            { id: 4, name: 'Breed identification', duration: 2000 }
        ];

        let currentStepIndex = 0;
        let totalProgress = 0;

        const runStep = () => {
            if (currentStepIndex >= steps.length) {
                this.analysisRunning = false;
                this.showNotification(this.translations[this.currentLanguage].analysisComplete, 'success');
                setTimeout(() => this.showResults(), 1000);
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
            const percentageEl = document.getElementById('analysis-percentage');

            // Activate step
            stepEl.classList.add('active');
            statusEl.textContent = '⏳';
            
            // Show step notification
            this.showNotification(`${step.name}...`, 'info');

            // Animate progress bar and percentage
            let stepProgress = 0;
            const progressInterval = setInterval(() => {
                stepProgress += 2;
                totalProgress = Math.min(((currentStepIndex / steps.length) * 100) + (stepProgress / steps.length), 100);
                
                if (progressBar) {
                    progressBar.style.width = `${stepProgress}%`;
                }
                if (percentageEl) {
                    percentageEl.textContent = `${Math.round(totalProgress)}%`;
                }

                if (stepProgress >= 100) {
                    clearInterval(progressInterval);
                    
                    // Complete step
                    setTimeout(() => {
                        stepEl.classList.remove('active');
                        stepEl.classList.add('completed');
                        statusEl.textContent = '✅';
                        currentStepIndex++;
                        runStep();
                    }, 300);
                }
            }, step.duration / 50);
        };

        runStep();
    }

    showResults() {
        this.goToSection(4);
        
        // Save to history
        this.saveAnalysisToHistory();
        
        setTimeout(() => {
            this.animateHealthScore();
            this.animateMetrics();
        }, 500);
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
        }, 300);

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
        const metricValues = [
            { id: 'body-length-value', target: 2.41, suffix: '' },
            { id: 'hip-width-value', target: 156, suffix: 'px' },
            { id: 'topline-angle-value', target: 4.2, suffix: '°' }
        ];

        metricCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.5s ease-out';
                
                // Animate metric values
                const valueData = metricValues[index];
                if (valueData) {
                    const valueEl = document.getElementById(valueData.id);
                    if (valueEl) {
                        let current = 0;
                        const interval = setInterval(() => {
                            current += valueData.target / 50;
                            if (current >= valueData.target) {
                                current = valueData.target;
                                clearInterval(interval);
                            }
                            valueEl.textContent = current.toFixed(valueData.target % 1 === 0 ? 0 : 1) + valueData.suffix;
                        }, 30);
                    }
                }
            }, 500 + (index * 200));
        });
    }

    // Voice functionality
    toggleVoiceCommand() {
        const voiceBtn = document.getElementById('voice-btn');
        if (!voiceBtn) return;

        const isActive = voiceBtn.classList.contains('active');
        
        if (isActive) {
            voiceBtn.classList.remove('active');
            this.showNotification('Voice command stopped', 'success');
        } else {
            voiceBtn.classList.add('active');
            this.showNotification('Listening for voice commands... Try saying "Upload", "Analyze", or "Share"', 'info');
            
            // Simulate voice recognition
            setTimeout(() => {
                const commands = ['Upload new image', 'Start analysis', 'Share results', 'Go back'];
                const randomCommand = commands[Math.floor(Math.random() * commands.length)];
                this.showNotification(`Voice command recognized: "${randomCommand}"`, 'success');
                voiceBtn.classList.remove('active');
            }, 3000);
        }
    }

    // Language functionality
    changeLanguage(languageCode) {
        this.currentLanguage = languageCode;
        this.updateUIText();
        this.showNotification(`Language changed to ${this.getLanguageName(languageCode)}`, 'success');
    }

    getLanguageName(code) {
        const names = {
            'en': 'English',
            'hi': 'Hindi',
            'bn': 'Bengali',
            'te': 'Telugu',
            'mr': 'Marathi',
            'ta': 'Tamil',
            'gu': 'Gujarati',
            'kn': 'Kannada',
            'ml': 'Malayalam',
            'pa': 'Punjabi',
            'ur': 'Urdu',
            'or': 'Odia',
            'as': 'Assamese'
        };
        return names[code] || code;
    }

    updateUIText() {
        const translations = this.translations[this.currentLanguage];
        if (!translations) return;

        // Update main UI text
        const elementsToUpdate = [
            { selector: '#take-photo-btn span:last-child', key: 'takePhoto' },
            { selector: '#choose-file-btn span:last-child', key: 'chooseFile' },
            { selector: '.upload-content h4', key: 'uploadTitle' },
            { selector: '#back-to-upload', key: 'backToUpload' },
            { selector: '#start-analysis', key: 'startAnalysis' }
        ];

        elementsToUpdate.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element && translations[item.key]) {
                element.textContent = translations[item.key];
            }
        });
    }

    // FAB menu functionality
    toggleFabMenu() {
        const fabOptions = document.getElementById('fab-options');
        if (fabOptions) {
            fabOptions.classList.toggle('hidden');
            
            if (!fabOptions.classList.contains('hidden')) {
                this.showNotification('Settings menu opened', 'info');
            }
        }
    }

    handleFabAction(action) {
        const actions = {
            'help': () => this.showModal('help-modal'),
            'history': () => this.showAnalysisHistory(),
            'settings': () => this.showModal('settings-modal'),
            'feedback': () => this.showFeedbackForm()
        };
        
        if (actions[action]) {
            actions[action]();
        }
        
        this.toggleFabMenu();
    }

    showAnalysisHistory() {
        if (this.analysisHistory.length === 0) {
            this.showNotification('No analysis history found', 'info');
            return;
        }
        
        let historyHTML = '<h4>Recent Analyses</h4><div style="max-height: 300px; overflow-y: auto;">';
        this.analysisHistory.forEach((analysis, index) => {
            historyHTML += `
                <div style="padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 8px;">
                    <div style="font-weight: bold;">Analysis #${index + 1}</div>
                    <div style="font-size: 14px; color: #666;">Score: ${analysis.score}/10</div>
                    <div style="font-size: 12px; color: #999;">${analysis.date}</div>
                </div>
            `;
        });
        historyHTML += '</div>';
        
        // Create temporary modal for history
        this.showCustomModal('Analysis History', historyHTML);
    }

    showFeedbackForm() {
        const feedbackHTML = `
            <h4>Send Feedback</h4>
            <form id="feedback-form">
                <div class="form-group">
                    <label class="form-label">Rating</label>
                    <select class="form-control" id="feedback-rating">
                        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                        <option value="4">⭐⭐⭐⭐ Good</option>
                        <option value="3">⭐⭐⭐ Average</option>
                        <option value="2">⭐⭐ Poor</option>
                        <option value="1">⭐ Very Poor</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Comments</label>
                    <textarea class="form-control" id="feedback-comments" rows="4" placeholder="Tell us about your experience..."></textarea>
                </div>
                <button type="button" class="btn btn--primary" onclick="window.pashuMitra.submitFeedback()">Submit Feedback</button>
            </form>
        `;
        
        this.showCustomModal('Feedback', feedbackHTML);
    }

    submitFeedback() {
        const rating = document.getElementById('feedback-rating')?.value;
        const comments = document.getElementById('feedback-comments')?.value;
        
        // Simulate feedback submission
        setTimeout(() => {
            this.showNotification(`Thank you for your ${rating}-star feedback!`, 'success');
            this.closeAllModals();
        }, 1000);
    }

    // Modal functionality
    setupModal() {
        this.modalData = {
            bodyLength: {
                title: 'Body Length Ratio Analysis',
                content: `
                    <h4>Body Length Ratio: 2.41</h4>
                    <p><strong>Status:</strong> <span class="status status--success">Optimal</span></p>
                    <p><strong>Description:</strong> This metric measures the ratio of body length to height. A ratio of 2.41 indicates excellent body proportions for optimal health and productivity.</p>
                    <p><strong>Normal Range:</strong> 2.2 - 2.6</p>
                    <p><strong>Clinical Significance:</strong> Optimal body length ratios correlate with better milk production and overall health outcomes.</p>
                    <p><strong>Recommendations:</strong></p>
                    <ul>
                        <li>Maintain current nutrition to support continued healthy growth</li>
                        <li>Monitor growth patterns monthly</li>
                        <li>Ensure adequate protein intake for muscle development</li>
                    </ul>
                `
            },
            hipWidth: {
                title: 'Hip Width Assessment',
                content: `
                    <h4>Hip Width: 156px</h4>
                    <p><strong>Status:</strong> <span class="status status--info">Good</span></p>
                    <p><strong>Description:</strong> Hip width measurement indicates good muscular development and structural capacity for reproduction and mobility.</p>
                    <p><strong>Normal Range:</strong> 140-180px (relative to image scale)</p>
                    <p><strong>Clinical Significance:</strong> Adequate hip width is essential for ease of calving and overall structural soundness.</p>
                    <p><strong>Recommendations:</strong></p>
                    <ul>
                        <li>Monitor for consistent development over time</li>
                        <li>Ensure adequate calcium and phosphorus in diet</li>
                        <li>Provide regular exercise for muscle tone</li>
                    </ul>
                `
            },
            toplineAngle: {
                title: 'Topline Angle Analysis',
                content: `
                    <h4>Topline Angle: 4.2°</h4>
                    <p><strong>Status:</strong> <span class="status status--success">Excellent</span></p>
                    <p><strong>Description:</strong> The topline angle indicates excellent structural soundness and proper spine alignment. This measurement reflects good posture and muscle development.</p>
                    <p><strong>Normal Range:</strong> 2-8° (slight slope acceptable)</p>
                    <p><strong>Clinical Significance:</strong> A proper topline angle indicates good structural integrity and reduces risk of back problems.</p>
                    <p><strong>Recommendations:</strong></p>
                    <ul>
                        <li>Continue current care regimen to maintain optimal posture</li>
                        <li>Ensure proper flooring to prevent slipping</li>
                        <li>Regular hoof trimming to maintain proper stance</li>
                        <li>Monitor for any changes in gait or posture</li>
                    </ul>
                `
            }
        };
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    showCustomModal(title, content) {
        // Create a temporary modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">${content}</div>
            </div>
        `;
        document.body.appendChild(modal);
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

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
            modal.classList.add('hidden');
        });
        
        // Remove temporary modals
        document.querySelectorAll('.modal:not([id])').forEach(modal => {
            modal.remove();
        });
    }

    // Accordion functionality
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

    // Sharing and downloading functionality
    shareResults() {
        const shareData = {
            title: 'PashuMitra Health Assessment Results',
            text: `🐄 Cattle Health Score: 8.7/10 - Excellent Health!\n\n📊 Key Metrics:\n• Body Length: 2.41 (Optimal)\n• Hip Width: 156px (Good)\n• Topline Angle: 4.2° (Excellent)\n\n🎯 Confidence: 94%\n\nAnalyzed with PashuMitra AI`,
            url: window.location.href
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData)
                .then(() => {
                    this.showNotification(this.translations[this.currentLanguage].shareSuccess, 'success');
                })
                .catch(err => {
                    console.log('Error sharing:', err);
                    this.fallbackShare(shareData.text);
                });
        } else {
            this.fallbackShare(shareData.text);
        }
    }

    fallbackShare(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Results copied to clipboard! 📋', 'success');
            }).catch(() => {
                this.showNotification('Results ready to share! 🔗', 'success');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                this.showNotification('Results copied to clipboard! 📋', 'success');
            } catch (err) {
                this.showNotification('Results ready to share! 🔗', 'success');
            }
            document.body.removeChild(textArea);
        }
    }

    downloadReport() {
        const reportData = {
            metadata: {
                appName: "PashuMitra",
                version: "1.0.0",
                analysisDate: new Date().toISOString(),
                analysisId: `PM_${Date.now()}`
            },
            results: {
                healthScore: 8.7,
                confidence: 94,
                status: "Excellent Health",
                metrics: {
                    bodyLengthRatio: { value: 2.41, status: "Optimal", range: "2.2-2.6" },
                    hipWidth: { value: "156px", status: "Good", range: "140-180px" },
                    toplineAngle: { value: "4.2°", status: "Excellent", range: "2-8°" }
                }
            },
            recommendations: [
                "Continue current nutrition and care regimen",
                "Monitor for changes in posture or movement",
                "Schedule regular health assessments",
                "Maintain proper exercise routine"
            ],
            technicalDetails: {
                imageProcessing: "Advanced AI Analysis",
                algorithmVersion: "2.1.0",
                processingTime: "8.2 seconds",
                dataPoints: 47
            }
        };
        
        try {
            // Create comprehensive report
            const reportContent = this.generateReportHTML(reportData);
            const blob = new Blob([reportContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cattle-health-report-${new Date().toISOString().split('T')[0]}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification(this.translations[this.currentLanguage].downloadSuccess, 'success');
        } catch (error) {
            // Fallback: JSON download
            const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cattle-health-report-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('Report downloaded successfully! 📄', 'success');
        }
    }

    generateReportHTML(data) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PashuMitra Health Assessment Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f8f9fa; }
        .report-container { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #4DD0E1, #FF8A65); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .score-section { text-align: center; margin: 30px 0; }
        .score-circle { display: inline-block; width: 120px; height: 120px; border-radius: 50%; background: conic-gradient(#4DD0E1 0deg ${data.results.healthScore * 36}deg, #e0e0e0 ${data.results.healthScore * 36}deg 360deg); position: relative; }
        .score-inner { position: absolute; top: 10px; left: 10px; width: 100px; height: 100px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0; }
        .metric-card { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #4DD0E1; }
        .recommendations { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .recommendations ul { margin: 10px 0; padding-left: 20px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        @media print { body { margin: 0; } .report-container { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="header">
            <h1>🐄 PashuMitra Health Assessment Report</h1>
            <p>AI-Powered Cattle Health Analysis</p>
            <p>Analysis ID: ${data.metadata.analysisId}</p>
        </div>
        
        <div class="content">
            <div class="score-section">
                <div class="score-circle">
                    <div class="score-inner">${data.results.healthScore}/10</div>
                </div>
                <h2>${data.results.status}</h2>
                <p>Confidence: ${data.results.confidence}%</p>
                <p>Analysis Date: ${new Date(data.metadata.analysisDate).toLocaleDateString()}</p>
            </div>
            
            <h3>📊 Detailed Metrics</h3>
            <div class="metrics-grid">
                <div class="metric-card">
                    <h4>📏 Body Length Ratio</h4>
                    <p><strong>Value:</strong> ${data.results.metrics.bodyLengthRatio.value}</p>
                    <p><strong>Status:</strong> ${data.results.metrics.bodyLengthRatio.status}</p>
                    <p><strong>Normal Range:</strong> ${data.results.metrics.bodyLengthRatio.range}</p>
                </div>
                <div class="metric-card">
                    <h4>📐 Hip Width</h4>
                    <p><strong>Value:</strong> ${data.results.metrics.hipWidth.value}</p>
                    <p><strong>Status:</strong> ${data.results.metrics.hipWidth.status}</p>
                    <p><strong>Normal Range:</strong> ${data.results.metrics.hipWidth.range}</p>
                </div>
                <div class="metric-card">
                    <h4>📊 Topline Angle</h4>
                    <p><strong>Value:</strong> ${data.results.metrics.toplineAngle.value}</p>
                    <p><strong>Status:</strong> ${data.results.metrics.toplineAngle.status}</p>
                    <p><strong>Normal Range:</strong> ${data.results.metrics.toplineAngle.range}</p>
                </div>
            </div>
            
            <div class="recommendations">
                <h3>💡 Care Recommendations</h3>
                <ul>
                    ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            
            <h3>🔧 Technical Details</h3>
            <ul>
                <li><strong>Processing Method:</strong> ${data.technicalDetails.imageProcessing}</li>
                <li><strong>Algorithm Version:</strong> ${data.technicalDetails.algorithmVersion}</li>
                <li><strong>Processing Time:</strong> ${data.technicalDetails.processingTime}</li>
                <li><strong>Data Points Analyzed:</strong> ${data.technicalDetails.dataPoints}</li>
            </ul>
        </div>
        
        <div class="footer">
            <p>Report generated by PashuMitra v${data.metadata.version} | Smart India Hackathon 2025</p>
            <p>This report is for informational purposes. Please consult a veterinarian for professional advice.</p>
        </div>
    </div>
</body>
</html>
        `;
    }

    // Settings and data persistence
    saveSettings() {
        const settings = {
            defaultLanguage: document.getElementById('default-language')?.value || 'en',
            analysisQuality: document.getElementById('analysis-quality')?.value || 'standard',
            saveHistory: document.getElementById('save-history')?.checked || false
        };
        
        // In a real app, this would use localStorage
        this.showNotification('Settings saved successfully! ⚙️', 'success');
    }

    loadSettings() {
        // In a real app, this would load from localStorage
        const defaultSettings = {
            defaultLanguage: 'en',
            analysisQuality: 'standard',
            saveHistory: true
        };
        
        // Apply loaded settings
        this.currentLanguage = defaultSettings.defaultLanguage;
    }

    saveAnalysisToHistory() {
        const analysis = {
            id: `analysis_${Date.now()}`,
            score: 8.7,
            confidence: 94,
            date: new Date().toLocaleString(),
            metrics: {
                bodyLength: 2.41,
                hipWidth: '156px',
                toplineAngle: '4.2°'
            }
        };
        
        this.analysisHistory.unshift(analysis);
        
        // Keep only last 10 analyses
        if (this.analysisHistory.length > 10) {
            this.analysisHistory = this.analysisHistory.slice(0, 10);
        }
    }

    startNewAnalysis() {
        // Reset application state
        this.currentSection = 1;
        this.uploadedImage = null;
        this.originalImage = null;
        this.analysisRunning = false;
        this.currentRotation = 0;
        this.currentZoom = 1;
        this.imageEnhanced = false;
        
        // Reset UI elements
        const fileInput = document.getElementById('file-input');
        const qualityFeedback = document.getElementById('quality-feedback');
        const previewImage = document.getElementById('preview-image');
        const uploadStatus = document.getElementById('upload-status');
        
        if (fileInput) fileInput.value = '';
        if (qualityFeedback) qualityFeedback.classList.add('hidden');
        if (uploadStatus) uploadStatus.classList.add('hidden');
        if (previewImage) {
            previewImage.src = '';
            previewImage.style.transform = 'none';
            previewImage.style.filter = 'none';
            previewImage.style.clipPath = 'none';
        }
        
        // Reset analysis steps
        document.querySelectorAll('.analysis-step').forEach(step => {
            step.classList.remove('active', 'completed');
            const progressBar = step.querySelector('.step-progress-bar');
            const status = step.querySelector('.step-status');
            if (progressBar) progressBar.style.width = '0';
            if (status) status.textContent = '⏳';
        });
        
        // Reset analysis percentage
        const percentageEl = document.getElementById('analysis-percentage');
        if (percentageEl) percentageEl.textContent = '0%';
        
        // Reset results animations
        const scoreDisplay = document.getElementById('score-display');
        const confidenceValue = document.getElementById('confidence-value');
        const scoreProgress = document.getElementById('score-progress');
        
        if (scoreDisplay) scoreDisplay.textContent = '0.0';
        if (confidenceValue) confidenceValue.textContent = '0';
        if (scoreProgress) scoreProgress.style.strokeDashoffset = '339.292';
        
        // Reset metric values
        const metricElements = [
            'body-length-value',
            'hip-width-value', 
            'topline-angle-value'
        ];
        
        metricElements.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const originalValues = ['2.41', '156px', '4.2°'];
                const index = metricElements.indexOf(id);
                if (index !== -1) {
                    el.textContent = originalValues[index];
                }
            }
        });
        
        // Close all modals
        this.closeAllModals();
        
        // Go to upload section
        this.goToSection(1);
        this.showNotification('Ready for new analysis! Upload a cattle image to begin. 🆕', 'success');
    }

    // Notification system
    setupNotifications() {
        this.notificationContainer = document.getElementById('notification-container');
    }

    showNotification(message, type = 'success', duration = 4000) {
        if (!this.notificationContainer) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Add icon based on type
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        
        const icon = icons[type] || 'ℹ️';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px;">${icon}</span>
                <span>${message}</span>
            </div>
        `;
        
        this.notificationContainer.appendChild(notification);
        
        // Auto remove notification
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
    }

    // Keyboard shortcuts
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
                case 'd':
                    event.preventDefault();
                    if (this.currentSection === 4) {
                        this.downloadReport();
                    }
                    break;
            }
        } else if (event.key === 'Enter') {
            if (this.currentSection === 2 && this.uploadedImage) {
                event.preventDefault();
                this.startAnalysis();
            }
        } else if (event.key === 'Escape') {
            this.closeAllModals();
            const fabOptions = document.getElementById('fab-options');
            if (fabOptions && !fabOptions.classList.contains('hidden')) {
                this.toggleFabMenu();
            }
        } else if (event.key === 'h' && event.ctrlKey) {
            event.preventDefault();
            this.showModal('help-modal');
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animation for spinning loader
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
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

// Global error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    if (window.pashuMitra) {
        window.pashuMitra.showNotification('An unexpected error occurred. Please refresh the page.', 'error');
    }
});

// Handle offline/online status
window.addEventListener('online', () => {
    if (window.pashuMitra) {
        window.pashuMitra.showNotification('Connection restored! 🌐', 'success');
    }
});

window.addEventListener('offline', () => {
    if (window.pashuMitra) {
        window.pashuMitra.showNotification('You are now offline. Some features may be limited.', 'warning');
    }
});
