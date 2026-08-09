/* =========================================================
   MAZHAB WEBSITE — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   WAIT FOR PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const heroFlip = document.getElementById("hero-flip");

  const heroName = document.getElementById("hero-name");
  const heroTagline = document.getElementById("hero-tagline");
  const heroIntro = document.getElementById("hero-intro");
  const heroRole = document.getElementById("hero-role");
  const heroDescription = document.getElementById("hero-description");

  const navigation = document.getElementById("top-navigation");

  const contentList = document.getElementById("content-list");

  const digitalProductsList =
    document.getElementById("digital-products-list");

  const logoDesignProjects =
    document.getElementById("logo-design-projects");

  const brandIdentityProjects =
    document.getElementById("brand-identity-projects");

  const footerName =
    document.getElementById("footer-name");

  const footerRole =
    document.getElementById("footer-role");

  const footerLinks =
    document.getElementById("footer-links");

  const copyright =
    document.getElementById("copyright");

const heroProfileButton =
  document.getElementById("hero-profile-button");

  /* =======================================================
     HERO CONTENT
     ======================================================= */

  heroName.textContent = siteContent.hero.name;

  heroTagline.textContent = siteContent.hero.tagline;

  heroIntro.textContent = siteContent.hero.intro;

  heroRole.textContent = siteContent.hero.role;


  /* =======================================================
     HERO DESCRIPTION — WORD BY WORD
     ======================================================= */

  function createDescriptionWords() {

    heroDescription.innerHTML = "";

    const words =
      siteContent.hero.description.trim().split(/\s+/);

    words.forEach((word, index) => {

      const span =
        document.createElement("span");

      span.className = "hero-description-word";

      span.textContent = word;

      heroDescription.appendChild(span);

    });

  }

  createDescriptionWords();


  /* =======================================================
     DESCRIPTION ANIMATION
     ======================================================= */

  function animateDescription() {

    const words =
      heroDescription.querySelectorAll(
        ".hero-description-word"
      );

    words.forEach((word, index) => {

      word.classList.remove("visible");

      setTimeout(() => {

        word.classList.add("visible");

      }, 500 + index * 65);

    });

  }


  function resetDescription() {

    const words =
      heroDescription.querySelectorAll(
        ".hero-description-word"
      );

    words.forEach(word => {

      word.classList.remove("visible");

    });

  }


  /* =======================================================
   HERO FLIP
   ======================================================= */

let heroIsFlipped = false;
let flipLocked = false;

function flipHero() {

  if (heroIsFlipped || flipLocked) {
    return;
  }

  flipLocked = true;
  heroIsFlipped = true;

  heroFlip.classList.add("is-flipped");

  animateDescription();

  setTimeout(() => {
    flipLocked = false;
  }, 650);
}
/* =======================================================
   PROFILE PHOTO — REVERSE FLIP
   ======================================================= */

heroProfileButton.addEventListener("click", () => {

  if (!heroIsFlipped || flipLocked) {
    return;
  }

  flipLocked = true;
  heroIsFlipped = false;

  resetDescription();

  heroFlip.classList.remove("is-flipped");

  setTimeout(() => {
    flipLocked = false;
  }, 650);

});

/* =======================================================
   SCROLL DETECTION
   ======================================================= */

const FLIP_THRESHOLD = 35;

function handleScroll() {

  const scrollPosition = window.scrollY;

  /*
    Flip only once when the user first scrolls.
    It never reverses after flipping.
  */

  if (
    scrollPosition > FLIP_THRESHOLD &&
    !heroIsFlipped
  ) {

    flipHero();

  }

}

