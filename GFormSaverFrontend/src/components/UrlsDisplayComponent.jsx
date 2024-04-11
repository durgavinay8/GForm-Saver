/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import notify from "../services/notify.js";
import UrlsCardComponent from "./UrlsCardComponent.jsx";
import LoadingComponent from "./LoadingComponent.jsx";

//TODO: filter, order by

function UrlsDisplayComponent({ reMount, setReMount }) {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        const response = await axiosPrivate.get("/api/form-metadata", {
          signal: controller.signal,
        });
        setData(response.data);
      } catch (error) {
        notify("fetching data failed", "error");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
    return () => {
      setIsLoading(false);
      controller.abort();
    };
  }, [reMount]);

  return isLoading ? (
    <LoadingComponent text="Fetching Data" />
  ) : data.length === 0 ? (
    <p className="m-10">Looks like there are no saved forms yet!</p>
  ) : (
    <div className="flex flex-col px-20 py-6 h-full">
      {data.map((formMetadata) => (
        <UrlsCardComponent
          formMetadata={formMetadata}
          key={formMetadata._id}
          setReMount={setReMount}
        />
      ))}
    </div>
  );
}

export default UrlsDisplayComponent;
