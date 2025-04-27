let extensionList = [];
let extensionListFiltered = [];

const createSlider = (isActive) => {
  const label = document.createElement("label");
  label.classList.add("switch");
  const inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.checked = isActive;
  label.appendChild(inputElement);
  const spanElement = document.createElement("span");
  spanElement.classList.add("slider");
  spanElement.classList.add("round");
  label.appendChild(spanElement);
  return label;
};

const createSection = ({ logo, name, description, isActive }) => {
  const section = document.createElement("section");
  section.innerHTML = `<div class="extension-card-img-text-container">
    <img src="${logo}" />
    <div>
      <h3>${name}</h3>
      <p>
        ${description}
      </p>
    </div>
  </div>`;
  section.classList.add("extension-card");
  const secondDiv = document.createElement("div");
  secondDiv.classList.add("extension-card-action");
  secondDiv.innerHTML = `<button class="extension-card-remove" id="${name}-remove">Remove</button>`;
  section.appendChild(secondDiv);
  const label = createSlider(isActive);
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
      addClickEventListener();
    })
    .catch((e) => {
      console.error(e);
    });
});

const removeSelectedClass = (btnList, selectedBtn) => {
  btnList.forEach((btn) => {
    if (btn !== selectedBtn) {
      btn.classList.remove("filter-selected-btn");
    }
  });
};

const filterBtnClick = (btn) => {
  const btnList = document.querySelectorAll(".filter-section-btns button");
  removeSelectedClass(btnList, btn);
  if (btn.textContent === "Active") {
    extensionListFiltered = extensionListFiltered.filter(
      (extensionItem) => extensionItem.isActive
    );
  } else if (btn.textContent === "Inactive") {
    extensionListFiltered = extensionList.filter(
      (extensionItem) => !extensionItem.isActive
    );
  } else {
    extensionListFiltered = extensionList;
  }
  updateExtensionList(extensionListFiltered);
  addClickEventListener();
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
      addClickEventListener();
    });
  });
};
