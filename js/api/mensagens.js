import { requisitar } from "./http.js";

const urlMensagens = "http://localhost:3000/mensagens";

export async function listarMensagens() {
    return requisitar(urlMensagens);
}

export async function obterMensagem(id) {
    const url = `${urlMensagens}/${id}`;

    return requisitar(url);
}

export async function criarMensagem(dados) {
    return requisitar(urlMensagens, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}

export async function atualizarMensagem(id, dados) {
    const url = `${urlMensagens}/${id}`;

    return requisitar(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}

export async function atualizarParcialmenteMensagem(id, dados) {
    const url = `${urlMensagens}/${id}`;

    return requisitar(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}

export async function excluirMensagem(id) {
    const url = `${urlMensagens}/${id}`;

    return requisitar(url, {
        method: "DELETE"
    });
}