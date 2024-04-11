/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

chrome.runtime.onInstalled.addListener((details) => {
  // if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
  //   chrome.runtime.setUninstallURL('https://example.com/extension-survey');
  // }
});
/*
chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({
    url: "http://cr-awsbucket.s3-website-us-east-1.amazonaws.com",
  });
});
*/
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action, headers, formMetadata, formData } = request;
  switch (action) {
    case "getAccessToken": {
      try {
        fetch("http://localhost:6900/api/oauth/refresh", {
          method: "GET",
          credentials: "include",
        }).then((response) => {
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error("Unauthorized: Please log in to continue.");
            } else if (response.status === 500) {
              throw new Error("Internal server error: Please try again later.");
            } else {
              throw new Error("HTTP error occurred: " + response.status);
            }
          }
          response.json().then((data) => {
            sendResponse({
              accessToken: data.accessToken,
              googleAccessToken: data.googleAccessToken,
            });
          });
        });
      } catch (error) {
        sendResponse({ error: error.message });
      }
      break;
    }
    case "saveUrlComments": {
      try {
        fetch("http://localhost:6900/api/form-metadata", {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formMetadata),
        }).then((response) => {
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error("Unauthorized: Please log in to continue.");
            } else if (response.status === 400) {
              throw new Error("Bad request: Please check your request data.");
            } else if (response.status === 500) {
              throw new Error("Internal server error: Please try again later.");
            } else {
              throw new Error("HTTP error occurred: " + response.status);
            }
          }
          sendResponse({
            isSucces: true,
          });
        });
      } catch (error) {
        sendResponse({ error: error.message });
      }
      break;
    }
    case "savePdf": {
      const [body, type] = deserialize(formData.fileData);

      const newFormData = new FormData();
      const fileData = new File([body], formData.fileName, {
        type: "application/pdf",
      });
      newFormData.append("fileData", fileData, formData.fileName);
      newFormData.append("fileName", formData.fileName);
      try {
        fetch("http://localhost:6900/api/form-pdf", {
          method: "POST",
          headers,
          body: newFormData,
        }).then((response) => {
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error("Unauthorized: Please log in to continue.");
            } else if (response.status === 400) {
              throw new Error("Bad request: Please check your request data.");
            } else if (response.status === 500) {
              throw new Error("Internal server error: Please try again later.");
            } else {
              throw new Error("HTTP error occurred: " + response.status);
            }
          }
          sendResponse({
            isSucces: true,
          });
        });
      } catch (error) {
        sendResponse({ error: error.message });
      }
      break;
    }
  }
  return true;
});

const deserialize = (base64Data) => {
  const str = atob(base64Data.slice(base64Data.indexOf(",") + 1));
  const len = str.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) arr[i] = str.charCodeAt(i);
  const type = base64Data.match(/^data:(.+?);base64/)[1];
  return [arr, type];
};
