import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import TabsHeaderComponent from "../components/TabsHeaderComponent.jsx";
import TabsBodyComponent from "../components/TabsBodyComponent.jsx";
import styles from "../style";

function MainPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [reMount, setReMount] = useState(false);
  return (
    <div className="bg-background w-full min-h-dvh flex flex-col">
      <div
        className={`${styles.paddingX} ${styles.flexCenter} flex-col w-full sticky top-0 z-10`}
      >
        <Navbar isHomePage={false} />
        <TabsHeaderComponent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setReMount={setReMount}
        />
      </div>
      <div className={`flex-grow flex flex-col ${styles.paddingX} w-full pb-4`}>
        <TabsBodyComponent
          reMount={reMount}
          activeTab={activeTab}
          setReMount={setReMount}
        />
      </div>
    </div>
  );
}

export default MainPage;
