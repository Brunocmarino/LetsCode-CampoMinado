import './style.css'

interface IQuadro{
  id: string,
  content: string,
  hide: boolean,
}

interface IPlacar{
  vitorias: number,
  derrotas: number
}

let placarSalvo: IPlacar = JSON.parse(localStorage.getItem('placarCampoMinado') || '[]')
let placar: IPlacar = {vitorias: 0, derrotas: 0}

const geraQuadro = () => {
  let quadro : IQuadro[][] = []
  let item : IQuadro
  for(let i=0;i<20;i++){
      let array :IQuadro[] = []
      for(let j=0;j<20;j++){
          item = {id:(i.toString()+","+j.toString()), content:'0',hide:true}
          array.push(item)
      }
      quadro.push(array)
  }
  return quadro
}

const geraBombas = (quadro:IQuadro[][], quantidade:number) => {
  if(quantidade > quadro.length+quadro[0].length) return quadro
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
const printQuadro = (quadro : IQuadro[][]) =>{
  const linha = quadro.length
  const coluna = quadro[0].length
  for(let i=0; i<linha;i++){
    let text = ''
    for(let j=0;j<coluna;j++){
      if(quadro[i][j].content==='💣')
        text+='[💣]'
      else 
        text+= '['+ quadro[i][j].content.toString()+'] '
    }
    console.log(text)
  }
}
const geraNumeros = (quadro:IQuadro[][]) => {

    const linha = quadro.length
    const coluna = quadro[0].length
    
    const ehBomba = (i:number, j:number) =>{
      return (quadro[i][j].content==='💣')
    }
    
    for(let i=0; i<linha;i++){
      for(let j=0;j<coluna;j++){
        if(ehBomba(i,j)){
          if(i-1 > 0 && j-1 > 0 && !ehBomba(i-1,j-1)) quadro[i-1][j-1].content = (Number(quadro[i-1][j-1].content) + 1).toString()
          if(i-1 > 0 && !ehBomba(i-1,j)) quadro[i-1][j].content = (Number(quadro[i-1][j].content) + 1).toString()
          if(i-1 > 0 && j+1 < coluna && !ehBomba(i-1,j+1)) quadro[i-1][j+1].content = (Number(quadro[i-1][j+1].content) + 1).toString()

          if(j-1 > 0 && !ehBomba(i,j-1)) quadro[i][j-1].content = (Number(quadro[i][j-1].content) + 1).toString()
          if(j+1 < coluna && !ehBomba(i,j+1)) quadro[i][j+1].content = (Number(quadro[i][j+1].content) + 1).toString()

          if(i+1 < linha && j-1 > 0 && !ehBomba(i+1,j-1)) quadro[i+1][j-1].content = (Number(quadro[i+1][j-1].content) + 1).toString()
          if(i+1 < linha && !ehBomba(i+1,j)) quadro[i+1][j].content = (Number(quadro[i+1][j].content) + 1).toString()
          if(i+1 < linha && j+1 < coluna && !ehBomba(i+1,j+1)) quadro[i+1][j+1].content = (Number(quadro[i+1][j+1].content)+ 1).toString()
        }
      }
    }
    return quadro
}

const containerTabuleiro: HTMLElement | null = document.getElementById("board")

const revelaConteudo = (arr: IQuadro) => {
    const item = document.createElement('div')
    item.className = 'quadradinho-revelado'
    if(arr.content === ""){
        item.textContent = '0'
    }else{
        item.textContent = `${arr.content}`}

    
    const containerQuadradinho = document.getElementById(`q${arr.id}`)

    containerQuadradinho?.appendChild(item)

    arr.hide = false

    teveDerrota(quadro)
    teveVitoria(quadro)
}

const renderizaQuadradinho = (arr: IQuadro) => {
    
    const item = document.createElement('div')
    item.onclick = () => {
        console.log(`${arr.id}`)
        revelaConteudo(arr)
    }
    item.className = 'quadradinho'
    item.id = `q${arr.id}`
    const span = document.createElement('span')
    item.appendChild(span)
    
    containerTabuleiro?.appendChild(item)
    
}

const teveDerrota = (quadro:IQuadro[][]) => {
  const linha = quadro.length
  const coluna = quadro[0].length
  for(let i=0; i<linha;i++){
    for(let j=0;j<coluna;j++){
      if(quadro[i][j].content==='💣' && quadro[i][j].hide===false){
        placar.derrotas = placar.derrotas + 1
        localStorage.setItem('placarCampoMinado', JSON.stringify(placar))
        renderizaPlacar()
      }
    }
  }
  return false
}

const teveVitoria = (quadro:IQuadro[][]) => {
  const linha = quadro.length
  const coluna = quadro[0].length
  for(let i=0; i<linha;i++){
    for(let j=0;j<coluna;j++){
      if(quadro[i][j].content==='💣' && quadro[i][j].hide===false){
        placar.vitorias = placar.vitorias + 1
        localStorage.setItem('placarCampoMinado', JSON.stringify(placar))
        renderizaPlacar()
        console.log(placar)
      }
      if(quadro[i][j].content!=='💣' && quadro[i][j].hide===true)
        return true
    }
  }
  return false
}

const renderizaPlacar = () => {
  if(placar.vitorias == 0 && placar.derrotas == 0){
      const containerPlacar = <HTMLDivElement>document.getElementById('placar')
      containerPlacar.style.visibility = 'visible';

      containerPlacar.textContent = `Vitórias: ${placar.vitorias.toString()} /n Derrotas${placar.derrotas.toString()}` 
      console.log('aparecer')
  }   
}

let quadroLimpo = geraQuadro()
let quadro = geraQuadro()
let quadroBomba = geraBombas(quadro,20)
let quadroBombaNumeros = geraNumeros(quadroBomba)

console.log(teveDerrota(quadroLimpo))
printQuadro(quadroBombaNumeros)

quadro.forEach((quadradinho) => quadradinho.forEach((quadradinho) => renderizaQuadradinho(quadradinho)))

