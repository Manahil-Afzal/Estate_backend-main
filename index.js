// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from "url";

// import authRouter from "./routes/auth.route.js";
// import userRouter from "./routes/user.route.js";
// import listingRouter from "./routes/listing.route.js";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Setup __dirname (for ES modules)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Serve static files (favicon.ico will be here)
// app.use(express.static(path.join(__dirname, "public")));

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://estatefrontend.netlify.app"
// ];

// app.use(cors({ origin: allowedOrigins, credentials: true }));

// // Routes
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/listing", listingRouter);

// app.get("/", (req, res) => res.send("Backend is running!"));


// // Global error handler
// app.use((err, req, res, next) => {
//   console.error("Error:", err.message || err);
//   res
//     .status(err.statusCode || 500)
//     .json({ success: false, message: err.message || "Internal Server Error" });
// });

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected ✅");
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch(err => console.error("MongoDB connection failed ❌", err));



import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://estatefrontend.netlify.app"
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routers
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Backend + DB alive 🚀" });
});

// Root route
app.get("/", (req, res) => res.send("Backend is running!"));

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message || err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// DB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB connection failed ❌", err));

// 👇 IMPORTANT: export app (don’t call app.listen)
export default app;
