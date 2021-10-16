const Redis = require('ioredis');

class Cache {

    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST || "localhost",
            port: process.env.REDIS_PORT || 6379,
            keyPrefix: "cache:"
        });
    }

    async obter({ chave }) {
        const valor = await this.redis.get(chave);

        return valor
            ? JSON.parse(valor)
            : null;
    }

    async gravar({ chave, valor, expiracao = 60 }) {
        return this.redis.set(
            chave, JSON.stringify(valor),
            "EX", expiracao);
    }

    async deletar({ chave }) {
        return this.redis.del(chave);
    }

    async deletarPrefixo ({ prefixo }) {
        const obterChaves = async () => {
            const chaves = await this.redis.keys(`cache:${prefixo}:*`);
            return chaves;
        };

        const removerPrefixo = ({ chaves }) => {
            const chavesSemPrefixo = chaves.map((chave) => chave.replace('cache:', ''));
            return chavesSemPrefixo;
        };

        const _chaves = await obterChaves();
        const _novasChaves = removerPrefixo({ chaves: _chaves});

        return this.redis.del(_novasChaves);
    }

}

module.exports = new Cache();