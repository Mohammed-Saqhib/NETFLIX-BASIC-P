// Netflix Household Verify - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initStepToggle();
    initFAQAccordion();
    initSmoothScrolling();
    initProgressIndicators();
    
    // Initialize new enhanced features
    initThemeSwitcher();
    initEnhancedAnimations();
    initImprovedNotifications();
    initAccessibilityImprovements();
    
    // Add this new function call to ensure tutorial links work properly
    initTutorialLinks();
    
    // Explicitly add scroll-to-top functionality
    addScrollToTop();
});

// Step-by-step guide toggle functionality
function initStepToggle() {
    const stepButtons = document.querySelectorAll('.view-steps-btn');
    
    stepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            const stepsContainer = document.getElementById(`${method}-steps`);
            const isVisible = stepsContainer.style.display !== 'none';
            
            // Toggle visibility
            if (isVisible) {
                stepsContainer.style.display = 'none';
                this.textContent = 'View Steps';
                this.classList.remove('btn--primary');
                this.classList.add('btn--outline');
            } else {
                stepsContainer.style.display = 'block';
                this.textContent = 'Hide Steps';
                this.classList.remove('btn--outline');
                this.classList.add('btn--primary');
                
                // Smooth scroll to the steps
                setTimeout(() => {
                    stepsContainer.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
            
            // Add animation effect
            stepsContainer.style.opacity = '0';
            stepsContainer.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                stepsContainer.style.opacity = '1';
                stepsContainer.style.transform = 'translateY(0)';
                stepsContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            }, 50);
        });
    });
}

// Enhanced FAQ Accordion functionality
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqId = this.getAttribute('data-faq');
            const answer = document.getElementById(faqId);
            const icon = this.querySelector('.faq-icon');
            
            // Check if already open
            const isOpen = answer.classList.contains('open');
            
            // Close all other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherId = otherQuestion.getAttribute('data-faq');
                    const otherAnswer = document.getElementById(otherId);
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    
                    otherAnswer.classList.remove('open');
                    otherIcon.classList.remove('rotate');
                    otherIcon.textContent = '+';
                    otherAnswer.style.display = 'none'; // Ensure display is set to none
                }
            });
            
            // Toggle current FAQ
            if (isOpen) {
                answer.classList.remove('open');
                icon.classList.remove('rotate');
                icon.textContent = '+';
                setTimeout(() => {
                    answer.style.display = 'none'; // Hide after animation completes
                }, 300);
            } else {
                answer.style.display = 'block'; // Show before adding open class
                setTimeout(() => {
                    answer.classList.add('open');
                    icon.classList.add('rotate');
                    icon.textContent = '×';
                    
                    // Smooth scroll to FAQ item
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 10);
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add loading effect
                this.classList.add('loading');
                
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    this.classList.remove('loading');
                    
                    // Highlight target section briefly
                    targetElement.style.transform = 'scale(1.01)';
                    targetElement.style.transition = 'transform 0.3s ease';
                    
                    setTimeout(() => {
                        targetElement.style.transform = 'scale(1)';
                    }, 300);
                }, 200);
            }
        });
    });
}

// Progress indicators for multi-step processes
function initProgressIndicators() {
    const stepContainers = document.querySelectorAll('.steps-container');
    
    stepContainers.forEach(container => {
        const steps = container.querySelectorAll('li');
        
        steps.forEach((step, index) => {
            step.style.cursor = 'pointer';
            step.setAttribute('data-step', index + 1);
            
            // Add click handler for step completion
            step.addEventListener('click', function() {
                this.classList.toggle('completed');
                
                if (this.classList.contains('completed')) {
                    this.style.textDecoration = 'line-through';
                    this.style.opacity = '0.7';
                    this.innerHTML = '✅ ' + this.innerHTML;
                } else {
                    this.style.textDecoration = 'none';
                    this.style.opacity = '1';
                    this.innerHTML = this.innerHTML.replace('✅ ', '');
                }
                
                // Check if all steps are completed
                const allSteps = container.querySelectorAll('li');
                const completedSteps = container.querySelectorAll('li.completed');
                
                if (allSteps.length === completedSteps.length) {
                    showNotification('All steps completed! 🎉', 'success');
                }
            });
        });
    });
}

// Theme switcher functionality
function initThemeSwitcher() {
    // Create theme switcher
    const themeSwitch = document.createElement('button');
    themeSwitch.className = 'theme-switch';
    themeSwitch.setAttribute('aria-label', 'Toggle dark/light mode');
    themeSwitch.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    document.body.appendChild(themeSwitch);
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeSwitch.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    } else if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeSwitch.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    } else {
        // Default based on system preference
        if (prefersDarkScheme.matches) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    }
    
    // Toggle theme on click
    themeSwitch.addEventListener('click', function() {
        let theme;
        if (document.body.getAttribute('data-theme') === 'light') {
            document.body.removeAttribute('data-theme');
            document.body.setAttribute('data-theme', 'dark'); 
            theme = 'dark';
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        } else {
            document.body.removeAttribute('data-theme');
            document.body.setAttribute('data-theme', 'light');
            theme = 'light';
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        }
        localStorage.setItem('theme', theme);
        
        // Show theme change notification
        showNotification(`Switched to ${theme} mode`, 'info');
    });
}

