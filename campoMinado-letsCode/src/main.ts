import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

interface IQuadro{
  id: string,
  content: string,
  hide: boolean,
}

const geraQuadro = () => {
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


console.log(geraQuadro( ))