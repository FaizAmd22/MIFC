import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Caliper from "./pages/caliper/Caliper";
import ClutchDisk from "./pages/clutch-disk/ClutchDisk";
import Vct from "./pages/vct/vct";
import Layout from "./layout/layout";
import NotFound from "./pages/notFound/notFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/caliper" element={<Caliper />}></Route>
          <Route path="/clutch-disk" element={<ClutchDisk />}></Route>
          <Route path="/vct" element={<Vct />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
