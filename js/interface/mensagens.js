import {
    mensagens,
    salvarMensagens
} from "../dados/mensagens.js";

import { autores } from "../dados/autores.js";
import { Mensagem } from "../classes/Mensagem.js";
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

function carregarAutores() {
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

function renderizarMensagens() {
    lista.innerHTML = "";

    for (const mensagem of mensagens) {
        const item = criarItemMensagem(
            mensagem,
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
    campoAutor.value = mensagem.autor.id;

    modal.showModal();
}

function criarMensagem(texto, autor) {
    const mensagem = new Mensagem(texto, autor);

    mensagens.push(mensagem);
    salvarMensagens();
    renderizarMensagens();
}

function alterarMensagem(mensagem, texto, autor) {
    if (!mensagem || !mensagens.includes(mensagem)) {
        return;
    }

    mensagem.texto = texto;
    mensagem.autor = autor;

    salvarMensagens();
    renderizarMensagens();
}

function excluirMensagem(id) {
    const indice = mensagens.findIndex(
        mensagem => mensagem.id === id
    );

    if (indice === -1) {
        return;
    }

    mensagens.splice(indice, 1);

    salvarMensagens();
    renderizarMensagens();
}

formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    const texto = campoTexto.value;
    const autorId = Number(campoAutor.value);

    const autor = autores.find(
        autor => autor.id === autorId
    );

    if (!autor) {
        alert("Selecione um autor válido.");
        return;
    }

    if (estado.modoFormulario === "alteracao") {
        alterarMensagem(
            estado.mensagemSelecionada,
            texto,
            autor
        );
    } else {
        criarMensagem(texto, autor);
    }

    formulario.reset();
    prepararCadastro();
    modal.close();
});

botaoNovo.addEventListener("click", abrirFormularioNovo);

botaoCancelar.addEventListener("click", () => {
    formulario.reset();
    prepararCadastro();
    modal.close();
});

export function inicializar() {
    carregarAutores();
    renderizarMensagens();
}