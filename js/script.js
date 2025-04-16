document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll("a.nav-link").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          // Close mobile menu if open
          const navbarToggler = document.querySelector(".navbar-toggler")
          const navbarCollapse = document.querySelector(".navbar-collapse")
  
          if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click()
          }
  
          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          })
  
          // Update active state
          document.querySelectorAll(".nav-item").forEach((item) => {
            item.classList.remove("active")
          })
          this.parentElement.classList.add("active")
        }
      })
    })
  
    // Set active nav item based on scroll position
    window.addEventListener("scroll", () => {
      let current = ""
      const sections = document.querySelectorAll("section")
      const navLinks = document.querySelectorAll(".nav-link")
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.parentElement.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.parentElement.classList.add("active")
        }
      })
    })
  
    // Initialize Bootstrap carousel with custom settings
    const heroCarousel = document.getElementById("heroCarousel")
    const carousel = new bootstrap.Carousel(heroCarousel, {
      interval: 5000,
      ride: "carousel",
      wrap: true,
    })
  
    // Add animation class to carousel items on slide
    heroCarousel.addEventListener("slide.bs.carousel", (event) => {
      const nextSlide = event.relatedTarget
      const heroTitle = nextSlide.querySelector(".hero-title")
      const heroDescription = nextSlide.querySelector(".hero-description")
  
      if (heroTitle && heroDescription) {
        heroTitle.classList.remove("animate-on-load")
        heroDescription.classList.remove("animate-on-load")
  
        setTimeout(() => {
          heroTitle.classList.add("animate-on-load")
          heroDescription.classList.add("animate-on-load")
        }, 50)
      }
    })
  
    // Initialize Bootstrap components (if not already initialized)
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
  
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
  })
  