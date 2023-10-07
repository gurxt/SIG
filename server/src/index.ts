import express from 'express';
import 'dotenv/config';
import '#/db'
import authRouter from "./routers/auth_router";

const PORT = process.env.PORT ?? 8001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/auth', authRouter);

app.listen(PORT, () => console.log(`[INFO] listening on port ${PORT}`));