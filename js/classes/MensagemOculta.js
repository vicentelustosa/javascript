import { Mensagem } from "./Mensagem.js";

export class MensagemOculta extends Mensagem {
    render() {
        const item = document.createElement("div");

        item.classList.add(
            "mensagem",
            "mensagem-oculta"
        );

        item.dataset.id = this.id;

        const mensagem = document.createElement("p");
        mensagem.textContent = "Mensagem oculta";

        const autor = document.createElement("small");
        autor.textContent = `Autor: ${this.autor}`;

        const acoes = document.createElement("div");
        acoes.classList.add("acoes");

        const botaoExcluir =
            document.createElement("button");

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.dataset.acao = "excluir";

        acoes.append(botaoExcluir);

        item.append(
            mensagem,
            autor,
            acoes
        );

        return item;
    }
}