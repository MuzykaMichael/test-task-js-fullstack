import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Heroes } from "./Pages/Heroes";
import { HeroAdd } from "./Pages/HeroAdd";
import { HeroUpdate } from "./Pages/HeroUpdate";
import { HeroInfo } from "./Pages/HeroInfo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path={"/:id"} element={<Heroes />} />
          <Route path="/add" element={<HeroAdd />} />
          <Route path="/hero/:id" element={<HeroInfo />} />
          <Route path="update/hero/:id" element={<HeroUpdate />} />
          <Route path="*" element={<Navigate to={"/1"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
