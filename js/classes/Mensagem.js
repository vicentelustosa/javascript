export class Mensagem {
    static proximoId = 1;

    #id;
    #texto;
    #autor;

    constructor(texto, autor, id = null) {
        if (id === null) {
            this.#id = Mensagem.proximoId++;
        } else {
            this.#id = id;
            Mensagem.proximoId = Math.max(
                Mensagem.proximoId,
                id + 1
            );
        }

        this.#texto = texto;
        this.#autor = autor;
    }

    get id() {
        return this.#id;
    }

    get texto() {
        return this.#texto;
    }

    set texto(valor) {
        this.#texto = valor;
    }

    get autor() {
        return this.#autor;
    }

    set autor(valor) {
        this.#autor = valor;
    }

    render() {
        const item = document.createElement("div");
        item.classList.add("mensagem");
        item.dataset.id = this.id;

        const texto = document.createElement("p");
        texto.textContent = this.texto;

        const autor = document.createElement("small");
        autor.textContent =
            `Autor: ${this.autor.nome}`;

        const acoes = document.createElement("div");
        acoes.classList.add("acoes");

        const botaoAlterar =
            document.createElement("button");

        botaoAlterar.textContent = "Alterar";
        botaoAlterar.dataset.acao = "alterar";

        const botaoExcluir =
            document.createElement("button");

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.dataset.acao = "excluir";

        acoes.append(
            botaoAlterar,
            botaoExcluir
        );

        item.append(
            texto,
            autor,
            acoes
        );

        return item;
    }
}