document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', function () {
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
    anchor.addEventListener('click', function (e) {
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
  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Project details toggle
  document.querySelectorAll('.project-details-btn').forEach(button => {
    button.addEventListener('click', function () {
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
    button.addEventListener('click', function () {
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
    contactForm.addEventListener('submit', function (e) {
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
    telegramBtn.addEventListener('click', function () {
      window.open('https://t.me/dev_m_sohaib', '_blank');
    });
  }

  // Initialize skills radar chart
  const radarCtx = document.getElementById('skillsRadarChart');

  if (radarCtx) {
    const skillsRadarChart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Wordpress', 'AI/ML', 'Web Dev', 'Mobile', 'Backend', 'Databases', 'Tools'],
        datasets: [{
          label: 'Skill Level',
          data: [90, 85, 90, 75, 80, 80, 75],
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
  const animateOnScroll = function () {
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

// AI Assistant Functionality - Enhanced Version
class AIAssistant {
  constructor() {
    this.avatar = document.getElementById('aiAvatar');
    this.chat = document.querySelector('.ai-chat');
    this.input = document.querySelector('.ai-input');
    this.messagesContainer = document.querySelector('.ai-messages');
    this.thinking = false;
    this.context = [];
    this.typingSpeed = 30;
    
    // Comprehensive knowledge base
    this.knowledgeBase = {
      personal: {
        name: "Muhammad Sohaib",
        title: "Full Stack Developer & AI/ML Specialist",
        location: "Multan, Pakistan",
        email: "dev.m.sohaib@gmail.com",
        phone: "+92-333-6112030",
        languages: ["English", "Urdu", "Punjabi"],
        availability: "Open for freelance and full-time opportunities"
      },
      
      skills: {
        web: ["PHP", "Laravel", "JavaScript", "HTML5", "CSS3", "React", "Node.js", "REST APIs"],
        ai: ["TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision", "NLP", "Deep Learning"],
        mobile: ["Flutter", "Dart", "Android", "iOS"],
        backend: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Redis"],
        tools: ["Git", "Docker", "AWS", "VS Code", "Postman", "Jira"],
        cms: ["WordPress", "WooCommerce", "Custom Themes", "Plugin Development"],
        soft: ["Team Leadership", "Project Management", "Client Communication", "Problem Solving"]
      },
      
      experience: [
        {
          company: "Soft Height Multan",
          position: "Web/App Developer",
          period: "2024 - Present",
          achievements: [
            "Developed 10+ responsive web applications",
            "Led mobile app development team",
            "Employee of the Month (Jan 2025)",
            "Reduced load time by 40% through optimization"
          ]
        },
        {
          company: "Quality Enhancement Cell, BZU",
          position: "Software Developer",
          period: "2023 - 2024",
          achievements: [
            "Built automated evaluation system",
            "Received appreciation letter",
            "Managed database for 5000+ students"
          ]
        }
      ],
      
      education: {
        degree: "BSc Computer Science",
        university: "Bahauddin Zakariya University",
        year: "2021-2025",
        cgpa: "3.8/4.0",
        achievements: [
          "Code and Clash Champion 2024",
          "Web Society Head 2023-2024",
          "Workshop Organizer Award"
        ]
      },
      
      projects: [
        {
          name: "Deep Fake Detection System",
          type: "AI/ML",
          tech: ["TensorFlow", "OpenCV", "Python"],
          description: "Detects manipulated media with 94% accuracy",
          features: ["Video analysis", "Audio forensics", "Image authentication"]
        },
        {
          name: "E-Commerce Platform",
          type: "Web",
          tech: ["Laravel", "MySQL", "Tailwind"],
          description: "Full-featured online store with payment integration"
        },
        {
          name: "TaskFlow",
          type: "Mobile",
          tech: ["Flutter", "Firebase"],
          description: "Productivity app with real-time sync"
        },
        {
          name: "Portfolio AI Assistant",
          type: "AI",
          tech: ["JavaScript", "NLP"],
          description: "You're talking to it right now!"
        }
      ],
      
      achievements: [
        {
          title: "Code and Clash Champion",
          description: "First position in FYP exhibition",
          icon: "trophy",
          date: "2024"
        },
        {
          title: "Workshop Organizer",
          description: "Received Shield for Website Development workshop",
          icon: "shield-alt",
          date: "2024"
        },
        {
          title: "Web Society Head",
          description: "Led 50+ students, organized 8 events",
          icon: "users-cog",
          date: "2023-2024"
        },
        {
          title: "QEC Appreciation",
          description: "Letter of appreciation from QEC BZU",
          icon: "envelope-open-text",
          date: "2024"
        }
      ],
      
      recommendations: {
        frontend: ["React", "Vue.js", "Tailwind CSS"],
        backend: ["Laravel", "Node.js", "Python/Django"],
        learning: ["TensorFlow", "Flutter", "AWS Certification"],
        best_practices: ["Clean code", "Agile methodology", "CI/CD pipelines"]
      }
    };
    
    this.init();
  }

  init() {
    this.loadAvatar();
    this.setupEventListeners();
    this.addWelcomeMessage();
    this.setupSpeechRecognition();
  }

  loadAvatar() {
    // Animated 3D-like avatar with pulse effect
    this.avatar.innerHTML = `
      <div class="ai-avatar-container">
        <div class="avatar-pulse"></div>
        <svg class="avatar-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="rgba(100, 255, 218, 0.1)" stroke="var(--secondary-color)" stroke-width="2"/>
          <circle cx="50" cy="50" r="35" fill="rgba(100, 255, 218, 0.2)"/>
          <text x="50" y="62" text-anchor="middle" fill="var(--secondary-color)" font-size="40">🧑‍</text>
        </svg>
      </div>
    `;
    this.avatar.style.cursor = 'pointer';
    this.avatar.addEventListener('click', () => this.toggleChat());
  }

  setupEventListeners() {
    // Input handling
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const query = this.input.value.trim();
        if (query) {
          this.processQuery(query);
          this.input.value = '';
        }
      }
    });
    
    // Auto-resize input
    this.input.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.ai-assistant') && this.chat.classList.contains('active')) {
        this.chat.classList.remove('active');
      }
    });
  }

  addWelcomeMessage() {
    const welcome = {
      text: "✨ Hello! I'm your AI assistant. I know everything about Muhammad's skills, projects, experience, and achievements. What would you like to know?",
      delay: 500
    };
    
    setTimeout(() => {
      this.displayBotMessage(welcome.text);
      
      // Quick action buttons
      setTimeout(() => {
        this.addQuickActions();
      }, 1000);
    }, welcome.delay);
  }

  addQuickActions() {
    const actions = document.createElement('div');
    actions.className = 'ai-quick-actions';
    actions.innerHTML = `
      <button class="quick-action" data-query="skills">🚀 Skills</button>
      <button class="quick-action" data-query="projects">💻 Projects</button>
      <button class="quick-action" data-query="experience">💼 Experience</button>
      <button class="quick-action" data-query="contact">📧 Contact</button>
    `;
    
    this.messagesContainer.appendChild(actions);
    
    actions.querySelectorAll('.quick-action').forEach(btn => {
      btn.addEventListener('click', () => {
        this.processQuery(btn.dataset.query);
      });
    });
    
    this.scrollToBottom();
  }

  processQuery(query) {
    // Add user message
    this.displayUserMessage(query);
    
    // Show typing indicator
    this.showTypingIndicator();
    
    // Process after short delay
    setTimeout(() => {
      this.removeTypingIndicator();
      const response = this.generateResponse(query);
      this.displayBotMessage(response);
      this.context.push({ query, response });
    }, 600 + Math.random() * 400);
  }

  generateResponse(query) {
    query = query.toLowerCase().trim();
    
    // Greetings
    if (this.matchesAny(query, ['hi', 'hello', 'hey', 'greetings', 'hola', 'salam'])) {
      return this.getGreeting();
    }
    
    // Skills related
    if (this.matchesAny(query, ['skill', 'know', 'technologies', 'stack', 'tech', 'proficient', 'expertise'])) {
      return this.getSkillsResponse(query);
    }
    
    // Experience related
    if (this.matchesAny(query, ['experience', 'work', 'job', 'career', 'company', 'employer', 'worked'])) {
      return this.getExperienceResponse(query);
    }
    
    // Projects related
    if (this.matchesAny(query, ['project', 'build', 'created', 'developed', 'portfolio', 'work sample'])) {
      return this.getProjectsResponse(query);
    }
    
    // Education
    if (this.matchesAny(query, ['education', 'study', 'university', 'degree', 'college', 'academic', 'learn'])) {
      return this.getEducationResponse();
    }
    
    // Achievements
    if (this.matchesAny(query, ['achievement', 'award', 'honor', 'win', 'prize', 'certificate', 'recognition'])) {
      return this.getAchievementsResponse();
    }
    
    // Contact
    if (this.matchesAny(query, ['contact', 'email', 'phone', 'call', 'reach', 'message', 'hire', 'freelance'])) {
      return this.getContactResponse();
    }
    
    // Specific project: Deep Fake Detection
    if (this.matchesAny(query, ['deep fake', 'deepfake', 'fake detection', 'ai detection', 'fyp'])) {
      return this.getDeepFakeDetails();
    }
    
    // Web development
    if (this.matchesAny(query, ['web', 'website', 'frontend', 'backend', 'full stack'])) {
      return this.getWebDevResponse(query);
    }
    
    // AI/ML
    if (this.matchesAny(query, ['ai', 'ml', 'machine learning', 'artificial intelligence', 'neural', 'tensorflow'])) {
      return this.getAIResponse();
    }
    
    // Mobile development
    if (this.matchesAny(query, ['mobile', 'app', 'android', 'ios', 'flutter'])) {
      return this.getMobileResponse();
    }
    
    // Availability
    if (this.matchesAny(query, ['available', 'free', 'hire', 'rate', 'cost', 'price'])) {
      return this.getAvailabilityResponse();
    }
    
    // Recommendations
    if (this.matchesAny(query, ['recommend', 'suggest', 'advice', 'learn', 'best tool', 'should use'])) {
      return this.getRecommendationResponse(query);
    }
    
    // Help
    if (this.matchesAny(query, ['help', 'what can you do', 'support', 'guide', 'assist'])) {
      return this.getHelpResponse();
    }
    
    // Thanks
    if (this.matchesAny(query, ['thanks', 'thank you', 'appreciate', 'grateful'])) {
      return "You're welcome! 😊 Is there anything else you'd like to know about Muhammad's work?";
    }
    
    // Goodbye
    if (this.matchesAny(query, ['bye', 'goodbye', 'see you', 'farewell', 'later'])) {
      return this.getGoodbyeResponse();
    }
    
    // Default response with suggestions
    return this.getDefaultResponse(query);
  }

  matchesAny(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
  }

  getGreeting() {
    const hour = new Date().getHours();
    let timeGreeting = '';
    
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 18) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';
    
    const greetings = [
      `${timeGreeting}! 👋 I'm Muhammad's AI assistant. How can I help you today?`,
      `Hello there! 🌟 Ready to share Muhammad's impressive work. What interests you?`,
      `Hi! 👨‍💻 Ask me about Muhammad's skills, projects, or experience.`,
      `Hey! 👋 Muhammad has some amazing projects I'd love to tell you about!`
    ];
    
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  getSkillsResponse(query) {
    const skills = this.knowledgeBase.skills;
    
    if (query.includes('web')) {
      return `🎨 **Web Development**\n\n` +
             `Frontend: ${skills.web.slice(0, 4).join(', ')}\n` +
             `Backend: ${skills.web.slice(4).join(', ')}\n` +
             `CMS: ${skills.cms.join(', ')}`;
    }
    
    if (query.includes('ai') || query.includes('ml')) {
      return `🤖 **AI/ML Expertise**\n\n` +
             `Frameworks: ${skills.ai.join(', ')}\n` +
             `Specialization: Computer Vision, NLP, Deep Learning\n` +
             `Notable: Built Deep Fake Detection with 94% accuracy!`;
    }
    
    if (query.includes('mobile')) {
      return `📱 **Mobile Development**\n\n` +
             `Framework: ${skills.mobile[0]}\n` +
             `Languages: ${skills.mobile.slice(1).join(', ')}\n` +
             `Built 3+ cross-platform apps`;
    }
    
    // Full skills response
    return `⚡ **Muhammad's Technical Arsenal**\n\n` +
           `🎯 AI/ML: ${skills.ai.join(', ')}\n` +
           `💻 Web Dev: ${skills.web.join(', ')}\n` +
           `📱 Mobile: ${skills.mobile.join(', ')}\n` +
           `🔧 Backend: ${skills.backend.join(', ')}\n` +
           `🛠️ Tools: ${skills.tools.join(', ')}\n\n` +
           `Want specific details about any area? Just ask! 🚀`;
  }

  getExperienceResponse(query) {
    const exp = this.knowledgeBase.experience;
    
    if (query.includes('soft height')) {
      return `🏢 **${exp[0].company}**\n` +
             `Position: ${exp[0].position}\n` +
             `Period: ${exp[0].period}\n\n` +
             `✨ **Achievements:**\n` +
             `• ${exp[0].achievements[0]}\n` +
             `• ${exp[0].achievements[1]}\n` +
             `• ${exp[0].achievements[2]}\n` +
             `• ${exp[0].achievements[3]}`;
    }
    
    if (query.includes('qec') || query.includes('quality')) {
      return `🏛️ **${exp[1].company}**\n` +
             `Position: ${exp[1].position}\n` +
             `Period: ${exp[1].period}\n\n` +
             `📋 **Key Contributions:**\n` +
             `• ${exp[1].achievements[0]}\n` +
             `• ${exp[1].achievements[1]}\n` +
             `• ${exp[1].achievements[2]}`;
    }
    
    return `💼 **Professional Journey**\n\n` +
           `**${exp[0].position}** at ${exp[0].company}\n` +
           `→ Leading app development, mentored 5 juniors\n` +
           `→ Recognized as Employee of the Month\n\n` +
           `**${exp[1].position}** at ${exp[1].company}\n` +
           `→ Built evaluation system, received appreciation letter\n\n` +
           `Total experience: 2+ years in software development 🚀`;
  }

  getProjectsResponse(query) {
    const projects = this.knowledgeBase.projects;
    
    if (query.includes('deep') || query.includes('fake')) {
      return this.getDeepFakeDetails();
    }
    
    if (query.includes('ecommerce') || query.includes('e-commerce') || query.includes('shop')) {
      const ecom = projects[1];
      return `🛍️ **${ecom.name}**\n` +
             `Tech: ${ecom.tech.join(', ')}\n` +
             `${ecom.description}\n\n` +
             `Features: Product management, cart, payments, admin panel`;
    }
    
    if (query.includes('taskflow') || query.includes('task')) {
      const taskflow = projects[2];
      return `📱 **${taskflow.name}**\n` +
             `Tech: ${taskflow.tech.join(', ')}\n` +
             `${taskflow.description}\n\n` +
             `Features: Real-time sync, push notifications, dark mode`;
    }
    
    // All projects
    return `🚀 **Flagship Projects**\n\n` +
           projects.map(p => 
             `**${p.name}**\n` +
             `→ ${p.type} | ${p.tech.slice(0, 3).join(', ')}\n` +
             `→ ${p.description}\n`
           ).join('\n') +
           `\nWant detailed info about any specific project? 🔍`;
  }

  getDeepFakeDetails() {
    return `🔬 **Deep Fake Detection System**\n\n` +
           `🎯 **Purpose:** Combat misinformation through AI\n` +
           `📊 **Accuracy:** 94% detection rate\n\n` +
           `⚙️ **How it works:**\n` +
           `1. Analyzes video frame-by-frame for artifacts\n` +
           `2. Examines audio for synthetic patterns\n` +
           `3. Verifies image metadata and pixels\n\n` +
           `🛠️ **Tech Stack:**\n` +
           `TensorFlow, OpenCV, Python, Flask, CNN architecture\n\n` +
           `🏆 Won first position at Code and Clash 2024!`;
  }

  getWebDevResponse(query) {
    if (query.includes('frontend')) {
      return `🎨 **Frontend Expertise**\n\n` +
             `Frameworks: React, Vue.js basics\n` +
             `Styling: Tailwind CSS, Bootstrap, SASS\n` +
             `Responsive designs, cross-browser compatibility\n\n` +
             `Built 10+ production websites!`;
    }
    
    if (query.includes('backend')) {
      return `⚙️ **Backend Development**\n\n` +
             `Primary: Laravel (PHP), Node.js\n` +
             `APIs: RESTful, GraphQL basics\n` +
             `Auth: JWT, OAuth, Sanctum\n\n` +
             `Optimized queries, caching strategies`;
    }
    
    return `🌐 **Full Stack Web Development**\n\n` +
           `Muhammad builds complete web solutions from scratch:\n` +
           `• Custom PHP/Laravel applications\n` +
           `• Modern responsive interfaces\n` +
           `• Secure authentication systems\n` +
           `• Database design & optimization\n` +
           `• WordPress custom themes & plugins`;
  }

  getAIResponse() {
    return `🧠 **AI/ML Engineering**\n\n` +
           `**Specialization:** Computer Vision & Deep Learning\n` +
           `**Frameworks:** TensorFlow, PyTorch, Scikit-learn\n` +
           `**Projects:** Deep Fake Detection, Image Classification\n\n` +
           `Currently exploring NLP and Transformer architectures.\n` +
           `Available for AI/ML freelance projects! 🤖`;
  }

  getMobileResponse() {
    return `📲 **Mobile Development with Flutter**\n\n` +
           `• Cross-platform apps (iOS & Android)\n` +
           `• State management (Provider, BLoC)\n` +
           `• Firebase integration\n` +
           `• Custom animations\n\n` +
           `Built: TaskFlow (productivity app) and 2 client projects`;
  }

  getEducationResponse() {
    const edu = this.knowledgeBase.education;
    return `🎓 **Academic Background**\n\n` +
           `**${edu.degree}**\n` +
           `${edu.university}, ${edu.year}\n` +
           `CGPA: ${edu.cgpa}\n\n` +
           `✨ **Achievements:**\n` +
           edu.achievements.map(a => `• ${a}`).join('\n');
  }

  getAchievementsResponse() {
    const achievements = this.knowledgeBase.achievements;
    return `🏆 **Honors & Achievements**\n\n` +
           achievements.map(a => 
             `• **${a.title}** (${a.date})\n` +
             `  ${a.description}`
           ).join('\n\n') +
           `\n\nTruly outstanding record! 🌟`;
  }

  getContactResponse() {
    const personal = this.knowledgeBase.personal;
    return `📬 **Contact Information**\n\n` +
           `📧 Email: ${personal.email}\n` +
           `📱 Phone: ${personal.phone}\n` +
           `📍 Location: ${personal.location}\n` +
           `💼 LinkedIn: /in/muhammad-sohaib\n` +
           `🐙 GitHub: @dev-m-sohaib\n\n` +
           `⚡ Best time to reach: 9 AM - 6 PM (PKT)\n` +
           `Responses within 24 hours!`;
  }

  getAvailabilityResponse() {
    return `💪 **Ready for opportunities!**\n\n` +
           `✅ Available for freelance projects\n` +
           `✅ Open to full-time remote positions\n` +
           `✅ Flexible with working hours\n\n` +
           `💎 **Rate:** Competitive (project-based)\n\n` +
           `📩 Contact: dev.m.sohaib@gmail.com\n` +
           `📞 Call: +92-333-6112030`;
  }

  getRecommendationResponse(query) {
    const rec = this.knowledgeBase.recommendations;
    
    if (query.includes('learn')) {
      return `📚 **Learning Roadmap**\n\n` +
             `Based on Muhammad's experience:\n` +
             `1. Master ${rec.learning[0]}\n` +
             `2. Build ${rec.learning[1]} apps\n` +
             `3. Get ${rec.learning[2]}\n\n` +
             `Start with official documentation and build projects!`;
    }
    
    return `💡 **Expert Recommendations**\n\n` +
           `**Frontend:** ${rec.frontend.join(', ')}\n` +
           `**Backend:** ${rec.backend.join(', ')}\n` +
           `**Practices:** ${rec.best_practices.join(', ')}\n\n` +
           `Want specific advice? Just ask! 🎯`;
  }

  getHelpResponse() {
    return `❓ **I can tell you about:**\n\n` +
           `• 🚀 Technical skills & expertise\n` +
           `• 💼 Work experience & achievements\n` +
           `• 📱 Projects & portfolio\n` +
           `• 🎓 Education & certifications\n` +
           `• 📬 Contact & availability\n\n` +
           `Just type what you want to know! Try: "skills", "projects", or "experience"`;
  }

  getGoodbyeResponse() {
    return `👋 Thanks for chatting! Feel free to come back anytime.\n` +
           `Check out Muhammad's live projects or send him a message.\n` +
           `Have a great day! ✨`;
  }

  getDefaultResponse(query) {
    // Check if query contains any skill-related words
    const allSkills = Object.values(this.knowledgeBase.skills).flat();
    const mentionedSkill = allSkills.find(skill => 
      query.includes(skill.toLowerCase())
    );
    
    if (mentionedSkill) {
      return `🎯 Yes! Muhammad is skilled in **${mentionedSkill}**.\n\n` +
             `Want to know more about his experience with ${mentionedSkill}?`;
    }
    
    return `🤔 I'm not sure about that specific detail.\n\n` +
           `You can ask me about:\n` +
           `✓ Skills (web, AI, mobile, backend)\n` +
           `✓ Projects (Deep Fake, E-Commerce, TaskFlow)\n` +
           `✓ Experience (Soft Height, QEC)\n` +
           `✓ Achievements & awards\n` +
           `✓ Education & contact\n\n` +
           `What would you like to know? 🔍`;
  }

  displayUserMessage(text) {
    const message = document.createElement('div');
    message.className = 'ai-message user-message';
    message.textContent = text;
    this.messagesContainer.appendChild(message);
    this.scrollToBottom();
  }

  displayBotMessage(text) {
    const message = document.createElement('div');
    message.className = 'ai-message bot-message';
    message.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Animate typing effect for important messages
    if (text.includes('**') || text.length > 100) {
      this.typeWriterEffect(message, text);
    } else {
      this.messagesContainer.appendChild(message);
    }
    
    this.scrollToBottom();
  }

  typeWriterEffect(element, text) {
    element.innerHTML = '';
    this.messagesContainer.appendChild(element);
    
    let i = 0;
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Simplified typing effect
    element.innerHTML = formattedText;
  }

  showTypingIndicator() {
    this.thinking = true;
    const indicator = document.createElement('div');
    indicator.className = 'ai-message typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    indicator.id = 'typingIndicator';
    this.messagesContainer.appendChild(indicator);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    this.thinking = false;
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  toggleChat() {
    this.chat.classList.toggle('active');
    if (this.chat.classList.contains('active')) {
      setTimeout(() => this.input.focus(), 300);
    }
  }

  setupSpeechRecognition() {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.input.value = transcript;
        this.processQuery(transcript);
      };
      
      // Add microphone button
      const micButton = document.createElement('button');
      micButton.className = 'ai-mic-button';
      micButton.innerHTML = '<i class="fas fa-microphone"></i>';
      micButton.type = 'button';
      micButton.addEventListener('click', () => {
        this.recognition.start();
        micButton.classList.add('listening');
      });
      
      this.input.parentNode.insertBefore(micButton, this.input.nextSibling);
    }
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
