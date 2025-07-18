# Sanjai's Portfolio Website

A modern, interactive portfolio website showcasing my skills, projects, experience, and research work in Data Science and AI. Features an AI-powered chatbot assistant.

## 🌟 Features

- **Interactive Portfolio**: Showcasing skills, experience, projects, and research
- **AI Chatbot Assistant**: Powered by Google's Gemini AI for intelligent conversations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX**: Beautiful animations, starfield background, and smooth transitions
- **Downloadable Resume**: Direct download functionality
- **Project Showcases**: Interactive sliders for projects, products, and research
- **Contact Form**: Integrated contact form with Google Sheets

## 🚀 Live Demo

Visit the live website: [Your GitHub Pages URL will be here]

## 🛠️ Setup for GitHub Pages

### Step 1: Clone/Fork Repository
```bash
git clone https://github.com/your-username/portfolio-site.git
cd portfolio-site
```

### Step 2: Configure Gemini AI Chatbot

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Open `js/chatbot-script.js`
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
```javascript
const GEMINI_API_KEY = 'your_actual_gemini_api_key_here';
```

### Step 3: Deploy to GitHub Pages

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. Your site will be available at: `https://your-username.github.io/repository-name`

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `index.html`: Personal details, experience, projects, contact info
- `portfolio_pictures/`: Replace with your own images and resume
- `js/chatbot-script.js`: Update the portfolio context with your information

### Styling
- `style.css`: Customize colors, fonts, and layout
- Chatbot styling is included in the main CSS file

### Contact Form
The contact form uses Google Sheets integration. Update the `scriptURL` in `index.html` with your own Google Apps Script URL.

## 🤖 AI Chatbot Features

- **Smart Responses**: Powered by Google's Gemini AI
- **Portfolio Knowledge**: Trained on your portfolio information
- **Resume Downloads**: Direct integration with resume download
- **Chat History**: Download chat transcripts
- **Responsive Design**: Works on all devices

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI Integration**: Google Gemini AI API
- **Hosting**: GitHub Pages (Static)
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)

## 📦 Files Structure

```
portfolio-site/
├── index.html              # Main HTML file
├── style.css              # Main stylesheet
├── js/
│   └── chatbot-script.js   # Chatbot functionality
├── portfolio_pictures/     # Images and resume
│   ├── logo.png
│   ├── user.jpg
│   ├── resume.pdf
│   └── project_images/
└── README.md              # This file
```

## 🔒 Security Notes

- **API Keys**: Never commit your actual Gemini API key to a public repository
- Consider using environment variables or GitHub Secrets for sensitive data
- The current setup requires the API key to be in the client-side code for simplicity

## 📈 Performance

- **Optimized Images**: Compressed images for faster loading
- **Minimal Dependencies**: No heavy frameworks
- **Lazy Loading**: Efficient resource loading
- **CDN Integration**: Fast content delivery

## 🐛 Troubleshooting

### Chatbot Not Working
1. Check if your Gemini API key is correctly set
2. Verify the API key has proper permissions
3. Check browser console for any errors

### GitHub Pages Not Updating
1. Check the Actions tab for deployment status
2. Ensure your repository is public (for free GitHub Pages)
3. Verify the correct branch is selected in Pages settings

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this repository and customize it for your own portfolio!

## 📞 Contact

- **Email**: sanjaibala11@gmail.com
- **LinkedIn**: [Sanjai Bala](https://www.linkedin.com/in/sanjai-bala/)
- **GitHub**: [sanjai-11](https://github.com/sanjai-11)

---

⭐ Star this repository if you found it helpful! 