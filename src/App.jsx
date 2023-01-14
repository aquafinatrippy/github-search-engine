import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./Views/Home";
import About from "./Views/About";
import NotFound from "./Views/NotFound";
import { GithubProvider } from "./context/github/GithubContext";
import { AlertProvider } from "./context/alert/AlertContext";
import Alert from "./components/layout/Alert";
import User from "./Views/User";

const App = () => {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className="container mx-auto px-3 pb-12">
              <Alert></Alert>
              <Routes>
                <Route path="/" element={<Home></Home>} />
                <Route path="/about" element={<About></About>} />
                <Route path="/user/:login" element={<User></User>} />
                <Route path="/notfount" element={<NotFound></NotFound>} />
                <Route path="/*" element={<NotFound></NotFound>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
};

export default App;
