// Project Modals Functionality
class ProjectModals {
    constructor() {
        this.modals = {
            deepfakeModal: document.getElementById('deepfakeModal'),
            attendanceModal: document.getElementById('attendanceModal'),
            feedbackModal: document.getElementById('feedbackModal')
        };
        
        this.deepfakeDemo = new DeepfakeDemo();
        this.attendanceDemo = new AttendanceDemo();
        this.feedbackDemo = new FeedbackDemo();
        
        this.init();
    }

    init() {
        // Setup modal triggers
        document.querySelectorAll('.project-details-btn').forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });
        
        // Setup close buttons
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal(button.closest('.modal'));
            });
        });
        
        // Close modal when clicking outside content
        Object.values(this.modals).forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
        
        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                Object.values(this.modals).forEach(modal => {
                    if (modal.style.display === 'block') {
                        this.closeModal(modal);
                    }
                });
            }
        });
    }

    openModal(modalId) {
        const modal = this.modals[modalId];
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Reset any demo states
            if (modalId === 'deepfakeModal') {
                this.deepfakeDemo.reset();
            } else if (modalId === 'attendanceModal') {
                this.attendanceDemo.reset();
            } else if (modalId === 'feedbackModal') {
                this.feedbackDemo.reset();
            }
        }
    }

    closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Deepfake Demo Functionality
class DeepfakeDemo {
    constructor() {
        this.uploadArea = document.getElementById('deepfakeUploadArea');
        this.fileInput = document.getElementById('deepfakeFileInput');
        this.mediaPreview = document.getElementById('deepfakeMediaPreview');
        this.verdict = document.querySelector('#deepfakeModal .verdict');
        this.confidence = document.querySelector('#deepfakeModal .confidence');
        this.chart = null;
        
        this.init();
    }

    init() {
        // Drag and drop functionality
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });

        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                this.processFile(e.dataTransfer.files[0]);
            }
        });

        // File input change
        this.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) {
                this.processFile(e.target.files[0]);
            }
        });

        // Click to browse
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });
    }

    processFile(file) {
        const fileType = file.type.split('/')[0];
        this.mediaPreview.innerHTML = '';
        
        // Display preview
        if (fileType === 'image') {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.mediaPreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
                this.analyzeMedia('image');
            };
            reader.readAsDataURL(file);
        } 
        else if (fileType === 'video') {
            const video = document.createElement('video');
            video.controls = true;
            video.src = URL.createObjectURL(file);
            this.mediaPreview.appendChild(video);
            this.analyzeMedia('video');
        } 
        else if (fileType === 'audio') {
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = URL.createObjectURL(file);
            this.mediaPreview.appendChild(audio);
            this.analyzeMedia('audio');
        } 
        else {
            alert('Please upload an image, video, or audio file.');
        }
    }

    analyzeMedia(type) {
        // Simulate analysis - in a real implementation, this would call your API
        this.verdict.textContent = 'Analyzing...';
        this.confidence.textContent = 'Processing media file...';
        
        // Fake analysis delay
        setTimeout(() => {
            const isFake = Math.random() > 0.7; // 30% chance of being fake
            const confidence = (Math.random() * 30 + 70).toFixed(1); // 70-100% confidence
            
            this.verdict.textContent = isFake ? 'FAKE' : 'REAL';
            this.verdict.className = 'verdict ' + (isFake ? 'fake' : 'real');
            this.confidence.textContent = `Confidence: ${confidence}%`;
            
            this.showAnalysisChart(isFake, confidence);
        }, 2000);
    }

    showAnalysisChart(isFake, confidence) {
        const ctx = document.getElementById('deepfakeAnalysisChart').getContext('2d');
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Real', 'Fake'],
                datasets: [{
                    data: [isFake ? 100-confidence : confidence, isFake ? confidence : 100-confidence],
                    backgroundColor: [isFake ? '#ff4d4d' : '#64ffda', isFake ? '#64ffda' : '#ff4d4d'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    reset() {
        this.mediaPreview.innerHTML = '';
        this.verdict.textContent = 'Unknown';
        this.verdict.className = 'verdict';
        this.confidence.textContent = 'Upload a file to check authenticity';
        
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}

// Attendance System Demo
class AttendanceDemo {
    constructor() {
        this.video = document.getElementById('attendanceVideo');
        this.canvas = document.getElementById('attendanceCanvas');
        this.startBtn = document.getElementById('startCamera');
        this.captureBtn = document.getElementById('captureFace');
        this.markBtn = document.getElementById('markAttendance');
        this.attendanceLog = document.getElementById('attendanceLog');
        this.stream = null;
        this.capturedFace = null;
        
        this.init();
    }

    init() {
        this.startBtn.addEventListener('click', this.startCamera.bind(this));
        this.captureBtn.addEventListener('click', this.captureFace.bind(this));
        this.markBtn.addEventListener('click', this.markAttendance.bind(this));
    }

    startCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    this.stream = stream;
                    this.video.srcObject = stream;
                    this.startBtn.disabled = true;
                    this.captureBtn.disabled = false;
                    
                    // Draw face detection boxes (simulated)
                    this.simulateFaceDetection();
                })
                .catch(error => {
                    console.error('Error accessing camera:', error);
                    alert('Could not access camera. Please ensure you have granted permissions.');
                });
        } else {
            alert('Camera access not supported in your browser.');
        }
    }

    simulateFaceDetection() {
        const ctx = this.canvas.getContext('2d');
        
        // Clear previous drawings
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw a random face detection box (simulated)
        const boxX = Math.random() * (this.canvas.width - 150);
        const boxY = Math.random() * (this.canvas.height - 150);
        const boxWidth = 150;
        const boxHeight = 150;
        
        ctx.strokeStyle = '#64ffda';
        ctx.lineWidth = 3;
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        
        // Store the "detected" face coordinates
        this.detectedFace = { x: boxX, y: boxY, width: boxWidth, height: boxHeight };
        
        // Keep simulating detection
        if (this.stream) {
            this.detectionInterval = setTimeout(() => this.simulateFaceDetection(), 2000);
        }
    }

    captureFace() {
        if (!this.detectedFace) return;
        
        const ctx = this.canvas.getContext('2d');
        
        // Capture the face area
        this.capturedFace = document.createElement('canvas');
        this.capturedFace.width = this.detectedFace.width;
        this.capturedFace.height = this.detectedFace.height;
        const faceCtx = this.capturedFace.getContext('2d');
        
        faceCtx.drawImage(
            this.video,
            this.detectedFace.x, this.detectedFace.y,
            this.detectedFace.width, this.detectedFace.height,
            0, 0,
            this.detectedFace.width, this.detectedFace.height
        );
        
        // Enable mark attendance button
        this.markBtn.disabled = false;
        
        // Show success message
        alert('Face captured successfully!');
    }

    markAttendance() {
        if (!this.capturedFace) return;
        
        // Simulate face recognition
        const studentNames = [
            "Ali Khan", "Fatima Ahmed", "Usman Malik", 
            "Ayesha Iqbal", "Bilal Hassan", "Sanaullah Khan"
        ];
        const randomStudent = studentNames[Math.floor(Math.random() * studentNames.length)];
        const currentTime = new Date().toLocaleTimeString();
        
        // Add to attendance log
        const logItem = document.createElement('li');
        logItem.textContent = `${randomStudent} - ${currentTime}`;
        this.attendanceLog.appendChild(logItem);
        
        // Scroll to bottom
        this.attendanceLog.scrollTop = this.attendanceLog.scrollHeight;
        
        // Reset for next capture
        this.capturedFace = null;
        this.markBtn.disabled = true;
    }

    reset() {
        // Stop camera
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        // Clear canvas
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Reset buttons
        this.startBtn.disabled = false;
        this.captureBtn.disabled = true;
        this.markBtn.disabled = true;
        
        // Clear log
        this.attendanceLog.innerHTML = '';
        
        // Clear intervals
        if (this.detectionInterval) {
            clearTimeout(this.detectionInterval);
        }
    }
}

