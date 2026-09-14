import React, { useState, useEffect } from 'react';
import PetalCanvas from './components/PetalCanvas';
import CursorInsects from './components/CursorInsects';
import SoundControl from './components/SoundControl';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Gallery from './components/Gallery';
import Sponsors from './components/Sponsors';
import Register from './components/Register';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import RegisterModal from './components/RegisterModal';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [preferredPass, setPreferredPass] = useState('Blossom Pass');
  const [selectedImage, setSelectedImage] = useState(null);

  // Scroll Reveal Observer for bloom animation
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
      }
    );

    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleOpenRegister = (passName) => {
    setPreferredPass(passName || 'Blossom Pass');
    setIsRegisterOpen(true);
  };

  return (
    <div className="udgam-app">
      {/* Fullpage Falling Petals Canvas */}
      <PetalCanvas />

      {/* Bioluminescent Cursor-Following Butterfly & Bee */}
      <CursorInsects />

      {/* Ambient Chimes Audio Toggle */}
      <SoundControl />

      {/* Header & Navbar */}
      <Navbar onClaimPassClick={handleOpenRegister} />

      <main>
        {/* 1. Hero Section */}
        <Hero onRegisterClick={handleOpenRegister} />

        {/* 2. About Section */}
        <About />

        {/* 3. Events Section */}
        <Events onSelectEvent={(event) => setSelectedEvent(event)} />

        {/* 4. Schedule Section */}
        <Schedule />

        {/* 5. Gallery Section */}
        <Gallery onSelectImage={(img) => setSelectedImage(img)} />

        {/* 6. Sponsors Section */}
        <Sponsors />

        {/* 7. Register / CTA Section */}
        <Register onClaimPassClick={handleOpenRegister} />
      </main>

      {/* 8. Footer Section */}
      <Footer />

      {/* MODALS */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegisterEvent={(pass) => {
          setSelectedEvent(null);
          handleOpenRegister(pass);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        defaultPass={preferredPass}
        onClose={() => setIsRegisterOpen(false)}
      />

      <LightboxModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
