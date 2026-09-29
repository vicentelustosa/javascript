import {
    autores,
    salvarAutores
} from "../dados/autores.js";

import { mensagens } from "../dados/mensagens.js";
import { Autor } from "../classes/Autor.js";

const lista =
    document.querySelector("#lista-autores");

const formulario =
    document.querySelector("#form-autor");

const modal =
    document.querySelector("#modal-autor");

const tituloFormulario =
    document.querySelector("#titulo-formulario");

const campoId =
    document.querySelector("#autor-id");

const campoNome =
    document.querySelector("#autor-nome");

const campoEmail =
    document.querySelector("#autor-email");

const botaoNovoAutor =
    document.querySelector("#novo-autor");

const botaoCancelar =
    document.querySelector("#cancelar-autor");

function criarAutores() {
    lista.innerHTML = "";

    for (const autor of autores) {
        const item = autor.render();

        const botaoAlterar =
            item.querySelector(
                '[data-acao="alterar"]'
            );

        const botaoExcluir =
            item.querySelector(
                '[data-acao="excluir"]'
            );

        if (botaoAlterar) {
            botaoAlterar.addEventListener(
                "click",
                () => {
                    abrirFormularioAlteracao(autor);
                }
            );
        }

        if (botaoExcluir) {
            botaoExcluir.addEventListener(
                "click",
                () => {
                    excluirAutor(autor.id);
                }
            );
        }

        lista.append(item);
    }
}

function abrirFormularioNovoAutor() {
    tituloFormulario.textContent =
        "Novo autor";

    campoId.value = "";
    campoNome.value = "";
    campoEmail.value = "";

    modal.showModal();
}

function abrirFormularioAlteracao(autor) {
    tituloFormulario.textContent =
        "Alterar autor";

    campoId.value = autor.id;
    campoNome.value = autor.nome;
    campoEmail.value = autor.email;

    modal.showModal();
}

function criarAutor(nome, email) {
    const autor = new Autor(
        nome,
        email
    );

    autores.push(autor);
    salvarAutores();

    criarAutores();
}

function alterarAutor(
    id,
    nome,
    email
) {
    const autor = autores.find(
        (autor) => autor.id == id
    );

    if (!autor) {
        return;
    }

    autor.nome = nome;
    autor.email = email;

    salvarAutores();
    criarAutores();
}

function excluirAutor(id) {
    const possuiMensagens =
        mensagens.some(
            (mensagem) =>
                mensagem.autor.id == id
        );

    if (possuiMensagens) {
        alert(
            "Não é possível excluir este autor " +
            "porque existem mensagens associadas."
        );

        return;
    }

    const indice = autores.findIndex(
        (autor) => autor.id == id
    );

    if (indice === -1) {
        return;
    }

    autores.splice(indice, 1);
    salvarAutores();

    criarAutores();
}

botaoNovoAutor.addEventListener(
    "click",
    () => {
        abrirFormularioNovoAutor();
    }
);

formulario.addEventListener(
    "submit",
    (evento) => {
        evento.preventDefault();

        const id = campoId.value;
        const nome = campoNome.value;
        const email = campoEmail.value;

        if (id) {
            alterarAutor(
                id,
                nome,
                email
            );
        } else {
            criarAutor(
                nome,
                email
            );
        }

        formulario.reset();
        modal.close();
    }
);

botaoCancelar.addEventListener(
    "click",
    () => {
        formulario.reset();
        modal.close();
    }
);

export function inicializar() {
    criarAutores();
}