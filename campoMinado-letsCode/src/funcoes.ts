
interface IQuadro{
    id: string,
    content: string,
    hide: boolean,
}

export const geraQuadro = () => {
    let quadro : IQuadro[][] = []
    let item : IQuadro
    for(let i=0;i<20;i++){
        let array :IQuadro[] = []
        for(let j=0;j<20;j++){
            item = {id:(i.toString()+j.toString()), content:'',hide:true}
            array.push(item)
        }
        quadro.push(array)
    }
    return quadro
}
console.log(geraQuadro)