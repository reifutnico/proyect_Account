import express from "express";
import cors from "cors";

import AccountController from "./src/controllers/account-controller.js";


const app = express(); 
app.use(cors()); 
app.use(express.json()); 
const port = 3150;

app.use("/api/account", AccountController );

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  

