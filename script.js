document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = navLinks.querySelectorAll('li');
    const logoLink = document.querySelector('.logo-link');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        menuToggle.classList.toggle('active');

        // Add staggered animation to nav items
        navItems.forEach((item, index) => {
            if (navLinks.classList.contains('show')) {
                setTimeout(() => {
                    item.style.transitionDelay = `${index * 50}ms`;
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 0);
            } else {
                item.style.transitionDelay = '0ms';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
            }
        });
    });

    // Handle resize event
    function handleResize() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('show');
            menuToggle.classList.remove('active');
            navItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        }
    }

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if it's open
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                menuToggle.classList.remove('active');
                
                navItems.forEach(item => {
                    item.style.transitionDelay = '0ms';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                });
            }
        });
    });

    // Home redirect when logo is clicked
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }

    // Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.service-item, .about-content, .testimonial-item, .case-study-item, .team-member');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Testimonial carousel
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonialItems[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        testimonialItems[currentTestimonial].style.display = 'block';
    }

    // Change testimonial every 5 seconds
    setInterval(showNextTestimonial, 5000);

    // Add active class to current nav item based on scroll position
    const sections = document.querySelectorAll('section');
    const navLis = document.querySelectorAll('.nav-links li');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLis.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('href').slice(1) === current) {
                li.classList.add('active');
            }
        });
    });
});