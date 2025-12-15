import React, { useState, useEffect } from 'react';
import './App.css';

// Componente Header
const Header = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header id="header" className={`header dark-background d-flex flex-column ${isOpen ? 'header-show' : ''}`}>
        <div className="profile-img">
          <img src="/assets/img/my-profile-img.jpg" alt="Profile" className="img-fluid rounded-circle" />
        </div>

        <a href="#hero" className="logo d-flex align-items-center justify-content-center">
          <h1 className="sitename">Alex Smith</h1>
        </a>

        <div className="social-links text-center">
          <a href="#" className="twitter"><i className="bi bi-twitter-x"></i></a>
          <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
          <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
          <a href="#" className="google-plus"><i className="bi bi-skype"></i></a>
          <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
        </div>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="#hero" className={activeSection === 'hero' ? 'active' : ''}><i className="bi bi-house navicon"></i>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}><i className="bi bi-person navicon"></i> About</a></li>
            <li><a href="#resume" className={activeSection === 'resume' ? 'active' : ''}><i className="bi bi-file-earmark-text navicon"></i> Resume</a></li>
            <li><a href="#portfolio" className={activeSection === 'portfolio' ? 'active' : ''}><i className="bi bi-images navicon"></i> Portfolio</a></li>
            <li><a href="#services" className={activeSection === 'services' ? 'active' : ''}><i className="bi bi-hdd-stack navicon"></i> Services</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}><i className="bi bi-envelope navicon"></i> Contact</a></li>
          </ul>
        </nav>
      </header>

      <i 
        className={`header-toggle d-xl-none bi ${isOpen ? 'bi-x' : 'bi-list'}`}
        onClick={() => setIsOpen(!isOpen)}
      ></i>
    </>
  );
};

// Componente Hero
const Hero = () => {
  return (
    <section id="hero" className="hero section dark-background">
      <img src="/assets/img/hero-bg.jpg" alt="Background" className="" />
      <div className="container">
        <h2>Alex Smith</h2>
        <p>I'm <span className="typed">Designer</span></p>
      </div>
    </section>
  );
};

// Componente About
const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container section-title">
        <h2>About</h2>
        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem.</p>
      </div>

      <div className="container">
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-4">
            <img src="/assets/img/my-profile-img.jpg" className="img-fluid" alt="Profile" />
          </div>
          <div className="col-lg-8 content">
            <h2>UI/UX Designer &amp; Web Developer.</h2>
            <p className="fst-italic py-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>1 May 1995</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.example.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+123 456 7890</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>New York, USA</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>30</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Master</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>email@example.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>Available</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Skills
