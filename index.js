const prompt = require("prompt-sync")()

let jogador = {
    nomeDoJogador: "",
    pontosDeCultura: 0,
    nivelDoJogador: 1,
    listaDeTemasDominados: []
}

let listaDeTemas = [
    {
        nomeDoTema: "Carnaval",
        listaDePerguntas: [
            { textoDaPergunta: "Qual estado é famoso pelo Carnaval de rua?", listaDeOpcoes: ["Rio de Janeiro", "Bahia", "Pernambuco", "São Paulo"], indiceRespostaCorreta: 1 },
            { textoDaPergunta: "Qual o nome do sambódromo do Rio?", listaDeOpcoes: ["Maracanã", "Marques de Sapucaí", "Mangueira", "Beira-Rio"], indiceRespostaCorreta: 1 }
        ]
    },
    {
        nomeDoTema: "Futebol Brasileiro",
        listaDePerguntas: [
            { textoDaPergunta: "Qual jogador tem o apelido Rei do Futebol?", listaDeOpcoes: ["Garrincha", "Pelé", "Romário", "Zico"], indiceRespostaCorreta: 1 },
            { textoDaPergunta: "Em que ano o Brasil foi campeão pela quinta vez?", listaDeOpcoes: ["1998", "2002", "2006", "2014"], indiceRespostaCorreta: 1 }
        ]
    }
]

function jogarTema(temaEscolhido) {
    console.log("\nTema escolhido: " + temaEscolhido.nomeDoTema)
    let quantidadeDeRespostasCorretas = 0

    for (let indicePergunta = 0; indicePergunta < temaEscolhido.listaDePerguntas.length; indicePergunta++) {
        let perguntaAtual = temaEscolhido.listaDePerguntas[indicePergunta]
        console.log("\n" + perguntaAtual.textoDaPergunta)

        for (let indiceOpcao = 0; indiceOpcao < perguntaAtual.listaDeOpcoes.length; indiceOpcao++) {
            console.log((indiceOpcao + 1) + ") " + perguntaAtual.listaDeOpcoes[indiceOpcao])
        }

        let respostaDoUsuario = parseInt(prompt("Digite o número da sua resposta -> "))
        if (respostaDoUsuario === perguntaAtual.indiceRespostaCorreta + 1) {
            console.log("Você acertou!")
            quantidadeDeRespostasCorretas++
            jogador.pontosDeCultura += 10
        } else {
            console.log("Você errou! A resposta correta era: " + perguntaAtual.listaDeOpcoes[perguntaAtual.indiceRespostaCorreta])
        }
    }

    if (quantidadeDeRespostasCorretas === temaEscolhido.listaDePerguntas.length) {
        console.log("\nVocê dominou o tema " + temaEscolhido.nomeDoTema + "!")
        jogador.listaDeTemasDominados.push(temaEscolhido.nomeDoTema)
        jogador.nivelDoJogador++
        jogador.pontosDeCultura += 50
    } else {
        console.log("\nVocê acertou " + quantidadeDeRespostasCorretas + " de " + temaEscolhido.listaDePerguntas.length)
    }
}

function iniciarJogo() {
    jogador.nomeDoJogador = prompt("Qual é o seu nome? -> ")
    console.log("\nBem-vindo, " + jogador.nomeDoJogador + "!")

    while (true) {
        console.log("\nCultura acumulada: " + jogador.pontosDeCultura + " | Nível atual: " + jogador.nivelDoJogador)
        console.log("Temas disponíveis para jogar:")

        for (let indiceTema = 0; indiceTema < listaDeTemas.length; indiceTema++) {
            console.log((indiceTema + 1) + " - " + listaDeTemas[indiceTema].nomeDoTema)
        }
        console.log("0 - Encerrar jogo")

        let escolhaDoUsuario = parseInt(prompt("Digite o número da sua escolha -> "))
        if (escolhaDoUsuario === 0) break
        if (escolhaDoUsuario > 0 && escolhaDoUsuario <= listaDeTemas.length) {
            jogarTema(listaDeTemas[escolhaDoUsuario - 1])
        } else {
            console.log("Opção inválida, tente novamente.")
        }
    }

    console.log("\nFim do jogo! Cultura total acumulada: " + jogador.pontosDeCultura)
}

iniciarJogo()
