// DNYF Platform Core
class DnyFPlatform {
    constructor() {
        this.username = 'dnyftetch';
        this.baseURL = 'https://api.github.com';
        this.init();
    }

    init() {
        this.loadGitHubStats();
        this.setupPageRouting();
    }

    async loadGitHubStats() {
        try {
            // Fetch user data
            const userResponse = await fetch(`${this.baseURL}/users/${this.username}`);
            const userData = await userResponse.json();

            // Fetch repos for additional stats
            const reposResponse = await fetch(`${this.baseURL}/users/${this.username}/repos?per_page=100`);
            const repos = await reposResponse.json();

            // Calculate stats
            const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

            // Update UI
            this.updateStats({
                repos: repos.length,
                stars: totalStars,
                followers: userData.followers,
                streak: Math.floor(Math.random() * 100) // Placeholder
            });

        } catch (error) {
            console.error('Failed to load GitHub stats:', error);
        }
    }

    updateStats(stats) {
        const updateElement = (id, value) => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = value;
                // Animate number increase
                this.animateCounter(el, 0, value, 1000);
            }
        };

        updateElement('totalRepos', stats.repos);
        updateElement('totalStars', stats.stars);
        updateElement('totalFollowers', stats.followers);
        updateElement('currentStreak', stats.streak);
    }

    animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    setupPageRouting() {
        // Handle page routing (for future multi-page support)
        const path = window.location.pathname;
        
        // Log current page for debugging
        console.log('Current page:', path);

        // Handle different pages
        if (path === '/' || path === '/index.html') {
            this.showHomePage();
        } else if (path.startsWith('/pages/')) {
            this.showPage(path);
        } else if (path.startsWith('/tools/')) {
            this.showTool(path);
        } else if (path.startsWith('/docs/')) {
            this.showDocs(path);
        } else if (path.startsWith('/learning/')) {
            this.showLearning(path);
        }
    }

    showHomePage() {
        // Show hero and stats sections
        const heroSection = document.getElementById('heroSection');
        const featuredTools = document.getElementById('featuredTools');
        const featuredLearning = document.getElementById('featuredLearning');

        if (heroSection) heroSection.style.display = 'block';
        if (featuredTools) featuredTools.style.display = 'block';
        if (featuredLearning) featuredLearning.style.display = 'block';
    }

    showPage(path) {
        console.log('Loading page:', path);
        // This will load different pages
    }

    showTool(path) {
        console.log('Loading tool:', path);
        // This will load tools
    }

    showDocs(path) {
        console.log('Loading docs:', path);
        // This will load documentation
    }

    showLearning(path) {
        console.log('Loading learning content:', path);
        // This will load learning resources
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.platform = new DnyFPlatform();
});

// Smooth scroll for page sections
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll offset for fixed header
    const adjustScrollOffset = () => {
        const scrollElements = document.querySelectorAll('a[href^="#"]');
        scrollElements.forEach(element => {
            element.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };

    adjustScrollOffset();
});

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.3s ease';
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
