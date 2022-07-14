import { IQuadradinho } from "./quadro";

export interface IPlacar{
    vitorias: number,
    derrotas: number
  }

export const renderizaPlacar = (placar : IPlacar[]) => {
    if(placar[0].vitorias != 0 || placar[0].derrotas != 0){
        const containerPlacar = <HTMLDivElement>document.getElementById('placar')
        containerPlacar.style.visibility = 'visible';
  
        containerPlacar.textContent = `Vitórias: ${placar[0].vitorias.toString()} Derrotas: ${placar[0].derrotas.toString()}` 
    }   
  }

