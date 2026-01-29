const switch_button = document.getElementById("switch_button");
const flag_icon = document.getElementById("flag-icon");

let lang_mode = "se";
let cached_data = null;

async function getData() {
  if (cached_data) return cached_data;
  try {
    const response = await fetch("./src/js/lang.json");
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    cached_data = await response.json();
    return cached_data;
  } catch (_error) {
    return null;
  }
}

async function updateContent() {
  const result = await getData();

  if (result) {
    document.getElementById("title-text").innerText =
      result.lang[lang_mode].title;
    document.getElementById("qr-code-instruction").innerText =
      result.lang[lang_mode].qrCode;

    if (lang_mode === "se") {
      flag_icon.src = "https://flagcdn.com/w80/se.png";
      flag_icon.alt = "SE";
    } else {
      flag_icon.src = "https://flagcdn.com/w80/gb.png";
      flag_icon.alt = "GB";
    }
  }
}

function handleSwitch() {
  lang_mode = lang_mode === "se" ? "en" : "se";
  updateContent();
}

if (switch_button) {
  switch_button.addEventListener("click", handleSwitch);
  updateContent();
}
