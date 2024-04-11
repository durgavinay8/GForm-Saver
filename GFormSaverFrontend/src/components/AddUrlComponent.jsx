/* eslint-disable react/prop-types */
import { urlImg } from "../assets";
import { useRef, useState } from "react";
import notify from "../services/notify.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function AddUrlComponent({ activeTab, setReMount }) {
  const axiosPrivate = useAxiosPrivate();
  const [isUploading, setIsUploading] = useState(false);
  const dialogRef = useRef(null);
  const [url, setUrl] = useState("");
  const [heading, setHeading] = useState("");
  const [comment, setComment] = useState("");

  const toggleDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      await axiosPrivate.post(`/api/form-metadata`, {
        url,
        heading,
        comment,
      });
      if (activeTab === 0) setReMount(0);
    } catch (error) {
      notify("Error Adding Form URL:", error);
    } finally {
      setIsUploading(false);
    }
    toggleDialog();
  };
  return (
    <>
      <button
        className="flex items-center gap-2 p-2 hover:cursor-pointer hover:text-primary hover:font-medium"
        onClick={toggleDialog}
      >
        <img src={urlImg} alt="file-icon" className="h-6" />
        <span>Add URL</span>
      </button>
      <dialog
        ref={dialogRef}
        className="p-8 rounded-lg"
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            toggleDialog();
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <table className="border-separate border-spacing-4">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="url">URL </label>
                </td>
                <td>
                  <input
                    type="text"
                    value={url}
                    id="url"
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="border-b focus:outline-none focus:border-primary"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="heading">Heading </label>
                </td>
                <td>
                  <input
                    type="text"
                    value={heading}
                    id="heading"
                    onChange={(e) => setHeading(e.target.value)}
                    className="border-b focus:outline-none focus:border-primary"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="comment">Comment </label>
                </td>
                <td>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border-b focus:outline-none focus:border-primary w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-around">
            <button
              onClick={toggleDialog}
              className="hover:border-primary border rounded-md px-3 py-1 hover:text-primary"
              type="button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="hover:border-primary border rounded-md px-3 py-1 hover:text-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default AddUrlComponent;
