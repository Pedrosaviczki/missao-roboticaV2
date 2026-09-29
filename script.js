import { aleatorio, nome } from "./aleatorio.js";
import { perguntas } from "./perguntas.js";

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

let perguntasDaPartida = [];

botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);


// =====================================
// SORTEIA AS PERGUNTAS DA PARTIDA
// =====================================

function sorteiaPerguntas() {

    perguntasDaPartida = [];

    // Descobre todas as etapas existentes
    const etapas = [...new Set(perguntas.map(pergunta => pergunta.etapa))];

    for (const etapa of etapas) {

        // Procura todas as perguntas daquela etapa
        const perguntasDaEtapa = perguntas.filter(
            pergunta => pergunta.etapa === etapa
        );

        // Escolhe uma pergunta aleatória
        const perguntaSorteada = aleatorio(perguntasDaEtapa);

        perguntasDaPartida.push(perguntaSorteada);
    }
}


// =====================================
// INICIAR
// =====================================

function iniciaJogo() {

    atual = 0;
    historiaFinal = "";

    sorteiaPerguntas();

    telaInicial.style.display = "none";
    caixaResultado.classList.remove("mostrar");

    mostraPergunta();
}


// =====================================
// MOSTRAR PERGUNTA
// =====================================

function mostraPergunta() {

    if (atual >= perguntasDaPartida.length) {
        mostraResultado();
        return;
    }

    perguntaAtual = perguntasDaPartida[atual];

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";

    mostraAlternativas();
}


// =====================================
// MOSTRAR ALTERNATIVAS
// =====================================

function mostraAlternativas() {

    for (const alternativa of perguntaAtual.alternativas) {

        const botaoAlternativa = document.createElement("button");

        botaoAlternativa.textContent = alternativa.texto;

        botaoAlternativa.addEventListener("click", () => {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botaoAlternativa);
    }
}


// =====================================
// RESPOSTA
// =====================================

function respostaSelecionada(opcaoSelecionada) {

    // Sorteia UMA das afirmações
    const afirmacaoSorteada = aleatorio(
        opcaoSelecionada.afirmacao
    );

    historiaFinal += afirmacaoSorteada + " ";

    atual++;

    mostraPergunta();
}


// =====================================
// RESULTADO
// =====================================

function mostraResultado() {

    caixaPerguntas.textContent =
        `Parabéns, ${nome}! Você concluiu sua jornada na robótica!`;

    caixaAlternativas.textContent = "";

    textoResultado.textContent = historiaFinal;

    caixaResultado.classList.add("mostrar");
}


// =====================================
// JOGAR NOVAMENTE
// =====================================

function jogaNovamente() {

    atual = 0;
    historiaFinal = "";

    caixaResultado.classList.remove("mostrar");

    // Sorteia novas perguntas
    sorteiaPerguntas();

    mostraPergunta();
}


// =====================================
// SUBSTITUI "VOCÊ" PELO NOME
// =====================================

function substituiNome() {

    for (const pergunta of perguntas) {

        pergunta.enunciado =
            pergunta.enunciado.replace(/você/gi, nome);
    }
}

substituiNome();