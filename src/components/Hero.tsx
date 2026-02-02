import { useEffect } from 'react';

const Hero = () => {
    return (
        <section id="home" className="full-height px-lg-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10">
                        <div className="wrapper">
                            <div className="static-txt">I'm a</div>
                            <ul className="dynamic-txts">
                                <div className="floating-shapes">
                                    <div className="shape"></div>
                                    <div className="shape"></div>
                                    <div className="shape"></div>
                                </div>
                                <li><span>Developer</span></li>
                                <li><span>DSA Solver</span></li>
                                <li><span>Ethical Hacker</span></li>
                                <li><span>Designer</span></li>
                                <li><span>Problem Solver</span></li>
                                <li><span>Tech Enthusiast</span></li>
                                <li><span>Code Artist</span></li>
                                <li><span>Team Player</span></li>
                            </ul>
                        </div>
                        <p className="lead mt-2 mb-4" data-aos="fade-up" data-aos-delay="300">
                            I'm a versatile web designer, ethical hacker, and freelancer with strong skills in HTML, CSS, JavaScript, Python, C, and C++. I'm passionate about creating visually stunning websites with seamless functionality.
                        </p>
                        <div data-aos="fade-up" data-aos-delay="600">
                            <a href="#work" className="btn btn-brand me-3 mb-2 btn-hover-slide">
                                <span className="btn-text">Explore My Work</span>
                                <span className="btn-icon">🚀</span>
                            </a>
                            <a href="https://drive.google.com/file/d/14JcEkdm40r_fEIkkBBFLdKOz7PTXOlm_/view?usp=sharing" className="btn btn-brand me-3 mb-2 btn-hover-slide" target="_blank">
                                <span className="btn-text">View Resume</span>
                                <span className="btn-icon">📄</span>
                            </a>
                            <a href="mailto:pralin.khaira.1903@gmail.com" className="btn btn-brand me-3 mb-2 btn-hover-slide">
                                <span className="btn-text">Email Me</span>
                                <span className="btn-icon">✉️</span>
                            </a>
                            <a href="tel: +917780831020" className="btn btn-brand me-3 mb-2 btn-hover-slide">
                                <span className="btn-text">Call Me</span>
                                <span className="btn-icon">📞</span>
                            </a>
                            <a href="https://www.linkedin.com/in/pralinkhaira/" className="btn btn-brand me-3 mb-2 btn-hover-slide" target="_blank">
                                <span className="btn-text">LinkedIn</span>
                                <span className="btn-icon">🔗</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
