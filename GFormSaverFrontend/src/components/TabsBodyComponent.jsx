/* eslint-disable react/prop-types */
import UrlsDisplayComponent from "../components/UrlsDisplayComponent.jsx";
import GoogleFilePickerComponent from "../components/GoogleFilePickerComponent.jsx";

function TabsBodyComponent({ activeTab, reMount, setReMount }) {
  return (
    <>
      <div
        className={`w-full flex-grow flex flex-col items-stretch ${
          activeTab === 0 ? "justify-start" : "justify-center"
        } bg-white rounded-r-lg rounded-b-lg overflow-x-hidden`}
      >
        {activeTab === 0 && (
          <UrlsDisplayComponent reMount={reMount} setReMount={setReMount} />
        )}
        {activeTab === 1 && <GoogleFilePickerComponent />}
      </div>
    </>
  );
}

export default TabsBodyComponent;
