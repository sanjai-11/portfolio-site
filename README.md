# Sanjai Bala | AI/ML Engineer

Source code for my personal portfolio website: **https://sanjaibala.com**

The site showcases my industry experience, research and projects in AI/ML, LLMs, agentic systems and computer vision. It also includes an AI assistant ("SK") that answers questions about my work.

## About Me

I'm Sanjai Bala (Sanjaikumar Balasubramaniyan), an AI/ML Engineer at **Agilisium Consulting**, embedded with **UCB Pharma**. I build conversational AI on Databricks and validate transformer-based patient prediction models on real-world healthcare data. I hold an MS in Data Science from Indiana University Bloomington and a B.Tech in AI & Data Science. I'm also a Databricks Certified Machine Learning Associate.

## Experience

- **AI/ML Engineer**, Agilisium Consulting (client: UCB Pharma) — Jun 2026 to present
- **Research Data Scientist**, Indiana University Bloomington — Jan 2025 to Jun 2026
- **AI Engineer Intern**, riAI Capital LLC — Jul 2025 to Nov 2025
- **Data Scientist Intern**, Systech Solutions Inc.
- **Data Analyst Intern**, 8Queens Software Technologies

## Research

- **Toward Reliable Visible-Track Speaking-State Detection Under Video Restoration**: accepted at WVAQ 2027 @ WACV 2027 ([OpenReview](https://openreview.net/forum?id=RoZpoUx9Z7))
- **Advanced ANPR for Vehicle Management**: Adalya International Journal (96% accuracy)
- **AI-Powered Banknote Identification System for Visually Impaired**: RTACT 2024
- **Funding Networks for BIPOC Nonprofit Organizations**: presented at ARNOVA

## Featured Projects

- [Semantic Search RAG](https://github.com/sanjai-11/semantic-search-rag): multi-PDF Q&A with ChromaDB, MMR retrieval and cited answers
- [Report Builder AI](https://github.com/sanjai-11/report-builder-AI-ipynb): notebook outputs to branded PDF/DOCX reports with AI summaries
- [Customer Churn Prediction & Segmentation](https://github.com/sanjai-11/customer-churn-predict): XGBoost + KMeans with lift analysis
- [ROS2 Object Tracking & Control](https://github.com/sanjai-11/ros2-object-tracking-control): OpenCV, Kalman filter and PID control
- [Predictive Maintenance – RUL (LSTM)](https://github.com/sanjai-11/predictive-maintenance-rul-lstm)
- [Industrial Surface Defect Detection](https://github.com/sanjai-11/industrial-surface-defect-detection-cv)
- [AI Agent for Operating Backend System](https://github.com/sanjai-11/AI-Agent-for-operating-Background-System)

## Skills

**AI/ML**: LLMs, RAG, Agentic AI, LLM Evaluation, NLP, Transformers, Computer Vision, Deep Learning, Time-Series
**Platforms**: Databricks, Apache Spark, AWS (S3, EC2, SageMaker), GCP, Docker, GitHub Actions
**Languages**: Python, PyTorch, SQL, JavaScript

## How the Site Works

- Static HTML/CSS/JS (`index.html`, `style.css`)
- **AI assistant**: `js/chatbot-script.js` builds context from the `portfolio-data` JSON block in `index.html` and sends it to the serverless function `api/chat.js`. That function calls Gemini using the `GEMINI_API_KEY` environment variable on the server, so no key is shipped to the browser.
- **Keeping the assistant in sync**: when you update the site, update the `portfolio-data` JSON too, and make sure it is still valid JSON. If it doesn't parse, the assistant falls back to the About section only.

## Contact

- **Email**: sanjaibala11@gmail.com
- **LinkedIn**: [Sanjai Bala](https://www.linkedin.com/in/sanjai-bala/)
- **GitHub**: [sanjai-11](https://github.com/sanjai-11)
