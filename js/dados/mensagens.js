import { Mensagem } from "../classes/Mensagem.js";
import {
    MensagemOculta
} from "../classes/MensagemOculta.js";

export const mensagens = [
    new Mensagem(
        "Hello World!",
        "Ana"
    ),

    new Mensagem(
        "Aprendendo JavaScript!",
        "Carlos"
    ),

    new MensagemOculta(
        "Esta mensagem está oculta.",
        "João"
    )
];