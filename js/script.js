import { aleatorio, nome } from "./aleatorio.js";
import { perguntas } from "./perguntas.js";
console.log(perguntas);
console.log("Script funcionando corretamente!");

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const BotaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");



let atual = 0;
let perguntaAtual;
let historiaFinal = "";

botaoIniciar.addEventListener("click", iniciaJogo);



function iniciaJogo(){
	atual = 0;
	historiaFinal = "";
	telaInicial.style.display = 'none';
	caixaPerguntas.classList.remove("mostrar");
	caixaAlternativas.classList.remove("mostrar");
	caixaResultado.classList.remove("mostrar");
	mostraPergunta();

}

function mostraPergunta() {

    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    perguntaAtual = perguntas[atual];

    caixaPerguntas.textContent = perguntaAtual.enunciado;

    caixaAlternativas.textContent = "";

    mostraAlternativas();
}

function mostraAlternativas() {

    for (const alternativa of perguntaAtual.alternativas) {

        const botaoAlternativas = document.createElement("button");

        botaoAlternativas.textContent = alternativa.texto;

        botaoAlternativas.addEventListener("click", function () {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {

    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);

    historiaFinal += afirmacao + " ";

    atual++;

    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        mostraResultado();
        return;
    }

    mostraPergunta();
}

function mostraResultado() {

    caixaPerguntas.textContent =
        `Parabéns, ${nome}! Você concluiu a história!`;

    textoResultado.innerHTML = `
        ${historiaFinal}

        <br><br>

        Graças às suas escolhas, você desenvolveu habilidades importantes
        como criatividade, trabalho em equipe, resolução de problemas e inovação.

        <br><br>

        Seu interesse pela robótica abriu portas para um futuro cheio de
        oportunidades, mostrando que a tecnologia pode ser utilizada para
        melhorar a vida das pessoas e construir um mundo mais inteligente.

        <br><br>

        🚀 Continue aprendendo, criando e inovando.
        O próximo grande projeto pode ser o seu!
    `;

    caixaAlternativas.textContent = "";

    caixaResultado.classList.add("mostrar");

    BotaoJogarNovamente.addEventListener("click",jogarNovamente);
}




function jogarNovamente() {

    atual = 0;

    historiaFinal = "";

    caixaResultado.classList.remove("mostrar");

    mostraPergunta();
}

function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    }
}

  substituiNome();
 