// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Download Modal
const downloadModal = document.getElementById('downloadModal');
const downloadBtns = document.querySelectorAll('#download-main');
const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-close-btn');
const directDownloadBtn = document.getElementById('directDownload');
const progressFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');
const progressPercent = document.querySelector('.progress-percent');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');

// Feature card mouse effects
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = card.querySelector('.feature-glow');
        if (glow) {
            glow.style.setProperty('--mouse-x', `${x}px`);
            glow.style.setProperty('--mouse-y', `${y}px`);
        }
    });
});

// Animate stats counter
const stats = document.querySelectorAll('.stat-content h3');
const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.textContent.replace(/[0-9]/g, '').replace('.', '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                
                if (suffix.includes('s')) {
                    stat.textContent = `<${current.toFixed(1)}${suffix}`;
                } else if (suffix.includes('%')) {
                    stat.textContent = `${current.toFixed(1)}${suffix}`;
                } else {
                    stat.textContent = `${Math.floor(current)}${suffix}`;
                }
                
                setTimeout(updateCounter, 30);
            }
        };
        
        updateCounter();
    });
};

// Check when stats are in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Highlight active nav link
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Download functionality
let downloadInProgress = false;

function openDownloadModal() {
    downloadModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    downloadInProgress = true;
    
    // Reset modal content
    modalTitle.textContent = 'Download Starting...';
    modalMessage.textContent = 'Your download should begin automatically. If it doesn\'t, click the button below.';
    progressFill.style.width = '0%';
    progressText.textContent = 'Establishing Connection...';
    progressPercent.textContent = '0%';
    
    // Simulate download progress
    simulateDownload();
}

function closeDownloadModal() {
    downloadModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    downloadInProgress = false;
}

function simulateDownload() {
    let progress = 0;
    const interval = setInterval(() => {
        if (!downloadInProgress) {
            clearInterval(interval);
            return;
        }
        
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressPercent.textContent = `${Math.floor(progress)}%`;
        
        if (progress < 30) {
            progressText.textContent = 'Connecting to server...';
        } else if (progress < 70) {
            progressText.textContent = 'Downloading file...';
        } else if (progress < 95) {
            progressText.textContent = 'Verifying file integrity...';
        } else {
            progressText.textContent = 'Download complete!';
            modalTitle.textContent = 'Download Ready!';
            modalMessage.textContent = 'Your download is complete. Remember to add the file to your antivirus exclusions before running it.';
            
            // Auto-close after 3 seconds
            setTimeout(() => {
                if (downloadInProgress) {
                    closeDownloadModal();
                }
            }, 3000);
            
            clearInterval(interval);
        }
    }, 200);
}

function startDownload() {
    // In a real implementation, this would trigger an actual file download
    // For demo purposes, we'll create a fake download
    
    openDownloadModal();
    
    // Simulate a delay before "starting" the download
    setTimeout(() => {
        if (!downloadInProgress) return;
        
        // Create a fake download link (in reality, this would be your actual file)
        const fakeDownload = document.createElement('a');
        fakeDownload.href = '#';
        fakeDownload.download = 'Xeno_Executor_v3.2.1.zip';
        
        // Create a fake blob (in reality, this would be your actual file data)
        const blob = new Blob(['This is a demo file. In the real website, this would be the actual Xeno Executor download.'], 
            { type: 'application/zip' });
        const url = URL.createObjectURL(blob);
        fakeDownload.href = url;
        
        // Trigger download
        document.body.appendChild(fakeDownload);
        fakeDownload.click();
        document.body.removeChild(fakeDownload);
        
        // Clean up
        URL.revokeObjectURL(url);
    }, 1500);
}

// Event listeners for download buttons
downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        startDownload();
    });
});

// Event listeners for modal close buttons
modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeDownloadModal);
});

// Direct download button
if (directDownloadBtn) {
    directDownloadBtn.addEventListener('click', () => {
        startDownload();
    });
}

// Close modal when clicking outside
downloadModal.addEventListener('click', (e) => {
    if (e.target === downloadModal || e.target.classList.contains('modal-overlay')) {
        closeDownloadModal();
    }
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && downloadModal.classList.contains('active')) {
        closeDownloadModal();
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for all download buttons
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            startDownload();
        });
    });
    
    // Initialize with home link active
    window.dispatchEvent(new Event('scroll'));
});
