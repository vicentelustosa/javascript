
import {
    listarAutores,
    criarAutor as cadastrarAutorNaAPI,
    atualizarAutor as atualizarAutorNaAPI,
    excluirAutor as excluirAutorNaAPI
} from "../api/autores.js";

import { listarMensagens } from "../api/mensagens.js";
import { criarItemAutor } from "./componentes.js";

const lista = document.querySelector("#lista-autores");
const formulario = document.querySelector("#form-autor");
const modal = document.querySelector("#modal-autor");

const tituloFormulario = document.querySelector(
    "#titulo-formulario"
);

const campoId = document.querySelector("#autor-id");
const campoNome = document.querySelector("#autor-nome");
const campoEmail = document.querySelector("#autor-email");

const botaoNovo = document.querySelector("#novo-autor");
const botaoCancelar = document.querySelector("#cancelar-autor");

const estado = {
    autorSelecionado: null,
    modoFormulario: "cadastro"
};

async function renderizarAutores() {
    const autores = await listarAutores();

    lista.innerHTML = "";

    for (const autor of autores) {
        const item = criarItemAutor(
            autor,
            () => abrirFormularioAlteracao(autor),
            () => excluirAutor(autor.id)
        );

        lista.append(item);
    }
}

function prepararCadastro() {
    estado.autorSelecionado = null;
    estado.modoFormulario = "cadastro";

    tituloFormulario.textContent = "Novo autor";
    campoId.value = "";
    campoNome.value = "";
    campoEmail.value = "";
}

function abrirFormularioNovoAutor() {
    prepararCadastro();
    modal.showModal();
}

function abrirFormularioAlteracao(autor) {
    estado.autorSelecionado = autor;
    estado.modoFormulario = "alteracao";

    tituloFormulario.textContent = "Alterar autor";
    campoId.value = autor.id;
    campoNome.value = autor.nome;
    campoEmail.value = autor.email;

    modal.showModal();
}

async function criarAutor(nome, email) {
    await cadastrarAutorNaAPI({ nome, email });
    await renderizarAutores();
}

async function alterarAutor(autor, nome, email) {
    if (!autor) {
        return;
    }

    await atualizarAutorNaAPI(
        autor.id,
        { nome, email }
    );

    await renderizarAutores();
}

async function excluirAutor(id) {
    try {
        const mensagens = await listarMensagens();

        const possuiMensagens = mensagens.some(
            mensagem =>
                String(mensagem.autorId) === String(id)
        );

        if (possuiMensagens) {
            alert(
                "Não é possível excluir este autor porque " +
                "existem mensagens associadas."
            );
            return;
        }

        await excluirAutorNaAPI(id);
        await renderizarAutores();
    } catch (erro) {
        console.error("Erro ao excluir autor:", erro);
        alert("Não foi possível excluir o autor.");
    }
}

formulario.addEventListener("submit", async evento => {
    evento.preventDefault();

    const nome = campoNome.value;
    const email = campoEmail.value;

    try {
        if (estado.modoFormulario === "alteracao") {
            await alterarAutor(
                estado.autorSelecionado,
                nome,
                email
            );
        } else {
            await criarAutor(nome, email);
        }

        formulario.reset();
        prepararCadastro();
        modal.close();
    } catch (erro) {
        console.error("Erro ao salvar autor:", erro);
        alert("Não foi possível salvar o autor.");
    }
});

botaoNovo.addEventListener(
    "click",
    abrirFormularioNovoAutor
);

botaoCancelar.addEventListener("click", () => {
    formulario.reset();
    prepararCadastro();
    modal.close();
});

export async function inicializar() {
    try {
        await renderizarAutores();
    } catch (erro) {
        console.error("Erro ao carregar autores:", erro);
        alert("Não foi possível carregar os autores.");
    }
}
