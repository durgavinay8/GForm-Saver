const allowedOrigins = [
  "http://localhost:5173",
  "chrome-extension://dpcabdkgeemnicjpebpblniplknhmdgn",
  "http://cr-awsbucket.s3-website-us-east-1.amazonaws.com",
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
