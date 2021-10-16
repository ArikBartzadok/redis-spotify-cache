# ⚡ redis-spotify-cache
Armazenando dados proveninetes da API Spotify em cache

## 📌 Rodando um servidor redis
```shell
docker run --name redis -p 6379:6379 -d redis
```

## 🔐 API Spotify
Obter um token de acesso válido na API Spotify pela rota:
    
    http://localhost:3000/spotify/obterToken

Já com o token inserido no arquivo .env, todas as rotas podem ser acessadas normalmente

### 📥 Listando artistas
Exemplo de requisição para listagfem de artistas:

    http://localhost:3000/spotify?market=BR&seed_genres=rock,pop,funk,reggae,jazz

## 🐳 Instalando e rodando
1. Crie um arquivo `.env` assim como demonstado pelo arquivo `.env.exemplo`, contendo as credenciais de acesso à API Spotify;
2. Execute o comando `docker-compose up`, e voi-là!