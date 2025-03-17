import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend requests
app.use(express.json());

app.get("/message", (req, res) => {
  console.log(req);
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
