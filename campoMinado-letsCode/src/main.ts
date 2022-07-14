import './style.css'
import './quadro.ts'
import { geraBombas, geraNumeros, geraQuadro, printQuadro } from './quadro'
import { IPlacar } from './placar'
import { renderizaQuadradinho } from './logicaQuadro'


let placar: [IPlacar] = JSON.parse(localStorage.getItem('placarCampoMinado') || "[{\"vitorias\":0,\"derrotas\":0}]")
const containerTabuleiro: HTMLElement | null = document.getElementById("board")
const dificuldade = 100
let quadro = geraQuadro()
let quadroBomba = geraBombas(quadro,dificuldade)
let quadroBombaNumeros = geraNumeros(quadroBomba)

printQuadro(quadroBombaNumeros)

quadro.forEach((quadradinho) => quadradinho.forEach((quadradinho) => renderizaQuadradinho(quadradinho, quadro, placar, containerTabuleiro,dificuldade)))

