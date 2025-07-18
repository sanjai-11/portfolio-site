document.addEventListener('DOMContentLoaded', function() {
    // Your Gemini API Key - Replace with your actual API key
    const GEMINI_API_KEY = 'AIzaSyBFw3iLeokV_PO82IoMIO7-9MpU2-ulH74'; // Replace this with your actual Gemini API key
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    // DOM Elements
    const chatBody = document.querySelector('.chat-body');
    const messagesContainer = document.querySelector('.messages');
    const questionButtons = document.querySelectorAll('.question-btn');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-btn');
    const chatContainer = document.querySelector('.chat-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatHeader = document.querySelector('.chat-header');

    // Remove any existing close/delete buttons in header
    const oldCloseBtn = chatHeader.querySelector('.close-btn');
    if (oldCloseBtn) oldCloseBtn.remove();
    const oldDeleteBtn = chatHeader.querySelector('.delete-btn');
    if (oldDeleteBtn) oldDeleteBtn.remove();
    const oldBtnGroup = chatHeader.querySelector('.header-btn-group');
    if (oldBtnGroup) oldBtnGroup.remove();

    // Create header button group
    let btnGroup = document.createElement('div');
    btnGroup.className = 'header-btn-group';
    btnGroup.style.display = 'flex';
    btnGroup.style.alignItems = 'center';
    btnGroup.style.marginLeft = 'auto';

    // Create download button
    let downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.title = 'Download chat transcript';
    downloadBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
    downloadBtn.style.background = 'none';
    downloadBtn.style.border = 'none';
    downloadBtn.style.cursor = 'pointer';
    downloadBtn.style.marginRight = '8px';
    downloadBtn.style.padding = '0';

    // Create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.title = 'Clear chat';
    deleteBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
    deleteBtn.style.background = 'none';
    deleteBtn.style.border = 'none';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.marginRight = '8px';
    deleteBtn.style.padding = '0';

    // Create close button
    let closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.title = 'Close chat';
    closeBtn.innerHTML = '×';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = '#fff';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0 4px';

    // Add buttons to header
    btnGroup.appendChild(downloadBtn);
    btnGroup.appendChild(deleteBtn);
    btnGroup.appendChild(closeBtn);
    chatHeader.appendChild(btnGroup);

    // Function to dynamically extract portfolio information from the HTML
    function extractPortfolioData() {
        // Extract personal info
        const name = document.querySelector('.header-text h1 span')?.textContent || 'Sanjaikumar';
        const email = document.querySelector('p i.fa-envelope')?.parentElement?.textContent?.replace('✉', '').trim() || 'sanjaibala11@gmail.com';
        const phone = document.querySelector('p i.fa-phone-square-alt')?.parentElement?.textContent?.trim() || '+1 (812) 671-6737';
        
        // Extract about section
        const aboutText = Array.from(document.querySelectorAll('#about p')).map(p => p.textContent.trim()).join(' ');
        
        // Extract skills
        const skills = Array.from(document.querySelectorAll('#skills ul li span')).map(skill => skill.textContent);
        
        // Extract experience
        const experiences = Array.from(document.querySelectorAll('#experiences .experience-list > div')).map(exp => {
            const title = exp.querySelector('h3')?.textContent || '';
            const company = exp.querySelector('h4')?.textContent || '';
            const date = exp.querySelector('p:first-of-type')?.textContent || '';
            const description = Array.from(exp.querySelectorAll('p[style*="text-align: justify"]')).map(p => p.textContent.trim()).join(' ');
            return `${title} at ${company} (${date}): ${description}`;
        });
        
        // Extract projects
        const projects = Array.from(document.querySelectorAll('#projects .project')).map(proj => {
            const title = proj.querySelector('h3')?.textContent || '';
            const description = Array.from(proj.querySelectorAll('p')).map(p => p.textContent.trim()).join(' ');
            const link = proj.querySelector('a')?.href || '';
            return `${title}: ${description}${link ? ` (Link: ${link})` : ''}`;
        });
        
        // Extract products
        const products = Array.from(document.querySelectorAll('#products .product')).map(prod => {
            const title = prod.querySelector('h2, h3')?.textContent || '';
            const description = Array.from(prod.querySelectorAll('p')).map(p => p.textContent.trim()).join(' ');
            const link = prod.querySelector('a')?.href || '';
            return `${title}: ${description}${link ? ` (Link: ${link})` : ''}`;
        });
        
        // Extract research
        const research = Array.from(document.querySelectorAll('#researchworks .researchwork-list > div')).map(res => {
            const title = res.querySelector('h2')?.textContent || '';
            const description = Array.from(res.querySelectorAll('p')).map(p => p.textContent.trim()).join(' ');
            const link = res.querySelector('a')?.href || '';
            return `${title}: ${description}${link ? ` (Link: ${link})` : ''}`;
        });
        
        // Extract education
        const education = Array.from(document.querySelectorAll('#education ul li')).map(edu => edu.textContent.trim());
        
        return {
            name,
            email,
            phone,
            about: aboutText,
            skills,
            experiences,
            projects,
            products,
            research,
            education
        };
    }
    
    // Function to build dynamic portfolio context
    function buildPortfolioContext() {
        const data = extractPortfolioData();
        
        return `
        You are SK11, an AI assistant representing ${data.name} (Sanjaikumar Balasubramaniyan, goes by Sanjai Bala). Here's current information about Sanjai:

        ABOUT:
        ${data.about}

        CONTACT:
        - Email: ${data.email}
        - Phone: ${data.phone}

        SKILLS:
        ${data.skills.join(', ')}

        EDUCATION:
        ${data.education.join('\n')}

        EXPERIENCE:
        ${data.experiences.map((exp, i) => `${i + 1}. ${exp}`).join('\n')}

        PROJECTS:
        ${data.projects.map((proj, i) => `${i + 1}. ${proj}`).join('\n')}

        PRODUCTS:
        ${data.products.map((prod, i) => `${i + 1}. ${prod}`).join('\n')}

        RESEARCH:
        ${data.research.map((res, i) => `${i + 1}. ${res}`).join('\n')}

        Keep responses conversational, helpful, and focused on Sanjai's achievements. Always be enthusiastic about his work!
        Be specific when discussing his projects, experience, and research. If asked about links or wanting to see something, direct them to the relevant section of the portfolio or provide the actual links mentioned above.
        `;
    }

    // Function to get AI response from Gemini API
    async function getAIResponse(userMessage) {
        if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            return "Hi! I'm SK11, Sanjai's AI assistant. To enable AI conversations, please add your Gemini API key to the chatbot script. For now, I can help you navigate to different sections of Sanjai's portfolio or you can contact him directly at sanjaibala11@gmail.com.";
        }

        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${buildPortfolioContext()}\n\nUser question: ${userMessage}\n\nRespond as SK11, Sanjai's AI assistant. Keep it conversational and helpful.`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error fetching AI response:', error);
            return "I apologize, but I'm having trouble processing your request right now. Please try again later or contact Sanjai directly at sanjaibala11@gmail.com.";
        }
    }

    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        // Handle resume download requests
        if (!isUser && text.toLowerCase().includes('resume') || text.toLowerCase().includes('cv')) {
            messageDiv.innerHTML = `
                <div style="margin-bottom: 10px;">${text}</div>
                <a href="portfolio_pictures/Sanjaikumar_Balasubramaniyan_Resume.pdf" 
                   download="Sanjaikumar_Balasubramaniyan_Resume.pdf"
                   class="btn btn2" 
                   style="display: inline-block; margin: 5px 0; padding: 8px 16px; font-size: 12px;">
                   Download Resume
                </a>
            `;
        } else {
            messageDiv.textContent = text;
        }
        
        messagesContainer.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Function to handle user message
    async function handleUserMessage(text) {
        if (!text.trim()) return;
        
        addMessage(text, true);
        messageInput.value = '';

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;

        try {
            const botResponse = await getAIResponse(text);
            messagesContainer.removeChild(typingIndicator);
            addMessage(botResponse);
        } catch (error) {
            messagesContainer.removeChild(typingIndicator);
            addMessage("I apologize, but I'm having trouble processing your request right now. Please try again later or contact Sanjai directly at sanjaibala11@gmail.com.");
        }
    }

    // Add welcome message when chat is opened
    function addWelcomeMessage() {
        if (messagesContainer.children.length === 0) {
            addMessage("Hi there! I'm SK11, Sanjai Bala's AI assistant. I can help you learn about Sanjai's skills, projects, experience, and research work. What would you like to know?");
        }
    }

    // Toggle chatbot visibility
    function toggleChatbot() {
        if (chatContainer.classList.contains('hidden')) {
            chatContainer.classList.remove('hidden');
            chatbotToggle.style.display = 'none';
            addWelcomeMessage();
        } else {
            chatContainer.classList.add('hidden');
            chatbotToggle.style.display = 'block';
        }
    }

    // Make toggleChatbot globally available
    window.toggleChatbot = toggleChatbot;

    // Event Listeners
    closeBtn.addEventListener('click', toggleChatbot);
    
    deleteBtn.addEventListener('click', function() {
        messagesContainer.innerHTML = '';
    });

    downloadBtn.addEventListener('click', function() {
        const messages = Array.from(messagesContainer.querySelectorAll('.message'));
        let transcript = 'SK11 Chat Transcript\n\n';
        
        messages.forEach(msg => {
            const isUser = msg.classList.contains('user-message');
            transcript += `${isUser ? 'You' : 'SK11'}: ${msg.textContent}\n\n`;
        });
        
        transcript += `Generated on ${new Date().toLocaleString()}`;
        
        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'SK11_chat_transcript.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    questionButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleUserMessage(button.textContent);
        });
    });

    sendButton.addEventListener('click', () => {
        handleUserMessage(messageInput.value);
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage(messageInput.value);
        }
    });

    // Initialize
    chatbotToggle.style.display = 'block';
}); 