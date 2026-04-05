const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Pon aquí tu Page ID real
const PAGE_ID = "1955422051387027";

// Pon aquí tu token real
const ACCESS_TOKEN = "EAA0vuswicl0BRIWTJxqaaH7K04QI5gZCaC3U81ZBUm92ZBZBFVv07SyD830hcA5wdDuVpUU50gkGAykHzRl1oTFcwFYG24dSnZAb4a28RgXMeCdARMKRpZAEZBATQhbZC4Dbv8ohm7grAmlffrMcZCrhFAxHkC7VGnxH55PYIf9O0XpNXaO99tZBDIgZBi8NOjBUqrDN8aem4J1QFaZABlLKj4rRz3aG32qzHMqCnZC5ZAyOwZD";

app.use(cors());

app.get("/api/facebook-posts", async (req, res) => {
  try {
    const url = `https://graph.facebook.com/v25.0/${PAGE_ID}/posts?fields=message,permalink_url,full_picture,created_time&limit=6&access_token=${encodeURIComponent(ACCESS_TOKEN)}`;

    const fbResponse = await fetch(url);
    const data = await fbResponse.json();

    if (!fbResponse.ok) {
      return res.status(fbResponse.status).json({
        error: data?.error?.message || "Error consultando Facebook",
        details: data
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});