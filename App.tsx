
import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './constants';

const { name, tagline, about, skills, projects, contact } = portfolioData;

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Handle scroll events for header background, scroll to top, and active nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Header background
      if (headerRef.current) {
        if (scrollY > 50) {
          headerRef.current.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
          headerRef.current.style.background = 'rgba(0, 0, 0, 0.95)';
        }
      }

      // Scroll to top button
      setShowScrollTop(scrollY > 500);

      // Active section
      const sections = ['hero', 'about', 'services', 'projects', 'contact'];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const offsetTop = section.offsetTop - 100;
          const offsetBottom = offsetTop + section.offsetHeight;
          if (scrollY >= offsetTop && scrollY < offsetBottom) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fade in animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.service__card, .project__card, .fade-in-up-target');
    elements.forEach(el => {
      el.classList.add('fade-in-up');
      observer.observe(el);
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Initialize body fade in
  useEffect(() => {
    document.body.classList.add('loaded');
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const targetPosition = id === 'hero' ? 0 : element.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const subjectInput = form.elements.namedItem('subject') as HTMLInputElement;
    const messageInput = form.elements.namedItem('message') as HTMLTextAreaElement;

    const subject = subjectInput.value;
    const body = `Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\nMessage:\n${messageInput.value}`;
    
    // Construct mailto link
    const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    form.reset();
  };

  return (
    <div className="antialiased">
      {/* Header */}
      <header className="header" ref={headerRef}>
        <nav className="nav">
          <div className="nav__logo">YS</div>
          <ul className={`nav__menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
            {['hero', 'about', 'services', 'projects', 'contact'].map(item => (
              <li key={item}>
                <a 
                  href={`#${item}`} 
                  className={`nav__link ${activeSection === item ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item === 'hero' ? 'Home' : item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <div 
            className={`nav__toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero__content">
          <h1 className="hero__title">{name}</h1>
          <p className="hero__subtitle">{tagline}</p>
        </div>
        <div className="hero__scroll">
          Scroll Down
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header fade-in-up-target">
            <h2 className="section__title">{about.title}</h2>
          </div>
          <div className="about__content">
            <div className="about__text fade-in-up-target">
              {about.description.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
            <div className="about__philosophy fade-in-up-target">
              <h3>My Philosophy</h3>
              <p>{skills.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header fade-in-up-target">
            <h2 className="section__title">{skills.title}</h2>
          </div>
          <div className="services__grid">
            {skills.services && skills.services.map((service, index) => (
              <div key={index} className="service__card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header fade-in-up-target">
            <h2 className="section__title">Featured Projects</h2>
          </div>
          <div className="projects__grid">
            {projects.map((project) => (
              <div key={project.id} className="project__card">
                <div className="project__content">
                  <h3 className="project__title">{project.title}</h3>
                  <p className="project__role">{project.role}</p>
                  <span className="project__type">{project.clientType}</span>
                  <div className="project__details">
                    <p>{project.roleDescription}</p>
                    <ul className="project__highlights">
                      {project.clientDetails.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header fade-in-up-target">
            <h2 className="section__title">{contact.title}</h2>
          </div>
          <div className="contact__content">
            <div className="contact__info fade-in-up-target">
              <h3>Get In Touch</h3>
              <p>Ready to bring your vision to life? Let's collaborate and create something extraordinary together.</p>
              <div className="contact__details">
                <div className="contact__item">
                  <strong>Email:</strong>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
                <div className="contact__item">
                  <strong>Phone:</strong>
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
                <div className="contact__item">
                  <strong>CV:</strong>
                  <a href={contact.cv.url} className="underline">{contact.cv.label}</a>
                </div>
              </div>
            </div>
            <form className="contact__form fade-in-up-target" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input type="text" id="name" name="name" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" name="message" className="form-control" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn--primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
      >
        <span>↑</span>
      </button>
    </div>
  );
};

export default App;
