import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Caliper from "./pages/caliper/caliper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Caliper children={undefined} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
