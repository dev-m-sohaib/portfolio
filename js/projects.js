// Projects Page Functionality
class ProjectsPage {
    constructor() {
        this.projectsGrid = document.getElementById('projectsGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.searchInput = document.getElementById('projectSearch');
        this.projectModal = document.getElementById('projectModal');
        this.closeModalBtn = document.querySelector('.close-modal');
        this.projectsData = [];
        
        this.init();
    }

    async init() {
        // Load projects data
        await this.loadProjects();
        
        // Render all projects
        this.renderProjects(this.projectsData);
        
        // Setup filter buttons
        this.setupFilters();
        
        // Setup search functionality
        this.setupSearch();
        
        // Setup modal
        this.setupModal();
    }

    async loadProjects() {
        try {
            const response = await fetch('data/projects.json');
            this.projectsData = await response.json();
        } catch (error) {
            console.error('Error loading projects:', error);
            this.projectsData = [];
        }
    }

    renderProjects(projects) {
        this.projectsGrid.innerHTML = '';
        
        if (projects.length === 0) {
            this.projectsGrid.innerHTML = '<p class="no-projects">No projects found matching your criteria</p>';
            return;
        }
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.dataset.id = project.id;
            projectCard.dataset.tags = project.tags.join(',');
            
            // Create project image
            const imageDiv = document.createElement('div');
            imageDiv.className = 'project-image';
            
            const img = document.createElement('img');
            img.src = project.images[0] || 'images/projects/default.jpg';
            img.alt = project.title;
            
            // Create project badge
            const badge = document.createElement('div');
            badge.className = 'project-badge';
            badge.textContent = project.type || 'Project';
            
            imageDiv.appendChild(img);
            imageDiv.appendChild(badge);
            
            // Create project info
            const infoDiv = document.createElement('div');
            infoDiv.className = 'project-info';
            
            const title = document.createElement('h3');
            title.textContent = project.title;
            
            const desc = document.createElement('p');
            desc.textContent = project.shortDescription || 'No description available';
            
            const techDiv = document.createElement('div');
            techDiv.className = 'project-tech';
            
            // Add first 3 technologies
            const technologies = project.technologies.slice(0, 3);
            technologies.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                techDiv.appendChild(span);
            });
            
            // Add view more button
            const viewBtn = document.createElement('button');
            viewBtn.className = 'project-details-btn';
            viewBtn.textContent = 'How It Works →';
            viewBtn.dataset.projectId = project.id;
            
            infoDiv.appendChild(title);
            infoDiv.appendChild(desc);
            infoDiv.appendChild(techDiv);
            infoDiv.appendChild(viewBtn);
            
            // Assemble card
            projectCard.appendChild(imageDiv);
            projectCard.appendChild(infoDiv);
            