// Feedback System Demo
class FeedbackDemo {
    constructor() {
        this.feedbackForm = document.getElementById('demoFeedbackForm');
        this.ratingStars = document.querySelectorAll('.rating-stars i');
        this.ratingInput = document.getElementById('demoRating');
        this.feedbackChart = null;
        this.totalFeedback = 0;
        this.totalRating = 0;
        
        this.init();
    }

    init() {
        // Star rating interaction
        this.ratingStars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                this.setRating(rating);
            });
        });
        
        // Form submission
        this.feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitFeedback();
        });
        
        // Initialize chart
        this.initChart();
    }

    setRating(rating) {
        this.ratingInput.value = rating;
        
        // Update star display
        this.ratingStars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.add('active');
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('active');
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }

    submitFeedback() {
        const course = document.getElementById('demoCourse').value;
        const rating = parseInt(this.ratingInput.value);
        const comments = document.getElementById('demoComments').value;
        
        if (!course || !rating) {
            alert('Please select a course and provide a rating');
            return;
        }
        
        // Update stats
        this.totalFeedback++;
        this.totalRating += rating;
        const averageRating = (this.totalRating / this.totalFeedback).toFixed(1);
        
        // Update UI
        document.getElementById('totalFeedback').textContent = this.totalFeedback;
        document.getElementById('averageRating').textContent = averageRating;
        
        // Update chart
        this.updateChart();
        
        // Show success message
        alert(`Thank you for your feedback on ${course}!`);
        
        // Reset form
        this.feedbackForm.reset();
        this.setRating(0);
    }

    initChart() {
        const ctx = document.getElementById('feedbackChart').getContext('2d');
        
        this.feedbackChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['CS-101', 'AI-301', 'WEB-202'],
                datasets: [{
                    label: 'Average Rating',
                    data: [0, 0, 0],
                    backgroundColor: 'rgba(100, 255, 218, 0.7)',
                    borderColor: 'rgba(100, 255, 218, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            color: '#e6f1ff'
                        },
                        grid: {
                            color: 'rgba(136, 146, 176, 0.2)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#e6f1ff'
                        },
                        grid: {
                            color: 'rgba(136, 146, 176, 0.2)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: '#e6f1ff'
                        }
                    }
                }
            }
        });
    }

    updateChart() {
        // Simulate updating chart data with random values
        if (this.feedbackChart) {
            this.feedbackChart.data.datasets[0].data = [
                Math.min(5, (Math.random() * 2 + 3)).toFixed(1),
                Math.min(5, (Math.random() * 2 + 3.5)).toFixed(1),
                Math.min(5, (Math.random() * 2 + 4)).toFixed(1)
            ];
            this.feedbackChart.update();
        }
    }

    reset() {
        // Reset form
        this.feedbackForm.reset();
        this.setRating(0);
        
        // Reset stats
        this.totalFeedback = 0;
        this.totalRating = 0;
        document.getElementById('totalFeedback').textContent = '0';
        document.getElementById('averageRating').textContent = '0.0';
        
        // Reset chart
        if (this.feedbackChart) {
            this.feedbackChart.data.datasets[0].data = [0, 0, 0];
            this.feedbackChart.update();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectModals();
});