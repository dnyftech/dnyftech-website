// DNYF Platform Menu System
class PlatformMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.menu = document.getElementById('mainMenu');
        this.overlay = document.getElementById('mobileOverlay');
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.setupHamburger();
        this.setupMenuToggles();
        this.setupTheme();
        this.setupNavigation();
        this.setupMobileOverlay();
    }

    setupHamburger() {
        if (!this.hamburger || !this.menu) return;

        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.menu.classList.toggle('active');
        this.overlay.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.menu.classList.remove('active');
        this.overlay.classList.remove('active');
    }

    setupMenuToggles() {
        const toggles = document.querySelectorAll('.menu-toggle');
        
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = toggle.closest('.menu-item');
                const isOpen = parent.classList.contains('open');
                
                // Close all other open menus
                document.querySelectorAll('.menu-item.open').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('open');
                        item.querySelector('.menu-toggle').classList.remove('expanded');
                    }
                });
                
                // Toggle current menu
                if (isOpen) {
                    parent.classList.remove('open');
                    toggle.classList.remove('expanded');
                } else {
                    parent.classList.add('open');
                    toggle.classList.add('expanded');
                }
            });
        });

        // Close menu items when a submenu link is clicked
        const submenuLinks = document.querySelectorAll('.submenu-link');
        submenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    setupTheme() {
        if (!this.themeToggle) return;

        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });

        // Set initial icon
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.updateThemeIcon(savedTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon(theme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            icon.className = `fas fa-${theme === 'dark' ? 'sun' : 'moon'}`;
        }
    }

    setupNavigation() {
        // Update active nav link based on current page
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.menu-link');
        
        navLinks.forEach(link => {
            if (link.href && link.href === window.location.href) {
                link.classList.add('active');
            } else if (link.href && currentPath.includes(link.href)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    this.closeMenu();
                }
            });
        });
    }

    setupMobileOverlay() {
        if (!this.overlay) return;

        this.overlay.addEventListener('click', () => {
            this.closeMenu();
        });
    }
}

// Initialize menu on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.platformMenu = new PlatformMenu();
});

// Update year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Network status
function updateNetworkStatus() {
    const isOnline = navigator.onLine;
    const statusText = document.getElementById('statusText');
    const offlineIndicator = document.getElementById('offlineIndicator');
    const networkStatus = document.getElementById('networkStatus');

    if (statusText) {
        statusText.textContent = isOnline ? 'Online' : 'Offline';
    }

    if (offlineIndicator) {
        if (!isOnline) {
            offlineIndicator.classList.add('show');
        } else {
            offlineIndicator.classList.remove('show');
        }
    }

    if (networkStatus) {
        networkStatus.style.color = isOnline ? 'var(--primary)' : 'var(--error)';
    }
}

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

document.addEventListener('DOMContentLoaded', updateNetworkStatus);
