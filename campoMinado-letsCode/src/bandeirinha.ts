import { IQuadradinho } from "./quadro"

export const colocaBandeirinha = (arr: IQuadradinho, contadorBandeirinha:number,dificuldade:number) => {
  
    if(arr.bandeirinha == false && arr.hide == true &&contadorBandeirinha <= dificuldade){
      const item = document.createElement('div')
      item.className = 'quadradinho-bandeirinha'
      item.textContent = "🚩"
      
      const containerQuadradinho = document.getElementById(`q${arr.id}`)
  
      containerQuadradinho?.appendChild(item)
      arr.bandeirinha = true
  
      contadorBandeirinha = contadorBandeirinha + 1
    }
    else if(arr.bandeirinha == true && arr.hide == true){
  
      const containerQuadradinho = document.getElementById(`q${arr.id}`)
      
      while(containerQuadradinho?.firstChild){
        containerQuadradinho?.removeChild(containerQuadradinho?.firstChild)
      }
  
      arr.bandeirinha = false
  
      contadorBandeirinha = contadorBandeirinha - 1
    }
      
      return  contadorBandeirinha
  }