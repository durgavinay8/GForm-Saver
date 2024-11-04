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
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/3BwVaacfazM?si=gSzGuCd_BzdFrQqZ?autoplay=1&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <div className={`${styles.paddingX} ${styles.flexStart} w-full`}>
        <a
          href="https://youtu.be/j_5qiAj5110?si=uAN9cyRNVlR5b9V5"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cta text-2xl font-medium mt-10"
        >
          Installation Guide
        </a>
      </div>
      <div className={`${styles.paddingX} ${styles.flexStart} w-full`}>
        <FeatureSecuritySection />
      </div>
    </div>
  );
}
