const customCardHTML = `<table> <tr class="preferences"> <td colspan="2"><span class="ques">Where to save?</span></td> <td> <input type="radio" name="LOCATION" id="GDRIVE" value="GDRIVE" /> <label for="GDRIVE">Google Drive</label> </td> <td> <input type="radio" name="LOCATION" id="DEVICESTORAGE" value="DEVICESTORAGE" /> <label for="DEVICESTORAGE">Device Storage</label> </td> </tr> <tr class="preferences"> <td colspan="2"><span class="ques">File format?</span></td> <td> <input type="radio" name="FILEFORMAT" id="HTML" value="HTML" /> <label for="HTML">HTML</label> </td> <td> <input type="radio" name="FILEFORMAT" id="PDF" value="PDF" /> <label for="PDF">PDF</label> </td> </tr> <tr class="preferences"> <td colspan="2"><span class="ques">What to save?</span></td> <td> <input type="radio" name="CONTENT" id="QUESONLY" value="QUESONLY" /> <label for="QUESONLY">Questions Only</label> </td> <td> <input type="radio" name="CONTENT" id="QUESANDANS" value="QUESANDANS" /> <label for="QUESANDANS">Questions & Answers</label> </td> </tr></table><div id="form-comment-cont"> <label for="FORMCOMMENT">Form Comments : </label> <textarea rows="2" id="FORMCOMMENT" name="FORMCOMMENT"></textarea></div><div id="GFormSaverBtn-cont"><button id="GFormSaverBtn1" class="GFormSaverBtn">Add to Filled Forms</button><button id="GFormSaverBtn2" class="GFormSaverBtn">Save Form</button></div>`;

const DEFAULTKEYS = [
  "LOCATION",
  "FILEFORMAT",
  "CONTENT",
  "SAVETOFILLEDFORMS",
];

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    insertCustomCard();
  });
} else {
  insertCustomCard();
}

async function insertCustomCard(){
  let questionsList = document.getElementsByClassName("o3Dpx")[0];
  if (!questionsList) {
    return;
  }
  const customCardEle = document.createElement('div');
  customCardEle.id = "GFormSaver-custom-card";
  customCardEle.className = "geS5n";
  customCardEle.innerHTML = customCardHTML;
  questionsList.insertAdjacentElement("beforeend", customCardEle);

  loadDefaultsTab();

  let GFormSaverBtn1 = document.getElementById('GFormSaverBtn1');
  GFormSaverBtn1.addEventListener("click", async function(){
    this.blur();
    handleSaveForm()
  });

  let GFormSaverBtn2 = document.getElementById('GFormSaverBtn2');
  GFormSaverBtn2.addEventListener("click", async function(){
    this.blur();
    handleAddFilledForms()
  });
};

async function handleSaveForm(){
};

async function handleAddFilledForms(){
};

async function loadDefaultsTab() {
  const valuesToSet = await chrome.storage.sync.get(DEFAULTKEYS);
  DEFAULTKEYS.forEach((DEFAULTKEY, index)=>{
    let radioButtons = document.getElementsByName(DEFAULTKEY);
    radioButtons.forEach((radio)=>{
        radio.checked = radio.value == valuesToSet[DEFAULTKEY];
    });
  });
}