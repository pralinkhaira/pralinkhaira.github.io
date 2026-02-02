import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Skills from './components/Skills';
import Blogs from './components/Blogs';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AOS from 'aos';

function App() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }, []);

    return (
        <div className="App">
            <Navbar />
            <div id="content-wrapper">
                <Hero />
                <Work />
                <About />
                <Skills />
                <Blogs />
                <Certifications />
                <Contact />
                <Footer />
            </div>
        </div>
    )
}

export default App
