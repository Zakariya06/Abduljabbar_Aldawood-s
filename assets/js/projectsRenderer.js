export const renderProjectHTML = (project, currentLanguage, options = {}) => {
    const langTitle =
        currentLanguage === "ar" ? project.titleAr : project.titleEn;
    const langDescription =
        currentLanguage === "ar" ? project.descriptionAr : project.descriptionEn;
    const langAddress =
        currentLanguage === "ar" ? project.addressAr : project.addressEn;

    const statusBadge =
        options.showStatusBadge && project.status ?
        `
        <span class="badge mb-3 ${
          project.status === "sold"
            ? "bg-info"
            : project.status === "under-construction"
            ? "bg-warning text-dark"
            : "bg-success"
        }">
          ${
            currentLanguage === "ar"
              ? project.status === "sold"
                ? "تم البيع"
                : project.status === "under-construction"
                ? "تحت الإنشاء"
                : "متاح للبيع"
              : project.status.charAt(0).toUpperCase() +
                project.status.slice(1).replace("-", " ")
          }
        </span>` :
        "";

    const statsHTML = options.showAllStats ?
        `
        <div class="statistics mt-3">
          ${
            project.statistics.landArea
              ? `<div class="stat-item">
                  <i class="fas fa-drafting-compass text-primary me-2"></i>
                  <span>${
                    currentLanguage === "ar" ? "مساحة الأرض" : "Land Area"
                  }</span> -
                  <span class="stat-value text-primary" data-target="${
                    project.statistics.landArea
                  }"></span>
                  <span>${currentLanguage === "ar" ? "متر مربع" : "sq.m"}</span>
                </div>`
              : ""
          }
          ${
            project.statistics.developedArea
              ? `<div class="stat-item">
                  <i class="fas fa-layer-group text-primary me-2"></i>
                  <span>${
                    currentLanguage === "ar"
                      ? "المساحة المطورة"
                      : "Developed Area"
                  }</span> -
                  <span class="stat-value text-primary" data-target="${
                    project.statistics.developedArea
                  }"></span>
                  <span>${currentLanguage === "ar" ? "متر مربع" : "sq.m"}</span>
                </div>`
              : ""
          }
          ${
            project.statistics.units
              ? `<div class="stat-item">
                  <i class="fas fa-home text-primary me-2"></i>
                  <span>${
                    currentLanguage === "ar" ? "عدد الوحدات" : "Units"
                  }</span> -
                  <span class="stat-value text-primary" data-target="${
                    project.statistics.units
                  }"></span>
                </div>`
              : ""
          }
          ${
            project.statistics.projectDuration
              ? `<div class="stat-item">
                  <i class="fas fa-clock text-primary me-2"></i>
                  <span>${
                    currentLanguage === "ar"
                      ? "مدة المشروع"
                      : "Project Duration"
                  }</span> -
                  <span class="stat-value text-primary" data-target="${
                    project.statistics.projectDuration
                  }"></span>
                  <span>${currentLanguage === "ar" ? "شهر" : "months"}</span>
                </div>`
              : ""
          }
        </div>` :
        project.statistics.units ?
        `
        <div class="statistics mt-3">
          <div class="stat-item">
            <i class="fas fa-home text-primary me-2"></i>
            <span>${currentLanguage === "ar" ? "عدد الوحدات" : "Units"}</span> -
            <span class="stat-value text-primary" data-target="${
              project.statistics.units
            }"></span>
          </div>
        </div>` :
        "";

    const carouselIndicators = `
    <div class="carousel-indicators">
      ${project.images
        .map(
          (_, idx) => `
            <button type="button" data-bs-target="#carouselProject${
              project.id
            }" data-bs-slide-to="${idx}" class="${
            idx === 0 ? "active" : ""
          }" aria-label="Slide ${idx + 1}"></button>
          `
        )
        .join("")}
    </div>
  `;

    const whatsappLink = `https://wa.me/+966550503606?text=${encodeURIComponent(
    currentLanguage === "ar"
      ? ` مهتم ب ${project.titleAr}`
      : `I am interested in the project ${project.titleEn}`
  )}`;
    return `
    <div class="project row align-items-center mb-5 gx-3 gx-xl-5 gy-5">
      <div class="col-lg-5 col-xl-4">
        <h3 class="fw-bold text-primary">${langTitle}</h3>
        ${statusBadge}
        ${
          options.showDescription
            ? `<p class="mt-3 text-secondary">${langDescription}</p>`
            : ""
        }
        ${statsHTML}
        <div class="address mt-3">
          <i class="fas fa-map-marker-alt text-primary me-2"></i>
          ${langAddress}
        </div>
        <div class="action-btns mt-3">
            <a href="${whatsappLink}" class="btn btn-primary me-2" target="_blank">
            <i class="fas fa-calendar-alt me-2"></i>
            <span data-translate="projects.schedule">سجل اهتمامك</span>
          </a>
          ${
            project.brochure
              ? `<a href="${project.brochure}" class="btn btn-secondary" download>
                  <i class="fas fa-download me-2"></i>
                  <span data-translate="projects.brochure">تحميل البروشور</span>
                </a>`
              : ""
          }
        <a href="project-details.html?id=${
          project.id
        }" class="btn btn-secondary">
            <i class="fas fa-eye me-2"></i>
            <span data-translate="projects.view-details">عرض التفاصيل</span>
          </a>
        </div>
      </div>
      <div class="col-lg-7 col-xl-8">
        <div class="patterns-carousel">
          <div id="carouselProject${
            project.id
          }" class="carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
            ${carouselIndicators}
            <div class="carousel-inner">
              ${project.images
                .map(
                  (image, idx) => `
                <div class="carousel-item ${idx === 0 ? "active" : ""}">
                  <img src="${image}" alt="${langTitle} ${idx + 1}">
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>`;
};

export const renderProjects = (
    container,
    projects,
    currentLanguage,
    options = {}
) => {
    container.innerHTML = "";
    projects.forEach((project) => {
        container.innerHTML += renderProjectHTML(project, currentLanguage, options);
    });
    document.dispatchEvent(new CustomEvent("projectsRendered"));
};