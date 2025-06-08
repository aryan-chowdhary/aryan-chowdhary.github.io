let proj_data = [];
let currentFilter = 'all';

const sample_projects = [
    {
        title: "QuantumRisk Analytics Platform",
        category: "risk",
        description: "Leveraging quantum computing algorithms for advanced risk modeling in derivatives markets",
        tech: ["Python", "Qiskit", "TensorFlow", "PostgreSQL"],
        link: "#"
    },
    {
        title: "AI-Powered Credit Scoring Engine", 
        category: "credit",
        description: "ML model achieving 94% accuracy in predicting loan defaults using alternative data sources",
        tech: ["Python", "XGBoost", "Apache Spark", "AWS"],
        link: "#"
    },
    {
        title: "Blockchain IP Registry",
        category: "ip",
        description: "Decentralized intellectual property management system with smart contract automation",
        tech: ["Solidity", "Web3.js", "IPFS", "React"],
        link: "#"
    },
    {
        title: "HFT Algorithm Suite",
        category: "trading",
        description: "Sub-millisecond trading system processing 1M+ orders/sec with custom FPGA acceleration",
        tech: ["C++", "CUDA", "Redis", "FIX Protocol"],
        link: "#"
    },
    {
        title: "VC Deal Flow Analyzer",
        category: "vc",
        description: "NLP-based system for analyzing startup pitches and predicting investment outcomes",
        tech: ["Python", "BERT", "Neo4j", "FastAPI"],
        link: "#"
    },
    {
        title: "Robo-Advisory Platform",
        category: "pf",
        description: "Personalized financial planning using reinforcement learning and behavioral analytics",
        tech: ["Python", "PyTorch", "MongoDB", "Vue.js"],
        link: "#"
    },
    {
        title: "Neural Options Pricing Engine",
        category: "trading",
        description: "Deep learning model for real-time options pricing beating Black-Scholes by 23% accuracy",
        tech: ["Python", "TensorFlow", "C++", "Redis"]
    },
    {
        title: "DeFi Yield Optimizer",
        category: "am",
        description: "Automated yield farming strategy achieving 180% APY through cross-chain arbitrage",
        tech: ["Solidity", "Python", "Web3.py", "TheGraph"]
    },
    {
        title: "Quantum Portfolio Optimizer",
        category: "am",
        description: "Quantum annealing solution for portfolio optimization handling 10,000+ assets",
        tech: ["Python", "Qiskit", "D-Wave", "PostgreSQL"]
    },
    {
        title: "RegTech Compliance Engine",
        category: "risk",
        description: "NLP-powered regulatory compliance monitoring across 50+ jurisdictions",
        tech: ["Python", "spaCy", "Elasticsearch", "Kafka"]
    },
    {
        title: "Alternative Data Trading Signal",
        category: "trading",
        description: "Satellite imagery & social sentiment analysis for commodity futures trading",
        tech: ["Python", "PyTorch", "Sentinel API", "Apache Airflow"]
    },
    {
        title: "SME Credit Risk Analyzer",
        category: "credit",
        description: "Graph neural networks for SME creditworthiness using transaction networks",
        tech: ["Python", "DGL", "Neo4j", "FastAPI"]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    setupCategoryFilters();
    observeElements();
    updateProjectCount();
    checkForImages();
});

function checkForImages() {
    const sections = [
        { selector: '.projects_page_hero', image: 'gif3.gif' },
        { selector: '.projects-section', image: 'gif4.gif' }
    ];
    
    sections.forEach(section => {
        const el = document.querySelector(section.selector);
        if (el) {
            const img = new Image();
            img.onload = function() {
                el.classList.add('with-bg');
            };
            img.src = `assets/images/${section.image}`;
        }
    });
}

function loadProjects() {
    proj_data = sample_projects;
    displayProjects(proj_data);
}

function displayProjects(projects) {
    const container = document.querySelector('.projects_container');
    container.innerHTML = '';
    
    projects.forEach((proj, idx) => {
        const projectCard = createProjectCard(proj, idx);
        container.appendChild(projectCard);
    });
    
    updateProjectCount();
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project_card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const techBadges = project.tech.map(t => 
        `<span class="tech_badge">${t}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="proj_content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech_stack">
                ${techBadges}
            </div>
            <a href="${project.link}" class="proj_link">View Project →</a>
        </div>
    `;
    
    card.style.cssText = `
        background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        padding: 30px;
        transition: all 0.3s ease;
        cursor: pointer;
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
    `;
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(255,255,255,0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    return card;
}

function setupCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category_card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.cat;
            currentFilter = category;
            
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            if (category === 'all') {
                displayProjects(proj_data);
                document.querySelector('.projects-section h2').textContent = 'All Projects';
            } else {
                const filtered = proj_data.filter(p => p.category === category);
                displayProjects(filtered);
                const catName = this.querySelector('h3').textContent;
                document.querySelector('.projects-section h2').textContent = catName + ' Projects';
            }
        });
    });
    
    document.querySelector('[data-cat="all"]').classList.add('active');
}

function updateProjectCount() {
    const displayedProjects = currentFilter === 'all' 
        ? proj_data.length 
        : proj_data.filter(p => p.category === currentFilter).length;
    
    document.getElementById('project_count').textContent = displayedProjects;
}

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project_card h3 {
        font-size: 1.3rem;
        margin-bottom: 15px;
        color: #ffffff;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
    }
    
    .project_card p {
        color: #a0a0a0;
        margin-bottom: 20px;
        line-height: 1.6;
        text-shadow: 0 0 10px rgba(160, 160, 160, 0.3);
    }
    
    .tech_stack {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .tech_badge {
        padding: 5px 15px;
        background: rgba(255,255,255,0.1);
        border-radius: 20px;
        font-size: 0.85rem;
        color: #c0c0c0;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }
    
    .proj_link {
        color: #e0e0e0;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
        text-shadow: 0 0 10px rgba(224, 224, 224, 0.4);
    }
    
    .proj_link:hover {
        color: #ffffff;
    }
`;
document.head.appendChild(style);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});