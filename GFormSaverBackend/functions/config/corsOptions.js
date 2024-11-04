const allowedOrigins = [
  "http://localhost:5173",
  "https://google-form-saver.vercel.app",
];

const chromeExtensionRegex = /^chrome-extension:\/\/[a-z]{32}$/;

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || chromeExtensionRegex.test(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
