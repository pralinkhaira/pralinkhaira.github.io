import { useState, useEffect } from 'react';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [theme, setTheme] = useState('light');
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    // Slideshow logic
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        '/images/person.png',
        '/images/person2.png',
        '/images/person3.png',
        '/images/person4.png',
        '/images/person5.png'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Theme toggle
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    const handleNavClick = (id: string) => {
        setActiveLink(id);
        setIsNavCollapsed(true); // Close mobile menu on click
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container flex-lg-column">
                <a className="navbar-brand mx-lg-auto mb-lg-4" href="#">
                    <span className="h3 fw-bold d-block d-lg-none">Pralin Khaira.</span>
                    <div className="slideshow-container d-none d-lg-block">
                        {slides.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                className={`slide-image rounded-circle ${index === currentSlide ? 'active' : ''}`}
                                alt="Profile"
                            />
                        ))}
                    </div>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto flex-lg-column text-lg-center">
                        {['Home', 'Work', 'About', 'Skills', 'Blogs', 'Certifications', 'Contact'].map((item) => {
                            const id = item.toLowerCase();
                            return (
                                <li className="nav-item" key={id}>
                                    <a
                                        className={`nav-link ${activeLink === id ? 'active' : ''}`}
                                        href={`#${id}`}
                                        onClick={() => handleNavClick(id)}
                                    >
                                        {item === 'About' ? 'About Me' : item === 'Blogs' ? 'My Blogs' : item === 'Contact' ? 'Contact Me' : item}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <button className="theme-toggle d-none d-lg-block" onClick={toggleTheme} title="Toggle Day/Night Mode">
                    <i className="las la-sun"></i>
                </button>
            </div>
            {/* Mobile Theme Toggle */}
            <button className="theme-toggle d-lg-none" onClick={toggleTheme} style={{ position: 'fixed', right: '20px', bottom: '20px', zIndex: 1001 }}>
                <i className="las la-sun"></i>
            </button>
        </nav>
    );
};

export default Navbar;
