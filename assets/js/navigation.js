// IDEAL Platform - Dynamic Navigation System
// Centralized navigation management

class NavigationManager {
    constructor() {
        this.navItems = [
            { href: 'index.html', text: 'Home', active: false },
            { href: 'about.html', text: 'About', active: false },
            { href: 'codingprotocol.html', text: 'Coding Protocol', active: false },
            { href: 'metadata.html', text: 'Metadata Schema', active: false },
            { 
                href: 'coding-progress.html', 
                text: 'Coding Progress', 
                active: false,
                adminOnly: true,
                id: 'adminTab'
            },
            { href: 'contact.html', text: 'Contact', active: false }
        ];
        
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename;
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.renderNavigation());
        } else {
            this.renderNavigation();
        }
    }

    renderNavigation() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;

        // Clear existing navigation
        navMenu.innerHTML = '';

        // Generate navigation items
        this.navItems.forEach(item => {
            const li = document.createElement('li');
            
            // Set active state
            if (item.href === this.currentPage || 
                (item.dropdown && item.dropdown.some(drop => drop.href === this.currentPage))) {
                item.active = true;
            }

            // Create main link
            const link = document.createElement('a');
            link.href = item.href;
            link.textContent = item.text;
            if (item.active) link.classList.add('active');

            // Handle dropdown items
            if (item.dropdown) {
                li.classList.add('nav-dropdown');
                const dropdown = document.createElement('ul');
                dropdown.classList.add('dropdown-menu');
                
                item.dropdown.forEach(dropItem => {
                    const dropLi = document.createElement('li');
                    const dropLink = document.createElement('a');
                    dropLink.href = dropItem.href;
                    dropLink.textContent = dropItem.text;
                    if (dropItem.href === this.currentPage) {
                        dropLink.classList.add('active');
                    }
                    dropLi.appendChild(dropLink);
                    dropdown.appendChild(dropLi);
                });
                
                li.appendChild(link);
                li.appendChild(dropdown);
            } else {
                li.appendChild(link);
            }

            // Handle admin-only items
            if (item.adminOnly) {
                li.id = item.id;
                li.style.display = 'none';
            }

            navMenu.appendChild(li);
        });

        // Initialize dropdown functionality
        this.initDropdowns();
        
        // Add subtitle next to logo
        this.addLogoSubtitle();
    }
    
    addLogoSubtitle() {
        const navBrand = document.querySelector('.nav-brand');
        if (!navBrand) return;
        
        // Check if subtitle already exists
        if (navBrand.querySelector('.logo-subtitle')) return;
        
        const subtitle = document.createElement('div');
        subtitle.classList.add('logo-subtitle');
        subtitle.textContent = 'Impact Data and Evidence Aggregation Library';
        navBrand.appendChild(subtitle);
    }

    initDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (link && menu) {
                link.addEventListener('mouseenter', () => {
                    menu.style.display = 'block';
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    menu.style.display = 'none';
                });
            }
        });
    }

    // Method to update navigation (for dynamic changes)
    updateNavigation(newItems) {
        this.navItems = newItems;
        this.renderNavigation();
    }

    // Method to show/hide admin items
    toggleAdminItems(show) {
        const adminTab = document.getElementById('adminTab');
        if (adminTab) {
            adminTab.style.display = show ? 'block' : 'none';
        }
    }

    // Method to add new navigation item
    addNavItem(item) {
        this.navItems.push(item);
        this.renderNavigation();
    }

    // Method to remove navigation item
    removeNavItem(href) {
        this.navItems = this.navItems.filter(item => item.href !== href);
        this.renderNavigation();
    }
}

// Initialize navigation when DOM is ready
const navigationManager = new NavigationManager();

// Export for use in other scripts
window.NavigationManager = NavigationManager;
