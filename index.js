const prompt = require("prompt-sync")()

function caixaAlta(texto) {
    console.log("\n+" + "-".repeat(56) + "+")
    console.log("|" + " ".repeat(Math.floor((56 - texto.length)/2)) + texto + " ".repeat(Math.ceil((56 - texto.length)/2)) + "|")
    console.log("+" + "-".repeat(56) + "+\n")
}

function barraConquista(atual, total) {
    let taxa = Math.floor((atual / total) * 100)
    let cheio = Math.floor(taxa / 5)
    let vazio = 20 - cheio
    let linha = "#".repeat(cheio) + "-".repeat(vazio)
    console.log("\nConquistas: " + atual + "/" + total + " [" + linha + "] " + taxa + "%\n")
}

function adicionarCultura(pontos) {
    jogador.cultura = jogador.cultura + pontos
    console.log("\n+" + pontos + " CULTURA BRASILEIRA! Total: " + jogador.cultura + "\n")
}

function escolherTema() {
    console.log("ESCOLHA UM TEMA DA CULTURA BRASILEIRA:\n")
    let i = 0
    while (i < temas.length) {
        let status = jogador.conquistados.includes(temas[i].nome) ? " [100%]" : ""
        console.log((i + 1) + " - " + temas[i].nome + status)
        i = i + 1
    }
    console.log("\n0 - Ver meu nivel de brasileiro")
    let op = prompt("-> ")
    return parseInt(op) - 1
}

function jogarTema(ind) {
    let tema = temas[ind]
    
    if (jogador.conquistados.includes(tema.nome)) {
        console.log("\nVoce ja sabe tudo sobre " + tema.nome + "!\n")
        prompt("ENTER...")
        return
    }

    caixaAlta(tema.nome + " - DESAFIO DE CONHECIMENTO")
    console.log("Responda as perguntas e prove que e brasileiro de verdade!\n")
    console.log("Precisa de " + tema.totalPerguntas + " acertos para dominar esse tema\n")

    let acertos = 0
    let numeroPergunta = 1

    while (acertos < tema.totalPerguntas && numeroPergunta <= tema.perguntas.length) {
        let p = tema.perguntas[numeroPergunta - 1]
        console.log("Pergunta " + numeroPergunta + "/" + tema.perguntas.length)
        console.log(p.texto + "\n")
        
        let i = 0
        while (i < p.opcoes.length) {
            console.log("  " + (i + 1) + ") " + p.opcoes[i])
            i = i + 1
        }
        
        let resp = prompt("\nSua resposta (numero) -> ")
        resp = parseInt(resp)
        
        if (resp === p.correta + 1) {
            console.log("\nACERTOU MIZERAVI!\n")
            acertos = acertos + 1
            adicionarCultura(10)
        } else {
            console.log("\nERROOOU! A resposta certa era: " + (p.correta + 1) + ") " + p.opcoes[p.correta] + "\n")
        }
        
        barraConquista(acertos, tema.totalPerguntas)
        numeroPergunta = numeroPergunta + 1
        prompt("ENTER para continuar...")
        console.log("\n" + "-".repeat(50) + "\n")
    }

    if (acertos >= tema.totalPerguntas) {
        console.log("VOCE DOMINOU " + tema.nome.toUpperCase() + "!!!\n")
        jogador.conquistados.push(tema.nome)
        jogador.nivel = jogador.nivel + 1
        adicionarCultura(200)
        console.log("PARABENS, AGORA VOCE PODE FALAR DISSO COM ORGULHO!\n")
    } else {
        console.log("Faltaram " + (tema.totalPerguntas - acertos) + " acertos... estude mais e volte!\n")
    }

    prompt("ENTER para voltar ao menu...")
}

function mostrarPerfil() {
    caixaAlta("PERFIL DO BRASILEIRO")
    console.log("Nome: " + jogador.nome.toUpperCase())
    console.log("Nivel: " + jogador.nivel)
    console.log("Cultura total: " + jogador.cultura)
    console.log("Temas dominados: " + jogador.conquistados.length + " de " + temas.length + "\n")
    
    if (jogador.conquistados.length > 0) {
        console.log("Conquistas:")
        let i = 0
        while (i < jogador.conquistados.length) {
            console.log("   - " + jogador.conquistados[i])
            i = i + 1
        }
        console.log("")
    }
}

