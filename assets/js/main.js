document.addEventListener("DOMContentLoaded", function() {
    // AOS
    AOS.init({
        once: true,
        offset: 100,
        duration: 2000,
    });

    // Swiper for partners
    const swiper = new Swiper("#companySwiper", {
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            reverseDirection: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            },
            1140: {
                slidesPerView: 6,
            },
        },
    });
    window.addEventListener("myLanguageEvent", (event) => {
        const newDirection = event.detail.direction === "rtl";
        swiper.rtl = newDirection;
        swiper.rtlTranslate = newDirection;
        swiper.update();
    });
    // End Swiper for Partners

    // Navbar dynamic stuff
    const navbar = document.querySelector(".custom-navbar");
    const navbarLogo = document.getElementById("navbar-logo");
    const projectsAnchor = document.getElementById("btnProjects");
    projectsAnchor.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "projects.html";
    });
    const isIndexPage =
        window.location.pathname.includes("index.html") ||
        window.location.pathname === "/";

    function updateNavbarOnScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
            navbarLogo.src = "assets/images/logo-dark.svg";
        } else {
            navbar.classList.remove("scrolled");
            navbarLogo.src = "assets/images/logo-white.svg";
        }
    }

    if (isIndexPage) {
        updateNavbarOnScroll();
        window.addEventListener("scroll", updateNavbarOnScroll);
    } else {
        navbar.classList.add("scrolled");
        navbarLogo.src = "assets/images/logo-dark.svg";
    }

    const toggleMenu = document.querySelector(".toggle-menu");
    const menuContainer = document.querySelector(".navbar-container");

    function openSideNav() {
        toggleMenu.classList.toggle("open");
        menuContainer.classList.toggle("open-menu-container");
    }

    toggleMenu.addEventListener("click", openSideNav);

    // End Navbar dynamic stuff
});

// Stats counter  animated

document.addEventListener("projectsRendered", () => {
    const projects = document.querySelectorAll(".project");

    const incrementStats = (project) => {
        const stats = project.querySelectorAll(".stat-value");
        stats.forEach((stat) => {
            const target = +stat.getAttribute("data-target");
            const increment = target < 100 ? 1 : Math.ceil(target / 200);
            const delay = target < 100 ? 70 : 20;

            const updateValue = () => {
                const currentValue = +stat.innerText;
                if (currentValue < target) {
                    stat.innerText = Math.min(currentValue + increment, target);
                    setTimeout(updateValue, delay);
                } else {
                    stat.innerText = target;
                }
            };

            updateValue();
        });
    };

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const project = entry.target;
                    incrementStats(project);
                    observer.unobserve(project);
                }
            });
        }, {
            threshold: 0.5
        }
    );

    projects.forEach((project) => {
        observer.observe(project);
    });
});

//end counter animated

// Loader
window.addEventListener("load", function() {
    document.body.classList.add("loaded");
    const scrollSpyElement = document.querySelector('[data-bs-spy="scroll"]');
    if (scrollSpyElement) {
        bootstrap.ScrollSpy.getOrCreateInstance(scrollSpyElement);
    }
});
// End Loader

 