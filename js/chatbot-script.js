document.addEventListener('DOMContentLoaded', function () {

  // Backend endpoint
  const BACKEND_CHAT_URL = "/api/chat";

  // DOM Elements
  const messagesContainer = document.querySelector('.messages');
  const questionButtons = document.querySelectorAll('.question-btn');
  const messageInput = document.querySelector('.message-input');
  const sendButton = document.querySelector('.send-btn');
  const chatContainer = document.querySelector('.chat-container');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatHeader = document.querySelector('.chat-header');

  console.log('✅ Chat container scroll configuration complete');

  // --- Header buttons (download / clear / close) ---
  const oldCloseBtn = chatHeader.querySelector('.close-btn');
  if (oldCloseBtn) oldCloseBtn.remove();
  const oldDeleteBtn = chatHeader.querySelector('.delete-btn');
  if (oldDeleteBtn) oldDeleteBtn.remove();
  const oldBtnGroup = chatHeader.querySelector('.header-btn-group');
  if (oldBtnGroup) oldBtnGroup.remove();

  let btnGroup = document.createElement('div');
  btnGroup.className = 'header-btn-group';
  btnGroup.style.display = 'flex';
  btnGroup.style.alignItems = 'center';
  btnGroup.style.marginLeft = 'auto';

  let downloadBtn = document.createElement('button');
  downloadBtn.className = 'download-btn';
  downloadBtn.title = 'Download chat transcript';
  downloadBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
  downloadBtn.style.background = 'none';
  downloadBtn.style.border = 'none';
  downloadBtn.style.cursor = 'pointer';
  downloadBtn.style.marginRight = '8px';
  downloadBtn.style.padding = '0';

  let deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.title = 'Clear chat';
  deleteBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
  deleteBtn.style.background = 'none';
  deleteBtn.style.border = 'none';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.style.marginRight = '8px';
  deleteBtn.style.padding = '0';

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

  btnGroup.appendChild(downloadBtn);
  btnGroup.appendChild(deleteBtn);
  btnGroup.appendChild(closeBtn);
  chatHeader.appendChild(btnGroup);

  // --- Source of truth: JSON in index.html ---
  function loadPortfolioJSON() {
    try {
      const el = document.getElementById("portfolio-data");
      if (!el) return null;
      const raw = el.textContent?.trim();
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn("⚠️ portfolio-data JSON parse failed:", e);
      return null;
    }
  }

  // --- Fallback only (if JSON block missing) ---
  function fallbackDOMData() {
    const name = document.querySelector('.header-text h1 span')?.textContent || 'Sanjai Bala';
    const about = Array.from(document.querySelectorAll('#about p')).map(p => p.textContent.trim()).join(' ');
    const skills = Array.from(document.querySelectorAll('#skills ul li span')).map(s => s.textContent);
    return {
      name,
      headline: "",
      about,
      email: "",
      phone: "",
      location: "",
      links: {},
      skills,
      education: [],
      experience: [],
      projects: []
    };
  }

  function normalizePortfolioData(p) {
    const data = p || {};
    data.links = data.links || {};
    data.skills = Array.isArray(data.skills) ? data.skills : [];
    data.education = Array.isArray(data.education) ? data.education : [];
    data.experience = Array.isArray(data.experience) ? data.experience : [];
    data.projects = Array.isArray(data.projects) ? data.projects : [];
    return data;
  }

  function buildPortfolioContext() {
    const json = loadPortfolioJSON();
    const data = normalizePortfolioData(json || fallbackDOMData());

    const expLines = data.experience.map((e, i) => {
      const status = (e.status || "").toUpperCase() || "PAST";
      const highlights = Array.isArray(e.highlights) ? e.highlights : [];
      const metrics = Array.isArray(e.metrics) ? e.metrics : [];
      return `${i + 1}. ${e.title || ""} at ${e.company || ""} (${e.dates || ""}) [${status}]
- Highlights: ${highlights.join(" | ")}
- Impact: ${metrics.join(" | ")}`.trim();
    });

    const projectLines = data.projects.map((pr, i) => {
      const tech = Array.isArray(pr.tech) ? pr.tech.join(", ") : "";
      return `${i + 1}. ${pr.name}: ${pr.summary}${pr.link ? ` (Link: ${pr.link})` : ""}${tech ? ` | Tech: ${tech}` : ""}`;
    });

    return `
You are SK — Sanjai Bala’s AI assistant.

GOAL:
Be friendly, professional, concise, and impressive. Your audience may be HR, recruiters, hiring managers, or engineers.

ABSOLUTE RULES:
- Never use labeled templates like "Summary:" or "Key Points:".
- Never output headings like "Summary" / "Key Points" / "Conclusion".
- Keep answers conversational and easy to read.
- Use short paragraphs. Use bullets only when helpful.
- Do not hallucinate. Use only the portfolio data provided.
- Roles marked [PAST] are completed. Never describe them as "upcoming".

GREETING BEHAVIOR:
If the user says hi/hey/hello or small talk, respond in 1–2 sentences:
"Hey there — I’m SK, Sanjai Bala’s assistant. Ask me about his experience, skills, projects, or research."

CONTENT TO USE (SOURCE OF TRUTH):
PROFILE:
- Name: ${data.name || "Sanjai Bala"}
- Headline: ${data.headline || ""}
- Location: ${data.location || ""}
- Email: ${data.email || ""}
- Phone: ${data.phone || ""}
- Links: ${Object.entries(data.links || {}).map(([k, v]) => `${k}: ${v}`).join(" | ")}

SKILLS:
${(data.skills || []).join(", ")}

EDUCATION:
${(data.education || []).join("\n")}

EXPERIENCE:
${expLines.join("\n")}

PROJECTS:
${projectLines.join("\n")}

HOW TO ANSWER WELL:
- For experience questions: mention role, domain, tech, and measurable impact.
- For skills questions: prioritize the most relevant skills; avoid listing everything.
- For project questions: explain problem → approach → tech → impact, briefly.
- For "why hire": emphasize impact, ownership, speed, and applied AI strength.
`.trim();
  }

  // Conversation context
  function buildConversationContext() {
    const msgs = Array.from(messagesContainer.querySelectorAll('.message'));
    let history = '';
    msgs.forEach(m => {
      const isUser = m.classList.contains('user-message');
      const content = (m.textContent || m.innerText || '').trim();
      if (!content) return;
      history += isUser ? `Human: ${content}\n` : `SK: ${content}\n`;
    });
    return history;
  }

  // Normalize AI response (NO Summary/Key Points injection)
  function normalizeAIResponse(text) {
    if (!text) return "";

    // Remove any lingering "Summary/Key Points" labels if model outputs them
    text = text.replace(/^\s*Summary:\s*/gmi, "");
    text = text.replace(/^\s*Key Points:\s*/gmi, "");

    // Convert asterisks to clean bullets
    text = text.replace(/^\s*\*\s+/gm, "• ");
    text = text.replace(/^\s*-\s+/gm, "• ");

    // Remove duplicated assistant intro if it repeats too often (but allow greetings)
    // If message already contains "I'm SK" more than once, reduce duplicates
    const introMatches = text.match(/I[’']?m SK|I am SK/gi) || [];
    if (introMatches.length > 1) {
      // remove all but first
      let seen = 0;
      text = text.replace(/(I[’']?m SK|I am SK)[^.\n]*\.?/gi, (m) => {
        seen += 1;
        return seen === 1 ? m : "";
      });
    }

    // Clean spacing
    text = text.replace(/\n{3,}/g, "\n\n").trim();

    return text;
  }

  // API call
  async function getAIResponse(userMessage) {
    try {
      const res = await fetch(BACKEND_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Remove "structured" wording that can bias Summary/Key Points
          message: `Reply as SK: friendly, professional, concise, and recruiter-friendly. Do NOT use "Summary" or "Key Points" labels. User message: ${userMessage}`,
          context: buildPortfolioContext(),
          conversationHistory: buildConversationContext()
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`API Error: ${res.status} - ${errText}`);
      }

      const data = await res.json();
      return normalizeAIResponse(data.text || "");
    } catch (e) {
      console.error("Error fetching AI response:", e);
      return "Sorry — I’m having trouble right now. Please try again.";
    }
  }

  // Scroll marker
  const scrollMarker = document.createElement('div');
  scrollMarker.id = 'scroll-marker';
  scrollMarker.style.height = '1px';
  scrollMarker.style.width = '1px';
  scrollMarker.style.opacity = '0';
  messagesContainer.appendChild(scrollMarker);

  function scrollToBottom() {
    const marker = document.getElementById('scroll-marker');
    if (!marker) return;
    marker.scrollIntoView({ behavior: 'auto', block: 'end' });
    setTimeout(() => marker.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
    if (chatContainer) setTimeout(() => { chatContainer.scrollTop = chatContainer.scrollHeight; }, 100);
  }

  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');

    // Render: keep it clean and readable (no Summary/Key Points formatting)
    const safeText = (text || "").trim();

    const formattedText = safeText
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    messageDiv.innerHTML = formattedText;

    const marker = document.getElementById('scroll-marker');
    if (marker && marker.parentNode === messagesContainer) {
      messagesContainer.insertBefore(messageDiv, marker);
    } else {
      messagesContainer.appendChild(messageDiv);
    }
    scrollToBottom();
  }

  async function handleUserMessage(text) {
    if (!text.trim()) return;

    addMessage(text, true);
    messageInput.value = '';
    scrollToBottom();

    // typing indicator
    const typing = document.createElement('div');
    typing.classList.add('message', 'bot-message', 'typing-indicator');
    typing.innerHTML = '<span></span><span></span><span></span>';

    const marker = document.getElementById('scroll-marker');
    if (marker && marker.parentNode === messagesContainer) {
      messagesContainer.insertBefore(typing, marker);
    } else {
      messagesContainer.appendChild(typing);
    }
    scrollToBottom();

    const reply = await getAIResponse(text);
    try { messagesContainer.removeChild(typing); } catch {}
    addMessage(reply, false);
    scrollToBottom();
  }

  function addWelcomeMessage() {
    const msgs = messagesContainer.querySelectorAll('.message');
    if (msgs.length === 0) {
      addMessage("Hey there — I’m SK, Sanjai Bala’s assistant. Ask me about his experience, skills, projects, or research.");
    }
  }

  function toggleChatbot() {
    if (chatContainer.classList.contains('hidden')) {
      chatContainer.classList.remove('hidden');
      chatbotToggle.style.display = 'none';
      setTimeout(addWelcomeMessage, 50);
    } else {
      chatContainer.classList.add('hidden');
      chatbotToggle.style.display = 'block';
    }
  }
  window.toggleChatbot = toggleChatbot;

  function resetChatbot() {
    messagesContainer.innerHTML = `
      <div class="suggested-questions">
        <button class="question-btn">What are your biggest accomplishments?</button>
        <button class="question-btn">What AI work are you strongest in?</button>
        <button class="question-btn">Which projects should I see?</button>
        <button class="question-btn">Why should we hire you?</button>
      </div>
    `;
    const newMarker = document.createElement('div');
    newMarker.id = 'scroll-marker';
    newMarker.style.height = '1px';
    newMarker.style.width = '1px';
    newMarker.style.opacity = '0';
    messagesContainer.appendChild(newMarker);

    const newButtons = messagesContainer.querySelectorAll('.question-btn');
    newButtons.forEach(btn => btn.addEventListener('click', () => handleUserMessage(btn.textContent)));
    setTimeout(addWelcomeMessage, 50);
  }

  // Events
  closeBtn.addEventListener('click', toggleChatbot);
  deleteBtn.addEventListener('click', resetChatbot);

  questionButtons.forEach(button => {
    button.addEventListener('click', () => {
      scrollToBottom();
      handleUserMessage(button.textContent);
      setTimeout(scrollToBottom, 100);
    });
  });

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
    const msg = messageInput.value.trim();
    if (msg) handleUserMessage(msg);
  });

  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const msg = messageInput.value.trim();
      if (msg) handleUserMessage(msg);
    }
  });

  // Styling to avoid overflow
  const style = document.createElement('style');
  style.innerHTML = `
    .message { word-break: break-word !important; white-space: pre-wrap !important; overflow-wrap: break-word !important; max-width: 100% !important; }
    .messages { overflow-x: hidden !important; word-wrap: break-word !important; }
    .chat-body { overflow-x: hidden !important; }
  `;
  document.head.appendChild(style);

  chatbotToggle.style.display = 'block';
  if (!chatContainer.classList.contains('hidden')) addWelcomeMessage();

});
