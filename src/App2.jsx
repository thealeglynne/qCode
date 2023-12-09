import logo from './logo.svg';
import './App.css';
import Calendario from './components/calendario';
import { CitasProvider } from './context/citasContext';
function App2() {
  return (
    <CitasProvider>

    <div className="App">
     <Calendario />

    </div>
        </CitasProvider>
  );
}

export default App2;
