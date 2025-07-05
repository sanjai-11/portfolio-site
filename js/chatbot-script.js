document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatBody = document.querySelector('.chat-body');
    const messagesContainer = document.querySelector('.messages');
    const questionButtons = document.querySelectorAll('.question-btn');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-btn');
    const chatContainer = document.querySelector('.chat-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatHeader = document.querySelector('.chat-header');

    // Remove any existing close/delete buttons in header (if present)
    const oldCloseBtn = chatHeader.querySelector('.close-btn');
    if (oldCloseBtn) oldCloseBtn.remove();
    const oldDeleteBtn = chatHeader.querySelector('.delete-btn');
    if (oldDeleteBtn) oldDeleteBtn.remove();
    const oldBtnGroup = chatHeader.querySelector('.header-btn-group');
    if (oldBtnGroup) oldBtnGroup.remove();

    // Create a flex container for right-side header buttons
    let btnGroup = document.createElement('div');
    btnGroup.className = 'header-btn-group';
    btnGroup.style.display = 'flex';
    btnGroup.style.alignItems = 'center';
    btnGroup.style.marginLeft = 'auto';

    // Create download button (icon-only, white icon)
    let downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.title = 'Download chat transcript';
    downloadBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
    downloadBtn.style.background = 'none';
    downloadBtn.style.border = 'none';
    downloadBtn.style.cursor = 'pointer';
    downloadBtn.style.marginRight = '8px';
    downloadBtn.style.padding = '0';
    downloadBtn.style.display = 'flex';
    downloadBtn.style.alignItems = 'center';

    // Create delete button (icon-only, no box, white icon)
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.title = 'Clear chat';
    deleteBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
    deleteBtn.style.background = 'none';
    deleteBtn.style.border = 'none';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.marginRight = '8px';
    deleteBtn.style.padding = '0';
    deleteBtn.style.display = 'flex';
    deleteBtn.style.alignItems = 'center';

    // Create minimize (close) button
    let minimizeBtn = document.createElement('button');
    minimizeBtn.className = 'close-btn';
    minimizeBtn.title = 'Minimize';
    minimizeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    minimizeBtn.style.background = 'none';
    minimizeBtn.style.border = 'none';
    minimizeBtn.style.color = '#fff';
    minimizeBtn.style.fontSize = '20px';
    minimizeBtn.style.cursor = 'pointer';
    minimizeBtn.style.padding = '0 4px';
    minimizeBtn.style.display = 'flex';
    minimizeBtn.style.alignItems = 'center';

    // Add download, delete and minimize buttons to the group (download left, delete left, minimize right)
    btnGroup.appendChild(downloadBtn);
    btnGroup.appendChild(deleteBtn);
    btnGroup.appendChild(minimizeBtn);
    chatHeader.appendChild(btnGroup);

    // Insert download button to the left of deleteBtn
    btnGroup.insertBefore(downloadBtn, deleteBtn);

    // Minimize button event
    minimizeBtn.addEventListener('click', function() {
        toggleChatbot();
    });

    // Helper: get portfolio/contact links from DOM
    function getPortfolioLinks() {
        const github = document.querySelector('.social-icons a[href*="github"]')?.href || 'https://github.com/sanjai-11';
        const linkedin = document.querySelector('.social-icons a[href*="linkedin"]')?.href || 'https://www.linkedin.com/in/sanjai-bala/';
        const leetcode = 'https://leetcode.com/u/sanjai-11/';
        const instagram = document.querySelector('.social-icons a[href*="instagram"]')?.href || 'https://www.instagram.com/bksanjai7';
        const resume = '/portfolio_pictures/Sanjaikumar_Balasubramaniyan_Resume.pdf';
        return { github, linkedin, leetcode, instagram, resume };
    }

    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        const links = getPortfolioLinks();
        // Resume download button logic
        if (!isUser && text.includes('[DOWNLOAD_RESUME]')) {
            const [before, after] = text.split('[DOWNLOAD_RESUME]');
            if (before && before.trim()) {
                const spanBefore = document.createElement('span');
                spanBefore.textContent = before.trim() + ' ';
                messageDiv.appendChild(spanBefore);
            }
            // Add instruction text
            const info = document.createElement('div');
            info.textContent = 'Click the below button to download the resume.';
            info.style.fontSize = '13px';
            info.style.marginBottom = '4px';
            messageDiv.appendChild(info);
            // Small Download Resume button
            const btn = document.createElement('a');
            btn.href = '/portfolio_pictures/Sanjaikumar_Balasubramaniyan_Resume.pdf';
            btn.textContent = 'Download Resume';
            btn.className = 'btn btn2';
            btn.style.margin = '0 0 0 0';
            btn.style.display = 'inline-block';
            btn.style.fontSize = '12px';
            btn.style.fontWeight = 'bold';
            btn.style.textAlign = 'center';
            btn.style.cursor = 'pointer';
            btn.style.padding = '6px 16px';
            btn.style.borderRadius = '6px';
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const link = document.createElement('a');
                link.href = btn.href;
                link.download = 'Sanjaikumar_Balasubramaniyan_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
            messageDiv.appendChild(btn);
            if (after && after.trim()) {
                const spanAfter = document.createElement('span');
                spanAfter.textContent = ' ' + after.trim();
                messageDiv.appendChild(spanAfter);
            }
        } else if (!isUser && /github|linkedin|leetcode|instagram/i.test(text)) {
            // Link button logic
            // Find all known links in the text and show as buttons
            const linkButtons = [];
            let infoText = '';
            if (/github/i.test(text)) infoText = 'Click the below button to get my GitHub.';
            if (/linkedin/i.test(text)) infoText = 'Click the below button to get my LinkedIn.';
            if (/leetcode/i.test(text)) infoText = 'Click the below button to get my LeetCode.';
            if (/instagram/i.test(text)) infoText = 'Click the below button to get my Instagram.';
            if (infoText) {
                const info = document.createElement('div');
                info.textContent = infoText;
                info.style.fontSize = '13px';
                info.style.marginBottom = '4px';
                messageDiv.appendChild(info);
            }
            if (/github/i.test(text)) {
                const btn = document.createElement('a');
                btn.href = links.github;
                btn.target = '_blank';
                btn.rel = 'noopener noreferrer';
                btn.textContent = 'GitHub';
                btn.className = 'btn btn2';
                btn.style.margin = '0 8px 0 0';
                btn.style.display = 'inline-block';
                btn.style.fontSize = '12px';
                btn.style.fontWeight = 'bold';
                btn.style.textAlign = 'center';
                btn.style.cursor = 'pointer';
                btn.style.padding = '6px 16px';
                btn.style.borderRadius = '6px';
                linkButtons.push(btn);
            }
            if (/linkedin/i.test(text)) {
                const btn = document.createElement('a');
                btn.href = links.linkedin;
                btn.target = '_blank';
                btn.rel = 'noopener noreferrer';
                btn.textContent = 'LinkedIn';
                btn.className = 'btn btn2';
                btn.style.margin = '0 8px 0 0';
                btn.style.display = 'inline-block';
                btn.style.fontSize = '12px';
                btn.style.fontWeight = 'bold';
                btn.style.textAlign = 'center';
                btn.style.cursor = 'pointer';
                btn.style.padding = '6px 16px';
                btn.style.borderRadius = '6px';
                linkButtons.push(btn);
            }
            if (/leetcode/i.test(text)) {
                const btn = document.createElement('a');
                btn.href = links.leetcode;
                btn.target = '_blank';
                btn.rel = 'noopener noreferrer';
                btn.textContent = 'LeetCode';
                btn.className = 'btn btn2';
                btn.style.margin = '0 8px 0 0';
                btn.style.display = 'inline-block';
                btn.style.fontSize = '12px';
                btn.style.fontWeight = 'bold';
                btn.style.textAlign = 'center';
                btn.style.cursor = 'pointer';
                btn.style.padding = '6px 16px';
                btn.style.borderRadius = '6px';
                linkButtons.push(btn);
            }
            if (/instagram/i.test(text)) {
                const btn = document.createElement('a');
                btn.href = links.instagram;
                btn.target = '_blank';
                btn.rel = 'noopener noreferrer';
                btn.textContent = 'Instagram';
                btn.className = 'btn btn2';
                btn.style.margin = '0 8px 0 0';
                btn.style.display = 'inline-block';
                btn.style.fontSize = '12px';
                btn.style.fontWeight = 'bold';
                btn.style.textAlign = 'center';
                btn.style.cursor = 'pointer';
                btn.style.padding = '6px 16px';
                btn.style.borderRadius = '6px';
                linkButtons.push(btn);
            }
            // Add all link buttons to the messageDiv
            if (linkButtons.length) {
                linkButtons.forEach(btn => messageDiv.appendChild(btn));
            } else {
                messageDiv.textContent = text;
            }
        } else {
            // Fallback: normal text or previous logic
            const resumeRegex = /(https?:\/\/\S+portfolio_pictures\/Sanjaikumar_Balasubramaniyan_Resume\.pdf)/i;
            if (!isUser && resumeRegex.test(text)) {
                const parts = text.split(resumeRegex);
                messageDiv.innerHTML = '';
                parts.forEach(part => {
                    if (resumeRegex.test(part)) {
                        const btn = document.createElement('a');
                        btn.href = part;
                        btn.target = '_blank';
                        btn.rel = 'noopener noreferrer';
                        btn.download = '';
                        btn.textContent = 'Download Resume';
                        btn.className = 'btn btn2';
                        btn.style.margin = '8px 0 0 0';
                        btn.style.display = 'inline-block';
                        btn.style.fontSize = '15px';
                        btn.style.fontWeight = 'bold';
                        btn.style.textAlign = 'center';
                        btn.style.cursor = 'pointer';
                        btn.addEventListener('click', function(e) {
                            e.preventDefault();
                            const link = document.createElement('a');
                            link.href = btn.href;
                            link.download = 'Sanjaikumar_Balasubramaniyan_Resume.pdf';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        });
                        messageDiv.appendChild(btn);
                    } else {
                        const span = document.createElement('span');
                        span.textContent = part;
                        messageDiv.appendChild(span);
                    }
                });
            } else {
                messageDiv.textContent = text;
            }
        }
        messagesContainer.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Function to get AI response from our backend
    async function getAIResponse(userMessage) {
        try {
            // Use dynamic URL that works both locally and when hosted
            const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                ? 'http://localhost:3000/api/chat'
                : 'https://your-backend-url.railway.app/api/chat'; // This will be updated with actual Railway URL
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return data.response;
        } catch (error) {
            console.error('Error fetching AI response:', error);
            return "I apologize, but I'm having trouble connecting to my AI service right now. Please try again later or contact Sanjai directly at sanjaibala11@gmail.com.";
        }
    }

    // Function to handle user message
    async function handleUserMessage(text) {
        if (!text.trim()) return;
        addMessage(text, true);
        messageInput.value = '';
        // Intercept resume/cv requests and show button directly
        if (/\b(resume|cv|curriculum vitae)\b/i.test(text)) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'bot-message');
            // Add instruction text
            const info = document.createElement('div');
            info.textContent = 'Click the below button to download the resume.';
            info.style.fontSize = '13px';
            info.style.marginBottom = '4px';
            messageDiv.appendChild(info);
            // Small Download Resume button
            const btn = document.createElement('a');
            btn.href = '/portfolio_pictures/Sanjaikumar_Balasubramaniyan_Resume.pdf';
            btn.textContent = 'Download Resume';
            btn.className = 'btn btn2';
            btn.style.margin = '0 0 0 0';
            btn.style.display = 'inline-block';
            btn.style.fontSize = '12px';
            btn.style.fontWeight = 'bold';
            btn.style.textAlign = 'center';
            btn.style.cursor = 'pointer';
            btn.style.padding = '6px 16px';
            btn.style.borderRadius = '6px';
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const link = document.createElement('a');
                link.href = btn.href;
                link.download = 'Sanjaikumar_Balasubramaniyan_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
            messageDiv.appendChild(btn);
            messagesContainer.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
            return;
        }
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
            addMessage("Hi there! I'm SK11, Sanjai Bala's AI assistant. I'll be chatting with you instead of Sanjai. Feel free to ask me anything about Sanjai's skills, projects, experience, or research work. I'll be happy to share more details!");
        }
    }

    // Show/hide chatbot toggle button based on chat visibility
    function updateChatbotToggleVisibility() {
        if (chatContainer.classList.contains('hidden')) {
            chatbotToggle.style.display = 'block';
        } else {
            chatbotToggle.style.display = 'none';
        }
    }

    // Toggle chatbot open/close and clear chat on close
    function toggleChatbot() {
        if (chatContainer.classList.contains('hidden')) {
            chatContainer.classList.remove('hidden');
            addWelcomeMessage();
        } else {
            chatContainer.classList.add('hidden');
            // Do NOT clear messages here
        }
        updateChatbotToggleVisibility();
    }

    // Attach toggleChatbot to the global scope so HTML can call it
    window.toggleChatbot = toggleChatbot;

    // Delete button event: clear chat
    deleteBtn.addEventListener('click', function() {
        messagesContainer.innerHTML = '';
    });

    // Download transcript logic
    downloadBtn.addEventListener('click', function() {
        const tempContainer = document.createElement('div');
        tempContainer.style.width = '500px';
        tempContainer.style.padding = '20px';
        tempContainer.style.backgroundColor = '#fff';
        tempContainer.style.fontFamily = 'Poppins, Arial, sans-serif';

        // Add header
        const header = document.createElement('div');
        header.style.textAlign = 'center';
        header.style.marginBottom = '20px';
        header.style.padding = '16px 10px';
        header.style.backgroundColor = '#ff004f';
        header.style.color = '#fff';
        header.style.borderRadius = '16px';
        header.style.fontWeight = 'bold';
        header.style.fontSize = '2rem';
        header.innerHTML = 'SK11 Chat Transcript';
        tempContainer.appendChild(header);

        // Get all messages and create chat bubbles
        const messages = messagesContainer.querySelectorAll('.message');
        messages.forEach(msg => {
            const bubble = document.createElement('div');
            bubble.style.margin = '18px 0';
            bubble.style.display = 'flex';
            bubble.style.flexDirection = 'column';
            const isUser = msg.classList.contains('user-message');
            bubble.style.alignItems = isUser ? 'flex-end' : 'flex-start';

            const messageContent = document.createElement('div');
            messageContent.style.maxWidth = '320px';
            messageContent.style.width = 'fit-content';
            messageContent.style.padding = '14px 18px';
            messageContent.style.borderRadius = '18px';
            messageContent.style.backgroundColor = isUser ? '#ff004f' : '#e5e7eb';
            messageContent.style.boxShadow = '0 1px 4px rgba(0,0,0,0.10)';
            messageContent.style.position = 'relative';
            messageContent.style.marginLeft = isUser ? 'auto' : '0';
            messageContent.style.marginRight = isUser ? '0' : 'auto';
            messageContent.style.fontSize = '16px';
            messageContent.style.fontFamily = 'Poppins, Arial, sans-serif';
            messageContent.style.color = isUser ? '#fff' : '#222';
            messageContent.style.wordBreak = 'break-word';
            messageContent.style.whiteSpace = 'pre-wrap';
            messageContent.textContent = msg.textContent;

            const label = document.createElement('div');
            label.style.fontSize = '14px';
            label.style.fontWeight = 'bold';
            label.style.margin = isUser ? '0 10px 5px 0' : '0 0 5px 10px';
            label.style.textAlign = isUser ? 'right' : 'left';
            label.textContent = isUser ? 'You' : 'SK11 AI';
            label.style.color = isUser ? '#222' : '#ff004f';

            bubble.appendChild(label);
            bubble.appendChild(messageContent);
            tempContainer.appendChild(bubble);
        });

        // Add timestamp
        const timestamp = document.createElement('div');
        timestamp.style.textAlign = 'center';
        timestamp.style.marginTop = '20px';
        timestamp.style.color = '#888';
        timestamp.style.fontSize = '13px';
        timestamp.textContent = `Generated on ${new Date().toLocaleString()}`;
        tempContainer.appendChild(timestamp);

        document.body.appendChild(tempContainer); // Add to DOM for rendering
        html2canvas(tempContainer, {
            scale: 2,
            backgroundColor: '#fff'
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('SK11_chat_transcript.pdf');
            document.body.removeChild(tempContainer); // Clean up
        });
    });

    // On page load, set correct visibility
    updateChatbotToggleVisibility();

    // Event Listeners
    questionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const questionText = button.textContent;
            handleUserMessage(questionText);
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
        handleUserMessage(messageInput.value);
    });
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage(messageInput.value);
        }
    });

    // Add this to ensure long messages wrap and don't overflow
    const style = document.createElement('style');
    style.innerHTML = `.message { word-break: break-word; white-space: pre-line; } .resume-download-btn:hover { background: #d60043 !important; }`;
    document.head.appendChild(style);
}); 