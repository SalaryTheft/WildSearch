function saveOptions(event) {
  const { name, type, checked, value } = event.target;

  if (type === "checkbox") {
    browser.storage.sync.set({ [name]: checked });
  } else {
    browser.storage.sync.set({ [name]: value });
  }
}

function loadOptions() {
  function setCurrentChoice(result) {
    let inputs = document.querySelectorAll("#options_form input");

    let defaultValues = {
      masterArm: true,
      usePrimaryLanguage: false
    };

    inputs.forEach((input) => {
      if (result[input.name] === undefined) {
        result[input.name] = defaultValues[input.name];
      }

      if (input.type === "checkbox") {
        input.checked = result[input.name];
      } else {
        input.value = result[input.name];
      }
    });
  }

  browser.storage.sync.get().then(setCurrentChoice, console.error.bind(console));
}

document.addEventListener("DOMContentLoaded", () => {
  loadOptions();
  let displayNames = new Intl.DisplayNames([navigator.language], { type: "language" });
  let primaryLanguageName = displayNames.of(navigator.language).replace(/\([^)]*\)/g, "");
  let searchLangLabelText = `Search ${primaryLanguageName} pages`;
  if (primaryLanguageName === "한국어") {
    document.querySelector("#options_form label[for=masterArm]").textContent = "Wild Search 사용";
    searchLangLabelText = "한국어 웹 검색";
  }
  document.querySelector("#options_form label[for=usePrimaryLanguage]").textContent = searchLangLabelText;
});
document.querySelector("#options_form").addEventListener("change", saveOptions);
