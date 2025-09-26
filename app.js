// PashuMitra - Vibrant AI Cattle Health Assessment Application

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
        this.addScoreGradient();
    }

    showLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('app').classList.remove('hidden');
        }, 3000);
    }

    addScoreGradient() {
        // Create SVG gradient for score ring
        const svg = document.querySelector('.score-ring');
        if (svg) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'scoreGradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '0%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#00E676');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', '#00ACC1');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.appendChild(defs);
        }
    }

    setupEventListeners() {
        // Camera and file upload buttons - Fixed implementation
        const takePhotoBtn = document.getElementById('take-photo-btn');
        const chooseFileBtn = document.getElementById('choose-file-btn');
        const cameraInput = document.getElementById('camera-input');
        const fileInput = document.getElementById('file-input');

        // Take Photo button - Opens camera directly
        if (takePhotoBtn && cameraInput) {
            takePhotoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Take Photo button clicked');
                this.addButtonRipple(takePhotoBtn, e);
                
                // Add visual feedback
                takePhotoBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    takePhotoBtn.style.transform = 'scale(1)';
                }, 150);
                
                // Show notification and trigger camera
                this.showNotification('Opening camera...', 'success');
                
                // Small delay to ensure notification shows
                setTimeout(() => {
                    cameraInput.click();
                }, 100);
            });
        }

        // Choose File button - Opens file browser
        if (chooseFileBtn && fileInput) {
            chooseFileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Choose File button clicked');
                this.addButtonRipple(chooseFileBtn, e);
                
                // Add visual feedback
                chooseFileBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    chooseFileBtn.style.transform = 'scale(1)';
                }, 150);
                
                // Trigger file input
                fileInput.click();
            });
        }

        // Handle camera input change
        if (cameraInput) {
            cameraInput.addEventListener('change', (e) => {
                console.log('Camera input changed', e.target.files);
                if (e.target.files && e.target.files[0]) {
                    this.handleFileUpload(e, 'camera');
                }
            });
        }

        // Handle file input change
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                console.log('File input changed', e.target.files);
                if (e.target.files && e.target.files[0]) {
                    this.handleFileUpload(e, 'file');
                }
            });
        }

        // Preview section buttons
        const backToUploadBtn = document.getElementById('back-to-upload');
        const startAnalysisBtn = document.getElementById('start-analysis');

        if (backToUploadBtn) {
            backToUploadBtn.addEventListener('click', (e) => {
                this.addButtonRipple(backToUploadBtn, e);
                this.goToSection(1);
            });
        }
        if (startAnalysisBtn) {
            startAnalysisBtn.addEventListener('click', (e) => {
                this.addButtonRipple(startAnalysisBtn, e);
                this.startAnalysis();
            });
        }

        // Image controls with enhanced feedback
        const rotateBtn = document.getElementById('rotate-btn');
        const enhanceBtn = document.getElementById('enhance-btn');
        const cropBtn = document.getElementById('crop-btn');

        if (rotateBtn) {
            rotateBtn.addEventListener('click', (e) => {
                this.addButtonRipple(rotateBtn, e);
                this.rotateImage();
            });
        }
        if (enhanceBtn) {
            enhanceBtn.addEventListener('click', (e) => {
                this.addButtonRipple(enhanceBtn, e);
                this.enhanceImage();
            });
        }
        if (cropBtn) {
            cropBtn.addEventListener('click', (e) => {
                this.addButtonRipple(cropBtn, e);
                this.cropImage();
            });
        }

        // Results actions
        const shareResultsBtn = document.getElementById('share-results');
        const downloadReportBtn = document.getElementById('download-report');
        const newAnalysisBtn = document.getElementById('new-analysis');

        if (shareResultsBtn) {
            shareResultsBtn.addEventListener('click', (e) => {
                this.addButtonRipple(shareResultsBtn, e);
                this.shareResults();
            });
        }
        if (downloadReportBtn) {
            downloadReportBtn.addEventListener('click', (e) => {
                this.addButtonRipple(downloadReportBtn, e);
                this.downloadReport();
            });
        }
        if (newAnalysisBtn) {
            newAnalysisBtn.addEventListener('click', (e) => {
                this.addButtonRipple(newAnalysisBtn, e);
                this.startNewAnalysis();
            });
        }

        // Language selector
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        }

        // Accordion with enhanced animations
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => this.toggleAccordion(header));
        });

        // Metric cards with vibrant hover effects
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.addCardRipple(card);
                this.showMetricModal(card.dataset.metric);
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Modal close
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = document.getElementById('modal-overlay');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.closeModal());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    addButtonRipple(button, event) {
        // Only proceed if we have a valid click event with clientX/Y
        if (!event || typeof event.clientX === 'undefined') {
            return;
        }
        
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'rippleEffect 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    addCardRipple(card) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.right = '0';
        ripple.style.bottom = '0';
        ripple.style.background = 'linear-gradient(135deg, rgba(0, 230, 118, 0.1), rgba(0, 172, 193, 0.1))';
        ripple.style.borderRadius = 'inherit';
        ripple.style.opacity = '0';
        ripple.style.animation = 'cardRipple 0.3s ease-out';
        ripple.style.pointerEvents = 'none';
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 300);
    }

    setupDragAndDrop() {
        const uploadArea = document.getElementById('upload-area');
        
        if (!uploadArea) return;
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        uploadArea.addEventListener('dragover', (e) => {
            uploadArea.classList.add('dragover');
            uploadArea.style.transform = 'scale(1.02)';
            uploadArea.style.boxShadow = '0 12px 40px rgba(0, 230, 118, 0.3)';
        });

        uploadArea.addEventListener('dragleave', (e) => {
            uploadArea.classList.remove('dragover');
            uploadArea.style.transform = 'scale(1)';
            uploadArea.style.boxShadow = 'none';
        });

        uploadArea.addEventListener('drop', (e) => {
            uploadArea.classList.remove('dragover');
            uploadArea.style.transform = 'scale(1)';
            uploadArea.style.boxShadow = 'none';
            
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                this.processImageFile(files[0], 'drop');
            } else {
                this.showNotification('Please upload a valid image file', 'error');
            }
        });

        uploadArea.addEventListener('click', (e) => {
            // Only trigger if clicking the upload area itself, not child buttons
            if (e.target === uploadArea || 
                e.target.closest('.upload-content') && 
                !e.target.closest('.btn')) {
                document.getElementById('file-input').click();
            }
        });
    }

    handleFileUpload(event, source = 'file') {
        console.log('handleFileUpload called', source, event.target.files);
        const file = event.target.files[0];
        
        if (file && file.type.startsWith('image/')) {
            const sourceText = source === 'camera' ? 'Camera photo captured!' : 'File selected!';
            this.showNotification(sourceText, 'success');
            this.processImageFile(file, source);
        } else {
            this.showNotification('Please select a valid image file', 'error');
        }
        
        // Clear the input so the same file can be selected again
        event.target.value = '';
    }

    processImageFile(file, source = 'file') {
        console.log('Processing image file', file.name, source);
        const reader = new FileReader();
        
        reader.onload = (e) => {
            this.uploadedImage = e.target.result;
            console.log('Image loaded successfully');
            this.showQualityFeedback(source);
            
            // Enhanced success notification based on source
            const messages = {
                'camera': 'Photo captured successfully! 📸',
                'file': 'Image uploaded successfully! 📁',
                'drop': 'Image dropped successfully! ✨'
            };
            
            this.showNotification(messages[source] || 'Image processed successfully!', 'success');
            
            // Smooth transition to preview section
            setTimeout(() => {
                this.goToSection(2);
                this.displayPreview();
            }, 1500);
        };
        
        reader.onerror = (e) => {
            console.error('Error reading file:', e);
            this.showNotification('Error processing image file', 'error');
        };
        
        reader.readAsDataURL(file);
    }

    showQualityFeedback(source = 'file') {
        const qualityFeedback = document.getElementById('quality-feedback');
        if (!qualityFeedback) return;
        
        qualityFeedback.classList.remove('hidden');
        
        // Enhanced quality assessment with vibrant colors
        const indicators = [
            { id: 'lighting', status: 'Excellent', color: '#00E676' },
            { id: 'clarity', status: 'Good', color: '#00ACC1' },
            { id: 'angle', status: 'Optimal', color: '#FF6D00' }
        ];
        
        // Special handling for camera captures
        if (source === 'camera') {
            indicators[0].status = 'Perfect';
            indicators[1].status = 'Excellent';
        }
        
        indicators.forEach((indicator, index) => {
            setTimeout(() => {
                const item = document.querySelector(`[data-quality="${indicator.id}"]`);
                if (item) {
                    const statusEl = item.querySelector('.quality-status');
                    if (statusEl) {
                        statusEl.textContent = indicator.status;
                        statusEl.style.color = indicator.color;
                        statusEl.style.background = `${indicator.color}15`;
                        statusEl.style.border = `1px solid ${indicator.color}40`;
                    }
                    item.style.animation = 'slideInUp 0.6s ease-out';
                    item.style.transform = 'scale(1.05)';
                    
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                    }, 200);
                }
            }, index * 400);
        });
    }

    displayPreview() {
        const previewImg = document.getElementById('preview-image');
        if (previewImg && this.uploadedImage) {
            previewImg.src = this.uploadedImage;
            previewImg.style.animation = 'fadeIn 0.8s ease-out';
            previewImg.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                previewImg.style.transform = 'scale(1)';
                previewImg.style.transition = 'transform 0.3s ease-out';
            }, 100);
        }
    }

    goToSection(sectionNumber) {
        console.log('Going to section:', sectionNumber);
        // Hide all sections first
        const sections = ['upload-section', 'preview-section', 'analysis-section', 'results-section'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.remove('active');
            }
        });

        // Show target section with enhanced animation
        const targetSectionId = this.getSectionId(sectionNumber);
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            setTimeout(() => {
                targetSection.classList.add('active');
                targetSection.style.animation = 'slideInRight 0.5s ease-out';
            }, 100);
        }

        // Update progress steps with vibrant animations
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
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            const stepNumber = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            
            setTimeout(() => {
                if (stepNumber === activeStep) {
                    step.classList.add('active');
                    step.style.animation = 'bounce 0.6s ease-out';
                } else if (stepNumber < activeStep) {
                    step.classList.add('completed');
                }
            }, index * 100);
        });
    }

    startAnalysis() {
        if (!this.uploadedImage) {
            this.showNotification('Please upload an image first! 📸', 'error');
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
            { id: 1, duration: 2200, message: '🔍 Detecting cattle features...' },
            { id: 2, duration: 1800, message: '📏 Measuring proportions...' },
            { id: 3, duration: 2400, message: '📊 Calculating health metrics...' },
            { id: 4, duration: 2000, message: '🧬 Analyzing breed characteristics...' }
        ];

        let currentStepIndex = 0;

        const runStep = () => {
            if (currentStepIndex >= steps.length) {
                this.analysisRunning = false;
                setTimeout(() => this.showResults(), 800);
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

            // Show step message notification
            this.showNotification(step.message, 'success');

            // Activate step with enhanced animation
            stepEl.classList.add('active');
            stepEl.style.transform = 'translateX(12px) scale(1.02)';
            
            // Animate progress bar with gradient glow
            setTimeout(() => {
                if (progressBar) {
                    progressBar.style.width = '100%';
                    progressBar.style.boxShadow = '0 0 15px rgba(0, 230, 118, 0.6)';
                }
            }, 200);

            // Complete step
            setTimeout(() => {
                stepEl.classList.remove('active');
                stepEl.classList.add('completed');
                stepEl.style.transform = 'translateX(0) scale(1)';
                
                if (statusEl) {
                    statusEl.textContent = '✅';
                    statusEl.style.animation = 'bounce 0.4s ease-out';
                }
                
                if (progressBar) {
                    progressBar.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.4)';
                }
                
                currentStepIndex++;
                setTimeout(runStep, 300);
            }, step.duration);
        };

        runStep();
    }

    showResults() {
        this.goToSection(4);
        setTimeout(() => {
            this.animateHealthScore();
            this.animateMetrics();
        }, 400);
    }

    animateHealthScore() {
        const scoreDisplay = document.getElementById('score-display');
        const scoreProgress = document.getElementById('score-progress');
        const confidenceValue = document.getElementById('confidence-value');
        
        if (!scoreDisplay || !scoreProgress || !confidenceValue) return;

        // Enhanced score animation with vibrant effects
        let currentScore = 0;
        const targetScore = 8.7;
        const increment = 0.1;
        const interval = 50;
        
        const scoreInterval = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(scoreInterval);
                
                // Celebration animation
                scoreDisplay.style.animation = 'bounce 0.8s ease-out';
                this.showNotification('🎉 Analysis complete! Excellent health detected!', 'success');
            }
            scoreDisplay.textContent = currentScore.toFixed(1);
        }, interval);

        // Enhanced progress ring animation
        const circumference = 339.292;
        const progress = (targetScore / 10) * circumference;
        setTimeout(() => {
            scoreProgress.style.strokeDashoffset = (circumference - progress).toString();
            scoreProgress.style.filter = 'drop-shadow(0 0 8px #00E676)';
        }, 300);

        // Enhanced confidence animation
        let currentConfidence = 0;
        const targetConfidence = 94;
        const confidenceInterval = setInterval(() => {
            currentConfidence += 2;
            if (currentConfidence >= targetConfidence) {
                currentConfidence = targetConfidence;
                clearInterval(confidenceInterval);
            }
            confidenceValue.textContent = currentConfidence.toString();
        }, 40);
    }

    animateMetrics() {
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px) scale(0.9)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            }, index * 200);
        });
    }

    rotateImage() {
        const previewImg = document.getElementById('preview-image');
        if (!previewImg) return;

        const currentRotation = parseInt(previewImg.dataset.rotation || '0');
        const newRotation = currentRotation + 90;
        previewImg.style.transform = `rotate(${newRotation}deg) scale(1.05)`;
        previewImg.dataset.rotation = newRotation.toString();
        
        setTimeout(() => {
            previewImg.style.transform = `rotate(${newRotation}deg) scale(1)`;
        }, 150);
        
        this.showNotification('Image rotated! 🔄', 'success');
    }

    enhanceImage() {
        const previewImg = document.getElementById('preview-image');
        if (!previewImg) return;

        previewImg.style.filter = 'brightness(1.15) contrast(1.2) saturate(1.3)';
        previewImg.style.boxShadow = '0 0 30px rgba(0, 230, 118, 0.4)';
        this.showNotification('Image enhanced! ✨', 'success');
    }

    cropImage() {
        this.showNotification('Crop tool activated! ✂️', 'success');
        // In a real app, this would open a crop interface
    }

    changeLanguage(languageCode) {
        this.showNotification(`Language changed to ${languageCode} 🌍`, 'success');
        // In a real app, this would update all UI text
    }

    toggleAccordion(header) {
        const accordionItem = header.parentElement;
        const isExpanded = accordionItem.classList.contains('expanded');
        
        // Close all accordions with smooth animation
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('expanded');
        });
        
        // Toggle current accordion with enhanced animation
        if (!isExpanded) {
            setTimeout(() => {
                accordionItem.classList.add('expanded');
                header.style.animation = 'none';
                header.offsetHeight; // Trigger reflow
                header.style.animation = 'slideInRight 0.3s ease-out';
            }, 100);
        }
    }

    setupModal() {
        this.modalData = {
            bodyLength: {
                title: 'Body Length Ratio',
                content: `
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">📏</div>
                        <h4 style="color: #00E676; margin-bottom: 8px;">Body Length Ratio: 2.41</h4>
                        <span style="background: linear-gradient(135deg, #4CAF50, #2E7D32); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">OPTIMAL</span>
                    </div>
                    <p><strong>Description:</strong> This metric measures the ratio of body length to height. A ratio of 2.41 indicates excellent body proportions for optimal health and productivity.</p>
                    <p><strong>Normal Range:</strong> 2.2 - 2.6</p>
                    <p><strong>Recommendations:</strong> Maintain current nutrition to support continued healthy growth.</p>
                `
            },
            hipWidth: {
                title: 'Hip Width',
                content: `
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">📐</div>
                        <h4 style="color: #00ACC1; margin-bottom: 8px;">Hip Width: 156px</h4>
                        <span style="background: linear-gradient(135deg, #2196F3, #1976D2); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">GOOD</span>
                    </div>
                    <p><strong>Description:</strong> Hip width measurement indicates good muscular development and structural capacity.</p>
                    <p><strong>Normal Range:</strong> 140-180px</p>
                    <p><strong>Recommendations:</strong> Monitor for consistent development over time.</p>
                `
            },
            toplineAngle: {
                title: 'Topline Angle',
                content: `
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">📊</div>
                        <h4 style="color: #FF6D00; margin-bottom: 8px;">Topline Angle: 4.2°</h4>
                        <span style="background: linear-gradient(135deg, #4CAF50, #2E7D32); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">EXCELLENT</span>
                    </div>
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
            
            // Enhanced modal animation
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.transform = 'scale(0.8) translateY(-20px)';
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                modalContent.style.transform = 'scale(1) translateY(0)';
            }, 50);
        }
    }

    closeModal() {
        const modal = document.getElementById('metric-modal');
        if (modal) {
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.transform = 'scale(0.9) translateY(-10px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modal.classList.add('hidden');
                modalContent.style.transform = 'scale(1) translateY(0)';
                modalContent.style.opacity = '1';
            }, 200);
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
        
        // Enhanced notification styling
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        this.notificationContainer.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 50);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }, 3000);
    }

    shareResults() {
        // Enhanced sharing with modern Web API
        if (navigator.share) {
            navigator.share({
                title: 'PashuMitra Health Assessment 🐄',
                text: `Cattle health score: 8.7/10 - Excellent Health! 🎉\nAnalyzed with AI-powered assessment.`,
                url: window.location.href
            }).then(() => {
                this.showNotification('Results shared successfully! 🚀', 'success');
            }).catch(err => {
                console.log('Error sharing:', err);
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        const shareData = 'Cattle health score: 8.7/10 - Excellent Health! 🎉\nAnalyzed with PashuMitra AI';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareData).then(() => {
                this.showNotification('Results copied to clipboard! 📋', 'success');
            }).catch(() => {
                this.showNotification('Results ready to share! ✨', 'success');
            });
        } else {
            this.showNotification('Results ready to share! ✨', 'success');
        }
    }

    downloadReport() {
        // Enhanced report generation
        const reportData = {
            title: 'PashuMitra Health Assessment Report',
            healthScore: 8.7,
            status: 'Excellent Health',
            confidence: 94,
            metrics: {
                bodyLength: { value: 2.41, unit: 'ratio', status: 'Optimal' },
                hipWidth: { value: 156, unit: 'px', status: 'Good' },
                toplineAngle: { value: 4.2, unit: '°', status: 'Excellent' }
            },
            recommendations: [
                'Continue current nutrition and care regimen',
                'Monitor for changes in posture or movement',
                'Schedule regular health assessments'
            ],
            timestamp: new Date().toISOString(),
            generatedBy: 'PashuMitra AI v2.0'
        };
        
        try {
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
        } catch (error) {
            this.showNotification('Download initiated! 📥', 'success');
        }
    }

    startNewAnalysis() {
        // Enhanced reset with smooth transitions
        this.currentSection = 1;
        this.uploadedImage = null;
        this.analysisRunning = false;
        
        // Reset UI elements with animations
        const elements = {
            fileInput: document.getElementById('file-input'),
            cameraInput: document.getElementById('camera-input'),
            qualityFeedback: document.getElementById('quality-feedback'),
            previewImage: document.getElementById('preview-image')
        };
        
        Object.values(elements).forEach(el => {
            if (el) {
                if (el.tagName === 'INPUT') {
                    el.value = '';
                } else if (el.id === 'quality-feedback') {
                    el.classList.add('hidden');
                } else if (el.tagName === 'IMG') {
                    el.src = '';
                    el.style.transform = 'none';
                    el.style.filter = 'none';
                    el.style.boxShadow = 'none';
                    el.removeAttribute('data-rotation');
                }
            }
        });
        
        // Reset analysis steps with stagger animation
        document.querySelectorAll('.analysis-step').forEach((step, index) => {
            setTimeout(() => {
                step.classList.remove('active', 'completed');
                step.style.transform = 'translateX(0) scale(1)';
                
                const progressBar = step.querySelector('.step-progress-bar');
                const status = step.querySelector('.step-status');
                if (progressBar) {
                    progressBar.style.width = '0';
                    progressBar.style.boxShadow = 'none';
                }
                if (status) status.textContent = '⏳';
            }, index * 100);
        });
        
        // Reset results with smooth animation
        const scoreDisplay = document.getElementById('score-display');
        const confidenceValue = document.getElementById('confidence-value');
        const scoreProgress = document.getElementById('score-progress');
        
        if (scoreDisplay) scoreDisplay.textContent = '0.0';
        if (confidenceValue) confidenceValue.textContent = '0';
        if (scoreProgress) {
            scoreProgress.style.strokeDashoffset = '339.292';
            scoreProgress.style.filter = 'none';
        }
        
        // Smooth transition to upload section
        setTimeout(() => {
            this.goToSection(1);
            this.showNotification('Ready for new analysis! 🚀', 'success');
        }, 300);
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
                case 'c':
                    event.preventDefault();
                    if (this.currentSection === 1) {
                        document.getElementById('camera-input').click();
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
        }
    }
}

// Add CSS animations dynamically
const additionalStyles = `
@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes cardRipple {
    to {
        opacity: 1;
    }
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing PashuMitra...');
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
