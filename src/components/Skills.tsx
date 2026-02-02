
const Skills = () => {
    return (
        <section id="skills" className="full-height px-lg-5">
            <div className="container">
                <div className="row pb-4" data-aos="fade-up">
                    <div className="col-lg-8">
                        <h6 className="text-brand">SKILLS</h6>
                        <h1>My Technical Proficiency</h1>
                    </div>
                </div>
                <div className="row gy-4 justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card skill-card shadow-effect h-100">
                            <div className="card-body text-center">
                                <div className="skill-icon mb-3"><i className="las la-code"></i></div>
                                <h5 className="card-title mb-2">Programming</h5>
                                <p className="card-text">C++, Python, Java, SQL, Spring boot</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card skill-card shadow-effect h-100">
                            <div className="card-body text-center">
                                <div className="skill-icon mb-3"><i className="las la-shield-alt"></i></div>
                                <h5 className="card-title mb-2">Cybersecurity</h5>
                                <p className="card-text">Ethical Hacking, Penetration Testing, Kali Linux, Burp Suite, Nmap, John The Ripper, OSINT</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card skill-card shadow-effect h-100">
                            <div className="card-body text-center">
                                <div className="skill-icon mb-3"><i className="las la-globe"></i></div>
                                <h5 className="card-title mb-2">Web Skills</h5>
                                <p className="card-text">NodeJS, ReactJS, HTML, CSS, Javascript, MongoDB, Streamlit</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card skill-card shadow-effect h-100">
                            <div className="card-body text-center">
                                <div className="skill-icon mb-3"><i className="las la-tools"></i></div>
                                <h5 className="card-title mb-2">Tools & OS</h5>
                                <p className="card-text">Git, Github, Jupyter Notebook, Google Colab, Power BI</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card skill-card shadow-effect h-100">
                            <div className="card-body text-center">
                                <div className="skill-icon mb-3"><i className="las la-cubes"></i></div>
                                <h5 className="card-title mb-2">Libraries/Frameworks</h5>
                                <p className="card-text">Pandas, Numpy, scikit-learn, Tensorflow, Pytorch</p>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`
                    .skill-card {
                        border: 2px solid var(--color-brand);
                        border-radius: 1.5rem;
                        transition: transform 0.2s, box-shadow 0.2s;
                        background: var(--color-base2, #f8f9fa);
                        color: var(--color-body, #333);
                    }
                    .skill-card:hover {
                        transform: translateY(-8px) scale(1.03);
                        box-shadow: 0 8px 32px rgba(0, 191, 255, 0.15);
                        border-color: var(--color-brand2);
                    }
                    .skill-icon {
                        font-size: 2.5rem;
                        color: var(--color-brand);
                    }
                    .skill-card .card-title, .skill-card .card-text {
                        color: var(--color-body, #333) !important;
                    }
                    [data-theme="dark"] .skill-card {
                        background: #23272b;
                        color: #fff;
                    }
                    [data-theme="dark"] .skill-card .card-title, [data-theme="dark"] .skill-card .card-text {
                        color: #fff !important;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default Skills;
