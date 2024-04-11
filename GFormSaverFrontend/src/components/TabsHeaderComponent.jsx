/* eslint-disable react/prop-types */
import AddFileComponent from "./AddFileComponent";
import AddUrlComponent from "./AddUrlComponent";
import { reload } from "../assets/index.js";

function TabsHeaderComponent({ activeTab, setActiveTab, setReMount }) {
  return (
    <div className="flex w-full justify-between bg-background ">
      <div className="flex">
        <div
          className={`py-2 px-7 rounded-t-xl ${
            activeTab == 0 &&
            " text-primary bg-white font-medium underline underline-offset-8"
          }`}
          onClick={() => setActiveTab(0)}
        >
          URLs
        </div>
        <div
          className={`py-2 px-7 rounded-t-xl${
            activeTab == 1 &&
            " text-primary bg-white font-medium underline underline-offset-8"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Files
        </div>
        {activeTab === 0 && (
          <div
            className="pt-3 px-4 rounded-t-x"
            onClick={() => setReMount((prev) => !prev)}
          >
            <img
              src={reload}
              alt="Reload"
              className="h-5"
              title="Reload URLs"
            />
          </div>
        )}
      </div>
      <div className="flex gap-7 mr-4">
        <AddFileComponent />
        <AddUrlComponent activeTab={activeTab} setReMount={setReMount} />
      </div>
    </div>
  );
}

export default TabsHeaderComponent;
