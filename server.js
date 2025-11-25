import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/api/download", async (req, res) => {
  const url = req.query.url;

  if (!url) return res.json({ error: "URL tidak boleh kosong" });

  try {
    const api = await fetch(`https://api.tiklydown.me/download?url=${encodeURIComponent(url)}`);
    const data = await api.json();

    res.json(data);
  } catch (err) {
    res.json({ error: "Gagal mengambil data" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server berjalan di port " + port));
