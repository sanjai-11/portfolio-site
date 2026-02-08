document.addEventListener('DOMContentLoaded', function() {
    
    // Call your backend endpoint (keeps API key off GitHub / browser)
    const BACKEND_CHAT_URL = "/api/chat";


    // DOM Elements
    const chatBody = document.querySelector('.chat-body');
    const messagesContainer = document.querySelector('.messages');
    const questionButtons = document.querySelectorAll('.question-btn');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-btn');
    const chatContainer = document.querySelector('.chat-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatHeader = document.querySelector('.chat-header');

    // Chat scrolling is now handled by the chat-container
    console.log('✅ Chat container scroll configuration complete');

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
        
        // Extract experience with specific achievements per company
        const experiences = Array.from(document.querySelectorAll('#experiences .experience-list > div')).map(exp => {
            const title = exp.querySelector('h3')?.textContent || '';
            const company = exp.querySelector('h4')?.textContent || '';
            const date = exp.querySelector('p:first-of-type')?.textContent || '';
            const description = Array.from(exp.querySelectorAll('p[style*="text-align: justify"]')).map(p => p.textContent.trim()).join(' ');
            
            // Map specific achievements to companies
            let achievements = '';
            if (company.includes('Systech Solutions')) {
                achievements = ' KEY ACHIEVEMENTS: 40% decision-making improvement, 35% data processing reduction, 25% customer segmentation accuracy boost, 30% operational efficiency increase';
            } else if (company.includes('8Queens')) {
                achievements = ' KEY ACHIEVEMENTS: 15% sales performance improvement, diabetes risk prediction model deployment';
            } else if (company.includes('Indiana University')) {
                achievements = ' KEY ACHIEVEMENTS: 157,000+ BIPOC nonprofit grants analysis, network analysis for funding patterns';
            }
            
            return `${title} at ${company} (${date}): ${description}${achievements}`;
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
        You are SK, an AI assistant representing ${data.name} (Sanjaikumar Balasubramaniyan, goes by Sanjai Bala). Here's current information about Sanjai:

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

    // Test API connection
    async function testAPIConnection() {
        try {
        const testResponse = await fetch(BACKEND_CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Hello, just testing the connection. Reply with 'Connection successful'",
        context: buildPortfolioContext(),
        conversationHistory: ""
      })
    });

        if (testResponse.ok) {
      const data = await testResponse.json();
      console.log("✅ API Connection Test: OK", data);
    } else {
      const errorText = await testResponse.text();
      console.error("❌ API Connection Test: FAILED", testResponse.status, errorText);
    }
  } catch (error) {
    console.error("❌ API Connection Test: NETWORK ERROR", error);
  }
}


    // Function to build conversation context
    function buildConversationContext() {
        const messages = Array.from(messagesContainer.querySelectorAll('.message'));
        let conversationHistory = '';
        
        messages.forEach(msg => {
            const isUser = msg.classList.contains('user-message');
            const content = msg.textContent || msg.innerText;
            if (isUser) {
                conversationHistory += `Human: ${content}\n`;
            } else {
                conversationHistory += `SK: ${content}\n`;
            }
        });
        
        return conversationHistory;
    }

    // Function to get AI response from Gemini API
    async function getAIResponse(userMessage) {
        // Ensure API key is available

        try {
            const conversationHistory = buildConversationContext();
            const contextPrompt = conversationHistory ? 
                `Previous conversation:\n${conversationHistory}\n\n` : '';

            const response = await fetch(BACKEND_CHAT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            message: userMessage,
            context: buildPortfolioContext(),
            conversationHistory: buildConversationContext()
            })
            });

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{
                            text: `${buildPortfolioContext()}\n\n${contextPrompt}Current user question: ${userMessage}\n\nRespond as SK, Sanjai's AI assistant speaking ON BEHALF of Sanjai. CRITICAL RULES:
- Speak as "I", "my", "me", "myself" - NOT "he", "him", "his", "Sanjai"
- You ARE Sanjai responding directly to the user
- Remember the conversation context and answer follow-up questions intelligently
- If user asks "where" or "when" about previous achievements, refer to specific companies/dates
- Keep responses 2-3 SHORT sentences maximum
- Use bullet points (•) ONLY when listing multiple items/skills
- For single answers or explanations, use plain conversational text
- Be POLITE, PROFESSIONAL, INTERESTING, and VIBRANT
- Include specific numbers/achievements naturally
- Sound IMPRESSIVE but HUMBLE and APPROACHABLE
- Avoid overly boastful language like "rockstar" or "wizard"`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                console.error('Status:', response.status, response.statusText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            return data.text;
        
        } catch (error) {
            console.error('Error fetching AI response:', error);
            
            // More specific error message based on the error type
            if (error.message.includes('Failed to fetch')) {
                return "I'm having trouble connecting to the AI service. This might be a network issue. Please check your internet connection and try again.";
            } else if (error.message.includes('Failed to get response')) {
                return "The AI service returned an error. This might be an API key issue. Please contact Sanjai at sanjaibala11@gmail.com.";
            } else {
                return "I apologize, but I'm having trouble processing your request right now. Please try again later or contact Sanjai directly at sanjaibala11@gmail.com.";
            }
        }
    }

    // Create and add a dummy div for auto-scroll at the end of messages
    const scrollMarker = document.createElement('div');
    scrollMarker.id = 'scroll-marker';
    scrollMarker.style.height = '1px';
    scrollMarker.style.width = '1px';
    scrollMarker.style.opacity = '0';
    messagesContainer.appendChild(scrollMarker);

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
            // Format the message with better line breaks and styling
            const formattedText = text
                .replace(/\n/g, '<br>')
                .replace(/• /g, '<br>• ')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
            messageDiv.innerHTML = formattedText;
        }
        
        // Always get the scroll marker fresh
        const freshScrollMarker = document.getElementById('scroll-marker');
        if (freshScrollMarker && freshScrollMarker.parentNode === messagesContainer) {
            messagesContainer.insertBefore(messageDiv, freshScrollMarker);
        } else {
            messagesContainer.appendChild(messageDiv);
        }
        
        // Scroll to show new message using scrollIntoView
        scrollToBottom();
    }

    // Questions are always visible and scroll naturally with content - no hide function needed

    // Helper function for smooth and reliable scrolling to bottom
    function scrollToBottom() {
        const scrollMarker = document.getElementById('scroll-marker');
        if (!scrollMarker) {
            console.log('❌ ScrollToBottom: Scroll marker not found');
            return;
        }
        
        console.log('🔄 ScrollToBottom: Starting auto-scroll...');
        
        // Method 1: Immediate scroll (no animation) for instant feedback
        scrollMarker.scrollIntoView({ 
            behavior: 'auto', 
            block: 'end' 
        });
        
        // Method 2: Smooth scroll for better UX
        setTimeout(() => {
            if (scrollMarker) {
                scrollMarker.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'end' 
                });
            }
        }, 50);
        
        // Method 3: Fallback with traditional scroll on chat container
        if (chatContainer) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
                console.log(`📊 ChatContainer ScrollTop set to: ${chatContainer.scrollTop}, ScrollHeight: ${chatContainer.scrollHeight}`);
            }, 100);
        }
        
        // Method 4: Final fallback for really stubborn cases
        setTimeout(() => {
            if (scrollMarker) {
                scrollMarker.scrollIntoView({ 
                    behavior: 'auto', 
                    block: 'end' 
                });
                
                // Force traditional scroll as last resort on chat container
                if (chatContainer) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                    console.log('✅ ScrollToBottom: Final chat container scroll completed');
                }
            }
        }, 300);
    }

    // Function to handle user message
    async function handleUserMessage(text) {
        if (!text.trim()) return;
        
        addMessage(text, true);
        messageInput.value = '';
        
        // Scroll to show user message
        scrollToBottom();

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        
        // In handleUserMessage, always get scroll marker fresh for typing indicator
        const freshScrollMarker = document.getElementById('scroll-marker');
        if (freshScrollMarker && freshScrollMarker.parentNode === messagesContainer) {
            messagesContainer.insertBefore(typingIndicator, freshScrollMarker);
        } else {
            messagesContainer.appendChild(typingIndicator);
        }
        
        // Scroll to show typing indicator
        scrollToBottom();

        try {
            const botResponse = await getAIResponse(text);
            messagesContainer.removeChild(typingIndicator);
            addMessage(botResponse);
            
            // Scroll to show bot response
            scrollToBottom();
        } catch (error) {
            messagesContainer.removeChild(typingIndicator);
            addMessage("I apologize, but I'm having trouble processing your request right now. Please try again later or contact Sanjai directly at sanjaibala11@gmail.com.");
            
            // Scroll to show error message
            scrollToBottom();
        }
    }

    // Add welcome message when chat is opened
    function addWelcomeMessage() {
        // Check if there are any actual message elements (not just suggested-questions)
        const actualMessages = messagesContainer.querySelectorAll('.message');
        if (actualMessages.length === 0) {
            addMessage("Hi there! I'm SK, your AI assistant representing Sanjai Bala. I'll answer on behalf of Sanjai about his skills, projects, experience, and research work. What would you like to know?");
        }
    }

    // Suggested questions are now handled entirely by CSS

    // Toggle chatbot visibility
    function toggleChatbot() {
        if (chatContainer.classList.contains('hidden')) {
            chatContainer.classList.remove('hidden');
            chatbotToggle.style.display = 'none';
            // Add welcome message with slight delay to ensure DOM is ready
            setTimeout(() => {
            addWelcomeMessage();
            }, 50);
        } else {
            chatContainer.classList.add('hidden');
            chatbotToggle.style.display = 'block';
        }
    }

    // Make toggleChatbot globally available
    window.toggleChatbot = toggleChatbot;

    // Helper to reset chatbot to initial state (like page refresh)
    function resetChatbot() {
        messagesContainer.innerHTML = `
            <div class="suggested-questions">
                <button class="question-btn">What's your biggest accomplishments?</button>
                <button class="question-btn">Convince me, you excel in AI.</button>
                <button class="question-btn">What's your superpowers?</button>
                <button class="question-btn">Key projects to see?</button>
                <button class="question-btn">Why should we hire you?</button>
            </div>
        `;
        // Recreate the scroll marker
        const newScrollMarker = document.createElement('div');
        newScrollMarker.id = 'scroll-marker';
        newScrollMarker.style.height = '1px';
        newScrollMarker.style.width = '1px';
        newScrollMarker.style.opacity = '0';
        messagesContainer.appendChild(newScrollMarker);
        // Re-attach event listeners to the new question buttons
        const newQuestionButtons = messagesContainer.querySelectorAll('.question-btn');
        newQuestionButtons.forEach(button => {
            button.addEventListener('click', () => {
                scrollToBottom();
                handleUserMessage(button.textContent);
                setTimeout(() => { scrollToBottom(); }, 100);
            });
        });
        // Show welcome message
        setTimeout(() => { addWelcomeMessage(); }, 50);
        // Re-enable input
        messageInput.disabled = false;
        sendButton.disabled = false;
        messageInput.value = '';
    }

    // On page load, reset chatbot if empty
    if (messagesContainer && messagesContainer.children.length === 0) {
        resetChatbot();
    }

    // Event Listeners
    closeBtn.addEventListener('click', toggleChatbot);
    
    deleteBtn.addEventListener('click', function() {
        resetChatbot();
    });

    downloadBtn.addEventListener('click', function() {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

        // Add header
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            doc.text('SK Chat Transcript', 20, 20);
            
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 20, 30);
            
            // Add messages
            const messages = Array.from(messagesContainer.querySelectorAll('.message'));
            let yPosition = 50;
            const pageHeight = 280;
            const marginLeft = 20;
            const marginRight = 190;
            
        messages.forEach(msg => {
            const isUser = msg.classList.contains('user-message');
                const sender = isUser ? 'You' : 'SK';
                const text = msg.textContent.trim();
                
                // Check if we need a new page
                if (yPosition > pageHeight) {
                    doc.addPage();
                    yPosition = 20;
                }
                
                // Add sender name
                doc.setFont("helvetica", "bold");
                doc.text(`${sender}:`, marginLeft, yPosition);
                yPosition += 7;
                
                // Add message text with word wrapping
                doc.setFont("helvetica", "normal");
                const textLines = doc.splitTextToSize(text, marginRight - marginLeft);
                
                textLines.forEach(line => {
                    if (yPosition > pageHeight) {
                        doc.addPage();
                        yPosition = 20;
                    }
                    doc.text(line, marginLeft + 5, yPosition);
                    yPosition += 5;
                });
                
                yPosition += 10; // Space between messages
            });
            
            // Save PDF
            doc.save('SK_chat_transcript.pdf');
        } catch (error) {
            console.error('PDF generation failed:', error);
            // Fallback to TXT if PDF fails
            const messages = Array.from(messagesContainer.querySelectorAll('.message'));
            let transcript = 'SK Chat Transcript\n\n';
            
            messages.forEach(msg => {
                const isUser = msg.classList.contains('user-message');
                transcript += `${isUser ? 'You' : 'SK'}: ${msg.textContent}\n\n`;
            });
            
            transcript += `Generated on ${new Date().toLocaleString()}`;
            
            const blob = new Blob([transcript], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'SK_chat_transcript.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    });

    questionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Immediately scroll down when question is clicked
            scrollToBottom();
            
            // Handle the message with additional scroll after it's added
            handleUserMessage(button.textContent);
            
            // Extra scroll to ensure visibility
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        });
    });

    // Replace send button with triangle (paper plane) SVG
    sendButton.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="#ff004f" xmlns="http://www.w3.org/2000/svg"><polygon points="2,21 23,12 2,3 6,12 2,21"/></svg>';
    sendButton.style.background = 'none';
    sendButton.style.border = 'none';
    sendButton.style.display = 'flex';
    sendButton.style.alignItems = 'center';
    sendButton.style.justifyContent = 'center';
    sendButton.style.width = '45px';
    sendButton.style.height = '45px';
    sendButton.style.cursor = 'pointer';
    sendButton.style.padding = '0';

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            // Immediately scroll down when send button is clicked
            scrollToBottom();
            handleUserMessage(message);
            // Extra scroll to ensure visibility
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            const message = messageInput.value.trim();
            if (message) {
                // Immediately scroll down when Enter is pressed
                scrollToBottom();
                handleUserMessage(message);
                // Extra scroll to ensure visibility
                setTimeout(() => {
                    scrollToBottom();
                }, 100);
            }
        }
    });

    // Also handle Enter key on keydown for better responsiveness
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = messageInput.value.trim();
            if (message) {
                // Immediately scroll down when Enter is pressed
                scrollToBottom();
                handleUserMessage(message);
                // Extra scroll to ensure visibility
                setTimeout(() => {
                    scrollToBottom();
                }, 100);
            }
        }
    });

    // Debug: Check API key configuration
    console.log('Chatbot initialized');
    console.log('API Key available:', !!GEMINI_API_KEY);
    console.log('API Key first 10 chars:', GEMINI_API_KEY ? GEMINI_API_KEY.substring(0, 10) : 'NOT FOUND');
    console.log('API URL:', GEMINI_API_URL);
    
    // Test API connection on startup
    testAPIConnection();

    // Add CSS to prevent horizontal overflow and improve spacing
    const style = document.createElement('style');
    style.innerHTML = `
        .message { 
            word-break: break-word !important; 
            white-space: pre-wrap !important; 
            overflow-wrap: break-word !important;
            max-width: 100% !important;
            hyphens: auto !important;
        }
        .messages {
            overflow-x: hidden !important;
            word-wrap: break-word !important;
        }
        .chat-body {
            overflow-x: hidden !important;
        }
    `;
    document.head.appendChild(style);

    // Initialize
    chatbotToggle.style.display = 'block';
    
    // Add welcome message on page load if chatbot is opened
    if (!chatContainer.classList.contains('hidden')) {
        addWelcomeMessage();
    }
    
    // --- Chatbot Scrollbar: Only show when scrolling ---
    (function() {
      function setupChatScrollbar() {
        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer) return;
        let scrollTimeout;
        chatContainer.addEventListener('scroll', () => {
          chatContainer.classList.add('scrolling');
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            chatContainer.classList.remove('scrolling');
          }, 1000);
        });
      }
      // Run on load
      setupChatScrollbar();
      // Also run when toggling chat (in case DOM is reloaded)
      window.addEventListener('click', function(e) {
        if (e.target.classList && (e.target.classList.contains('close-btn') || e.target.classList.contains('chatbot-toggle-img'))) {
          setTimeout(setupChatScrollbar, 300);
        }
      });
    })();
}); 
