import {
    mensagens,
    salvarMensagens
} from "../dados/mensagens.js";

import { autores } from "../dados/autores.js";
import { Mensagem } from "../classes/Mensagem.js";

const lista =
    document.querySelector("#lista-mensagens");

const formulario =
    document.querySelector("#form-mensagem");

const modal =
    document.querySelector("#modal-mensagem");

const tituloFormulario =
    document.querySelector("#titulo-formulario");

const campoId =
    document.querySelector("#mensagem-id");

const campoTexto =
    document.querySelector("#mensagem-texto");

const campoAutor =
    document.querySelector("#autor");

const botaoNovaMensagem =
    document.querySelector("#nova-mensagem");

const botaoCancelar =
    document.querySelector("#cancelar-mensagem");

function carregarAutores() {
    campoAutor.innerHTML = "";

    const opcaoInicial =
        document.createElement("option");

    opcaoInicial.value = "";
    opcaoInicial.textContent =
        "Selecione um autor";

    opcaoInicial.disabled = true;
    opcaoInicial.selected = true;

    campoAutor.append(opcaoInicial);

    autores.forEach((autor) => {
        const opcao =
            document.createElement("option");

        opcao.value = autor.id;
        opcao.textContent = autor.nome;

        campoAutor.append(opcao);
    });
}

function criarMensagens() {
    lista.innerHTML = "";

    for (const mensagem of mensagens) {
        const item = mensagem.render();

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
                    abrirFormularioAlteracao(mensagem);
                }
            );
        }

        if (botaoExcluir) {
            botaoExcluir.addEventListener(
                "click",
                () => {
                    excluirMensagem(mensagem.id);
                }
            );
        }

        lista.append(item);
    }
}

function abrirFormularioNovaMensagem() {
    tituloFormulario.textContent =
        "Nova mensagem";

    campoId.value = "";
    campoTexto.value = "";
    campoAutor.value = "";

    modal.showModal();
}

function abrirFormularioAlteracao(mensagem) {
    tituloFormulario.textContent =
        "Alterar mensagem";

    campoId.value = mensagem.id;
    campoTexto.value = mensagem.texto;
    campoAutor.value = mensagem.autor.id;

    modal.showModal();
}

function criarMensagem(
    novoTexto,
    autor
) {
    const mensagem = new Mensagem(
        novoTexto,
        autor
    );

    mensagens.push(mensagem);
    salvarMensagens();

    criarMensagens();
}

function alterarMensagem(
    id,
    novoTexto,
    autor
) {
    const mensagem = mensagens.find(
        (mensagem) => mensagem.id == id
    );

    if (!mensagem) {
        return;
    }

    mensagem.texto = novoTexto;
    mensagem.autor = autor;

    salvarMensagens();
    criarMensagens();
}

function excluirMensagem(id) {
    const indice = mensagens.findIndex(
        (mensagem) => mensagem.id == id
    );

    if (indice === -1) {
        return;
    }

    mensagens.splice(indice, 1);
    salvarMensagens();

    criarMensagens();
}

botaoNovaMensagem.addEventListener(
    "click",
    () => {
        abrirFormularioNovaMensagem();
    }
);

formulario.addEventListener(
    "submit",
    (evento) => {
        evento.preventDefault();

        const id = campoId.value;
        const novoTexto = campoTexto.value;

        const autor = autores.find(
            (autor) => autor.id == campoAutor.value
        );

        if (!autor) {
            return;
        }

        if (id) {
            alterarMensagem(
                id,
                novoTexto,
                autor
            );
        } else {
            criarMensagem(
                novoTexto,
                autor
            );
        }

        formulario.reset();
        modal.close();
    }
);

botaoCancelar.addEventListener(
    "click",
    () => {
        modal.close();
    }
);

export function inicializar() {
    carregarAutores();
    criarMensagens();
}