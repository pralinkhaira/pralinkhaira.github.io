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
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.homeBtn.addEventListener('click', () => this.goHome());
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.updateDisplay();
        this.updateButtons();
        this.slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
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
            this.goToSlide(this.currentSlide + 1, 'next');
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1, 'prev');
        }
    }
    
    goHome() {
        this.goToSlide(1, 'home');
    }
    
    goToSlide(slideNumber, direction = 'next') {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            const currentSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"]`);
            const newSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);
            if (currentSlideElement && newSlideElement && currentSlideElement !== newSlideElement) {
                currentSlideElement.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right', 'active');
                newSlideElement.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right', 'active');
                if (direction === 'next') {
                    currentSlideElement.classList.add('slide-out-left');
                    newSlideElement.classList.add('slide-in-right');
                } else if (direction === 'prev') {
                    currentSlideElement.classList.add('slide-out-right');
                    newSlideElement.classList.add('slide-in-left');
                } else {
                    currentSlideElement.classList.add('slide-out-left');
                    newSlideElement.classList.add('slide-in-right');
                }
                setTimeout(() => {
                    currentSlideElement.classList.remove('slide-out-left', 'slide-out-right', 'active');
                    newSlideElement.classList.remove('slide-in-left', 'slide-in-right');
                    newSlideElement.classList.add('active');
                    this.currentSlide = slideNumber;
                    this.updateDisplay();
                    this.updateButtons();
                    this.addSlideTransitionEffect();
                    console.log(`Navigated to slide ${this.currentSlide}`);
                }, 350);
            } else if (newSlideElement) {
                if (currentSlideElement) currentSlideElement.classList.remove('active');
                this.currentSlide = slideNumber;
                newSlideElement.classList.add('active');
                this.updateDisplay();
                this.updateButtons();
                this.addSlideTransitionEffect();
                console.log(`Navigated to slide ${this.currentSlide}`);
            }
        }
    }
    
    updateDisplay() {
        if (this.slideCounter) {
            this.slideCounter.textContent = `${this.currentSlide} / ${this.totalSlides}`;
        }
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 1;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        }
    }
    
    addSlideTransitionEffect() {
    }
    
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
    
    getProgress() {
        return Math.round((this.currentSlide / this.totalSlides) * 100);
    }
    
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
        console.log('Slide counter functionality integrated in nav controls');
    }
    
    static addAutoAdvanceTimer(seconds = 30) {
        let timer;
        const startTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (window.presentationApp && window.presentationApp.currentSlide < window.presentationApp.totalSlides) {
                    window.presentationApp.nextSlide();
                    startTimer();
                }
            }, seconds * 1000);
        };
        const stopTimer = () => {
            clearTimeout(timer);
        };
        startTimer();
        document.addEventListener('click', stopTimer);
        document.addEventListener('keydown', stopTimer);
        return { startTimer, stopTimer };
    }
    
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
        mouseTimer = setTimeout(hideMouseCursor, 3000);
    }
}

class KeyboardShortcuts {
    static init(presentationApp) {
        document.addEventListener('keydown', (e) => {
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

document.addEventListener('DOMContentLoaded', () => {
    window.presentationApp = new PresentationApp();
    const progressBar = PresentationUtils.addProgressIndicator();
    const originalGoToSlide = window.presentationApp.goToSlide.bind(window.presentationApp);
    window.presentationApp.goToSlide = function(slideNumber) {
        originalGoToSlide(slideNumber);
        PresentationUtils.updateProgress(this.currentSlide, this.totalSlides, progressBar);
        // Sync mobile slider
        const mobileSlider = document.getElementById('mobileSlider');
        const mobileSliderCurrent = document.getElementById('mobileSliderCurrent');
        if (mobileSlider) {
            mobileSlider.value = this.currentSlide;
            if (mobileSliderCurrent) mobileSliderCurrent.textContent = this.currentSlide;
        }
    };
    KeyboardShortcuts.init(window.presentationApp);
    PresentationUtils.addFullscreenSupport();
    PresentationUtils.addMouseHideTimer();
    PresentationUtils.updateProgress(
        window.presentationApp.currentSlide, 
        window.presentationApp.totalSlides, 
        progressBar
    );
    // --- Mobile slider logic ---
    const mobileSlider = document.getElementById('mobileSlider');
    const mobileSliderCurrent = document.getElementById('mobileSliderCurrent');
    const mobileSliderTotal = document.getElementById('mobileSliderTotal');
    if (mobileSlider && window.presentationApp) {
        mobileSlider.value = window.presentationApp.currentSlide;
        if (mobileSliderCurrent) mobileSliderCurrent.textContent = window.presentationApp.currentSlide;
        if (mobileSliderTotal) mobileSliderTotal.textContent = window.presentationApp.totalSlides;
        mobileSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val)) {
                window.presentationApp.goToSlide(val);
            }
        });
    }
    // --- End mobile slider logic ---
    console.log('🛡️ Cybersecurity Presentation Ready!');
    console.log('📊 Total slides:', window.presentationApp.totalSlides);
    console.log('🎯 Press ? for keyboard shortcuts');
    setTimeout(() => {
        console.log('🚀 Presentation: Real Tools & Hands-On Attacks');
        console.log('👨‍💻 Presenter: Pralin Khaira');
        console.log('📅 Ready to begin!');
    }, 1000);
});

window.addEventListener('error', (e) => {
    console.error('Presentation Error:', e.error);
});

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Presentation tab is now active');
    } else {
        console.log('Presentation tab is now inactive');
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PresentationApp, PresentationUtils, KeyboardShortcuts };
}