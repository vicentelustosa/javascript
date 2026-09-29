export class Autor {
    static proximoId = 1;

    #id;
    #nome;
    #email;

    constructor(nome, email, id = null) {
        if (id === null) {
            this.#id = Autor.proximoId++;
        } else {
            this.#id = id;

            if (id >= Autor.proximoId) {
                Autor.proximoId = id + 1;
            }
        }

        this.#nome = nome;
        this.#email = email;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    set nome(valor) {
        this.#nome = valor;
    }

    get email() {
        return this.#email;
    }

    set email(valor) {
        this.#email = valor;
    }

    render() {
        const item = document.createElement("div");
        item.classList.add("autor");
        item.dataset.id = this.id;

        const nome = document.createElement("p");
        nome.textContent = this.nome;

        const email = document.createElement("small");
        email.textContent = this.email;

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
            nome,
            email,
            acoes
        );

        return item;
    }
}