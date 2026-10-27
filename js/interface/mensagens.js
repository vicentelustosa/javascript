
import {
    listarAutores
} from "../api/autores.js";

import {
    listarMensagens,
    criarMensagem as cadastrarMensagemNaAPI,
    atualizarMensagem as atualizarMensagemNaAPI,
    excluirMensagem as excluirMensagemNaAPI
} from "../api/mensagens.js";

import { criarItemMensagem } from "./componentes.js";

const lista = document.querySelector("#lista-mensagens");
const formulario = document.querySelector("#form-mensagem");
const modal = document.querySelector("#modal-mensagem");

const tituloFormulario = document.querySelector(
    "#titulo-formulario"
);

const campoId = document.querySelector("#mensagem-id");
const campoTexto = document.querySelector("#mensagem-texto");
const campoAutor = document.querySelector("#autor");

const botaoNovo = document.querySelector("#nova-mensagem");
const botaoCancelar = document.querySelector("#cancelar-mensagem");

const estado = {
    mensagemSelecionada: null,
    modoFormulario: "cadastro"
};

let autores = [];

async function carregarAutores() {
    autores = await listarAutores();

    campoAutor.innerHTML = "";

    const opcaoInicial = document.createElement("option");
    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione um autor";

    campoAutor.append(opcaoInicial);

    for (const autor of autores) {
        const opcao = document.createElement("option");

        opcao.value = autor.id;
        opcao.textContent = autor.nome;

        campoAutor.append(opcao);
    }
}

function associarAutor(mensagem) {
    const autor = autores.find(
        autor =>
            String(autor.id) === String(mensagem.autorId)
    );

    return {
        ...mensagem,
        autor: autor ?? { nome: "Autor não encontrado" }
    };
}

async function renderizarMensagens() {
    const mensagens = await listarMensagens();

    lista.innerHTML = "";

    for (const mensagem of mensagens) {
        const mensagemComAutor = associarAutor(mensagem);

        const item = criarItemMensagem(
            mensagemComAutor,
            () => abrirFormularioAlteracao(mensagem),
            () => excluirMensagem(mensagem.id)
        );

        lista.append(item);
    }
}

function prepararCadastro() {
    estado.mensagemSelecionada = null;
    estado.modoFormulario = "cadastro";

    tituloFormulario.textContent = "Nova mensagem";
    campoId.value = "";
    campoTexto.value = "";
    campoAutor.value = "";
}

function abrirFormularioNovo() {
    prepararCadastro();
    modal.showModal();
}

function abrirFormularioAlteracao(mensagem) {
    estado.mensagemSelecionada = mensagem;
    estado.modoFormulario = "alteracao";

    tituloFormulario.textContent = "Alterar mensagem";
    campoId.value = mensagem.id;
    campoTexto.value = mensagem.texto;
    campoAutor.value = mensagem.autorId;

    modal.showModal();
}

async function criarMensagem(texto, autorId) {
    await cadastrarMensagemNaAPI({
        texto,
        autorId
    });

    await renderizarMensagens();
}

async function alterarMensagem(mensagem, texto, autorId) {
    if (!mensagem) {
        return;
    }

    await atualizarMensagemNaAPI(
        mensagem.id,
        { texto, autorId }
    );

    await renderizarMensagens();
}

async function excluirMensagem(id) {
    try {
        await excluirMensagemNaAPI(id);
        await renderizarMensagens();
    } catch (erro) {
        console.error("Erro ao excluir mensagem:", erro);
        alert("Não foi possível excluir a mensagem.");
    }
}

formulario.addEventListener("submit", async evento => {
    evento.preventDefault();

    const texto = campoTexto.value;
    const autorId = campoAutor.value;

    const autor = autores.find(
        autor => String(autor.id) === String(autorId)
    );

    if (!autorId || !autor) {
        alert("Selecione um autor válido.");
        return;
    }

    try {
        if (estado.modoFormulario === "alteracao") {
            await alterarMensagem(
                estado.mensagemSelecionada,
                texto,
                autorId
            );
        } else {
            await criarMensagem(texto, autorId);
        }

        formulario.reset();
        prepararCadastro();
        modal.close();
    } catch (erro) {
        console.error("Erro ao salvar mensagem:", erro);
        alert("Não foi possível salvar a mensagem.");
    }
});

botaoNovo.addEventListener("click", abrirFormularioNovo);

botaoCancelar.addEventListener("click", () => {
    formulario.reset();
    prepararCadastro();
    modal.close();
});

export async function inicializar() {
    try {
        await carregarAutores();
        await renderizarMensagens();
    } catch (erro) {
        console.error(
            "Erro ao inicializar mensagens:",
            erro
        );

        alert("Não foi possível carregar as mensagens.");
    }
}
