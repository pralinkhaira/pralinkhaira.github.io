import { useState } from 'react';
import { certifications } from '../data';
import { Modal, Button } from 'react-bootstrap';

const Certifications = () => {
    const mainCertificates = certifications.slice(0, 6);
    const hiddenCertificates = certifications.slice(6);
    const [showAll, setShowAll] = useState(false);

    return (
        <section id="certifications" className="full-height px-lg-5">
            <div className="container">
                <div className="row pb-4" data-aos="fade-up">
                    <div className="col-lg-8">
                        <h6 className="text-brand">CERTIFICATIONS</h6>
                        <h1>My Learnings</h1>
                    </div>
                </div>

                <div className="row gy-4">
                    {mainCertificates.map((cert, index) => (
                        <div key={index} className="col-md-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="card-custom rounded-4 bg-base shadow-effect">
                                <div className="card-custom-image rounded-4">
                                    <img className="rounded-4" src={cert.image} alt={cert.title} />
                                </div>
                                <div className="card-custom-content p-4">
                                    <p className="text-brand mb-2">{cert.date}</p>
                                    <h5 className="mb-4">{cert.title}</h5>
                                    <p className="text-brand mb-2">{cert.issuer}</p>
                                    <a href={cert.link} className="link-custom" target="_blank">View Certificate</a>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="col-md-12 text-center">
                        <Button
                            id="viewAllButton"
                            className="btn btn-primary btn-brand me-3 mb-2"
                            onClick={() => setShowAll(true)}
                        >
                            View All Other!
                        </Button>
                    </div>
                </div>

                {/* Modal for extra certificates */}
                <Modal show={showAll} onHide={() => setShowAll(false)} size="xl" centered scrollable>
                    <Modal.Header closeButton className="bg-base2" style={{ backgroundColor: 'var(--color-base)', color: 'var(--color-heading)' }}>
                        <Modal.Title>More Certificates</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: 'var(--color-base)', color: 'var(--color-body)' }}>
                        <div className="row gy-4">
                            {hiddenCertificates.map((cert, index) => (
                                <div key={index} className="col-md-4">
                                    <div className="card-custom rounded-4 bg-base shadow-effect">
                                        <div className="card-custom-image rounded-4">
                                            <img className="rounded-4" src={cert.image} alt={cert.title} />
                                        </div>
                                        <div className="card-custom-content p-4">
                                            <p className="text-brand mb-2">{cert.date}</p>
                                            <h5 className="mb-4">{cert.title}</h5>
                                            <p className="text-brand mb-2">{cert.issuer}</p>
                                            <a href={cert.link} className="link-custom" target="_blank">View Certificate</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: 'var(--color-base)', borderTop: '1px solid var(--border-color)' }}>
                        <Button variant="secondary" onClick={() => setShowAll(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>
    );
};

export default Certifications;
