/**
 * DNYF Platform - Loading Animation Manager
 * Add this script to all HTML pages for consistent loading animation
 */

class LoadingAnimation {
    constructor() {
        this.loadingScreen = null;
        this.init();
    }

    init() {
        // Create loading screen HTML if it doesn't exist
        if (!document.getElementById('loadingScreen')) {
            this.createLoadingScreen();
        }

        // Hide loading screen when page loads
        window.addEventListener('load', () => this.hideLoadingScreen());
        
        // Also hide after timeout
        setTimeout(() => this.hideLoadingScreen(), 3000);
    }

    createLoadingScreen() {
        const html = `
            <div class="loading-screen" id="loadingScreen">
                <div class="loading-container">
                    <div class="loading-logo">
                        <i class="fas fa-terminal"></i>
                    </div>
                    <div class="spinner"></div>
                    <div class="loading-text">
                        DNYF Platform
                        <span class="dots">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </span>
                    </div>
                    <div class="loading-bar">
                        <div class="loading-bar-progress"></div>
                    </div>
                </div>
            </div>
        `;

        // Create element
        const temp = document.createElement('div');
        temp.innerHTML = html;
        document.body.insertBefore(temp.firstElementChild, document.body.firstChild);

        // Inject styles
        this.injectStyles();
    }

    injectStyles() {
        const styles = `
            <style>
                /* Loading Screen */
                .loading-screen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    opacity: 1;
                    transition: opacity 0.6s ease-out;
                }

                .loading-screen.hidden {
                    opacity: 0;
                    pointer-events: none;
                }

                .loading-container {
                    text-align: center;
                    color: white;
                }

                /* Animated Logo */
                .loading-logo {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    animation: pulse-logo 2s ease-in-out infinite;
                }

                @keyframes pulse-logo {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.6;
                        transform: scale(1.1);
                    }
                }

                /* Spinner */
                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid rgba(61, 220, 132, 0.2);
                    border-top: 4px solid #3DDC84;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 20px auto;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* Loading Text */
                .loading-text {
                    font-size: 1.2rem;
                    color: #3DDC84;
                    margin-top: 20px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    animation: blink-text 1.5s ease-in-out infinite;
                }

                @keyframes blink-text {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }

                /* Loading Bar */
                .loading-bar {
                    width: 200px;
                    height: 4px;
                    background: rgba(61, 220, 132, 0.2);
                    border-radius: 2px;
                    margin-top: 30px;
                    overflow: hidden;
                }

                .loading-bar-progress {
                    height: 100%;
                    background: linear-gradient(90deg, #3DDC84, #00d9ff, #3DDC84);
                    border-radius: 2px;
                    width: 0%;
                    animation: progress-bar 2s ease-in-out forwards;
                }

                @keyframes progress-bar {
                    0% {
                        width: 0%;
                    }
                    90% {
                        width: 90%;
                    }
                    100% {
                        width: 100%;
                    }
                }

                /* Dots animation */
                .dots {
                    display: inline-block;
                    margin-left: 5px;
                }

                .dot {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background: #3DDC84;
                    border-radius: 50%;
                    margin: 0 3px;
                    animation: bounce 1.4s infinite;
                }

                .dot:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .dot:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes bounce {
                    0%, 80%, 100% {
                        opacity: 0.3;
                        transform: translateY(0);
                    }
                    40% {
                        opacity: 1;
                        transform: translateY(-10px);
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LoadingAnimation();
    });
} else {
    new LoadingAnimation();
}
