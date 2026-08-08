/* =========================================================
   MAZHAB WEBSITE
   Main JavaScript
   Connects content.js → index.html
   ========================================================= */


/* =========================================================
   1. INTRO
   ========================================================= */

/* =========================================================
   INTRO TITLE — CHARACTER HOVER EFFECT
   ========================================================= */

const introTitle = document.getElementById("intro-title");

introTitle.innerHTML = "";

[...siteContent.intro.title].forEach(character => {

  const span = document.createElement("span");

  span.className = "intro-character";

  // Keep spaces visible
  span.textContent = character === " " ? "\u00A0" : character;

  introTitle.appendChild(span);

});

document.getElementById("intro-description").textContent =
  siteContent.intro.description;

/* =========================================================
   TOP NAVIGATION
   ========================================================= */

const topNavigation =
  document.getElementById("top-navigation");

siteContent.navigation.forEach(item => {

  const link = document.createElement("a");

  link.textContent = item.name;
  link.href = item.url;

  if (
    item.url &&
    item.url !== "#" &&
    !item.url.startsWith("#")
  ) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  topNavigation.appendChild(link);

});

/* =========================================================
   2. CREATE A LINK ITEM
   ========================================================= */

function createLinkItem(item, showDescription = true) {

  const wrapper = document.createElement("a");

  wrapper.className = "link-item";
  wrapper.href = item.link || "#";

  // Open external links in a new tab
  if (
    item.link &&
    item.link !== "#" &&
    !item.link.startsWith("#")
  ) {
    wrapper.target = "_blank";
    wrapper.rel = "noopener noreferrer";
  }


  /* Title */

  const title = document.createElement("div");
  title.className = "link-item-title";

  title.textContent = item.title;


  /* Arrow */

  const arrow = document.createElement("span");
  arrow.className = "arrow";
  arrow.textContent = "→";

  title.appendChild(arrow);

  wrapper.appendChild(title);


  /* Description */

  if (showDescription && item.description) {

    const description = document.createElement("div");

    description.className = "link-item-description";
    description.textContent = item.description;

    wrapper.appendChild(description);
  }


  return wrapper;
}


/* =========================================================
   3. CREATING SECTION
   ========================================================= */

const creatingList =
  document.getElementById("creating-list");

siteContent.creating.forEach(item => {

  creatingList.appendChild(
    createLinkItem(item, true)
  );

});


/* =========================================================
   4. RESOURCES SECTION
   ========================================================= */

const resourcesList =
  document.getElementById("resources-list");

siteContent.resources.forEach(item => {

  resourcesList.appendChild(
    createLinkItem(item, false)
  );

});


/* =========================================================
   5. POSTS SECTION
   ========================================================= */

const postsList =
  document.getElementById("posts-list");

siteContent.posts.forEach(item => {

  postsList.appendChild(
    createLinkItem(item, false)
  );

});


/* See all posts */

const postsAllLink =
  document.getElementById("posts-all-link");

postsAllLink.href =
  siteContent.postsAllLink;


/* Open external post archive in new tab */

if (
  siteContent.postsAllLink &&
  siteContent.postsAllLink !== "#" &&
  !siteContent.postsAllLink.startsWith("#")
) {

  postsAllLink.target = "_blank";
  postsAllLink.rel = "noopener noreferrer";

}


/* =========================================================
   6. CURRENTLY SECTION
   ========================================================= */

const currentlyList =
  document.getElementById("currently-list");

siteContent.currently.forEach(text => {

  const item = document.createElement("div");

  item.className = "currently-item";
  item.textContent = text;

  currentlyList.appendChild(item);

});


/* =========================================================
   7. FOOTER
   ========================================================= */

document.getElementById("footer-name").textContent =
  siteContent.footer.name;

document.getElementById("footer-role").textContent =
  siteContent.footer.role;

document.getElementById("copyright").textContent =
  siteContent.footer.copyright;


/* =========================================================
   8. FOOTER SOCIAL LINKS
   ========================================================= */

const footerLinks =
  document.getElementById("footer-links");

siteContent.footer.links.forEach(item => {

  const link = document.createElement("a");

  link.textContent = item.name;
  link.href = item.url;


  if (
    item.url &&
    item.url !== "#" &&
    !item.url.startsWith("#")
  ) {

    link.target = "_blank";
    link.rel = "noopener noreferrer";

  }


  footerLinks.appendChild(link);

});