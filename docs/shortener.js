const mobileNavOpener = document.querySelector(".menu-open");
const mobileNav = document.querySelector(".nav-menu");
const mainLogo = document.querySelector(".logo");

const linkShort = document.querySelector(".submit");
const input = document.querySelector("#shortener");
const results = document.querySelector(".results");
const p = document.querySelector(".error-message");

mobileNavOpener.addEventListener("click", () => {
  if (mobileNav.style.display === "none") {
    mobileNav.style.display = "block";
    mobileNav.style.animation = "slideIn 1s 1 ease";
  } else {
    mobileNav.style.animation = "slideOut 1s 1 ease";
    setTimeout(() => {
      mobileNav.style.display = "none";
    }, 1010);
  }
});

const body = document.querySelector("body");
let defaultTheme = true;
const themeToggle = document.querySelector(
  window.innerWidth > 768 ? ".themes" : "#themes"
);
const darkTheme = document.querySelector(
  window.innerWidth > 768 ? ".dark-theme" : "#dark-theme"
);
const lightTheme = document.querySelector(
  window.innerWidth > 768 ? ".light-theme" : "#light-theme"
);

themeToggle.addEventListener("click", () => {
  defaultTheme = !defaultTheme;
  darkTheme.style.display = defaultTheme ? "flex" : "none";
  lightTheme.style.display = defaultTheme ? "none" : "flex";
  body.className = defaultTheme ? "light-mode" : "dark-mode";
  mainLogo.src = defaultTheme ? "./images/logo.svg" : "./images/vector.svg";
  mobileNavOpener.src = defaultTheme
    ? "./images/icon-menu.svg"
    : "./Icons/icon-menu 1 white og.svg";
});

let copyButton;

const divCreate = (inputs, fetchedLink) => {
  const div = document.createElement("div");
  div.innerHTML = `<p class="given-link">${inputs}</p>
                        <p class="shortened-link">${fetchedLink}</p>
                        <button class="copy-button">copy</button>`;
  results.appendChild(div);
};

async function fetchedLink(inputs) {
  const fetchUrl = `http://localhost:7000/api/shorten`; 
  try {
    const fetching = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ url: inputs }), 
    });

    if (!fetching.ok) {
      console.error("Couldn't shorten the link");
    } else {
      const data = await fetching.json();
      if (data.error) {
        p.textContent = "Invlid URL";
      } else {
        p.textContent = "";
        divCreate(inputs, JSON.stringify(data.result_url));
      }
    }
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

linkShort.addEventListener("click", () => {
  if (!input.value) {
    p.textContent = "Field Cannot be empty!";
  } else {
    p.textContent = "";
    fetchedLink(input.value);
  }
});
