# Sanjai Bala's Portfolio Website

A modern portfolio website with an AI-powered chatbot built with HTML, CSS, JavaScript, and Node.js.

## Features

- 🎨 Modern, responsive design
- 🤖 AI-powered chatbot using Mistral AI
- 📱 Mobile-friendly interface
- 📄 Resume download functionality
- 🔗 Social media integration
- 📊 Interactive project showcase

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **AI**: Mistral AI API
- **Hosting**: Vercel (Frontend) + Railway (Backend)

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website-ai
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies (if any)
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` folder:
   ```
   MISTRAL_API_KEY=your_mistral_api_key_here
   PORT=3000
   ```

4. **Start the backend server**
   ```bash
   cd backend
   node server.js
   ```

5. **Open the frontend**
   - Open `index.html` in your browser
   - Or use a local server: `python -m http.server 8000`

## Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Deploy automatically

3. **Add custom domain**
   - In Vercel dashboard, go to Settings → Domains
   - Add `www.sanjaibala.com`
   - Update your domain's DNS settings as instructed

### Backend Deployment (Railway)

1. **Prepare backend for Railway**
   - Ensure `Procfile` exists in backend folder
   - Ensure `package.json` has correct start script

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Create new project
   - Connect your repository
   - Set environment variables:
     - `MISTRAL_API_KEY`: Your Mistral API key
     - `PORT`: 3000

3. **Get Railway URL**
   - After deployment, copy the Railway URL
   - Update `js/chatbot-script.js` with the Railway URL

### Update Frontend with Backend URL

After getting your Railway URL, update the chatbot script:

```javascript
// In js/chatbot-script.js, line 279
const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000/api/chat'
    : 'https://your-actual-railway-url.railway.app/api/chat';
```

## Environment Variables

### Backend (.env)
```
MISTRAL_API_KEY=your_mistral_api_key_here
PORT=3000
```

### Railway Environment Variables
- `MISTRAL_API_KEY`: Your Mistral AI API key
- `PORT`: 3000

## File Structure

```
portfolio-website-ai/
├── index.html              # Main portfolio page
├── style.css              # Main stylesheet
├── js/
│   └── chatbot-script.js  # Chatbot functionality
├── portfolio_pictures/    # Images and assets
├── backend/
│   ├── server.js         # Express server
│   ├── package.json      # Backend dependencies
│   └── .env             # Environment variables
├── vercel.json          # Vercel configuration
└── README.md           # This file
```

## API Endpoints

- `POST /api/chat` - Chatbot API endpoint
  - Body: `{ "message": "user message" }`
  - Response: `{ "response": "ai response" }`

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for sensitive data
- Railway automatically handles environment variables securely

## Support

For issues or questions:
- Email: sanjaibala11@gmail.com
- LinkedIn: [Sanjai Bala](https://www.linkedin.com/in/sanjai-bala/)
- GitHub: [sanjai-11](https://github.com/sanjai-11)

## License

This project is open source and available under the [MIT License](LICENSE). 