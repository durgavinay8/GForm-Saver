chrome.runtime.onInstalled.addListener(details => {
  // if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
  //   chrome.runtime.setUninstallURL('https://example.com/extension-survey');
  // }
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

  const defaultPreferences = {
    "LOCATION":"GDRIVE",
    "FILEFORMAT":"HTML",
    "CONTENT":"QUESANDANS",
    "SAVETOFILLEDFORMS":"YES",
  }
  chrome.storage.sync.set(defaultPreferences, ()=>{
    console.log('Default Preferences are set in syn storage')
  })
});

// chrome.storage.onChanged.addListener((changes, area)=>{
//   if(area === 'sync' && changes.options?.newValue){
//      ToDo: nah
//   }
// });