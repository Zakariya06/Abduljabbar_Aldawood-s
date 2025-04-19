// Initialize AOS Animation Library
AOS.init({
  duration: 800,
  easing: 'ease',
  once: true,
  offset: 100
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Back to Top Button
window.addEventListener('scroll', function() {
  const backToTopBtn = document.querySelector('.backToTop');
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('active');
  } else {
    backToTopBtn.classList.remove('active');
  }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  });
});

// Form Submission (Prevent Default)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const formElements = Array.from(this.elements);
    const formData = {};
    
    // Collect form data
    formElements.forEach(element => {
      if (element.name && element.value) {
        formData[element.name] = element.value;
      }
    });
    
    // Show success message
    const formParent = this.parentElement;
    this.style.display = 'none';
    
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-3';
    successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Thank you! Your message has been sent successfully.';
    formParent.appendChild(successMessage);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      this.reset();
      this.style.display = 'block';
      formParent.removeChild(successMessage);
    }, 5000);
  });
});

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.projectCard');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.querySelector('.projectImage img').style.transform = 'scale(1.1)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.querySelector('.projectImage img').style.transform = 'scale(1)';
  });
});

// Service Card Hover Effect
const serviceCards = document.querySelectorAll('.serviceCard');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.querySelector('.serviceIcon').style.backgroundColor = 'var(--themeColor)';
    this.querySelector('.serviceIcon i').style.color = 'white';
  });
  
  card.addEventListener('mouseleave', function() {
    this.querySelector('.serviceIcon').style.backgroundColor = 'var(--grayLight)';
    this.querySelector('.serviceIcon i').style.color = 'var(--themeColor)';
  });
});

// Testimonial Carousel (Simple Version)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonialCard');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    if (i === index) {
      testimonial.style.opacity = '1';
      testimonial.style.transform = 'translateY(0)';
    } else {
      testimonial.style.opacity = '0.5';
      testimonial.style.transform = 'translateY(10px)';
    }
  });
}

// Initialize testimonials
showTestimonial(currentTestimonial);

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  showTestimonial(currentTestimonial);
}, 5000);

// Add animation classes on page load
window.addEventListener('load', function() {
  document.querySelector('.heroSection').classList.add('fadeIn');
});

// RTL Support
const langButtons = document.querySelectorAll('.langBtn');
langButtons.forEach(button => {
  button.addEventListener('click', function() {
    const direction = this.getAttribute('data-lang');
    const htmlElement = document.documentElement;
    
    // Remove active class from all buttons
    langButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Set direction
    htmlElement.classList.remove('ltr', 'rtl');
    htmlElement.classList.add(direction);
    htmlElement.setAttribute('dir', direction);
    
    // Update Bootstrap classes for RTL/LTR
    if (direction === 'rtl') {
      document.querySelectorAll('.ms-auto').forEach(el => {
        el.classList.remove('ms-auto');
        el.classList.add('me-auto');
      });
      
      document.querySelectorAll('.text-md-end').forEach(el => {
        el.classList.remove('text-md-end');
        el.classList.add('text-md-start');
      });
    } else {
      document.querySelectorAll('.me-auto').forEach(el => {
        el.classList.remove('me-auto');
        el.classList.add('ms-auto');
      });
      
      document.querySelectorAll('.text-md-start').forEach(el => {
        el.classList.remove('text-md-start');
        el.classList.add('text-md-end');
      });
    }
  });
});