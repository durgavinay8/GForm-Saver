const DEFAULTKEYS = [
  "LOCATION",
  "FILEFORMAT",
  "CONTENT",
];
const DEFAULTKEYVALUES = {
  "LOCATION":["GDRIVE", "DEVICESTORAGE"],
  "FILEFORMAT":["HTML", "PDF"],
  "CONTENT":["QUESONLY", "QUESANDANS"],
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", () => handleTabSwitch(i));
  }
  
  loadDefaultsTab();

  document.getElementById("save-defaults").addEventListener("click",()=>handleSaveDefaults());
});

async function handleTabSwitch(index) {
  makeActiveTab(index);
  switch (index) {
    case 0:
      loadDefaultsTab();
      break;
    case 1:
      loadSavedFilesTab();
      break;
    case 2:
      loadFilledFormsTab();
      break;
    case 3:
      loadMoreTab();
      break;
    default:
      break;
  }
}

async function makeActiveTab(index) {
  const tabs = document.getElementsByClassName("tab-btn");
  const contents = document.getElementsByClassName("content");
  for (const tab of tabs) {
    tab.classList.remove("active-tab");
  }
  for (const content of contents) {
    content.classList.remove("active-tab");
  }
  tabs[index].classList.add("active-tab");
  contents[index].classList.add("active-tab");
}

async function handleSaveDefaults(){
  let selectedValues={};
  DEFAULTKEYS.forEach((DEFAULTKEY)=>{
    const radioButtons = document.getElementsByName(DEFAULTKEY);
    const selectedValue = Array.from(radioButtons).find(radio => radio.checked)?.value;
    selectedValues[DEFAULTKEY] = selectedValue || DEFAULTKEYVALUES[DEFAULTKEY][0];
  });
  chrome.storage.sync.set(selectedValues, ()=>{
    console.log('Default Preferences are set in syn storage')
  });
}

async function loadDefaultsTab() {
  const valuesToSet = await chrome.storage.sync.get(DEFAULTKEYS);
  DEFAULTKEYS.forEach((DEFAULTKEY, index)=>{
    let radioButtons = document.getElementsByName(DEFAULTKEY);
    radioButtons.forEach((radio)=>{
        radio.checked = radio.value == valuesToSet[DEFAULTKEY];
    });
  });
}

async function loadSavedFilesTab() {}

async function loadFilledFormsTab() {}

async function loadMoreTab() {}
