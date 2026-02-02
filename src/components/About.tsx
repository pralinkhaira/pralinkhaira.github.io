import { useState } from 'react';
import { experience, education, miscellaneous } from '../data';

const About = () => {
    const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'extra'>('experience');

    return (
        <section id="about" className="full-height px-lg-5">
            <div className="container">
                <div className="row pb-4" data-aos="fade-up">
                    <div className="col-lg-8">
                        <h6 className="text-brand">ABOUT</h6>
                        <h1>My Education & Experience</h1>
                    </div>
                </div>

                <div className="row gy-5" data-aos="fade-up">
                    <div className="col-lg-12">
                        <div className="btn-group" role="group">
                            <button
                                className={`btn btn-secondary toggle-btn ${activeTab === 'education' ? 'active' : ''}`}
                                onClick={() => setActiveTab('education')}
                            >
                                Education
                            </button>
                            <button
                                className={`btn btn-secondary toggle-btn ${activeTab === 'experience' ? 'active' : ''}`}
                                onClick={() => setActiveTab('experience')}
                            >
                                Experience
                            </button>
                            <button
                                className={`btn btn-secondary toggle-btn ${activeTab === 'extra' ? 'active' : ''}`}
                                onClick={() => setActiveTab('extra')}
                            >
                                Miscellaneous
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row gy-5 mt-3" data-aos="fade-up">
                    <div className="col-lg-12">
                        <div className="row row-cols-1 row-cols-md-2 gy-4">
                            {activeTab === 'experience' && experience.map((exp, idx) => (
                                <div className="col-md-6" key={idx}>
                                    <div className="bg-base p-4 rounded-4 shadow-effect">
                                        <h4>{exp.title}</h4>
                                        <p className="text-brand mb-2">{exp.date}</p>
                                        <p className="text-brand mb-2">{exp.company}</p>
                                        <p className="text-brand mb-2">Skills In Use - {exp.skills}</p>
                                        {exp.points.map((pt, i) => <p key={i} className="mb-0">→ {pt}</p>)}
                                        {exp.links?.map((link, i) => (
                                            <span key={i}>
                                                <a href={link.url} className="link-custom" target="_blank">{link.text}</a>&emsp;
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {activeTab === 'education' && education.map((edu, idx) => (
                                <div className="col-md-6" key={idx}>
                                    <div className="bg-base p-4 rounded-4 shadow-effect">
                                        <h4>{edu.title}</h4>
                                        <p className="text-brand mb-2">{edu.institution}</p>
                                        <p className="text-brand mb-2">{edu.date}</p>
                                        <p className="mb-0">{edu.description}</p>
                                        <p className="text-brand mb-2">{edu.percentage}</p>
                                    </div>
                                </div>
                            ))}

                            {activeTab === 'extra' && miscellaneous.map((misc, idx) => (
                                <div className="col-md-6" key={idx}>
                                    <div className="bg-base p-4 rounded-4 shadow-effect">
                                        <img className="rounded-4 mb-3" src={misc.image} alt={misc.title} style={{ maxHeight: '200px', objectFit: 'cover' }} />
                                        <h4>{misc.title}</h4>
                                        <p className="mb-2">{misc.date}</p>
                                        <p className="mb-2"><span className="text-brand">Organised by:</span> {misc.organizer}</p>
                                        {misc.team && <p className="mb-2"><span className="text-brand">Team Name</span> {misc.team}</p>}
                                        <p className="mb-2"><span className="text-brand">Role -</span> {misc.role}</p>
                                        {misc.skills && <p className="mb-2"><span className="text-brand">Skills In Use -</span> {misc.skills}</p>}
                                        {misc.points.map((pt, i) => <p key={i} className="mb-0">→ {pt}</p>)}
                                        {misc.links?.map((link, i) => (
                                            <span key={i}>
                                                <a href={link.url} className="link-custom" target="_blank">{link.text}</a>&emsp;
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
