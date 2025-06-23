document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Project details toggle
    document.querySelectorAll('.project-details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.innerHTML = 'Hide Details ←';
            } else {
                this.innerHTML = 'How It Works →';
            }
        });
    });
    
    // Skills filter
    const categoryButtons = document.querySelectorAll('.category-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter skills
            skillItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Animate skill bars when scrolled into view
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                bar.classList.add('animate');
            }
        });
    }
    
    // Initial check in case some skills are already in view
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Telegram bot button
    const telegramBtn = document.getElementById('telegram-btn');
    
    if (telegramBtn) {
        telegramBtn.addEventListener('click', function() {
            window.open('https://t.me/dev_m_sohaib', '_blank');
        });
    }
    
    // Initialize skills radar chart
    const radarCtx = document.getElementById('skillsRadarChart');
    
    if (radarCtx) {
        const skillsRadarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['AI/ML', 'Web Dev', 'Mobile', 'Backend', 'Databases', 'Tools'],
                datasets: [{
                    label: 'Skill Level',
                    data: [85, 90, 75, 80, 80, 75],
                    backgroundColor: 'rgba(100, 255, 218, 0.2)',
                    borderColor: 'rgba(100, 255, 218, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(100, 255, 218, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(100, 255, 218, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(136, 146, 176, 0.2)'
                        },
                        grid: {
                            color: 'rgba(136, 146, 176, 0.2)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        pointLabels: {
                            color: '#e6f1ff',
                            font: {
                                family: "'Roboto Mono', monospace"
                            }
                        },
                        ticks: {
                            display: false,
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });
    }
    
    // Add animations to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.animation = element.classList.contains('fade-in') ? 
                    'fadeIn 1s forwards' : 'slideUp 1s forwards';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// AI Assistant Functionality
class AIAssistant {
    constructor() {
      this.avatar = document.getElementById('aiAvatar');
      this.chat = document.querySelector('.ai-chat');
      this.input = document.querySelector('.ai-input');
      this.responses = {
        "skills": "Muhammad specializes in AI/ML with TensorFlow/PyTorch, web development with PHP/Laravel, and mobile apps with Flutter.",
        "experience": "He has worked at Soft Height Multan as Web/App Developer and at BZU's Quality Enhancement Cell as Software Developer.",
        "projects": "His flagship project is a Deep Fake Detection System using TensorFlow that analyzes audio, video and images for authenticity.",
        "education": "He holds a BSc in Computer Science from Bahauddin Zakariya University (2021-2025).",
        "contact": "You can reach Muhammad at dev.m.sohaib@gmail.com or +92-333-6112030."
      };
      
      this.init();
    }
  
    init() {
      // Load 3D avatar using Three.js
      this.loadAvatar();
      
      // Setup event listeners
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.processQuery(this.input.value);
          this.input.value = '';
        }
      });
    }
  
    loadAvatar() {
      // Three.js implementation would go here
      // For now we'll use a placeholder
      this.avatar.innerHTML = '<img src="../images/ai-avater.png" alt="AI Assistant">';
      this.avatar.style.cursor = 'pointer';
      this.avatar.addEventListener('click', () => this.toggleChat());
    }
  
    toggleChat() {
      this.chat.classList.toggle('active');
    }
  
    processQuery(query) {
      query = query.toLowerCase();
      let response = "I can tell you about Muhammad's skills, experience, projects, education, or contact info.";
      
      Object.keys(this.responses).forEach(key => {
        if (query.includes(key)) {
          response = this.responses[key];
        }
      });
  
      this.displayResponse(response);
    }
  
    displayResponse(text) {
      const message = document.createElement('div');
      message.className = 'ai-message';
      message.textContent = text;
      this.chat.insertBefore(message, this.input);
      
      // Simple animation
      message.style.opacity = '0';
      setTimeout(() => {
        message.style.opacity = '1';
      }, 100);
    }
  }
  
  // Initialize when DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    new AIAssistant();
  }); 
 
   class AchievementSystem {
    constructor() {
      this.achievements = [
        {
          id: 'fyp-win',
          title: 'Code and Clash Champion',
          description: 'Secured first position in university FYP exhibition event "Code and Clash"',
          icon: 'trophy',
          unlockCondition: (scrollPos) => scrollPos > document.getElementById('about').offsetTop
        },
        {
          id: 'workshop',
          title: 'Workshop Organizer',
          description: 'Received Shield for organizing a workshop in Website Development.',
          icon: 'shield-alt',
          unlockCondition: (scrollPos) => scrollPos > document.getElementById('experience').offsetTop
        },
        {
          id: 'society-head',
          title: 'Web Society Head',
          description: 'Received Shield from department for serving as a web society head.',
          icon: 'users-cog',
          unlockCondition: (scrollPos) => scrollPos > document.getElementById('experience').offsetTop + 200
        },
        {
          id: 'qec-letter',
          title: 'Appreciation from QEC',
          description: 'Received an appreciation letter from Quality Enhancement Cell BZU.',
          icon: 'envelope-open-text',
          unlockCondition: (scrollPos) => scrollPos > document.getElementById('experience').offsetTop + 400
        },
        {
          id: 'employee-month',
          title: 'Employee of the Month',
          description: 'Best Employee of the Month, Soft Height (Jan 2025).',
          icon: 'award',
          unlockCondition: (scrollPos) => scrollPos > document.getElementById('experience').offsetTop + 600
        }
      ];

      this.unlocked = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];
      this.init();
    }

    init() {
      this.achievements.forEach(ach => {
        const element = document.querySelector(`.achievement[data-id="${ach.id}"]`);
        if (element) {
          element.querySelector('.achievement-icon').innerHTML = `<i class="fas fa-${ach.icon}"></i>`;
          element.querySelector('h4').textContent = ach.title;
          element.querySelector('p').textContent = ach.description;

          if (this.unlocked.includes(ach.id)) {
            element.classList.add('unlocked');
          }
        }
      });

      window.addEventListener('scroll', () => this.checkAchievements());
      this.checkAchievements();
    }

    checkAchievements() {
      const scrollPos = window.scrollY + (window.innerHeight / 2);

      this.achievements.forEach(ach => {
        if (!this.unlocked.includes(ach.id) && ach.unlockCondition(scrollPos)) {
          const element = document.querySelector(`.achievement[data-id="${ach.id}"]`);
          if (element) {
            element.classList.add('unlocked');
            element.classList.add('celebrate');
            setTimeout(() => {
              element.classList.remove('celebrate');
            }, 1000);

            this.unlocked.push(ach.id);
            localStorage.setItem('unlockedAchievements', JSON.stringify(this.unlocked));
            this.showAchievementNotification(ach);
          }
        }
      });
    }

    showAchievementNotification(achievement) {
      const notification = document.createElement('div');
      notification.className = 'achievement-notification';
      notification.innerHTML = `
        <div class="notification-icon"><i class="fas fa-${achievement.icon}"></i></div>
        <div class="notification-content">
          <h4>Achievement Unlocked!</h4>
          <p>${achievement.title}</p>
        </div>
      `;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add('show');
      }, 100);

      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, 3000);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new AchievementSystem();
  }); 