// Enhanced animations
function initEnhancedAnimations() {
    // Add animation to method cards
    const cards = document.querySelectorAll('.method-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 150));
    });
    
    // Animate headers on scroll
    const headers = document.querySelectorAll('.section__header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    headers.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(header);
    });
}

// Improved notification system
function initImprovedNotifications() {
    // Create a global notification function
    window.showNotification = function(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 400);
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 400);
        }, 4000);
        
        // Click to dismiss
        notification.addEventListener('click', function() {
            this.classList.remove('show');
            setTimeout(() => {
                this.remove();
            }, 400);
        });
    };
}

// Accessibility improvements
function initAccessibilityImprovements() {
    // Add aria labels to interactive elements
    const interactiveElements = document.querySelectorAll('button, a');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.innerText.trim()) {
            const closest = element.querySelector('*:not(svg)') || element;
            if (closest.innerText) {
                element.setAttribute('aria-label', closest.innerText);
            }
        }
    });
    
    // Add focus indicators
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        :focus-visible {
            outline: 3px solid rgba(229, 9, 20, 0.6) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Improve form labels
    const inputs = document.querySelectorAll('input:not([aria-label])');
    inputs.forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (placeholder) {
            input.setAttribute('aria-label', placeholder);
        }
    });
}

// Initialize additional features
setTimeout(() => {
    initTooltips();
    
    // Add copy functionality to verification codes in tutorials
    addCopyButtons();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
}, 1000);

function addCopyButtons() {
    const codeElements = document.querySelectorAll('code, .verification-code');
    
    codeElements.forEach(element => {
        if (element.textContent.match(/\d{6}/)) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'btn btn--sm btn--outline copy-btn';
            copyBtn.textContent = '📋 Copy';
            copyBtn.style.marginLeft = '8px';
            
            copyBtn.addEventListener('click', function() {
                navigator.clipboard.writeText(element.textContent).then(() => {
                    this.textContent = '✅ Copied!';
                    setTimeout(() => {
                        this.textContent = '📋 Copy';
                    }, 2000);
                });
            });
            
            element.parentNode.appendChild(copyBtn);
        }
    });
}

function initKeyboardNavigation() {
    // Tab navigation for better accessibility
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach((element, index) => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                // Custom tab behavior can be added here if needed
            }
        });
    });
}

// Performance optimization: Lazy load non-critical features
window.addEventListener('load', function() {
    // Initialize search functionality
    initSearch();
    
    // Add scroll-to-top button - ensure it runs on load
    addScrollToTop();
});

// Initialize tooltips functionality
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        if (tooltipText) {
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            // Handle mouse events
            element.addEventListener('mouseenter', () => {
                document.body.appendChild(tooltip);
                const rect = element.getBoundingClientRect();
                tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
                tooltip.style.opacity = '1';
            });
            
            element.addEventListener('mouseleave', () => {
                if (tooltip.parentNode) {
                    tooltip.style.opacity = '0';
                    setTimeout(() => {
                        if (tooltip.parentNode) {
                            document.body.removeChild(tooltip);
                        }
                    }, 300);
                }
            });
        }
    });
}

function addScrollToTop() {
    // Get existing button or create a new one if it doesn't exist
    let scrollBtn = document.getElementById('back-to-top');
    
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'back-to-top';
        scrollBtn.className = 'scroll-to-top btn btn--primary';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.innerHTML = '↑';
        document.body.appendChild(scrollBtn);
    }
    
    // Set initial state
    scrollBtn.style.display = 'none';
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Force check initial scroll position
    if (window.pageYOffset > 300) {
        scrollBtn.style.display = 'flex';
    }
}