            this.projectsGrid.appendChild(projectCard);
        });
        
        // Add event listeners to view buttons
        document.querySelectorAll('.project-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = btn.dataset.projectId;
                this.openProjectModal(projectId);
            });
        });
    }

    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                const filter = button.dataset.filter;
                this.filterProjects(filter);
            });
        });
    }

    filterProjects(filter) {
        if (filter === 'all') {
            this.renderProjects(this.projectsData);
            return;
        }
        
        const filteredProjects = this.projectsData.filter(project => 
            project.tags.includes(filter)
        );
        
        this.renderProjects(filteredProjects);
    }

    setupSearch() {
        this.searchInput.addEventListener('input', () => {
            const searchTerm = this.searchInput.value.toLowerCase();
            
            if (searchTerm.length < 2) {
                this.renderProjects(this.projectsData);
                return;
            }
            
            const filteredProjects = this.projectsData.filter(project => 
                project.title.toLowerCase().includes(searchTerm) ||
                project.shortDescription.toLowerCase().includes(searchTerm) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
            );
            
            this.renderProjects(filteredProjects);
        });
    }

    setupModal() {
        // Close modal when clicking X
        this.closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Close modal when clicking outside
        this.projectModal.addEventListener('click', (e) => {
            if (e.target === this.projectModal) {
                this.closeModal();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.projectModal.style.display === 'block') {
                this.closeModal();
            }
        });
        
        // Code tab switching
        document.querySelectorAll('.code-tabs button').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                this.switchCodeTab(tabId);
            });
        });
    }

    openProjectModal(projectId) {
        const project = this.projectsData.find(p => p.id === projectId);
        if (!project) return;
        
        // Set basic project info
        document.getElementById('modalProjectTitle').textContent = project.title;
        document.getElementById('modalProjectDescription').textContent = project.description || 'No description available';
        
        // Set project dates
        const dateElement = document.getElementById('modalProjectDate');
        if (project.startDate && project.endDate) {
            dateElement.innerHTML = `<i class="far fa-calendar-alt"></i> ${project.startDate} - ${project.endDate}`;
        } else if (project.date) {
            dateElement.innerHTML = `<i class="far fa-calendar-alt"></i> ${project.date}`;
        } else {
            dateElement.style.display = 'none';
        }
        
        // Set project type
        const typeElement = document.getElementById('modalProjectType');
        if (project.type) {
            typeElement.innerHTML = `<i class="fas fa-tag"></i> ${project.type}`;
        } else {
            typeElement.style.display = 'none';
        }
        
        // Set project images
        const carousel = document.getElementById('projectCarousel');
        carousel.innerHTML = '';
        
        if (project.images && project.images.length > 0) {
            project.images.forEach(image => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = `${project.title} screenshot`;
                carousel.appendChild(img);
            });
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'no-image';
            placeholder.innerHTML = '<i class="fas fa-image"></i><p>No images available</p>';
            carousel.appendChild(placeholder);
        }
        
        // Set project links
        const githubLink = document.getElementById('projectGithubLink');
        const liveLink = document.getElementById('projectLiveLink');
        
        if (project.githubUrl) {
            githubLink.href = project.githubUrl;
            githubLink.style.display = 'inline-block';
        } else {
            githubLink.style.display = 'none';
        }
        
        if (project.liveUrl) {
            liveLink.href = project.liveUrl;
            liveLink.style.display = 'inline-block';
        } else {
            liveLink.style.display = 'none';
        }
        
        // Set project features
        const featuresList = document.getElementById('modalProjectFeatures');
        featuresList.innerHTML = '';
        
        if (project.features && project.features.length > 0) {
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No features listed';
            featuresList.appendChild(li);
        }
        
        // Set project technologies
        const techContainer = document.getElementById('modalProjectTechnologies');
        techContainer.innerHTML = '';
        
        if (project.technologies && project.technologies.length > 0) {
            project.technologies.forEach(tech => {
                const span = document.createElement('span');
                span.className = 'tech-tag';
                span.textContent = tech;
                techContainer.appendChild(span);
            });
        } else {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = 'Not specified';
            techContainer.appendChild(span);
        }
        
        // Set project stats
        if (project.linesOfCode) {
            document.getElementById('modalProjectLOC').textContent = project.linesOfCode;
        } else {
            document.getElementById('modalProjectLOC').textContent = 'N/A';
        }
        
        if (project.usersImpacted) {
            document.getElementById('modalProjectUsers').textContent = project.usersImpacted;
        } else {
            document.getElementById('modalProjectUsers').textContent = 'N/A';
        }
        
        // Set code samples
        if (project.codeSamples && project.codeSamples.length > 0) {
            const codeTabs = document.querySelectorAll('.code-tabs button');
            const codeSamples = document.querySelectorAll('.code-sample');
            
            // Show only the tabs we have code for
            codeTabs.forEach((tab, index) => {
                if (project.codeSamples[index]) {
                    tab.style.display = 'block';
                    const codeBlock = codeSamples[index].querySelector('code');
                    codeBlock.textContent = project.codeSamples[index].code;
                    codeBlock.className = `language-${project.codeSamples[index].language}`;
                } else {
                    tab.style.display = 'none';
                }
            });
            
            // Activate first tab
            this.switchCodeTab('snippet1');
            document.querySelector('.code-tabs button').classList.add('active');
        } else {
            document.querySelector('.project-code-samples').style.display = 'none';
        }
        
        // Show modal
        this.projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    switchCodeTab(tabId) {
        // Update active tab
        document.querySelectorAll('.code-tabs button').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelector(`.code-tabs button[data-tab="${tabId}"]`).classList.add('active');
        
        // Update visible code sample
        document.querySelectorAll('.code-sample').forEach(sample => {
            sample.classList.remove('active');
        });
        
        document.getElementById(tabId).classList.add('active');
    }

    closeModal() {
        this.projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsPage();
});