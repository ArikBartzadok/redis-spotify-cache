require("dotenv/config");
const axios = require('axios');
const queryString = require('querystring');

const api = require('./api');
const cache = require('./cache');

class Spotify {
    async autenticar() {
        
        const resposta = await axios({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Accept':'application/json',
                'content-type': 'application/x-www-form-urlencoded'
            },
            params: {
                "grant_type": "client_credentials"
            },
            auth: {
                username: process.env.SPOTIFY_CLIENT_ID,
                password: process.env.SPOTIFY_CLIENT_SECRET
            }
        }).then((resultado) => {
            console.log(resultado.data)
            return { status: 'ok' };
        }).catch((erro) => {
            console.log(erro)
            return { status: 'erro' };
        });

        return resposta;
    }

    async recomendacoes({ opcoes }) {
        const parametros = queryString.stringify(opcoes);

        const cacheado = await cache.obter({ chave: parametros });

        if (cacheado) {
            return cacheado;
        }

        const { data } = await api.get(`/recommendations?${parametros}`);

        const resposta = data.tracks.map((album) => ({
            artista: album.artists[0].name,
            url: album.artists[0].external_urls.spotify
        }));

        await cache.gravar({
            chave: parametros,
            valor: resposta,
            expiracao: (60 * 15) // 15 minutos
        });

        return resposta;
    }
}

module.exports = new Spotify();