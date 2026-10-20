export function criarItem(
    titulo,
    descricao,
    aoAlterar,
    aoExcluir
) {
    const item = document.createElement("article");
    item.classList.add("item");

    const tituloElemento = document.createElement("h3");
    tituloElemento.textContent = titulo;

    const descricaoElemento = document.createElement("p");
    descricaoElemento.textContent = descricao;

    const acoes = document.createElement("div");
    acoes.classList.add("acoes");

    const botaoAlterar = document.createElement("button");
    botaoAlterar.textContent = "Alterar";
    botaoAlterar.addEventListener("click", aoAlterar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", aoExcluir);

    acoes.append(
        botaoAlterar,
        botaoExcluir
    );

    item.append(
        tituloElemento,
        descricaoElemento,
        acoes
    );

    return item;
}

export function criarItemAutor(
    autor,
    aoAlterar,
    aoExcluir
) {
    const item = criarItem(
        autor.nome,
        autor.email,
        aoAlterar,
        aoExcluir
    );

    item.classList.add("autor");
    item.dataset.id = autor.id;

    return item;
}

export function criarItemMensagem(
    mensagem,
    aoAlterar,
    aoExcluir
) {
    const item = criarItem(
        mensagem.texto,
        `Autor: ${mensagem.autor.nome}`,
        aoAlterar,
        aoExcluir
    );

    item.classList.add("mensagem");
    item.dataset.id = mensagem.id;

    return item;
}