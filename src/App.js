import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:name" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
