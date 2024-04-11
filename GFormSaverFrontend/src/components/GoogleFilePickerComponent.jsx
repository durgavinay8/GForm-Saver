import useDrivePicker from "react-google-drive-picker";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { close } from "../assets/index.js";

function GoogleFilePickerComponent() {
  const [openPicker, authResponse] = useDrivePicker();
  const [pdfUrl, setPdfUrl] = useState(null);
  const { auth } = useAuth();
  console.log("authResponse : ", authResponse);

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "1070878439165-a7ikdvq886p5o50jkhsvd2f9qous59qm.apps.googleusercontent.com",
      developerKey: "AIzaSyC61a-wsEgBQRa2MhVTiqbiw-2-foWIRtE",
      viewId: "PDFS",
      token: auth.googleAccessToken,
      showUploadView: true,
      supportDrives: true,
      customScopes: ["https://www.googleapis.com/auth/drive.file"],
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        } else if (data.action === "picked") {
          setPdfUrl(data.docs[0]?.embedUrl);
        }
      },
    });
  };
  return (
    <>
      {pdfUrl ? (
        <>
          <button
            className="self-center flex items-center gap-3 m-2 text-primary hover:cursor-pointer"
            onClick={() => setPdfUrl(null)}
          >
            <img src={close} alt="close" className="h-4" />
            <span>Close File</span>
          </button>

          <iframe src={pdfUrl} className="flex-grow"></iframe>
        </>
      ) : (
        <button
          onClick={() => handleOpenPicker()}
          className="w-fit self-center text-2xl rounded-lg text-center py-3 px-8 bg-[#F47F18] text-white hover:shadow-xl hover:bg-[#f47f18e8] active:none focus:outline-none"
        >
          Open File Picker
        </button>
      )}
    </>
  );
}

export default GoogleFilePickerComponent;
