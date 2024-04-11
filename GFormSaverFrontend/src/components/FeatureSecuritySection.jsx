import {
  URLsDisplayImg,
  UiInFormImg,
  FileSelectionImg,
  FileDisplayImg,
  GoogleDrive,
  ScopesConsent,
} from "../assets/index.js";

function FeatureSecuritySection() {
  return (
    <div className="px-16 py-5">
      <section
        className="w-full flex flex-col gap-10 items-center my-10"
        id="FeaturesSec"
      >
        <article className="flex justify-between gap-10 my-20">
          <img
            src={UiInFormImg}
            alt="Main page image"
            className="w-1/2 drop-shadow-2xl rounded-xl"
          />
          <div className="flex justify-items-center items-center text-xl px-7 text-textcolor">
            <p className="-mt-10">
              <span className="text-2xl font-medium">
                Stay right where you are—
              </span>
              <br />
              <br />
              GFormSaver
              <span className="text-primary text-2xl font-medium">
                {" "}
                User Friendly Design{" "}
              </span>
              saves the data directly from the form you're filling, eliminating
              the need to navigate elsewhere.
            </p>
          </div>
        </article>
        <article className="flex justify-between gap-10 my-20">
          <div className="flex justify-items-center items-center text-xl px-7 text-textcolor">
            <p className="-mt-10">
              <span className="text-2xl font-medium">All at one place—</span>
              <br />
              <br />
              Effortlessly{" "}
              <span className="text-primary text-2xl font-medium">
                {" "}
                Access{" "}
              </span>{" "}
              and{" "}
              <span className="text-primary text-2xl font-medium">
                {" "}
                Manage{" "}
              </span>{" "}
              all the stored data with{" "}
              <span className="text-primary text-2xl font-medium">
                {" "}
                Time-Stamps{" "}
              </span>{" "}
              from a clean and user-friendly webpage.
            </p>
          </div>
          <img
            src={URLsDisplayImg}
            alt="Main page image"
            className="w-1/2 drop-shadow-2xl rounded-xl"
          />
        </article>
        <article className="flex flex-col items-center gap-10 my-20">
          <div className="flex justify-items-center items-center text-xl px-7 text-textcolor">
            <p className="-mt-10">
              <span className="text-primary text-2xl font-medium">
                {" "}
                Effortlessly{" "}
              </span>{" "}
              syncs with your &nbsp;
              <img src={GoogleDrive} className="inline-block h-9 -mt-2" />
              <span className="text-cta text-2xl font-medium">
                {" "}
                Google Drive{" "}
              </span>{" "}
              , providing seamless file storage and selection capabilities.
            </p>
          </div>
          <div className="flex justify-around">
            <img
              src={FileSelectionImg}
              alt="Main page image"
              className="w-[48%] drop-shadow-2xl rounded-xl"
            />
            <img
              src={FileDisplayImg}
              alt="Main page image"
              className="w-[48%] drop-shadow-2xl rounded-xl"
            />
          </div>
        </article>
      </section>
      <section
        className="w-full flex flex-col gap-10 items-center my-10"
        id="SecuritySec"
      >
        <article className="flex justify-between gap-10 my-20">
          <div className="flex justify-items-center items-center text-xl px-7 text-textcolor">
            <p className="-mt-10">
              <span className="text-2xl font-medium">Security—</span>
              <br />
              <br />
              GFormSaver can see, edit, create and delete only the
              <span className="text-primary text-2xl font-medium">
                {" "}
                Specific{" "}
              </span>{" "}
              files you
              <span className="text-primary text-2xl font-medium">
                {" "}
                use with this app{" "}
              </span>{" "}
              . i.e., Only the files GFormSaver creates and the user shares
            </p>
          </div>
          <img
            src={ScopesConsent}
            alt="Main page image"
            className="w-1/2 drop-shadow-2xl rounded-xl"
          />
        </article>
      </section>
    </div>
  );
}

export default FeatureSecuritySection;
