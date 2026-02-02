import { useState } from 'react';
import emailjs from 'emailjs-com';
import { Toast, ToastContainer } from 'react-bootstrap';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);

    const validateEmail = (email: string) => {
        return /^\S+@\S+\.\S+$/.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setToastMessage('Please fill in all fields.');
            setIsSuccess(false);
            setShowToast(true);
            return;
        }

        if (!validateEmail(formData.email)) {
            setToastMessage('Please enter a valid email address.');
            setIsSuccess(false);
            setShowToast(true);
            return;
        }

        // Initialize EmailJS (Consider moving init to useEffect or outside component if static)
        // emailjs.init('fq5lMDraFRHP_Mhvc'); // Ideally use env var

        emailjs.send(
            'service_q4a91tt',
            'template_ojloafw',
            {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message
            },
            'fq5lMDraFRHP_Mhvc' // User ID, passed here directly for simplicity as per original
        ).then(() => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            setToastMessage('Your message was sent successfully!');
            setIsSuccess(true);
            setShowToast(true);
        }, (error) => {
            console.error(error);
            setToastMessage('Failed to send message. Please try again later.');
            setIsSuccess(false);
            setShowToast(true);
        });
    };

    return (
        <section id="contact" className="full-height px-lg-5">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-8 pb-4" data-aos="fade-up">
                        <h6 className="text-brand">CONTACT</h6>
                        <h1>Let's talk</h1>
                    </div>

                    <div className="col-lg-8" data-aos="fade-up" data-aos-delay="300">
                        <form onSubmit={handleSubmit} className="row g-lg-3 gy-3">
                            <div className="form-group col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group col-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                            <div className="form-group col-12">
                                <textarea
                                    rows={4}
                                    className="form-control"
                                    placeholder="Enter your message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="form-group col-12 d-grid">
                                <button type="submit" className="btn btn-brand">Contact me!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer position="bottom-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide
                    bg={isSuccess ? 'warning' : 'danger'}
                >
                    <Toast.Header closeButton>
                        <strong className="me-auto">{isSuccess ? 'Success' : 'Error'}</strong>
                    </Toast.Header>
                    <Toast.Body className={isSuccess ? 'text-dark' : 'text-white'}>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </section>
    );
};

export default Contact;
