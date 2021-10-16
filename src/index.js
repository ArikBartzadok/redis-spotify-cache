require("dotenv/config");
const express = require("express");
const spotify = require("./lib/spotify");

const app = express();

app.get('/', async (req, res) => {
    return res.json({ app: 'redis-spotify-cache' });
});

app.get("/spotify/obterToken", async (req, res) => {
    const resposta = await spotify.autenticar();
  
    return res.json(resposta);
});

app.get("/spotify", async (req, res) => {
  const parametros = req.query;

  const resposta = await spotify.recomendacoes({ opcoes: parametros});

  return res.json(resposta);
});

app.listen(process.env.PORT || "3000");