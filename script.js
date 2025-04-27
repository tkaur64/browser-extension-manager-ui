let extensionList = [];
let extensionListFiltered = [];
let theme = "dark";

const updateTheme = () => {
  const imgTheme = document.querySelector(".theme-container img");
  if (theme === "dark") {
    imgTheme.src = "./assets/images/icon-sun.svg";
    document.querySelectorAll("header svg path")[1].style.fill = "#fff";
  } else {
    imgTheme.src = "./assets/images/icon-moon.svg";
    document.querySelectorAll("header svg path")[1].style.fill = "#09153e";
  }
  document.getElementsByTagName("body")[0].classList.toggle("light");
  document
    .getElementsByClassName("theme-container")[0]
    .classList.toggle("theme-container-light");
  document.getElementsByTagName("header")[0].classList.toggle("header-light");
  document
    .getElementsByClassName("filter-section")[0]
    .classList.toggle("filter-section-light");
  document.querySelectorAll(".extension-card").forEach((element) => {
    element.classList.toggle("extension-card-light");
  });
  document
    .querySelectorAll(".extension-card-img-text-container")
    .forEach((element) => {
      element.classList.toggle("extension-card-img-text-container-light");
    });
  document.querySelectorAll(".extension-card-remove").forEach((element) => {
    element.classList.toggle("extension-card-remove-light");
  });
};

const changeIsActive = (name) => {
  extensionListFiltered = extensionListFiltered.map((item) => {
    if (item.name === name) {
      return { ...item, isActive: !item.isActive };
    } else {
      return item;
    }
  });
  extensionList = extensionList.map((item) => {
    if (item.name === name) {
      return { ...item, isActive: !item.isActive };
    } else {
      return item;
    }
  });
  updateExtensionList(extensionListFiltered);
};

const createSlider = (name, isActive) => {
  const label = document.createElement("label");
  label.classList.add("switch");
  const inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.checked = isActive;
  inputElement.addEventListener("change", () => changeIsActive(name));
  label.appendChild(inputElement);
  const spanElement = document.createElement("span");
  spanElement.classList.add("slider");
  spanElement.classList.add("round");
  label.appendChild(spanElement);
  return label;
};

const createSection = ({ logo, name, description, isActive }) => {
  const section = document.createElement("section");
  section.innerHTML = `<div class="extension-card-img-text-container ${
    theme === "light" ? "extension-card-img-text-container-light" : ""
  }">
    <img src="${logo}" />
    <div>
      <h3>${name}</h3>
      <p>
        ${description}
      </p>
    </div>
  </div>`;
  section.classList.add(`extension-card`);
  section.classList.add(`${theme === "light" ? "extension-card-light" : null}`);
  const secondDiv = document.createElement("div");
  secondDiv.classList.add("extension-card-action");
  secondDiv.innerHTML = `<button class="extension-card-remove ${
    theme === "light" ? "extension-card-remove-light" : ""
  }" id="${name}-remove">Remove</button>`;
  const label = createSlider(name, isActive);
  secondDiv.appendChild(label);
  section.appendChild(secondDiv);
  return section;
};

const updateExtensionList = (el) => {
  const mainElement = document.getElementsByClassName(
    "extension-list-section"
  )[0];
  mainElement.innerHTML = "";
  el.forEach((element) => {
    mainElement.appendChild(createSection(element));
  });
  addClickEventListener();
};

window.addEventListener("DOMContentLoaded", () => {
  fetch("./data.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      extensionList = data;
      extensionListFiltered = data;
      updateExtensionList(data);
    })
    .catch((e) => {
      console.error(e);
    });
});

const filterBtnClick = (btn) => {
  const btnList = document.querySelectorAll(".filter-section-btns button");
  btnList.forEach((button) => button.classList.remove("filter-selected-btn"));
  if (btn.textContent === "Active") {
    extensionListFiltered = extensionList.filter(
      (extensionItem) => extensionItem.isActive
    );
  } else if (btn.textContent === "Inactive") {
    extensionListFiltered = extensionList.filter(
      (extensionItem) => !extensionItem.isActive
    );
  } else {
    extensionListFiltered = [...extensionList];
  }
  updateExtensionList(extensionListFiltered);
  btn.classList.add("filter-selected-btn");
};

document.querySelectorAll(".filter-section-btns button").forEach((btn) => {
  btn.addEventListener("click", () => filterBtnClick(btn));
});

const addClickEventListener = () => {
  document.querySelectorAll(".extension-card-action button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const elementSelected = btn.id.split("-")[0];
      extensionListFiltered = extensionListFiltered.filter(
        (item) => item.name !== elementSelected
      );
      updateExtensionList(extensionListFiltered);
    });
  });
};

document
  .getElementsByClassName("theme-container")[0]
  .addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    updateTheme();
  });
