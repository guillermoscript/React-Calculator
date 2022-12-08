import reactLogo from './assets/react.svg'
import './App.css'
import Layout from './components/layout/Layout'
import { numericButtonsData, operatorButtonsData } from '../data'
import Button from './components/buttons/Button'
import useOperators from './hooks/useOperators'

function App() {
  
  const  { handleClick, formula, display } = useOperators()

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React Calculator</h1>
      <Layout formula={formula} display={display}>
        <div className="buttons">
          <div className='numericGrid'>
            {numericButtonsData.map((button) => (
              <Button
                key={button.id}
                id={button.id}
                value={button.value}
                onClick={handleClick}
                label={button.value}
                classNames={button.className} />
            ))}
          </div>
          <div className='operatorGrid'>
            {operatorButtonsData.map((button) => (
              <Button
                key={button.id}
                id={button.id}
                value={button.value}
                onClick={handleClick}
                label={button.value}
                classNames={button.className} />
            ))}
            <button onClick={handleClick} value='AC' id='clear' className="btn">AC</button>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default App
