let proj_data = [];
let currentFilter = null;

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
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadLogosStrip();
    observeElements();
    checkForImages();
});

function checkForImages() {
    const heroContainer = document.querySelector('.hero-container');
    if (heroContainer) {
        const imgCheck = new Image();
        imgCheck.onload = function() {
            heroContainer.classList.add('with-bg');
        };
        imgCheck.onerror = function() {
            console.log('Background image not found');
        };
        imgCheck.src = 'assets/images/background_animation.gif';
    }
    
    const sections = [
        { selector: '.about-section', image: 'gif1.gif' },
        { selector: '.interests-skills-section', image: 'gif2.gif' }
    ];
    
    sections.forEach(section => {
        const el = document.querySelector(section.selector);
        if (el) {
            const img = new Image();
            img.onload = function() {
                el.classList.add('with-bg');
            };
            img.onerror = function() {
                console.log(`Image ${section.image} not found`);
            };
            img.src = `assets/images/${section.image}`;
        }
    });
}

function loadLogosStrip() {
    const logos = [
        'python', 'tensorflow', 'pytorch', 'aws', 'azure', 'gcp',
        'docker', 'kubernetes', 'react', 'nodejs', 'mongodb', 'postgresql',
        'redis', 'kafka', 'spark', 'hadoop', 'tableau', 'powerbi',
        'git', 'jenkins', 'elasticsearch', 'grafana', 'jupyter', 'vscode'
    ];
    
    const track = document.querySelector('.logos_track');
    if (!track) return;
    
    const logoElements = logos.map(logo => {
        const item = document.createElement('div');
        item.className = 'logo_item';
        item.innerHTML = `
            <img src="assets/logos/${logo}.png" alt="${logo}">
            <span class="logo_tooltip">${logo}</span>
        `;
        return item;
    });
    
    track.append(...logoElements);
    track.append(...logoElements.map(el => el.cloneNode(true)));
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
    }
    
    .project_card p {
        color: #a0a0a0;
        margin-bottom: 20px;
        line-height: 1.6;
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
    }
    
    .proj_link {
        color: #e0e0e0;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
    }
    
    .proj_link:hover {
        color: #ffffff;
    }
    
    .category_card.active {
        background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%);
        border-color: rgba(255,255,255,0.4);
    }
    
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease-out;
    }
    
    section.visible {
        opacity: 1;
        transform: translateY(0);
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

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.content_wrapper');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});