function principal() {
    caixaAlta("BRASIL CONHECIMENTO EXTREMO")
    jogador.nome = prompt("Qual seu nome, irmao? -> ")
    console.log("\nBora provar que voce entende mesmo de Brasil, " + jogador.nome + "!\n")
    prompt("ENTER para comecar...")

    while (true) {
        caixaAlta("CULTURA: " + jogador.cultura + " - NIVEL " + jogador.nivel)
        mostrarPerfil()

        let escolha = escolherTema()

        if (escolha === -1) {
            mostrarPerfil()
            prompt("\nENTER para voltar...")
            continue
        }

        if (escolha >= 0 && escolha < temas.length) {
            jogarTema(escolha)
        } else if (escolha !== -1) {
            console.log("\nOpcao nao existe!\n")
            prompt("ENTER...")
        }

        if (jogador.conquistados.length === temas.length) {
            caixaAlta("VOCE E O MAIOR BRASILEIRO DA HISTORIA")
            console.log("\n" + jogador.nome.toUpperCase() + " DOMINOU TODOS OS TEMAS!\n")
            console.log("Cultura final: " + jogador.cultura)
            console.log("Nivel final: " + jogador.nivel + "\n")
            console.log("AGORA NAO TEM QUEM SEGURE: VOCE E RAIZ PURA!\n")
            break
        }
    }
}

let jogador = {
    nome: "",
    cultura: 0,
    nivel: 1,
    conquistados: []
}

let temas = [
    {
        nome: "Carnaval",
        totalPerguntas: 5,
        perguntas: [
            { texto: "Qual estado e famoso pelo Carnaval de rua?", opcoes: ["Rio de Janeiro", "Bahia", "Pernambuco", "Sao Paulo"], correta: 1 },
            { texto: "Qual o nome do sambodromo do Rio?", opcoes: ["Maracana", "Sambodromo da Marques de Sapucai", "Mangueira", "Beira-Rio"], correta: 1 },
            { texto: "Qual escola de samba ja foi 41 vezes campea?", opcoes: ["Portela", "Mangueira", "Salgueiro", "Beija-Flor"], correta: 0 },
            { texto: "O que significa a sigla G.R.E.S.?", opcoes: ["Grêmio Recreativo Escola de Samba", "Grupo de Ritmo e Samba", "Grande Rio Escola de Samba"], correta: 0 },
            { texto: "Qual cidade tem o maior bloco de rua do mundo?", opcoes: ["Recife", "Olinda", "Salvador", "Sao Paulo"], correta: 2 }
        ]
    },
    {
        nome: "Futebol Brasileiro",
        totalPerguntas: 5,
        perguntas: [
            { texto: "Quem tem mais titulos brasileiros?", opcoes: ["Palmeiras", "Flamengo", "Corinthians", "Sao Paulo"], correta: 0 },
            { texto: "Qual jogador tem o apelido Rei do Futebol?", opcoes: ["Garrincha", "Pele", "Romario", "Zico"], correta: 1 },
            { texto: "Em que ano o Brasil foi penta?", opcoes: ["1998", "2002", "2006", "2014"], correta: 1 },
            { texto: "Qual clube nunca caiu?", opcoes: ["Flamengo", "Santos", "Cruzeiro", "Coritiba"], correta: 0 },
            { texto: "Qual o maior classico do Brasil?", opcoes: ["Fla-Flu", "Gremio-Inter", "Atletico-MG x Cruzeiro", "Corinthians x Palmeiras"], correta: 0 }
        ]
    },
    {
        nome: "Comida Tipica",
        totalPerguntas: 5,
        perguntas: [
            { texto: "Qual o prato tipico do Nordeste com camaroes?", opcoes: ["Moqueca", "Acaraje", "Baião de dois", "Vatapa"], correta: 0 },
            { texto: "De onde vem a feijoada originalmente?", opcoes: ["Portugal", "Africa", "Italia", "Indigena"], correta: 0 },
            { texto: "Qual estado inventou o pão de queijo?", opcoes: ["Sao Paulo", "Rio de Janeiro", "Minas Gerais", "Goias"], correta: 2 },
            { texto: "Qual a bebida nacional do Brasil?", opcoes: ["Cerveja", "Caipirinha", "Guarana", "Cafe"], correta: 1 },
            { texto: "Qual cidade e famosa pelo churrasco gaucho?", opcoes: ["Porto Alegre", "Curitiba", "Florianopolis", "Canoas"], correta: 0 }
        ]
    },
    {
        nome: "Musica Brasileira",
        totalPerguntas: 5,
        perguntas: [
            { texto: "Quem e o Rei do Samba?", opcoes: ["Zeca Pagodinho", "Martinho da Vila", "Paulinho da Viola", "Cartola"], correta: 0 },
            { texto: "Qual o ritmo nascido em Salvador?", opcoes: ["Samba", "Forro", "Axé", "Funk"], correta: 2 },
            { texto: "Qual dupla sertaneja mais famosa?", opcoes: ["Ze Neto e Cristiano", "Chitãozinho e Xororó", "Jorge e Mateus", "Henrique e Juliano"], correta: 1 },
            { texto: "Quem cantava Mas que nada?", opcoes: ["Tim Maia", "Jorge Ben Jor", "Gilberto Gil", "Caetano Veloso"], correta: 1 },
            { texto: "Qual o nome do ritmo do Rio Grande do Sul?", opcoes: ["Vaneira", "Pagode", "Sertanejo", "Brega"], correta: 0 }
        ]
    }
]

principal()