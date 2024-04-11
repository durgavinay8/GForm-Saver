/* eslint-disable react/no-unescaped-entities */

function NotFound() {
  return (
    <div className="absolute right-0 bottom-0 w-full h-screen flex flex-col justify-center items-center text-2xl">
      <p>The Url you're looking for doesn't exists!!!</p>
      <a href="/home" className="underline text-primary">
        Go to Home Page
      </a>
    </div>
  );
}

export default NotFound;
