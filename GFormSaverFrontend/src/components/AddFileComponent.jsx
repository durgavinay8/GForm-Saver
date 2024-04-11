// import { useState } from "react";
// import { axiosPrivate } from "../api/axios";
import { addFile } from "../assets";
import notify from "../services/notify.js";

const AddFileComponent = () => {
  /*
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilename(selectedFile.name);
  };
  const handleFilenameChange = (e) => {
    setFilename(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fileData", file);
    formData.append("fileName", filename);

    try {
      const response = await axiosPrivate.post("/api/form-pdf", formData);
      console.log("Response:", response.data);
      //TODO: Handle response as needed
    } catch (error) {
      console.error("Error uploading file:", error);
      //TODO: Handle error
    }
  };
*/
  return (
    <div
      className="flex items-center gap-2 p-2 hover:cursor-pointer hover:text-primary hover:font-medium"
      onClick={() =>
        notify("Open file picker and click on upload button", "info")
      }
    >
      <img src={addFile} alt="file-icon" className="h-6 mt-1" />
      <span>Add File</span>
      {/* <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form> */}
    </div>
  );
};

export default AddFileComponent;
