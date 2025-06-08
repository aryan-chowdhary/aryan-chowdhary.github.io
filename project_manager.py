#!/usr/bin/env python3

import json
import os
from datetime import datetime

class ProjectManager:
    def __init__(self, proj_file='projects/project-data.json'):
        self.file_path = proj_file
        self.projects = []
        
        os.makedirs(os.path.dirname(proj_file), exist_ok=True)
        
        if os.path.exists(proj_file):
            self.load_projects()
    
    def load_projects(self):
        """load existing projects from json file"""
        try:
            with open(self.file_path, 'r') as f:
                self.projects = json.load(f)
        except:
            print("couldnt load projects, starting fresh")
            self.projects = []
    
    def save_projects(self):
        """save projects to json"""
        with open(self.file_path, 'w') as f:
            json.dump(self.projects, f, indent=2)
    
    def add_project(self, title, category, desc, tech_stack, link="#", metrics=None):
        """add new project to portfolio"""
        new_proj = {
            'id': len(self.projects) + 1,
            'title': title,
            'category': category,
            'description': desc,
            'tech': tech_stack,
            'link': link,
            'date_added': datetime.now().strftime('%Y-%m-%d'),
            'metrics': metrics or {}
        }
        
        self.projects.append(new_proj)
        self.save_projects()
        print(f"Added project: {title}")
    
    def generate_sample_projects(self):
        """create sample fintech projects for portfolio"""
        
        sample_data = [
            {
                'title': 'Neural Options Pricing Engine',
                'cat': 'trading',
                'desc': 'Deep learning model for real-time options pricing beating Black-Scholes by 23% accuracy',
                'tech': ['Python', 'TensorFlow', 'C++', 'Redis'],
                'metrics': {'accuracy': '96.3%', 'latency': '<1ms'}
            },
            {
                'title': 'DeFi Yield Optimizer',
                'cat': 'am',
                'desc': 'Automated yield farming strategy achieving 180% APY through cross-chain arbitrage',
                'tech': ['Solidity', 'Python', 'Web3.py', 'TheGraph'],
                'metrics': {'apy': '180%', 'tvl': '$2.3M'}
            },
            {
                'title': 'Quantum Portfolio Optimizer',
                'cat': 'am',
                'desc': 'Quantum annealing solution for portfolio optimization handling 10,000+ assets',
                'tech': ['Python', 'Qiskit', 'D-Wave', 'PostgreSQL'],
                'metrics': {'assets': '10K+', 'improvement': '34%'}
            },
            {
                'title': 'RegTech Compliance Engine',
                'cat': 'risk',
                'desc': 'NLP-powered regulatory compliance monitoring across 50+ jurisdictions',
                'tech': ['Python', 'spaCy', 'Elasticsearch', 'Kafka'],
                'metrics': {'jurisdictions': '50+', 'accuracy': '98.7%'}
            },
            {
                'title': 'Alternative Data Trading Signal',
                'cat': 'trading',
                'desc': 'Satellite imagery & social sentiment analysis for commodity futures trading',
                'tech': ['Python', 'PyTorch', 'Sentinel API', 'Apache Airflow'],
                'metrics': {'sharpe': '2.8', 'return': '47% YTD'}
            },
            {
                'title': 'SME Credit Risk Analyzer',
                'cat': 'credit',
                'desc': 'Graph neural networks for SME creditworthiness using transaction networks',
                'tech': ['Python', 'DGL', 'Neo4j', 'FastAPI'],
                'metrics': {'auc': '0.92', 'coverage': '85%'}
            },
            {
                'title': 'Crypto Market Maker Bot',
                'cat': 'trading',
                'desc': 'High-frequency market making across 15 DEXs with dynamic inventory management',
                'tech': ['Rust', 'Python', 'WebSocket', 'PostgreSQL'],
                'metrics': {'volume': '$5M daily', 'spread capture': '0.15%'}
            },
            {
                'title': 'ESG Investment Screener',
                'cat': 'ib',
                'desc': 'ML-based ESG scoring analyzing 10M+ data points from alternative sources',
                'tech': ['Python', 'Spark', 'MongoDB', 'Tableau'],
                'metrics': {'companies': '5000+', 'data points': '10M+'}
            },
            {
                'title': 'Venture Capital Deal Flow AI',
                'cat': 'vc',
                'desc': 'Predictive model for startup success using founder backgrounds & market timing',
                'tech': ['Python', 'LightGBM', 'AWS SageMaker', 'Snowflake'],
                'metrics': {'precision': '71%', 'deals analyzed': '50K+'}
            },
            {
                'title': 'Personal Finance Optimizer',
                'cat': 'pf',
                'desc': 'Reinforcement learning agent for personalized savings & investment strategies',
                'tech': ['Python', 'Ray RLlib', 'React', 'Firebase'],
                'metrics': {'users': '10K+', 'avg savings increase': '23%'}
            },
            {
                'title': 'Patent Valuation Engine',
                'cat': 'ip',
                'desc': 'Graph-based patent citation analysis for IP portfolio valuation',
                'tech': ['Python', 'NetworkX', 'USPTO API', 'Docker'],
                'metrics': {'patents analyzed': '2M+', 'valuation accuracy': '±15%'}
            },
            {
                'title': 'Cross-Border Payment Optimizer',
                'cat': 'ib',
                'desc': 'Real-time FX routing optimization reducing transaction costs by 40%',
                'tech': ['Go', 'Python', 'RabbitMQ', 'Kubernetes'],
                'metrics': {'cost reduction': '40%', 'volume': '$100M monthly'}
            }
        ]
        
        for proj in sample_data:
            self.add_project(
                title=proj['title'],
                category=proj['cat'],
                desc=proj['desc'],
                tech_stack=proj['tech'],
                metrics=proj.get('metrics', {})
            )
    
    def list_projects_by_category(self, category=None):
        """list projects, optionally filtered by category"""
        if category:
            filtered = [p for p in self.projects if p['category'] == category]
            return filtered
        return self.projects
    
    def update_project_link(self, project_id, new_link):
        """update github/demo link for a project"""
        for proj in self.projects:
            if proj['id'] == project_id:
                proj['link'] = new_link
                self.save_projects()
                print(f"Updated link for project {proj['title']}")
                return
        print("Project not found")
    
    def export_for_web(self):
        """export projects in format ready for website"""
        web_data = []
        for proj in self.projects:
            web_proj = {
                'title': proj['title'],
                'category': proj['category'],
                'description': proj['description'],
                'tech': proj['tech'],
                'link': proj['link']
            }
            if proj.get('metrics'):
                web_proj['metrics'] = proj['metrics']
            
            web_data.append(web_proj)
        
        with open('projects/web-projects.js', 'w') as f:
            f.write(f"const projectData = {json.dumps(web_data, indent=2)};")
        
        print(f"Exported {len(web_data)} projects for web")

if __name__ == "__main__":
    pm = ProjectManager()
    
    if len(pm.projects) == 0:
        print("Generating sample fintech projects...")
        pm.generate_sample_projects()
    
    print("\n=== All Projects ===")
    for proj in pm.projects:
        print(f"[{proj['category']}] {proj['title']}")
    
    pm.export_for_web()
    
    print("\nProject data ready for portfolio!")