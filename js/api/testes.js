import {
    listarAutores,
    obterAutor,
    criarAutor
} from "./autores.js";

import {
    listarMensagens,
    obterMensagem,
    criarMensagem
} from "./mensagens.js";

async function executarTestes() {
    try {
        const autores = await listarAutores();
        console.log("Lista de autores:", autores);

        const autor = await obterAutor(1);
        console.log("Autor de identificador 1:", autor);

        const mensagens = await listarMensagens();
        console.log("Lista de mensagens:", mensagens);

        const mensagem = await obterMensagem(1);
        console.log("Mensagem de identificador 1:", mensagem);

        const novoAutor = await criarAutor({
            nome: "Mariana Costa",
            email: "mariana@example.com"
        });

        console.log("Novo autor:", novoAutor);

        const novaMensagem = await criarMensagem({
            texto: "Mensagem criada pelo módulo da API",
            autorId: novoAutor.id
        });

        console.log("Nova mensagem:", novaMensagem);
    } catch (erro) {
        console.error("Erro durante os testes:", erro);
    }
}

executarTestes();