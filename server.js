const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Pon aquí tu Page ID real
const PAGE_ID = "1955422051387027";

// Pon aquí tu token real
const ACCESS_TOKEN = "EAA0vuswicl0BROIpxdDnyRdW4U5jUZBvuqEpaBZCiYJdcXgPRucqYnchFRR37iKFTmvGjp2ytFbKrjgYLzsssj7269VTpGZAfjdHMnC7AZBeRGRKKFfE0eB5unIR8gExkVaRj8DgW2IdBQMcM70sez4V6JDczI2zXF91S7ITidJmAe0WnDcCYYeTy9JdCqRgNSOQxMY9dIarQwRfiLnaCSNeKfT7DinsnAvDdX88";

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