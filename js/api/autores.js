import { requisitar } from "./http.js";

const urlAutores = "http://localhost:3000/autores";

export async function listarAutores() {
    return requisitar(urlAutores);
}

export async function obterAutor(id) {
    const url = `${urlAutores}/${id}`;

    return requisitar(url);
}

export async function criarAutor(dados) {
    return requisitar(urlAutores, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}

export async function atualizarAutor(id, dados) {
    const url = `${urlAutores}/${id}`;

    return requisitar(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}

export async function atualizarParcialmenteAutor(id, dados) {
    const url = `${urlAutores}/${id}`;

    return requisitar(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}

export async function excluirAutor(id) {
    const url = `${urlAutores}/${id}`;

    return requisitar(url, {
        method: "DELETE"
    });
}