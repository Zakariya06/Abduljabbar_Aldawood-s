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

// start patterns
document.addEventListener("DOMContentLoaded", function() {
    const titlePatternPositions = [
        // top patterns
        {
            top: "-30px",
            left: "5%"
        },
        {
            top: "-30px",
            right: "5%"
        },
        {
            top: "-30px",
            right: "32%"
        },
        {
            top: "-30px",
            left: "32%"
        },

        // bottom patterns

        {
            bottom: "-25px",
            left: "5%"
        },
        {
            bottom: "-25px",
            right: "5%"
        },
        {
            bottom: "-25px",
            right: "32%"
        },
        {
            bottom: "-25px",
            left: "32%"
        },

        // right patterns
        {
            top: "70%",
            right: "-15%"
        },
        {
            top: "15%",
            right: "-15%"
        },

        //left patterns
        {
            top: "70%",
            left: "-15%"
        },
        {
            top: "15%",
            left: "-15%"
        },

        //inside patterns
        {
            top: "50%",
            left: "50%"
        },
        {
            top: "35%",
            left: "30%"
        },
        {
            top: "35%",
            left: "80%"
        },
    ];
    const carouselPatternPositions = [
        // top patterns
        {
            top: "-30px",
            left: "5%"
        },
        {
            top: "-50px",
            left: "10%"
        },
        {
            top: "-30px",
            left: "20%"
        },
        {
            top: "-80px",
            left: "30%"
        },
        {
            top: "-30px",
            left: "40%"
        },
        {
            top: "-60px",
            left: "50%"
        },
        {
            top: "-30px",
            left: "60%"
        },
        {
            top: "-30px",
            left: "70%"
        },
        {
            top: "-800px",
            left: "80%"
        },
        {
            top: "-30px",
            left: "90%"
        },
        {
            top: "-500px",
            left: "100%"
        },

        // bottom patterns

        {
            bottom: "-30px",
            left: "5%"
        },
        {
            bottom: "-50px",
            left: "10%"
        },
        {
            bottom: "-30px",
            left: "20%"
        },
        {
            bottom: "-80px",
            left: "30%"
        },
        {
            bottom: "-30px",
            left: "40%"
        },
        {
            bottom: "-60px",
            left: "50%"
        },
        {
            bottom: "-30px",
            left: "60%"
        },
        {
            bottom: "-30px",
            left: "70%"
        },
        {
            bottom: "-800px",
            left: "80%"
        },
        {
            bottom: "-30px",
            left: "90%"
        },
        {
            bottom: "-500px",
            left: "100%"
        },

        // right patterns
        {
            top: "100%",
            right: "-5%"
        },
        {
            top: "90%",
            right: "-8%"
        },
        {
            top: "80%",
            right: "-5%"
        },
        {
            top: "70%",
            right: "-5%"
        },
        {
            top: "60%",
            right: "-8%"
        },
        {
            top: "50%",
            right: "-5%"
        },
        {
            top: "40%",
            right: "-5%"
        },
        {
            top: "30%",
            right: "-8%"
        },
        {
            top: "20%",
            right: "-5%"
        },
        {
            top: "10%",
            right: "-8%"
        },
        {
            top: "0",
            right: "-5%"
        },

        //left patterns
        {
            top: "100%",
            left: "-5%"
        },
        {
            top: "90%",
            left: "-8%"
        },
        {
            top: "80%",
            left: "-5%"
        },
        {
            top: "70%",
            left: "-5%"
        },
        {
            top: "60%",
            left: "-8%"
        },
        {
            top: "50%",
            left: "-5%"
        },
        {
            top: "40%",
            left: "-5%"
        },
        {
            top: "30%",
            left: "-8%"
        },
        {
            top: "20%",
            left: "-5%"
        },
        {
            top: "10%",
            left: "-8%"
        },
        {
            top: "0",
            left: "-5%"
        },
    ];

    function addPatterns(container, positions) {
        if (!container) return;

        container.style.position = "relative";

        positions.forEach((position, index) => {
            const pattern = document.createElement("img");
            pattern.src = "assets/images/pattern.svg";
            pattern.alt = `Pattern ${index + 1}`;
            pattern.classList.add("pattern", "fade-in");
            Object.assign(pattern.style, {
                position: "absolute",
                ...position,
            });

            container.appendChild(pattern);
        });
    }

    const observerOptions = {
        root: null,
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const container = entry.target;

                if (container.classList.contains("section-title")) {
                    addPatterns(container, titlePatternPositions);
                } else if (container.classList.contains("patterns-carousel")) {
                    addPatterns(container, carouselPatternPositions);
                }

                observer.unobserve(container);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".section-title").forEach((section) => {
        observer.observe(section);
    });

    document.addEventListener("projectsRendered", () => {
        document
            .querySelectorAll(".patterns-carousel")
            .forEach((carousel) => observer.observe(carousel));
    });
});

// end patterns