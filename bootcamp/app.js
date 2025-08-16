// Cybersecurity Presentation App
class PresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 24;
        this.slides = document.querySelectorAll('.slide');
        this.slideCounter = document.getElementById('slideCounter');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.homeBtn = document.getElementById('homeBtn');
        
        this.init();
    }
    
    init() {
        // Initialize event listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.homeBtn.addEventListener('click', () => this.goHome());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Initialize display
        this.updateDisplay();
        this.updateButtons();
        
        // Add click handlers for slides (click to advance)
        this.slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                // Only advance if clicking on the slide content, not navigation
                if (!e.target.closest('.nav-controls')) {
                    this.nextSlide();
                }
            });
        });
        
        console.log('Cybersecurity Presentation App initialized');
    }
    
    handleKeydown(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goHome();
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
            case 'Escape':
                e.preventDefault();
                this.goHome();
                break;
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goHome() {
        this.goToSlide(1);
    }
    
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            // Hide current slide
            const currentSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"]`);
            if (currentSlideElement) {
                currentSlideElement.classList.remove('active');
            }
            
            // Update current slide number
            this.currentSlide = slideNumber;
            
            // Show new slide
            const newSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"]`);
            if (newSlideElement) {
                newSlideElement.classList.add('active');
            }
            
            // Update UI
            this.updateDisplay();
            this.updateButtons();
            
            // Add some visual feedback
            this.addSlideTransitionEffect();
            
            console.log(`Navigated to slide ${this.currentSlide}`);
        }
    }
    
    updateDisplay() {
        if (this.slideCounter) {
            this.slideCounter.textContent = `${this.currentSlide} / ${this.totalSlides}`;
        }
    }
    
    updateButtons() {
        // Update previous button
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 1;
        }
        
        // Update next button
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        }
    }
    
    addSlideTransitionEffect() {
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            // Add a subtle scale effect
            activeSlide.style.transform = 'scale(0.98)';
            setTimeout(() => {
                activeSlide.style.transform = 'scale(1)';
            }, 100);
        }
    }
    
    // Utility method to get slide information
    getCurrentSlideInfo() {
        return {
            current: this.currentSlide,
            total: this.totalSlides,
            title: this.getSlideTitle(this.currentSlide)
        };
    }
    
    getSlideTitle(slideNumber) {
        const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (slide) {
            const titleElement = slide.querySelector('h1');
            return titleElement ? titleElement.textContent : `Slide ${slideNumber}`;
        }
        return `Slide ${slideNumber}`;
    }
    
    // Progress tracking
    getProgress() {
        return Math.round((this.currentSlide / this.totalSlides) * 100);
    }
    
    // Add smooth scroll behavior for better UX
    smoothScrollToSlide(slideNumber) {
        const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (slide) {
            slide.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

// Additional utility functions for enhanced presentation experience
class PresentationUtils {
    static addFullscreenSupport() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F11' || (e.key === 'f' && e.ctrlKey)) {
                e.preventDefault();
                PresentationUtils.toggleFullscreen();
            }
        });
    }
    
    static toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    static addProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-teal-300));
            transition: width 0.3s ease;
            z-index: 1000;
        `;
        document.body.appendChild(progressBar);
        
        return progressBar;
    }
    
    static updateProgress(current, total, progressBar) {
        if (progressBar) {
            const progress = (current / total) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
    
    static addSlideCounter() {
        // This functionality is already handled in the main nav controls
        // but could be extended for additional counters if needed
        console.log('Slide counter functionality integrated in nav controls');
    }
    
    static addAutoAdvanceTimer(seconds = 30) {
        let timer;
        
        const startTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                // Auto advance to next slide if not on last slide
                if (window.presentationApp && window.presentationApp.currentSlide < window.presentationApp.totalSlides) {
                    window.presentationApp.nextSlide();
                    startTimer(); // Restart timer for next slide
                }
            }, seconds * 1000);
        };
        
        const stopTimer = () => {
            clearTimeout(timer);
        };
        
        // Start timer initially
        startTimer();
        
        // Pause timer on user interaction
        document.addEventListener('click', stopTimer);
        document.addEventListener('keydown', stopTimer);
        
        return { startTimer, stopTimer };
    }
    
    // Presentation mode helpers
    static enterPresentationMode() {
        document.body.style.cursor = 'none';
        setTimeout(() => {
            document.body.style.cursor = '';
        }, 3000);
    }
    
    static addMouseHideTimer() {
        let mouseTimer;
        
        const hideMouseCursor = () => {
            document.body.style.cursor = 'none';
        };
        
        const showMouseCursor = () => {
            document.body.style.cursor = '';
            clearTimeout(mouseTimer);
            mouseTimer = setTimeout(hideMouseCursor, 3000);
        };
        
        document.addEventListener('mousemove', showMouseCursor);
        document.addEventListener('click', showMouseCursor);
        
        // Initial timer
        mouseTimer = setTimeout(hideMouseCursor, 3000);
    }
}

// Enhanced keyboard shortcuts
class KeyboardShortcuts {
    static init(presentationApp) {
        document.addEventListener('keydown', (e) => {
            // Presentation control shortcuts
            switch(e.key.toLowerCase()) {
                case 'g':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        KeyboardShortcuts.promptGoToSlide(presentationApp);
                    }
                    break;
                case 'r':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        location.reload();
                    }
                    break;
                case '?':
                    e.preventDefault();
                    KeyboardShortcuts.showHelp();
                    break;
                case 'h':
                    if (!e.ctrlKey && !e.altKey) {
                        e.preventDefault();
                        presentationApp.goHome();
                    }
                    break;
            }
            
            // Number keys for direct slide access (1-9)
            if (e.key >= '1' && e.key <= '9' && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                const slideNumber = parseInt(e.key);
                if (slideNumber <= presentationApp.totalSlides) {
                    presentationApp.goToSlide(slideNumber);
                }
            }
        });
    }
    
    static promptGoToSlide(presentationApp) {
        const slideNumber = prompt(`Go to slide (1-${presentationApp.totalSlides}):`);
        if (slideNumber) {
            const num = parseInt(slideNumber);
            if (num >= 1 && num <= presentationApp.totalSlides) {
                presentationApp.goToSlide(num);
            }
        }
    }
    
    static showHelp() {
        const helpText = `
        Cybersecurity Presentation - Keyboard Shortcuts:
        
        ← → Arrow Keys: Navigate slides
        Home: Go to first slide
        End: Go to last slide
        H: Go to home slide
        1-9: Jump to specific slide
        Ctrl+G: Go to specific slide
        ?: Show this help
        Ctrl+R: Reload presentation
        F11: Toggle fullscreen
        Esc: Exit fullscreen / Go to first slide
        
        Click anywhere on slide to advance to next slide.
        `;
        alert(helpText);
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create main presentation app instance
    window.presentationApp = new PresentationApp();
    
    // Add enhanced features
    const progressBar = PresentationUtils.addProgressIndicator();
    
    // Update progress bar when slides change
    const originalGoToSlide = window.presentationApp.goToSlide.bind(window.presentationApp);
    window.presentationApp.goToSlide = function(slideNumber) {
        originalGoToSlide(slideNumber);
        PresentationUtils.updateProgress(this.currentSlide, this.totalSlides, progressBar);
    };
    
    // Initialize keyboard shortcuts
    KeyboardShortcuts.init(window.presentationApp);
    
    // Add fullscreen support
    PresentationUtils.addFullscreenSupport();
    
    // Add mouse hide timer for presentation mode
    PresentationUtils.addMouseHideTimer();
    
    // Initial progress update
    PresentationUtils.updateProgress(
        window.presentationApp.currentSlide, 
        window.presentationApp.totalSlides, 
        progressBar
    );
    
    // Log ready state
    console.log('🛡️ Cybersecurity Presentation Ready!');
    console.log('📊 Total slides:', window.presentationApp.totalSlides);
    console.log('🎯 Press ? for keyboard shortcuts');
    
    // Optional: Add presentation start notification
    setTimeout(() => {
        console.log('🚀 Presentation: Real Tools & Hands-On Attacks');
        console.log('👨‍💻 Presenter: Pralin Khaira');
        console.log('📅 Ready to begin!');
    }, 1000);
});

// Error handling and recovery
window.addEventListener('error', (e) => {
    console.error('Presentation Error:', e.error);
    // Could implement error recovery logic here
});

// Handle visibility changes (tab switching)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Presentation tab is now active');
    } else {
        console.log('Presentation tab is now inactive');
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PresentationApp, PresentationUtils, KeyboardShortcuts };
}