import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./Views/Home";
import About from "./Views/About";
import NotFound from "./Views/NotFound";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <main className="container mx-auto px-3 pb-12">
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/about" element={<About></About>} />
            <Route path="/notfount" element={<NotFound></NotFound>} />
            <Route path="/*" element={<NotFound></NotFound>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
