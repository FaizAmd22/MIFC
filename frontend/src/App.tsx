import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Caliper from "./pages/caliper/Caliper";
import ClutchDisk from "./pages/clutch-disk/ClutchDisk";
import Vct from "./pages/vct/Vct";
import Layout from "./layout/layout";
import NotFound from "./pages/notFound/NotFound";
import CaliperEdit from "./pages/caliper/CaliperEdit/CaliperEdit";
import CaliperById from "./pages/caliper/CaliperById/CaliperById";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/caliper" element={<Caliper />}></Route>
          <Route path="/caliper/:id" element={<CaliperById />}></Route>
          <Route path="/caliper/:id/edit" element={<CaliperEdit />}></Route>
          <Route path="/clutch-disk" element={<ClutchDisk />}></Route>
          <Route path="/vct" element={<Vct />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
