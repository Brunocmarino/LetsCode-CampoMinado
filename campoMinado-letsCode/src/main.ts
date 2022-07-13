import './style.css'

interface IQuadradinho{
  id: string,
  content: string,
  hide: boolean,
  bandeirinha: boolean,
}

interface IPlacar{
  vitorias: number,
  derrotas: number
}

let placar: [IPlacar] = JSON.parse(localStorage.getItem('placarCampoMinado') || "[{\"vitorias\":0,\"derrotas\":0}]")

const geraQuadro = () => {
  let quadro : IQuadradinho[][] = []
  let item : IQuadradinho
  for(let i=0;i<20;i++){
      let array :IQuadradinho[] = []
      for(let j=0;j<20;j++){
          item = {id:(i.toString()+","+j.toString()), content:'0',hide:true,bandeirinha:false}
          array.push(item)
      }
      quadro.push(array)
  }
  return quadro
}

const geraBombas = (quadro:IQuadradinho[][], quantidade:number) => {
  if(quantidade > quadro.length*quadro[0].length) return quadro
  for(let i=0;i<quantidade;i++){
      let linha = Math.round(Math.random()*(quadro.length-1))
      let coluna = Math.round(Math.random()*(quadro[0].length-1))
      
      if(quadro[linha][coluna].content !== "💣")
        quadro[linha][coluna].content = "💣"
      else
        i--
  }
  return quadro
}

const printQuadro = (quadro : IQuadradinho[][]) =>{
  const coluna = quadro.length
  const linha = quadro[0].length
  for(let i=0; i<linha;i++){
    let text = ''
    for(let j=0;j<coluna;j++){
      if(quadro[i][j].content==='💣')
        text+='[💣]'
      else 
        text+= '['+ quadro[j][i].content.toString()+'] '
    }
    console.log(text)
  }
}

const geraNumeros = (quadro:IQuadradinho[][]) => {

    const linha = quadro.length
    const coluna = quadro[0].length
    
    const ehBomba = (i:number, j:number) =>{
      return (quadro[i][j].content==='💣')
    }
    
    for(let i=0; i<linha;i++){
      for(let j=0;j<coluna;j++){
        if(ehBomba(i,j)){
          if(i-1 >= 0 && j-1 >= 0 && !ehBomba(i-1,j-1)) quadro[i-1][j-1].content = (Number(quadro[i-1][j-1].content) + 1).toString()
          if(i-1 >= 0 && !ehBomba(i-1,j)) quadro[i-1][j].content = (Number(quadro[i-1][j].content) + 1).toString()
          if(i-1 >= 0 && j+1 < coluna && !ehBomba(i-1,j+1)) quadro[i-1][j+1].content = (Number(quadro[i-1][j+1].content) + 1).toString()

          if(j-1 >= 0 && !ehBomba(i,j-1)) quadro[i][j-1].content = (Number(quadro[i][j-1].content) + 1).toString()
          if(j+1 < coluna && !ehBomba(i,j+1)) quadro[i][j+1].content = (Number(quadro[i][j+1].content) + 1).toString()

          if(i+1 < linha && j-1 >= 0 && !ehBomba(i+1,j-1)) quadro[i+1][j-1].content = (Number(quadro[i+1][j-1].content) + 1).toString()
          if(i+1 < linha && !ehBomba(i+1,j)) quadro[i+1][j].content = (Number(quadro[i+1][j].content) + 1).toString()
          if(i+1 < linha && j+1 < coluna && !ehBomba(i+1,j+1)) quadro[i+1][j+1].content = (Number(quadro[i+1][j+1].content)+ 1).toString()
        }
      }
    }
    return quadro
}

const containerTabuleiro: HTMLElement | null = document.getElementById("board")

