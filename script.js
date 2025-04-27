let extensionList = [];

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
  secondDiv.innerHTML = '<button class="extension-card-remove">Remove</button>';
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
      updateExtensionList(data);
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
    const filteredList = extensionList.filter(
      (extensionItem) => extensionItem.isActive
    );
    updateExtensionList(filteredList);
  } else if (btn.textContent === "Inactive") {
    const filteredList = extensionList.filter(
      (extensionItem) => !extensionItem.isActive
    );
    updateExtensionList(filteredList);
  } else {
    updateExtensionList(extensionList);
  }
  btn.classList.add("filter-selected-btn");
};

document.querySelectorAll(".filter-section-btns button").forEach((btn) => {
  btn.addEventListener("click", () => filterBtnClick(btn));
});
