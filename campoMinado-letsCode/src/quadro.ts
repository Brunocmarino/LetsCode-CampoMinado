export interface IQuadradinho{
    id: string,
    content: string,
    hide: boolean,
    bandeirinha: boolean,
  }

export const geraQuadro = () => {
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

export  const geraBombas = (quadro:IQuadradinho[][], quantidade:number) => {
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

export const printQuadro = (quadro : IQuadradinho[][]) =>{
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

export  const geraNumeros = (quadro:IQuadradinho[][]) => {

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