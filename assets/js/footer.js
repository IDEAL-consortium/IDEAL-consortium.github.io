// IDEAL Platform - Dynamic Footer System
// Centralized footer management

class FooterManager {
    constructor() {
        this.footerSections = [
            {
                title: 'About IDEAL',
                type: 'description',
                content: 'A platform designed to extract results data from international development RCTs and make them accessible to researchers and policymakers worldwide.'
            },
            {
                title: 'Platform',
                type: 'links',
                links: [
                    { href: 'index.html', text: 'Home' },
                ]
            },
            {
                title: 'Resources',
                type: 'links',
                links: [
                    { href: 'codingprotocol.html', text: 'Coding Protocol' },
                    { href: 'Schema_Index.html', text: 'Metadata Schema' },
                    { href: 'https://survey.wb.surveycto.com/index.html', text: 'SurveyCTO' },
                    { href: 'https://github.com/orgs/IDEAL-consortium/projects/11', text: 'Github Paper Tracking' }
                ]
            },
            {
                title: 'Support',
                type: 'links',
                links: [
                    { href: 'https://www.worldbank.org/en/programs/sief-trust-fund/brief/sief-ideal-project-description', text: 'Contact Us' },
                    { href: 'https://www.worldbank.org/en/programs/sief-trust-fund/brief/sief-ideal-project-description', text: 'Collaboration/Partnership' },
                    { href: 'https://www.worldbank.org/en/programs/sief-trust-fund/brief/sief-ideal-project-description', text: 'Report Issue' }
                ]
            }
        ];
        
        this.footerBottom = {
            copyright: '© 2025 Impact Data and Evidence Aggregation Library (IDEAL).'
        };
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.renderFooter());
        } else {
            this.renderFooter();
        }
    }

    renderFooter() {
        const footer = document.querySelector('.footer');
        if (!footer) return;

        // Clear existing footer content
        const footerContent = footer.querySelector('.footer-content');
        if (footerContent) {
            footerContent.innerHTML = '';
        }

        // Generate footer sections
        this.footerSections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('footer-section');
            
            const title = document.createElement('h4');
            title.textContent = section.title;
            sectionDiv.appendChild(title);
            
            if (section.type === 'description') {
                const description = document.createElement('p');
                description.textContent = section.content;
                sectionDiv.appendChild(description);
            } else if (section.type === 'links') {
                const linkList = document.createElement('ul');
                
                section.links.forEach(link => {
                    const listItem = document.createElement('li');
                    const linkElement = document.createElement('a');
                    linkElement.href = link.href;
                    linkElement.textContent = link.text;
                    listItem.appendChild(linkElement);
                    linkList.appendChild(listItem);
                });
                
                sectionDiv.appendChild(linkList);
            }
            
            footerContent.appendChild(sectionDiv);
        });

        // Generate footer bottom
        this.renderFooterBottom();
    }

    renderFooterBottom() {
        const footerBottom = document.querySelector('.footer-bottom');
        if (footerBottom) {
            footerBottom.innerHTML = `<p>${this.footerBottom.copyright}</p>`;
        }
    }

    // Method to update footer sections
    updateFooterSections(newSections) {
        this.footerSections = newSections;
        this.renderFooter();
    }

    // Method to add new footer section
    addFooterSection(section) {
        this.footerSections.push(section);
        this.renderFooter();
    }

    // Method to remove footer section
    removeFooterSection(title) {
        this.footerSections = this.footerSections.filter(section => section.title !== title);
        this.renderFooter();
    }

    // Method to update footer bottom
    updateFooterBottom(newBottom) {
        this.footerBottom = newBottom;
        this.renderFooterBottom();
    }

    // Method to update copyright year
    updateCopyrightYear(year) {
        this.footerBottom.copyright = this.footerBottom.copyright.replace(/\d{4}/, year);
        this.renderFooterBottom();
    }

    // Method to add social media links
    addSocialMedia(socialLinks) {
        const communitySection = this.footerSections.find(section => section.title === 'Community');
        if (communitySection) {
            socialLinks.forEach(link => {
                communitySection.links.push(link);
            });
            this.renderFooter();
        }
    }

    // Method to update contact information
    updateContactInfo(contactLinks) {
        const contactSection = this.footerSections.find(section => section.title === 'Contact');
        if (contactSection) {
            contactSection.links = contactLinks;
            this.renderFooter();
        }
    }
}

// Initialize footer when DOM is ready
const footerManager = new FooterManager();

// Export for use in other scripts
window.FooterManager = FooterManager;
