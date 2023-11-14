import { Routes, Route } from "react-router-dom";
import './App.css';
import Landing from './views/Landing/landing.component';
import Home from './views/Home/home.component';
import Create from './views/Create/create.component';
import Detail from './views/Detail/detail.component';

function App() {
  return (
    <div className="background-image">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
