require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const fs = require('fs');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Function to extract portfolio info from index.html
function extractPortfolioContext() {
    const html = fs.readFileSync('../index.html', 'utf8');
    const $ = cheerio.load(html);
    let context = '';

    // Extract About
    const about = $('#about .about-col-2 p').first().text().trim();
    context += `About: ${about}\n`;

    // Extract Experience
    context += 'Experience:';
    $('#experiences .experience-list > div').each((i, el) => {
        const role = $(el).find('h3').text().trim();
        const org = $(el).find('h4').text().trim();
        const date = $(el).find('p').first().text().trim();
        context += `\n- ${role} at ${org} (${date})`;
    });
    context += '\n';

    // Extract Projects
    context += 'Projects:';
    $('#projects .project-list .project').each((i, el) => {
        const title = $(el).find('h3').text().trim();
        const desc = $(el).find('p').first().text().trim();
        context += `\n- ${title}: ${desc}`;
    });
    context += '\n';

    // Extract Products
    context += 'Products:';
    $('#products .product-list .product').each((i, el) => {
        const title = $(el).find('h2, h3').text().trim();
        const desc = $(el).find('p').first().text().trim();
        context += `\n- ${title}: ${desc}`;
    });
    context += '\n';

    // Extract Research
    context += 'Research:';
    $('#researchworks .researchwork-list > div').each((i, el) => {
        const title = $(el).find('h2').text().trim();
        const desc = $(el).find('p').first().text().trim();
        context += `\n- ${title}: ${desc}`;
    });
    context += '\n';

    // Extract Contact
    const email = $('.contact-left p').first().text().replace(/.*?([\w.-]+@[\w.-]+)/, '$1');
    const phone = $('.contact-left p').eq(1).text().replace(/.*?(\+?\d[\d\s().-]+)/, '$1');
    const linkedin = $('.social-icons a[href*="linkedin"]').attr('href');
    const github = $('.social-icons a[href*="github"]').attr('href');
    const instagram = $('.social-icons a[href*="instagram"]').attr('href');
    context += `Contact:\nEmail: ${email}\nPhone: ${phone}\nLinkedIn: ${linkedin}\nGitHub: ${github}\nInstagram: ${instagram}\n`;

    // Resume
    const resume = $('.btn.btn2[download]').attr('href');
    if (resume) context += `Resume: ${resume}\n`;

    return context;
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        // Dynamically extract context from HTML
        const personalContext = extractPortfolioContext();

        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-medium",
                messages: [
                    {
                        role: "system",
                        content: `You are an AI assistant representing Sanjaikumar Balasubramaniyan. Use the following context to answer questions about him: ${personalContext}. Keep responses concise, professional, and in first person as if you are Sanjaikumar.\n\nWhen answering, always:\n- If the user asks for contact information (such as email, phone, or LinkedIn), provide the following:\n  Email: sanjaibala11@gmail.com\n  Phone: +1 (812) 671-6737\n  LinkedIn: https://www.linkedin.com/in/sanjai-bala/\n- If the user asks for your GitHub, LeetCode, or Instagram, provide:\n  GitHub: https://github.com/sanjai-11\n  LeetCode: https://leetcode.com/u/sanjai-11/\n  Instagram: https://www.instagram.com/bksanjai7\n- If the user asks for your resume or CV, reply with only: [DOWNLOAD_RESUME]\n- If the user asks about work eligibility, internships, or sponsorship, explain: 'I can only work full-time after May 2026. Before that, I am available for internships or Co-op positions. I can work in the US without visa sponsorship for three years using OPT and CPT, as I am currently on an F1 visa.'\n- Limit your response to 1-3 sentences, and never exceed 150 words.\n- Do NOT use Markdown, asterisks, or formatting symbols (just plain text).\n- If possible, briefly justify your answer.`
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get response from AI' });
    }
});

// Add a root route for health check
app.get('/', (req, res) => {
    res.json({ 
        message: 'Sanjai Portfolio Backend API is running!',
        status: 'healthy',
        endpoints: {
            chat: '/api/chat'
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 