const Skills = () => {
  const skills = [
    { name: 'HTML', value: 100 },
    { name: 'CSS', value: 90 },
    { name: 'JavaScript', value: 75 },
    { name: 'PHP', value: 80 },
    { name: 'WordPress/CMS', value: 90 },
    { name: 'Photoshop', value: 55 }
  ];

  return (
    <section id="skills" className="skills section light-background">
      <div className="container section-title">
        <h2>Skills</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container">
        <div className="row skills-content">
          {skills.map((skill, index) => (
            <div className="col-lg-6" key={index}>
              <div className="progress">
                <span className="skill"><span>{skill.name}</span> <i className="val">{skill.value}%</i></span>
                <div className="progress-bar-wrap">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    aria-valuenow={skill.value} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                    style={{ width: `${skill.value}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente Resume
const Resume = () => {
  return (
    <section id="resume" className="resume section">
      <div className="container section-title">
        <h2>Resume</h2>
        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem.</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h3 className="resume-title">Summary</h3>
            <div className="resume-item pb-0">
              <h4>Brandon Johnson</h4>
              <p><em>Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing user-centered digital/print marketing material from initial concept to final, polished deliverable.</em></p>
              <ul>
                <li>Portland par 127, Orlando, FL</li>
                <li>(123) 456-7891</li>
                <li>alice.barkley@example.com</li>
              </ul>
            </div>

            <h3 className="resume-title">Education</h3>
            <div className="resume-item">
              <h4>Master of Fine Arts &amp; Graphic Design</h4>
              <h5>2015 - 2016</h5>
              <p><em>Rochester Institute of Technology, Rochester, NY</em></p>
            </div>
          </div>

          <div className="col-lg-6">
            <h3 className="resume-title">Professional Experience</h3>
            <div className="resume-item">
              <h4>Senior graphic design specialist</h4>
              <h5>2019 - Present</h5>
              <p><em>Experion, New York, NY</em></p>
              <ul>
                <li>Lead in the design, development, and implementation of the graphic, layout, and production communication materials</li>
                <li>Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Portfolio
const Portfolio = () => {
  const [filter, setFilter] = useState('*');

  const portfolioItems = [
    { img: '/assets/img/portfolio/app-1.jpg', title: 'App 1', category: 'app' },
    { img: '/assets/img/portfolio/product-1.jpg', title: 'Product 1', category: 'product' },
    { img: '/assets/img/portfolio/branding-1.jpg', title: 'Branding 1', category: 'branding' },
    { img: '/assets/img/portfolio/books-1.jpg', title: 'Books 1', category: 'books' },
    { img: '/assets/img/portfolio/app-2.jpg', title: 'App 2', category: 'app' },
    { img: '/assets/img/portfolio/product-2.jpg', title: 'Product 2', category: 'product' },
  ];

  const filteredItems = filter === '*' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="portfolio section light-background">
      <div className="container section-title">
        <h2>Portfolio</h2>
        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem.</p>
      </div>

      <div className="container">
        <ul className="portfolio-filters">
          <li onClick={() => setFilter('*')} className={filter === '*' ? 'filter-active' : ''}>All</li>
          <li onClick={() => setFilter('app')} className={filter === 'app' ? 'filter-active' : ''}>App</li>
          <li onClick={() => setFilter('product')} className={filter === 'product' ? 'filter-active' : ''}>Product</li>
          <li onClick={() => setFilter('branding')} className={filter === 'branding' ? 'filter-active' : ''}>Branding</li>
          <li onClick={() => setFilter('books')} className={filter === 'books' ? 'filter-active' : ''}>Books</li>
        </ul>

        <div className="row gy-4">
          {filteredItems.map((item, index) => (
            <div className="col-lg-4 col-md-6 portfolio-item" key={index}>
              <div className="portfolio-content h-100">
                <img src={item.img} className="img-fluid" alt={item.title} />
                <div className="portfolio-info">
                  <h4>{item.title}</h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente Services
const Services = () => {
  const services = [
    { icon: 'bi-briefcase', title: 'Lorem Ipsum', description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi' },
    { icon: 'bi-card-checklist', title: 'Dolor Sitema', description: 'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip' },
    { icon: 'bi-bar-chart', title: 'Sed ut perspiciatis', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore' },
    { icon: 'bi-binoculars', title: 'Magni Dolores', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia' },
    { icon: 'bi-brightness-high', title: 'Nemo Enim', description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis' },
    { icon: 'bi-calendar4-week', title: 'Eiusmod Tempor', description: 'Et harum quidem rerum facilis est et expedita distinctio' }
  ];

  return (
    <section id="services" className="services section">
      <div className="container section-title">
        <h2>Services</h2>
        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem.</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {services.map((service, index) => (
            <div className="col-lg-4 col-md-6 service-item d-flex" key={index}>
              <div className="icon flex-shrink-0"><i className={`bi ${service.icon}`}></i></div>
              <div>
                <h4 className="title"><a href="#" className="stretched-link">{service.title}</a></h4>
                <p className="description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente Contact
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí iría la lógica para enviar el formulario
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-title">
        <h2>Contact</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="info-item d-flex">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>

              <div className="info-item d-flex">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>

              <div className="info-item d-flex">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p>info@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row gy-4">
                <div className="col-md-6">
                  <label htmlFor="name-field" className="pb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name-field" 
                    className="form-control" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email-field" className="pb-2">Your Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    id="email-field" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="subject-field" className="pb-2">Subject</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="subject" 
                    id="subject-field" 
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="message-field" className="pb-2">Message</label>
                  <textarea 
                    className="form-control" 
                    name="message" 
                    rows="10" 
                    id="message-field" 
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <button type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Footer
const Footer = () => {
  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container">
        <div className="copyright text-center">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">iPortfolio</strong> <span>All Rights Reserved</span></p>
        </div>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
    </footer>
  );
};

// Componente Principal App
function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'resume', 'portfolio', 'services', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header activeSection={activeSection} />
      <main className="main">
        <Hero />
        <About />
        <Skills />
        <Resume />
        <Portfolio />
        <Services />
        <Contact />
      </main>
      <Footer />
      
      {/* Scroll Top Button */}
      <a 
        href="#" 
        className="scroll-top d-flex align-items-center justify-content-center"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
}

export default App;
