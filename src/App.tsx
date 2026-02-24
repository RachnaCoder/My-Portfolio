import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { PortfolioData } from './types';

export default function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Expected JSON but received:", text.substring(0, 100));
          throw new Error("Server returned non-JSON response. Check server logs.");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        {data && (
          <>
            <About bio={data.bio} />
            <Skills skills={data.skills} />
            <Projects projects={data.projects} />
            <Experience experience={data.experience} />
          </>
        )}
        <Contact />
      </main>
      <Footer />
      <Chatbot portfolioData={data} />
    </div>
  );
}
