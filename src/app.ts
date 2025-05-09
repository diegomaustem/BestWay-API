import express, { Express } from "express";
import env from "./config/env";
import router from "./routes/routes";

class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.routes();
  }

  private routes(): void {
    this.app.use(express.json());
    this.app.use("/api", router);
  }

  public start(): void {
    this.app.listen(env.porta, () => {
      console.log("Servidor rodando.");
    });
  }
}

const app = new App();
app.start();
