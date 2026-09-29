import { Autor } from "../classes/Autor.js";

const chave = "autores";

function carregarAutores() {
    const texto =
        localStorage.getItem(chave);

    if (!texto) {
        return [];
    }

    const dados = JSON.parse(texto);

    return dados.map(
        (dadosAutor) => {
            return new Autor(
                dadosAutor.nome,
                dadosAutor.email,
                dadosAutor.id
            );
        }
    );
}

export const autores =
    carregarAutores();

export function salvarAutores() {
    const dados = autores.map(
        (autor) => {
            return {
                id: autor.id,
                nome: autor.nome,
                email: autor.email
            };
        }
    );

    localStorage.setItem(
        chave,
        JSON.stringify(dados)
    );
}