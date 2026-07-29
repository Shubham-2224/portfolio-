import { useState, useCallback } from "react";
import LoadingScreen from "./components/LoadingScreen";
import AmbientBackground from "./components/ui/AmbientBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <AmbientBackground />
      <div className={`relative min-h-screen ${loading ? "overflow-hidden h-screen" : ""}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Education />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
