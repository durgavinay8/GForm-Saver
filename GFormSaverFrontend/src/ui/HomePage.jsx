import FeatureSecuritySection from "../components/FeatureSecuritySection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import styles from "../style";

export default function HomePage() {
  return (
    <div className="bg-background w-full min-h-dvh pb-10">
      <div
        className={`${styles.paddingX} ${styles.flexCenter} w-full sticky top-0 z-10 border-b-2`}
      >
        <Navbar isHomePage={true} />
      </div>
      <div className={`${styles.paddingX} ${styles.flexStart} w-full`}>
        <HeroSection />
      </div>
      <div className={`${styles.paddingX} ${styles.flexStart} w-full`}>
        <FeatureSecuritySection />
      </div>
    </div>
  );
}
