
import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

import { GoogleGenerativeAI } from '@google/generative-ai';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite ONLY - Data stored in portfolio.db (project root)
const sqliteDb = new Database("portfolio.db");
sqliteDb.exec(`
  CREATE TABLE IF NOT EXISTS portfolio_data (
    id TEXT PRIMARY KEY, 
    content TEXT
  );
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    email TEXT, 
    message TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    question TEXT, 
    answer TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log('SQLite database ready (portfolio.db)');

// Initial Data (seed if empty)
const initialData = {
  bio: "BCA Final Year student & aspiring Full-Stack Developer from Lucknow, India. Passionate about building scalable web applications and exploring new technologies.",
  skills: [
    { name: "JavaScript", level: 90 },
    { name: "Reactjs", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "Python", level: 75 },
    { name: "Node.js", level: 82 },
    { name: "Express", level: 70 },
    { name: "HTML", level: 70 },
    { name: "CSS", level: 80 },
    { name: "Github", level: 75 }
  ],
  projects: [
    {
      id: "1",
      title: "AI Mock Interviewer",
      description: "An AI-powered platform to practice interviews with real-time feedback.",
      tech: ["React", "Node.js", "Gemini AI", "Tailwind"],
      github: "https://github.com/surajsinghyadav",
      demo: "#",
      image: "https://picsum.photos/seed/ai-interview/800/600"
    },
    {
      id: "2",
      title: "PaperStack",
      description: "A collaborative document management system for students.",
      tech: ["React", "Firebase", "Tailwind"],
      github: "https://github.com/surajsinghyadav",
      demo: "#",
      image: "https://picsum.photos/seed/paperstack/800/600"
    },
    {
      id: "3",
      title: "SilentZone",
      description: "A productivity app that helps users focus by blocking distractions.",
      tech: ["Kotlin", "Android SDK", "SQLite"],
      github: "https://github.com/surajsinghyadav",
      demo: "#",
      image: "https://picsum.photos/seed/silentzone/800/600"
    },
    {
      id: "4",
      title: "PassVault",
      description: "Secure password manager with end-to-end encryption.",
      tech: ["React Native", "Node.js", "MongoDB"],
      github: "https://github.com/surajsinghyadav",
      demo: "#",
      image: "https://picsum.photos/seed/passvault/800/600"
    },
    {
      id: "5",
      title: "Real Estate Portal",
      description: "A comprehensive platform for buying and selling properties.",
      tech: ["React", "Express", "MongoDB"],
      github: "https://github.com/surajsinghyadav",
      demo: "#",
      image: "https://picsum.photos/seed/realestate/800/600"
    }
  ],
  experience: [
    {
      period: "2023 - 2026",
      title: "BCA Student",
      company: "BBDU, Lucknow",
      description: "Focusing on core computer science concepts and web development."
    },
    {
      period: "(3 Months) 2026-present",
      title: "Full-Stack Intern",
      company: "Unlock Discounts",
      description: "Developed and maintained web applications using the MERN stack."
    },
    {
      period: "2022 - 2023",
      title: "Class 12th",
      School: "Dalimss Sunbeam school",
      description: "Building custom websites and mobile apps for various clients."
    }
  ]
};


// Seed if empty
const existingData = sqliteDb.prepare("SELECT * FROM portfolio_data WHERE id = ?").get("main");
if (!existingData) {
  sqliteDb.prepare("INSERT INTO portfolio_data (id, content) VALUES (?, ?)")
    .run("main", JSON.stringify(initialData));
  console.log('Initial portfolio data seeded to SQLite');
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // API Routes - SQLite ONLY 
  app.get("/api/portfolio", (req, res) => {
    try {
      const data = sqliteDb.prepare("SELECT content FROM portfolio_data WHERE id = ?").get("main") as any;
      res.json(JSON.parse(data.content));
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch portfolio data" });
    }
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    sqliteDb.prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)")
      .run(name, email, message);
    
    res.json({ success: true, message: "Message saved! Suraj will reply soon." });
  });

  app.post("/api/chat/save", (req, res) => {
    const { question, answer } = req.body;
    sqliteDb.prepare("INSERT INTO chats (question, answer) VALUES (?, ?)")
      .run(question, answer);
    res.json({ success: true });
  });






  app.post("/api/chat", async (req, res) => {
  const { question, portfolioData } = req.body;
  
  if (!question) {
    return res.status(400).json({ error: "Question required" });
  }

  try {
    console.log('Chat request:', question.slice(0, 50) + '...');
    
    // Backend reads YOUR .env key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Build prompt with portfolio data
    const prompt = `
Portfolio of Rachna Yadav:
${JSON.stringify(portfolioData || {})}

User Question: ${question}

Answer concisely and professionally about projects, skills, experience.
    `.trim();
    
    const result = await model.generateContent(prompt);
    const answer = await result.response.text();
    
    // Save to SQLite
    sqliteDb.prepare("INSERT INTO chats (question, answer) VALUES (?, ?)")
      .run(question, answer);
    
    console.log('AI responded');
    res.json({ answer });
    
  } catch (error: any) {
    console.error('AI Error:', error.message);
    res.status(500).json({ 
      error: "AI service unavailable. Try again later.",
      details: error.message 
    });
  }
});







  // Vite dev/prod (unchanged)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
}

startServer();