// Add this new enhanced function to ensure tutorial links work properly
function initTutorialLinks() {
    // Select all tutorial links
    const tutorialLinks = document.querySelectorAll('.tutorial-link, .tutorial-link--large');
    
    tutorialLinks.forEach(link => {
        // Add YouTube specific class to YouTube links
        if (link.getAttribute('href').includes('youtu')) {
            link.classList.add('youtube-tutorial-link');
        }
        
        // Replace existing click handler with a more robust one
        link.addEventListener('click', function(e) {
            // Stop the event from bubbling up
            e.preventDefault();
            e.stopPropagation();
            
            // Get the URL
            const url = this.getAttribute('href');
            console.log('Opening tutorial:', url);
            
            // Prevent any default behavior and open in a new window
            try {
                const newWindow = window.open();
                newWindow.opener = null; // Security best practice
                newWindow.location.href = url;
                
                // Show success notification
                showNotification('YouTube tutorial opening in a new tab', 'success');
            } catch (error) {
                console.error("Error opening tutorial:", error);
                
                // Fallback method
                window.open(url, '_blank', 'noopener,noreferrer');
                showNotification('Opening tutorial video', 'info');
            }
        });
        
        // Make the link more interactive
        link.setAttribute('title', 'Click to open YouTube tutorial');
        
        // Ensure the play icon is present
        if (!link.querySelector('.play-icon')) {
            const text = link.innerHTML;
            link.innerHTML = text.replace('🎓', '<span class="play-icon">🎓</span>');
        }
    });
}

// Initialize immediately at script load
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // Special handler for TV section tutorial links
    setTimeout(() => {
        const tvTutorialLinks = document.querySelectorAll('#tv-users .tutorial-link');
        tvTutorialLinks.forEach(link => {
            // Make TV section links more prominent
            link.style.fontWeight = 'bold';
            link.style.border = '2px solid white';
            
            // Add a duplicate click handler directly on the element for redundancy
            link.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const url = this.getAttribute('href');
                console.log('Direct click on TV tutorial:', url);
                window.open(url, '_blank');
                
                // Show a clear notification
                showNotification('Opening Netflix verification tutorial on YouTube', 'success');
                return false;
            };
        });
    }, 500);
});

// ...existing code...

// Add the missing search functionality
function initSearch() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'form-control search-input';
    searchInput.placeholder = 'Search for verification tips...';
    searchInput.setAttribute('aria-label', 'Search verification methods');
    
    // Add search icon
    const searchIcon = document.createElement('span');
    searchIcon.className = 'search-icon';
    searchIcon.innerHTML = '🔍';
    
    // Build search component
    searchContainer.appendChild(searchIcon);
    searchContainer.appendChild(searchInput);
    
    // Insert after header
    const header = document.querySelector('.header');
    if (header && header.nextSibling) {
        header.parentNode.insertBefore(searchContainer, header.nextSibling);
    }
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            resetSearchResults();
            return;
        }
        
        // Search in method titles and descriptions
        const methodCards = document.querySelectorAll('.method-card');
        let hasResults = false;
        
        methodCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const steps = Array.from(card.querySelectorAll('.steps-list li'))
                .map(li => li.textContent.toLowerCase())
                .join(' ');
            
            const content = title + ' ' + description + ' ' + steps;
            
            if (content.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('search-highlight');
                hasResults = true;
            } else {
                card.style.display = 'none';
                card.classList.remove('search-highlight');
            }
        });
        
        // Search in FAQs
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.add('search-highlight');
                hasResults = true;
            } else {
                item.style.display = 'none';
                item.classList.remove('search-highlight');
            }
        });
        
        // Show message if no results
        showSearchResults(hasResults);
    });
    
    // Add clear button and reset functionality
    const clearBtn = document.createElement('button');
    clearBtn.className = 'search-clear';
    clearBtn.innerHTML = '×';
    clearBtn.setAttribute('aria-label', 'Clear search');
    clearBtn.style.display = 'none';
    searchContainer.appendChild(clearBtn);
    
    searchInput.addEventListener('input', function() {
        clearBtn.style.display = this.value ? 'block' : 'none';
    });
    
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        resetSearchResults();
        this.style.display = 'none';
        searchInput.focus();
    });
    
    function resetSearchResults() {
        // Show all method cards
        const methodCards = document.querySelectorAll('.method-card');
        methodCards.forEach(card => {
            card.style.display = 'block';
            card.classList.remove('search-highlight');
        });
        
        // Show all FAQ items
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('search-highlight');
        });
        
        // Hide no results message
        const noResults = document.querySelector('.no-results');
        if (noResults) noResults.remove();
    }
    
    function showSearchResults(hasResults) {
        // Remove existing no results message
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) existingNoResults.remove();
        
        // Show no results message if needed
        if (!hasResults) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No verification methods found. Try different keywords.';
            
            // Add a button to reset search
            const resetBtn = document.createElement('button');
            resetBtn.className = 'btn btn--secondary btn--sm';
            resetBtn.textContent = 'Reset Search';
            resetBtn.addEventListener('click', function() {
                searchInput.value = '';
                resetSearchResults();
                clearBtn.style.display = 'none';
            });
            
            noResults.appendChild(document.createElement('br'));
            noResults.appendChild(resetBtn);
            
            // Add to the container
            const container = document.querySelector('.verification-methods') || document.querySelector('.section');
            container.appendChild(noResults);
        }
    }
}