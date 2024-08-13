import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Chatbox from './Components/chatbox';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/Chatpage" element={<Chatbox />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
