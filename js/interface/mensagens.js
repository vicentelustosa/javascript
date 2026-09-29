import { Mensagem } from "../classes/Mensagem.js";
import { mensagens } from "../dados/mensagens.js";

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

const botaoNovaMensagem =
    document.querySelector("#nova-mensagem");

const botaoCancelar =
    document.querySelector("#cancelar-mensagem");

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

        botaoExcluir.addEventListener(
            "click",
            () => {
                excluirMensagem(mensagem.id);
            }
        );

        lista.append(item);
    }
}

function abrirFormularioAlteracao(mensagem) {
    tituloFormulario.textContent =
        "Alterar mensagem";

    campoId.value = mensagem.id;
    campoTexto.value = mensagem.texto;

    modal.showModal();
}

function criarMensagem(novoTexto) {
    const mensagem = new Mensagem(
        novoTexto,
        "Usuário"
    );

    mensagens.push(mensagem);

    criarMensagens();
}

function alterarMensagem(id, novoTexto) {
    const mensagem = mensagens.find(
        mensagem => mensagem.id == id
    );

    mensagem.texto = novoTexto;

    const item = document.querySelector(
        `.mensagem[data-id="${id}"]`
    );

    const paragrafo = item.querySelector("p");

    paragrafo.textContent = novoTexto;
}

function excluirMensagem(id) {
    const indice = mensagens.findIndex(
        mensagem => mensagem.id == id
    );

    mensagens.splice(indice, 1);

    criarMensagens();
}

botaoNovaMensagem.addEventListener(
    "click",
    () => {
        tituloFormulario.textContent =
            "Nova mensagem";

        campoId.value = "";
        campoTexto.value = "";

        modal.showModal();
    }
);

formulario.addEventListener(
    "submit",
    evento => {
        evento.preventDefault();

        const id = campoId.value;
        const novoTexto = campoTexto.value;

        if (id) {
            alterarMensagem(id, novoTexto);
        } else {
            criarMensagem(novoTexto);
        }

        modal.close();
    }
);

botaoCancelar.addEventListener(
    "click",
    () => {
        modal.close();
    }
);

export function iniciarMensagens() {
    criarMensagens();
}