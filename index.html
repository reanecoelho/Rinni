<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PashuMitra - AI Cattle Health Assessment</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Loading Screen -->
    <div id="loading-screen" class="loading-screen">
        <div class="loading-content">
            <div class="cow-icon">🐄</div>
            <h2>PashuMitra</h2>
            <p>Loading AI Assessment System...</p>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    </div>

    <!-- SVG Definitions -->
    <svg width="0" height="0" style="position: absolute;">
        <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#4DD0E1;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#AB47BC;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FF8A65;stop-opacity:1" />
            </linearGradient>
        </defs>
    </svg>

    <!-- Main Application -->
    <div id="app" class="app hidden">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <div class="brand">
                    <h1>🐄 PashuMitra</h1>
                    <span class="hackathon-badge">Smart India Hackathon 2025</span>
                </div>
                <div class="header-controls">
                    <select id="language-selector" class="form-control language-selector">
                        <option value="en">English</option>
                        <option value="hi">Hindi (हिन्दी)</option>
                        <option value="bn">Bengali (বাংলা)</option>
                        <option value="te">Telugu (తెలుగు)</option>
                        <option value="mr">Marathi (मराठी)</option>
                        <option value="ta">Tamil (தமிழ்)</option>
                        <option value="gu">Gujarati (ગુજરાતી)</option>
                        <option value="kn">Kannada (ಕನ್ನಡ)</option>
                        <option value="ml">Malayalam (മലയാളം)</option>
                        <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                        <option value="ur">Urdu (اردو)</option>
                        <option value="or">Odia (ଓଡିଆ)</option>
                        <option value="as">Assamese (অসমীয়া)</option>
                    </select>
                    <button id="voice-btn" class="btn btn--secondary voice-btn" aria-label="Voice Commands">
                        <span class="voice-icon">🎤</span>
                    </button>
                </div>
            </div>
        </header>

        <!-- Progress Navigation -->
        <nav class="progress-nav">
            <div class="progress-steps">
                <div class="progress-step active" data-step="1">
                    <div class="step-circle">1</div>
                    <span>Upload</span>
                </div>
                <div class="progress-step" data-step="2">
                    <div class="step-circle">2</div>
                    <span>Preview</span>
                </div>
                <div class="progress-step" data-step="3">
                    <div class="step-circle">3</div>
                    <span>Analysis</span>
                </div>
                <div class="progress-step" data-step="4">
                    <div class="step-circle">4</div>
                    <span>Results</span>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Section 1: Upload -->
            <section id="upload-section" class="section active">
                <div class="container">
                    <div class="camera-guidelines">
                        <h3>Camera Guidelines</h3>
                        <div class="guidelines-grid">
                            <div class="guideline-item">
                                <span class="guideline-icon">☀️</span>
                                <span>Good lighting</span>
                            </div>
                            <div class="guideline-item">
                                <span class="guideline-icon">📏</span>
                                <span>Full body visible</span>
                            </div>
                            <div class="guideline-item">
                                <span class="guideline-icon">👤</span>
                                <span>Side profile</span>
                            </div>
                        </div>
                    </div>

                    <div class="upload-area" id="upload-area">
                        <div class="upload-content">
                            <div class="upload-icon">📁</div>
                            <h4>Upload Cattle Image</h4>
                            <p>Drag and drop your image or click to select</p>
                            <input type="file" id="file-input" accept="image/jpeg,image/jpg,image/png" capture="environment" hidden>
                            <div class="upload-buttons">
                                <button id="take-photo-btn" class="btn btn--primary">
                                    <span>📷</span> Take Photo
                                </button>
                                <button id="choose-file-btn" class="btn btn--outline">
                                    <span>📁</span> Choose File
                                </button>
                            </div>
                            <div id="upload-status" class="upload-status hidden"></div>
                        </div>
                    </div>

                    <div class="quality-feedback hidden" id="quality-feedback">
                        <h4>Quality Assessment</h4>
                        <div class="quality-indicators">
                            <div class="quality-item" data-quality="lighting">
                                <span class="quality-icon">💡</span>
                                <span class="quality-label">Lighting</span>
                                <div class="quality-status">Checking...</div>
                            </div>
                            <div class="quality-item" data-quality="clarity">
                                <span class="quality-icon">👁️</span>
                                <span class="quality-label">Clarity</span>
                                <div class="quality-status">Checking...</div>
                            </div>
                            <div class="quality-item" data-quality="angle">
                                <span class="quality-icon">📐</span>
                                <span class="quality-label">Angle</span>
                                <div class="quality-status">Checking...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Section 2: Preview -->
            <section id="preview-section" class="section">
                <div class="container">
                    <div class="preview-content">
                        <div class="image-preview">
                            <img id="preview-image" src="" alt="Cattle preview" class="preview-img">
                            <div class="image-controls">
                                <button class="btn btn--secondary" id="rotate-btn">🔄 Rotate</button>
                                <button class="btn btn--secondary" id="enhance-btn">✨ Enhance</button>
                                <button class="btn btn--secondary" id="crop-btn">✂️ Crop</button>
                                <button class="btn btn--secondary" id="zoom-btn">🔍 Zoom</button>
                                <button class="btn btn--secondary" id="reset-btn">↺ Reset</button>
                            </div>
                        </div>
                        <div class="preview-actions">
                            <button class="btn btn--outline" id="back-to-upload">← Back</button>
                            <button class="btn btn--primary" id="start-analysis">Start AI Analysis →</button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Section 3: Analysis -->
            <section id="analysis-section" class="section">
                <div class="container">
                    <div class="analysis-content">
                        <div class="scanning-visualization">
                            <div class="scan-lines">
                                <div class="scan-line"></div>
                                <div class="scan-line"></div>
                                <div class="scan-line"></div>
                            </div>
                            <h3>AI Analysis in Progress...</h3>
                            <div class="analysis-progress">
                                <div class="progress-percentage" id="analysis-percentage">0%</div>
                            </div>
                        </div>
                        
                        <div class="analysis-steps">
                            <div class="analysis-step" data-step="1">
                                <div class="step-icon">🔍</div>
                                <div class="step-content">
                                    <h4>Detecting cattle features</h4>
                                    <p>AI scanning for key body points and landmarks</p>
                                    <div class="step-progress">
                                        <div class="step-progress-bar"></div>
                                    </div>
                                </div>
                                <div class="step-status">⏳</div>
                            </div>
                            <div class="analysis-step" data-step="2">
                                <div class="step-icon">📏</div>
                                <div class="step-content">
                                    <h4>Measuring body proportions</h4>
                                    <p>Calculating length, width, and angle measurements</p>
                                    <div class="step-progress">
                                        <div class="step-progress-bar"></div>
                                    </div>
                                </div>
                                <div class="step-status">⏳</div>
                            </div>
                            <div class="analysis-step" data-step="3">
                                <div class="step-icon">📊</div>
                                <div class="step-content">
                                    <h4>Calculating health metrics</h4>
                                    <p>Processing conformation scores and health indicators</p>
                                    <div class="step-progress">
                                        <div class="step-progress-bar"></div>
                                    </div>
                                </div>
                                <div class="step-status">⏳</div>
                            </div>
                            <div class="analysis-step" data-step="4">
                                <div class="step-icon">🧬</div>
                                <div class="step-content">
                                    <h4>Identifying breed characteristics</h4>
                                    <p>Matching features against breed database</p>
                                    <div class="step-progress">
                                        <div class="step-progress-bar"></div>
                                    </div>
                                </div>
                                <div class="step-status">⏳</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Section 4: Results -->
            <section id="results-section" class="section">
                <div class="container">
                    <div class="results-header">
                        <div class="health-score-circle">
                            <svg class="score-ring" width="120" height="120">
                                <circle cx="60" cy="60" r="54" class="score-bg"></circle>
                                <circle cx="60" cy="60" r="54" class="score-fill" id="score-progress"></circle>
                            </svg>
                            <div class="score-content">
                                <div class="score-value" id="score-display">0.0</div>
                                <div class="score-max">/10</div>
                            </div>
                        </div>
                        <div class="health-info">
                            <div class="health-status status--success">Excellent Health</div>
                            <div class="confidence">Confidence: <span id="confidence-value">0</span>%</div>
                        </div>
                    </div>

                    <div class="metrics-grid">
                        <div class="metric-card" data-metric="bodyLength">
                            <div class="metric-icon">📏</div>
                            <div class="metric-content">
                                <div class="metric-label">Body Length Ratio</div>
                                <div class="metric-value" id="body-length-value">2.41</div>
                                <div class="metric-status status--success">Optimal</div>
                            </div>
                        </div>
                        <div class="metric-card" data-metric="hipWidth">
                            <div class="metric-icon">📐</div>
                            <div class="metric-content">
                                <div class="metric-label">Hip Width</div>
                                <div class="metric-value" id="hip-width-value">156px</div>
                                <div class="metric-status status--info">Good</div>
                            </div>
                        </div>
                        <div class="metric-card" data-metric="toplineAngle">
                            <div class="metric-icon">📊</div>
                            <div class="metric-content">
                                <div class="metric-label">Topline Angle</div>
                                <div class="metric-value" id="topline-angle-value">4.2°</div>
                                <div class="metric-status status--success">Excellent</div>
                            </div>
                        </div>
                    </div>

                    <div class="analysis-accordion">
                        <div class="accordion-item">
                            <button class="accordion-header" data-accordion="body-frame">
                                <span>Body Frame Assessment</span>
                                <span class="accordion-icon">▼</span>
                            </button>
                            <div class="accordion-content">
                                <p>Well-proportioned frame with good depth and length indicating healthy muscle development and structural soundness.</p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header" data-accordion="structural">
                                <span>Structural Soundness</span>
                                <span class="accordion-icon">▼</span>
                            </button>
                            <div class="accordion-content">
                                <p>Level topline indicates good structural integrity with proper spine alignment and muscle development.</p>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header" data-accordion="recommendations">
                                <span>Care Recommendations</span>
                                <span class="accordion-icon">▼</span>
                            </button>
                            <div class="accordion-content">
                                <ul>
                                    <li>Continue current nutrition and care regimen</li>
                                    <li>Monitor for changes in posture or movement</li>
                                    <li>Schedule regular health assessments</li>
                                    <li>Maintain proper exercise routine</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="results-actions">
                        <button class="btn btn--outline" id="share-results">🔗 Share Results</button>
                        <button class="btn btn--secondary" id="download-report">📄 Download Report</button>
                        <button class="btn btn--primary" id="new-analysis">🆕 New Analysis</button>
                    </div>
                </div>
            </section>
        </main>

        <!-- Floating Action Menu -->
        <div class="fab-menu">
            <button class="fab-main" id="fab-toggle">
                <span class="fab-icon">⚙️</span>
            </button>
            <div class="fab-options hidden" id="fab-options">
                <button class="fab-option" data-action="help" title="Help">❓</button>
                <button class="fab-option" data-action="history" title="History">📋</button>
                <button class="fab-option" data-action="settings" title="Settings">⚙️</button>
                <button class="fab-option" data-action="feedback" title="Feedback">💬</button>
            </div>
        </div>
    </div>

    <!-- Help Modal -->
    <div class="modal hidden" id="help-modal">
        <div class="modal-overlay" id="help-modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="help-modal-title">Help & User Guide</h3>
                <button class="modal-close" id="help-modal-close">×</button>
            </div>
            <div class="modal-body" id="help-modal-body">
                <h4>How to Use PashuMitra</h4>
                <ol>
                    <li><strong>Upload:</strong> Take a photo or choose an image file of your cattle</li>
                    <li><strong>Preview:</strong> Review and edit your image if needed</li>
                    <li><strong>Analysis:</strong> Let AI analyze the cattle health metrics</li>
                    <li><strong>Results:</strong> View detailed health assessment and recommendations</li>
                </ol>
                <h4>Tips for Best Results</h4>
                <ul>
                    <li>Ensure good lighting conditions</li>
                    <li>Capture full body side profile</li>
                    <li>Keep the cattle standing naturally</li>
                    <li>Use high resolution images</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Settings Modal -->
    <div class="modal hidden" id="settings-modal">
        <div class="modal-overlay" id="settings-modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="settings-modal-title">Settings</h3>
                <button class="modal-close" id="settings-modal-close">×</button>
            </div>
            <div class="modal-body" id="settings-modal-body">
                <div class="form-group">
                    <label class="form-label">Default Language</label>
                    <select class="form-control" id="default-language">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="bn">Bengali</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Analysis Quality</label>
                    <select class="form-control" id="analysis-quality">
                        <option value="standard">Standard</option>
                        <option value="high">High Quality</option>
                        <option value="fast">Fast Processing</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" id="save-history"> Save analysis history
                    </label>
                </div>
            </div>
        </div>
    </div>

    <!-- Metric Details Modal -->
    <div class="modal hidden" id="metric-modal">
        <div class="modal-overlay" id="metric-modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modal-title">Metric Details</h3>
                <button class="modal-close" id="modal-close">×</button>
            </div>
            <div class="modal-body" id="modal-body">
                <!-- Dynamic content -->
            </div>
        </div>
    </div>

    <!-- Notification System -->
    <div class="notification-container" id="notification-container"></div>

    <script src="app.js"></script>
</body>
</html>
