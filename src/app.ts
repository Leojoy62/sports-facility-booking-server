import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));

app.get("/", (req, res) => {
  res.send("Hello from Sports Facility Booking Platform!");
});

// application routes
app.use("/api", router);

// global error handler
app.use(globalErrorHandler);

//  not found
app.use(notFound);

export default app;
