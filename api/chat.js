export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Use POST" });
    }

    const { message, context, conversationHistory } = req.body || {};
    if (!message) return res.status(400).json({ error: "Missing message" });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY in Vercel env" });

    const MODEL = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    const prompt = `${context || ""}\n\n${conversationHistory || ""}\n\nUser: ${message}`;

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })
    });

    const raw = await r.text();
    if (!r.ok) return res.status(500).json({ error: "Gemini API error", details: raw });

    const data = JSON.parse(raw);
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry — I couldn’t generate a response.";

    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: "Server crashed", details: String(e) });
  }
}
