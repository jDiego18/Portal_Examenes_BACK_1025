import express from "express";
import cors from "cors";
import helmet from "helmet";
import usersRoutes from "./routes/usuarios.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import rootRoutes from "./routes/root.routes.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true, ts: new Date().toISOString() }));

app.use("/api/usuarios", usersRoutes);
app.use("/api", rootRoutes);

app.use(errorHandler);

export default app;