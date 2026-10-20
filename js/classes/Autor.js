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
            Autor.proximoId = Math.max(
                Autor.proximoId,
                id + 1
            );
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
}