const revelaConteudo = (arr: IQuadradinho) => {

  if(arr.hide == true){
    const item = document.createElement('div')
    item.className = 'quadradinho-revelado'
    if(arr.content === "" || arr.content === "0"){
        item.textContent = '0'
        abre0s(arr)
    }else{
        item.textContent = `${arr.content}`}

    const containerQuadradinho = document.getElementById(`q${arr.id}`)

    containerQuadradinho?.appendChild(item)

    arr.hide = false


    teveDerrota(arr)
    teveVitoria(quadro)
  }  
}

const abre0s = (quadradinho : IQuadradinho) => {
  const linha = quadro.length
  const coluna = quadro[0].length
  const i = Number(quadradinho.id.split(",")[0])
  const j = Number(quadradinho.id.split(",")[1])
  setTimeout(()=>{
    if(i-1 >= 0 && j-1 >= 0) revelaConteudo(quadro[i-1][j-1])
    if(i-1 >= 0) revelaConteudo(quadro[i-1][j])
    if(i-1 >= 0 && j+1 < coluna) revelaConteudo(quadro[i-1][j+1])

    if(j-1 >= 0) revelaConteudo(quadro[i][j-1])
    if(j+1 < coluna) revelaConteudo(quadro[i][j+1])

    if(i+1 < linha && j-1 >= 0 ) revelaConteudo(quadro[i+1][j-1])
    if(i+1 < linha) revelaConteudo(quadro[i+1][j])
    if(i+1 < linha && j+1 < coluna) revelaConteudo(quadro[i+1][j+1])
  },10)
}

// const colocaBandeirinha = (arr: IQuadradinho) => {
//   if(arr.bandeirinha == false){
//     const item = document.createElement('div')
//     item.className = 'quadradinho-bandeirinha'
//     item.textContent = "🚩"

//     const containerQuadradinho = document.getElementById(`q${arr.id}`)

//     containerQuadradinho?.appendChild(item)
//     arr.bandeirinha = true
//   }
// }

const renderizaQuadradinho = (arr: IQuadradinho) => {
    
    const item = document.createElement('div')
    item.onmousedown = (e) => {
        if(e.button === 0){
          revelaConteudo(arr)
        } 
        if(e.button === 2){
          colocaBandeirinha(arr)
        }
    }

    item.className = 'quadradinho'
    item.id = `q${arr.id}`
    const span = document.createElement('span')
    item.appendChild(span)
    
    containerTabuleiro?.appendChild(item) 
}


const teveDerrota = (arr: IQuadradinho) => {
  setTimeout(()=>{
    if(arr.content ==='💣'){
      alert("Game Over")
      placar[0].derrotas = placar[0].derrotas + 1
      localStorage.setItem('placarCampoMinado', JSON.stringify(placar))
      renderizaPlacar()
      novoJogo()
    }

  },500)
}

const teveVitoria = (quadro:IQuadradinho[][]) => {

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
    renderizaPlacar()
    setTimeout(()=>{
    alert("Vitóriaaaaa")
    },500)
  }

  return false

}

const novoJogo = () => {
  quadro = geraNumeros(geraBombas(geraQuadro(),40))
        printQuadro(quadro)
        while(containerTabuleiro?.firstChild){
          containerTabuleiro?.removeChild(containerTabuleiro?.firstChild)
        }
        quadro.forEach((quadradinho) => quadradinho.forEach((quadradinho) => renderizaQuadradinho(quadradinho)))

}

const renderizaPlacar = () => {
  if(placar[0].vitorias != 0 || placar[0].derrotas != 0){
      const containerPlacar = <HTMLDivElement>document.getElementById('placar')
      containerPlacar.style.visibility = 'visible';

      containerPlacar.textContent = `Vitórias: ${placar[0].vitorias.toString()} Derrotas: ${placar[0].derrotas.toString()}` 
  }   
}

// let quadroLimpo = geraQuadro()
let quadro = geraQuadro()
let quadroBomba = geraBombas(quadro,40)
let quadroBombaNumeros = geraNumeros(quadroBomba)

printQuadro(quadroBombaNumeros)

quadro.forEach((quadradinho) => quadradinho.forEach((quadradinho) => renderizaQuadradinho(quadradinho)))

