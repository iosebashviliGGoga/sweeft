import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import { HistoryContext } from './components/atoms/Context'
import { HelmetProvider } from 'react-helmet-async'
import AnimatedRoutes from './AnimatedRoutes';
function App() {
  const [path, setPath] = useState([])
  const helmetContext = {};
  return (
    <>
      <HelmetProvider context={helmetContext}>
        <BrowserRouter>
          <HistoryContext.Provider
            value={{ path, setPath }}
          >
            <AnimatedRoutes />
          </HistoryContext.Provider>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}

export default App;
