let translations = {};

let currentLanguage = localStorage.getItem("language") || "ar";

const loadLanguage = function(lang) {
    fetch(`./assets/i18n/${lang}.json`)
        .then((response) => response.json())
        .then((data) => {
            translations = data;
            translatePage();
            document.documentElement.lang = lang;
            if (lang === "ar") {
                document.documentElement.dir = "rtl";
                document.body.classList.add("arabic");
            } else {
                document.documentElement.dir = "ltr";
                document.body.classList.remove("arabic");
            }
        });
    const event = new CustomEvent("myLanguageEvent", {
        detail: {
            direction: currentLanguage === "ar" ? "rtl" : "ltr"
        },
    });
    window.dispatchEvent(event);
    localStorage.setItem("language", lang);
};

const translatePage = function() {
    document.querySelectorAll("[data-translate]").forEach((elem) => {
        const key = elem.getAttribute("data-translate");
        const value = getTranslatedText(key);
        if (value) {
            if (elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") {
                elem.setAttribute("placeholder", value);
            } else if (elem.tagName === "IMG") {
                elem.setAttribute("alt", value);
            } else {
                elem.innerText = value;
            }
        }
    });
};

const getTranslatedText = function(key) {
    const keys = key.split(".");

    let result = translations;

    for (let i = 0; i < keys.length; i++) {
        const currentKey = keys[i];

        if (result && result.hasOwnProperty(currentKey)) {
            result = result[currentKey];
        } else {
            return null;
        }
    }

    return result;
};

loadLanguage(currentLanguage);

document.querySelector(".language-toggle").addEventListener("click", () => {
    if (currentLanguage === "ar") {
        currentLanguage = "en";
        document.getElementById("language-label").textContent = "Arabic";
    } else {
        currentLanguage = "ar";
        document.getElementById("language-label").textContent = "إنجليزي";
    }
    loadLanguage(currentLanguage);
});