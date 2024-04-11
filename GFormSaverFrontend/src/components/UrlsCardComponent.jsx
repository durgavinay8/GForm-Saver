/* eslint-disable react/prop-types */
import { useState } from "react";
import notify from "../services/notify.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { convertUTCtoIST } from "../utils/convertUTCtoIST.js";
import { bin } from "../assets/index.js";

function UrlsCardComponent({ formMetadata, setReMount }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { url, heading, comment, createdAt, _id } = formMetadata;
  const handleDelete = async (_id) => {
    setIsDeleting(true);
    try {
      await axiosPrivate.delete(`/api/form-metadata?formId=${_id}`);
      setReMount((prev) => !prev);
    } catch (error) {
      notify("Error deleting resource:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="relative border-b-2">
      <table className="text-left border-separate border-spacing-2 p-4">
        <tbody>
          <tr>
            <th className="font-medium">URL</th>
            <td>
              <a href={url} target="_blank">
                {url}
              </a>
            </td>
          </tr>
          <tr>
            <th className="font-medium">Heading</th>
            <td className="break-words">{heading}</td>
          </tr>
          {comment && (
            <tr>
              <th className="font-medium">Comments</th>
              <td>{comment}</td>
            </tr>
          )}
          <tr>
            <th className="font-medium">Created at</th>
            <td>{convertUTCtoIST(createdAt)}</td>
          </tr>
        </tbody>
      </table>
      <div
        className={`absolute bottom-8 right-6 flex items-center gap-2 ${
          !isDeleting &&
          "hover:cursor-pointer hover:text-primary hover:font-medium hover:border-b-2 border-primary"
        }`}
        onClick={() => handleDelete(_id)}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <span>Deleting...</span>
        ) : (
          <>
            <img src={bin} className="h-5" alt="Delete Icon" />
            <span>Delete</span>
          </>
        )}
      </div>
    </div>
  );
}

export default UrlsCardComponent;

/*
<div className="absolute bottom-8 right-6 flex gap-10">
  <div
    className="flex items-center gap-2 hover:cursor-pointer hover:text-primary hover:font-medium"
    onClick={() => handleEdit(id)}
  >
    <img src={edit} className="h-5" alt="Edit Icon" />
    <span>Edit</span>
  </div>
  <div
    className="flex items-center gap-2 hover:cursor-pointer hover:text-primary hover:font-medium"
    onClick={() => handleDelete(id)}
  >
    <img src={bin} className="h-5" alt="Delete Icon" />
    <span>Delete</span>
  </div>
</div>
*/
