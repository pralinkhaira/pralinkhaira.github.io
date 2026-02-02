import { useState } from 'react';
import { projects } from '../data';

const Work = () => {
    const [filter, setFilter] = useState('all');

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category.includes(filter));

    return (
        <section id="work" className="full-height px-lg-5">
            <div className="container">
                <div className="row pb-4" data-aos="fade-up">
                    <div className="col-lg-8">
                        <h6 className="text-brand">WORK</h6>
                        <h1>My Recent Projects!</h1>
                    </div>
                    <div className="col-12 mb-3">
                        <div id="project-filters" className="btn-group" role="group">
                            {['all', 'web', 'python', 'games', 'api', 'bash'].map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`btn btn-outline-primary ${filter === cat ? 'active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="row gy-4">
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="col-md-4" data-aos="fade-up">
                            <div className="card-custom rounded-4 bg-base shadow-effect">
                                <div className="card-custom-image rounded-4">
                                    <img className="rounded-4" src={project.image} alt={project.title} />
                                </div>
                                <div className="card-custom-content p-4">
                                    <h4>{project.title}</h4>
                                    <p>{project.description}</p>
                                    {project.demoLink && (
                                        <a href={project.demoLink} className="link-custom" target="_blank">View Demo &emsp;</a>
                                    )}
                                    <a href={project.codeLink} className="link-custom" target="_blank">View Code (GitHub)</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <br /><br />
                <p className="lead mt-2 mb-4" data-aos="fade-up">Source codes of all these projects available on my <span className="link-custom"><a href="https://github.com/pralinkhaira" className="link-custom" target="_blank">GitHub!</a></span></p>
            </div>
        </section>
    );
};

export default Work;
