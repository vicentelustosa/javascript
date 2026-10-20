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
}