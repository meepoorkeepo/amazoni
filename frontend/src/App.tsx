import { sampleProducts } from "./data"
import './App.css'

function App() {
  return (
    <div>
      <header>
        AMAZONI
      </header>
      <main>
        <ul>
          {sampleProducts.map((product)=>(
            <div key={product.slug}>
              <img className="img" src={product.image} alt={product.slug} />
              <h2>{product.name}</h2>
              <p>€{product.price}</p>
            </div>
          ))}
        </ul>
      </main>
      <footer>
        All rigths reserved
      </footer>
    </div>
  )
}

export default App
