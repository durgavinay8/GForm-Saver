/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import html2pdf from "html2pdf.js";

const customCardHTML = `<div id="form-url-cont"><span>URL: </span><span></span></div><div id="form-heading-cont"> <label for="FORMHEADING">Heading : </label> <input type="text" id="FORMHEADING" name="FORMHEADING"></input> </div> <div id="form-comment-cont"> <label for="FORMCOMMENT">Comments : </label> <textarea rows="2" id="FORMCOMMENT" name="FORMCOMMENT"></textarea> </div> <div id="GFormSaverBtn-cont"> <button id="GFormSaverBtn1" class="GFormSaverBtn">Save Form Info</button> <button id="GFormSaverBtn2" class="GFormSaverBtn">Save Form PDF & Info</button> </div>`;

let accessToken = null,
  googleAccessToken = null;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    insertCustomCard();
  });
} else {
  insertCustomCard();
}

async function insertCustomCard() {
  document.documentElement.style.setProperty(
    "--gFormColor",
    getBackgroundColor()
  );
  let questionsList = document.getElementsByClassName("o3Dpx")[0];
  if (!questionsList) {
    return;
  }
  const customCardEle = document.createElement("div");
  customCardEle.id = "GFormSaver-custom-card";
  customCardEle.className = "geS5n";
  customCardEle.innerHTML = customCardHTML;
  questionsList.insertAdjacentElement("beforeend", customCardEle);

  document.getElementById("FORMHEADING").value = getFormHeading();
  document
    .getElementById("form-url-cont")
    .getElementsByTagName("span")[1].innerText = document.location.href;

  const GFormSaverBtn1 = document.getElementById("GFormSaverBtn1");
  GFormSaverBtn1.addEventListener("click", async function () {
    this.blur();
    if (!accessToken) alert("GFormSaver : Login to the webpage to save!");
    else handleSaveUrlComments();
  });

  const GFormSaverBtn2 = document.getElementById("GFormSaverBtn2");
  GFormSaverBtn2.addEventListener("click", async function () {
    this.blur();
    if (!accessToken) {
      alert("GFormSaver : Login to the webpage to save!");
    } else {
      handleSaveUrlComments();
      handleSaveAsPdf();
    }
  });

  //Fetching access token
  chrome.runtime.sendMessage({ action: "getAccessToken" }, (response) => {
    if (response?.accessToken) {
      accessToken = response.accessToken;
      googleAccessToken = response.googleAccessToken;
    } else {
      //show error to user
      console.error("GFormSaver : Failed to fetch access token");
    }
  });
}

async function handleSaveAsPdf() {
  const btn = document.getElementById("GFormSaverBtn2");
  btn.innerHTML = `<div class="dot-flashing"></div>`;
  btn.disabled = true;
  const formHtml = document.getElementsByClassName("Uc2NEf")[0];
  const toRemove = formHtml.querySelector("#GFormSaver-custom-card");
  toRemove.style.display = "none";
  const options = {
    margin: 10,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "p" },
  };
  const fileName = getFormHeading();
  let blob = null;
  try {
    blob = await html2pdf()
      .set(options)
      .from(formHtml)
      .outputPdf("blob", fileName);
  } catch (error) {
    alert("GFormSaver : Error generating PDF");
    console.error("Error generating PDF:", error);
    return;
  }
  serialize(blob).then(([base64Data, fileType]) => {
    const formData = {
      fileName: fileName,
      fileData: base64Data,
    };
    chrome.runtime.sendMessage(
      {
        action: "savePdf",
        formData: formData,
        headers: getHeaders(),
      },
      (response) => {
        alert(
          response?.isSucces
            ? "Successfully uploaded the form as pdf"
            : `Failed to upload the form as pdf : ${response.error}`
        );
        btn.innerHTML = "Save Form PDF & Info";
        btn.disabled = false;
      }
    );
  });
  toRemove.style.display = "";
}

async function handleSaveUrlComments() {
  const btn = document.getElementById("GFormSaverBtn1");
  btn.innerHTML = `<div class="dot-flashing"></div>`;
  btn.disabled = true;
  const formMetadata = {
    url: document.location.href,
    heading: document.getElementById("FORMHEADING")?.value.trim() || "",
    comment: document.getElementById("FORMCOMMENT")?.value.trim() || "",
  };
  //Saving URL & Comments
  chrome.runtime.sendMessage(
    {
      action: "saveUrlComments",
      formMetadata,
      headers: getHeaders(),
    },
    (response) => {
      alert(
        response?.isSucces
          ? "Successfully uploaded the form metadata"
          : `Failed to upload the form as pdf : ${response.error}`
      );
      btn.innerHTML = "Save Form Info";
      btn.disabled = false;
    }
  );
}

function getBackgroundColor() {
  return window.getComputedStyle(document.getElementsByClassName("RVEQke")[0])
    .backgroundColor;
}

const getHeaders = () => ({
  Authorization: `Bearer ${accessToken}`,
  googleAccessToken: `Bearer ${googleAccessToken}`,
});

async function serialize(blob) {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = () => resolve([reader.result, blob.type]);
    reader.readAsDataURL(blob);
  });
}

function getFormHeading() {
  return (
    document.getElementsByClassName("ahS2Le")[0]?.textContent ||
    document.location.href.split("/")[6]
  );
}
