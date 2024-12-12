import "./App.css";
import HomePage from "./pages/HomePage";
import StockInfo from "./pages/StockInfo";
import Navbar from "./components/ui/custom/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<StockInfo />} path="/stockInfo/:stockSymbol" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