window.addEventListener(
  "scroll",
  handleScroll,
  { passive: true }
);

  /* =======================================================
     NAVIGATION
     ======================================================= */

  function renderNavigation() {

    navigation.innerHTML = "";

    siteContent.navigation.forEach(item => {

      const link =
        document.createElement("a");

      link.href = item.url;

      link.textContent = item.label;

      navigation.appendChild(link);

    });

  }

  renderNavigation();


  /* =======================================================
     NORMAL SECTION ITEMS
     ======================================================= */

  function createSectionItem(item) {

    const link =
      document.createElement("a");

    link.className = "section-item";

    link.href = item.url;

    link.innerHTML = `

      <div>

        <div class="section-item-title">
          ${item.title}
        </div>

        ${
          item.description
            ? `
              <div class="section-item-description">
                ${item.description}
              </div>
            `
            : ""
        }

      </div>

      <span class="section-item-arrow">
        →
      </span>

    `;

    return link;

  }


  /* =======================================================
     RENDER CONTENT
     ======================================================= */

  function renderContent() {

    contentList.innerHTML = "";

    siteContent.content.forEach(item => {

      contentList.appendChild(
        createSectionItem(item)
      );

    });

  }

  renderContent();


  /* =======================================================
     RENDER DIGITAL PRODUCTS
     ======================================================= */

  function renderDigitalProducts() {

    digitalProductsList.innerHTML = "";

    siteContent.digitalProducts.forEach(item => {

      digitalProductsList.appendChild(
        createSectionItem(item)
      );

    });

  }

  renderDigitalProducts();


  /* =======================================================
     CREATE DESIGN PROJECT
     ======================================================= */

  function createDesignProject(project) {

    const link =
      document.createElement("a");

    link.className = "design-project";

    link.href = project.url;

    link.innerHTML = `

      <img
        src="${project.image}"
        alt="${project.title}"
        class="design-project-image"
        loading="lazy"
      >

      <div class="design-project-info">

        <div>

          <div class="design-project-title">
            ${project.title}
          </div>

          <div class="design-project-meta">
            ${project.category} · ${project.year}
          </div>

        </div>

        <span class="design-project-arrow">
          →
        </span>

      </div>

    `;

    return link;

  }


  /* =======================================================
     RENDER DESIGN PROJECTS
     ======================================================= */

  function renderDesignProjects() {

    logoDesignProjects.innerHTML = "";

    brandIdentityProjects.innerHTML = "";


    siteContent.design.logoDesign.forEach(project => {

      logoDesignProjects.appendChild(
        createDesignProject(project)
      );

    });


    siteContent.design.brandIdentity.forEach(project => {

      brandIdentityProjects.appendChild(
        createDesignProject(project)
      );

    });

  }

  renderDesignProjects();


  /* =======================================================
     DESIGN CATEGORY OPEN / CLOSE
     ======================================================= */

  const categoryButtons =
    document.querySelectorAll(
      ".design-category-button"
    );


  categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

      const category =
        button.dataset.category;

      const categoryContainer =
        button.closest(".design-category");


      let projects;


      if (category === "logoDesign") {

        projects = logoDesignProjects;

      }

      if (category === "brandIdentity") {

        projects = brandIdentityProjects;

      }


      if (!projects) {
        return;
      }


      const isOpen =
        categoryContainer.classList.contains(
          "is-open"
        );


      /* Close other category */

      document
        .querySelectorAll(".design-category")
        .forEach(categoryElement => {

          categoryElement.classList.remove(
            "is-open"
          );

          const otherButton =
            categoryElement.querySelector(
              ".design-category-button"
            );

          if (otherButton) {

            otherButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }


          const otherProjects =
            categoryElement.querySelector(
              ".design-projects"
            );

          if (otherProjects) {

            otherProjects.setAttribute(
              "aria-hidden",
              "true"
            );

          }

        });


      /* Open clicked category */

      if (!isOpen) {

        categoryContainer.classList.add(
          "is-open"
        );

        button.setAttribute(
          "aria-expanded",
          "true"
        );

        projects.setAttribute(
          "aria-hidden",
          "false"
        );

      }

    });

  });


  /* =======================================================
     FOOTER
     ======================================================= */

  footerName.textContent =
    siteContent.footer.name;

  footerRole.textContent =
    siteContent.footer.role;

  copyright.textContent =
    siteContent.footer.copyright;


  function renderFooterLinks() {

    footerLinks.innerHTML = "";


    siteContent.footer.links.forEach(item => {

      const link =
        document.createElement("a");

      link.href = item.url;

      link.textContent = item.label;


      if (
        item.url.startsWith("http")
      ) {

        link.target = "_blank";

        link.rel = "noopener noreferrer";

      }


      footerLinks.appendChild(link);

    });

  }

  renderFooterLinks();


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  document.addEventListener(
    "click",
    event => {

      const link =
        event.target.closest(
          'a[href^="#"]'
        );

      if (!link) {
        return;
      }


      const targetId =
        link.getAttribute("href");


      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }


      const target =
        document.querySelector(
          targetId
        );


      if (!target) {
        return;
      }


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  resetDescription();


});