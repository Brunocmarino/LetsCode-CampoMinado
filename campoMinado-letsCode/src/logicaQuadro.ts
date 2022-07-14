import { colocaBandeirinha } from "./bandeirinha"
import { IPlacar, renderizaPlacar } from "./placar"
import { IQuadradinho, geraNumeros, geraBombas, geraQuadro, printQuadro } from "./quadro"

let contadorBandeirinha: number = 0

export const revelaConteudo = (arr: IQuadradinho, quadro : IQuadradinho[][], placar:IPlacar[],containerTabuleiro : HTMLElement | null,dificuldade:number) => {

    if(arr.hide == true && arr.bandeirinha == false){
      const item = document.createElement('div')
      item.className = 'quadradinho-revelado'
      if(arr.content === "" || arr.content === "0"){
          item.textContent = '0'
          abre0s(arr, quadro, placar,containerTabuleiro,dificuldade)
      }
      else{
          item.textContent = `${arr.content}`
      }
  
      const containerQuadradinho = document.getElementById(`q${arr.id}`)
      containerQuadradinho?.appendChild(item)
      arr.hide = false
  
      teveDerrota(arr, quadro, placar,containerTabuleiro,dificuldade)
      teveVitoria(quadro, placar)
    }  
  }
  
export const abre0s = (quadradinho : IQuadradinho, quadro : IQuadradinho[][], placar:IPlacar[], containerTabuleiro: HTMLElement | null,dificuldade:number) => {
    const linha = quadro.length
    const coluna = quadro[0].length
    const i = Number(quadradinho.id.split(",")[0])
    const j = Number(quadradinho.id.split(",")[1])
    setTimeout(()=>{
      if(i-1 >= 0 && j-1 >= 0) revelaConteudo(quadro[i-1][j-1], quadro, placar,containerTabuleiro,dificuldade)
      if(i-1 >= 0) revelaConteudo(quadro[i-1][j], quadro, placar,containerTabuleiro,dificuldade)
      if(i-1 >= 0 && j+1 < coluna) revelaConteudo(quadro[i-1][j+1], quadro, placar,containerTabuleiro,dificuldade)
  
      if(j-1 >= 0) revelaConteudo(quadro[i][j-1], quadro, placar,containerTabuleiro,dificuldade)
      if(j+1 < coluna) revelaConteudo(quadro[i][j+1], quadro, placar,containerTabuleiro,dificuldade)
  
      if(i+1 < linha && j-1 >= 0 ) revelaConteudo(quadro[i+1][j-1], quadro, placar,containerTabuleiro,dificuldade)
      if(i+1 < linha) revelaConteudo(quadro[i+1][j], quadro, placar,containerTabuleiro,dificuldade)
      if(i+1 < linha && j+1 < coluna) revelaConteudo(quadro[i+1][j+1], quadro, placar,containerTabuleiro,dificuldade)
    },10)
}
  
export const renderizaQuadradinho = (arr: IQuadradinho, quadro:IQuadradinho[][], placar:IPlacar[],containerTabuleiro : HTMLElement | null,dificuldade:number) => {
      
      const item = document.createElement('div')
      item.onmousedown = (e) => {
          if(e.button === 0){
            revelaConteudo(arr, quadro, placar,containerTabuleiro,dificuldade)
          } 
          if(e.button === 2){
            contadorBandeirinha = colocaBandeirinha(arr, contadorBandeirinha,dificuldade)
          }
      }
  
      item.className = 'quadradinho'
      item.id = `q${arr.id}`
      const span = document.createElement('span')
      item.appendChild(span)
      
      containerTabuleiro?.appendChild(item) 
}
  
export const novoJogo = (quadro : IQuadradinho[][], placar:IPlacar[],containerTabuleiro : HTMLElement | null,dificuldade:number) => {
    quadro = geraNumeros(geraBombas(geraQuadro(),dificuldade))
    printQuadro(quadro)
    console.log(containerTabuleiro)
    while(containerTabuleiro?.firstChild){
        containerTabuleiro?.removeChild(containerTabuleiro?.firstChild)
    }
    
    quadro.forEach((quadradinho) => quadradinho.forEach((quadradinho) => renderizaQuadradinho(quadradinho,quadro, placar,containerTabuleiro,dificuldade)))
  
}

export const teveDerrota = (arr: IQuadradinho,quadro : IQuadradinho[][], placar:IPlacar[],containerTabuleiro : HTMLElement | null,dificuldade:number) => {
    setTimeout(()=>{
      if(arr.content ==='💣'){
        alert("Game Over")
        placar[0].derrotas = placar[0].derrotas + 1
        localStorage.setItem('placarCampoMinado', JSON.stringify(placar))
        renderizaPlacar(placar)
        novoJogo(quadro, placar,containerTabuleiro,dificuldade)
      }
  
    },500)
}
  
export const teveVitoria = (quadro:IQuadradinho[][], placar : IPlacar[]) => {

    const linha = quadro.length
    const coluna = quadro[0].length
    let ganhou = true
    for(let i=0; i<linha;i++){
        for(let j=0;j<coluna;j++){
        if(quadro[i][j].content==='💣' && quadro[i][j].hide===false){
            // Clicou em uma bomba - Bomba está revelada
            ganhou=false
        }
        if(quadro[i][j].content!=='💣' && quadro[i][j].hide===true){
            // Há algum quadrado !bomba não clicado ainda
            ganhou=false
        }
        }
    }
    if(ganhou){
        placar[0].vitorias = placar[0].vitorias + 1
        localStorage.setItem('placarCampoMinado', JSON.stringify(placar))
        renderizaPlacar(placar)
        setTimeout(()=>{
        alert("Vitóriaaaaa")
        },500)
    }

    return false

}