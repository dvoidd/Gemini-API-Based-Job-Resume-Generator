const express = require("express");
const { Document, Packer, Paragraph, HeadingLevel } = require("docx");
const fs = require("fs");
const app = express();
const axios = require("axios");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/generate", async (req, res) => {
  const { name, position, skills, experience } = req.body;

const prompt = `
Buatkan surat lamaran kerja yang profesional dalam bahasa Indonesia. 
Nama pelamar: ${name}
Posisi yang dilamar: ${position}
Keahlian: ${skills}
Pengalaman: ${experience}
Tulis dengan bahasa yang sopan, struktur rapi, dan maksimal 300 kata.
`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const result = response.data.candidates[0].content.parts[0].text;
    res.render("result", { name, result });
  } catch (err) {
    console.error(err);
    res.send("Terjadi kesalahan saat menghubungi Gemini API.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
