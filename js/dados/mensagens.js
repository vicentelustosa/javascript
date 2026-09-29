import { Mensagem } from "../classes/Mensagem.js";
import { autores } from "./autores.js";

const chave = "mensagens";

function carregarMensagens() {
    const texto =
        localStorage.getItem(chave);

    if (!texto) {
        return [];
    }

    const dados = JSON.parse(texto);

    return dados
        .map((dadosMensagem) => {
            const autor = autores.find(
                (autor) =>
                    autor.id == dadosMensagem.autorId
            );

            if (!autor) {
                return null;
            }

            return new Mensagem(
                dadosMensagem.texto,
                autor
            );
        })
        .filter(
            (mensagem) => mensagem !== null
        );
}

export const mensagens =
    carregarMensagens();

export function salvarMensagens() {
    const dados = mensagens.map(
        (mensagem) => {
            return {
                id: mensagem.id,
                texto: mensagem.texto,
                autorId: mensagem.autor.id
            };
        }
    );

    localStorage.setItem(
        chave,
        JSON.stringify(dados)
    );
}