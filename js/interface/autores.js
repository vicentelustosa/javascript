import { autores, salvarAutores } from "../dados/autores.js";
import { mensagens } from "../dados/mensagens.js";
import { Autor } from "../classes/Autor.js";
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

function renderizarAutores() {
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

function criarAutor(nome, email) {
    const autor = new Autor(nome, email);

    autores.push(autor);
    salvarAutores();
    renderizarAutores();
}

function alterarAutor(autor, nome, email) {
    if (!autor || !autores.includes(autor)) {
        return;
    }

    autor.nome = nome;
    autor.email = email;

    salvarAutores();
    renderizarAutores();
}

function excluirAutor(id) {
    const possuiMensagens = mensagens.some(
        mensagem => mensagem.autor.id === id
    );

    if (possuiMensagens) {
        alert(
            "Não é possível excluir este autor porque existem mensagens associadas."
        );
        return;
    }

    const indice = autores.findIndex(
        autor => autor.id === id
    );

    if (indice === -1) {
        return;
    }

    autores.splice(indice, 1);

    salvarAutores();
    renderizarAutores();
}

formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    const nome = campoNome.value;
    const email = campoEmail.value;

    if (estado.modoFormulario === "alteracao") {
        alterarAutor(
            estado.autorSelecionado,
            nome,
            email
        );
    } else {
        criarAutor(nome, email);
    }

    formulario.reset();
    prepararCadastro();
    modal.close();
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

export function inicializar() {
    renderizarAutores();
}