import {
    renderProjects
} from "./projectsRenderer.js";

const projectsContainer = document.querySelector(".projects");
let projectsData = [];

const fetchProjects = async () => {
    try {
        const response = await fetch("./assets/projects.json");
        const data = await response.json();
        projectsData = data.projects
            .filter((project) => project.isInIndex)
            .sort((a, b) => a.order - b.order);
        renderProjects(projectsContainer, projectsData, currentLanguage, {
            showStatusBadge: true,
        });
    } catch (error) {}
};

const handleLanguageChange = () => {
    renderProjects(projectsContainer, projectsData, currentLanguage);
};

window.addEventListener("myLanguageEvent", handleLanguageChange);

fetchProjects();

// Set the new phone number and WhatsApp link
const newPhoneNumber = "+966 55 050 3606";
const newWhatsAppLink = `https://wa.me/${newPhoneNumber.replace(/[^+\d]/g, "")}`;

// Update the href of the <a> tag
const contactLink = document.getElementById("contact-link");
contactLink.href = newWhatsAppLink;

// Update the text of the <span> tag
const contactPhone = document.getElementById("contact-phone");
contactPhone.textContent = newPhoneNumber;