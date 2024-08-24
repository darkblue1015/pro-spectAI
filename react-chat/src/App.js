// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useNavigate,
// } from "react-router-dom";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import ChatBox from "./ChatBox";
// // import TaskPanel from "./TaskPanel";
// import SaveExitPage from "./SaveExitPage";
// import NewPage from "./NewPage";
// import "./App.css";


// const MainContent = () => {
//   const navigate = useNavigate();

//   const handleSaveExit = () => {
//     navigate("/save-exit");
//   };

//   return (
//     <div className="app">
//       <Navbar />
//       <div className="content">
//         <Sidebar />
//         <div className="main-content">
//           <ChatBox />
//         </div>
//       </div>
//       <footer className="footer">
//         <button className="footer-button" onClick={handleSaveExit}>
//           Save & Exit
//         </button>
//       </footer>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<NewPage />} />
//         <Route path="/main" element={<MainContent />} />
//         <Route path="/save-exit" element={<SaveExitPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";
import TaskPanel from "./TaskPanel";
import SaveExitPage from "./SaveExitPage";
import NewPage from "./NewPage";
import AnalysisChart from "./chart";
import "./App.css";

const MainContent = () => {
  const navigate = useNavigate();

  const handleSaveExit = () => {
    navigate("/save-exit");
  };

  const handleAnalysis = () =>{
    navigate("/chart");
  }

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <div className="content">
            <TaskPanel />
            <ChatBox />
          </div>
        </div>
      </div>
      <footer className="footer">
        <button className="footer-button" onClick={handleSaveExit}>
          Save & Exit
        </button>
        <button className="footer-button" onClick={handleAnalysis}>
          analysis
        </button>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewPage />} />
        <Route path="/main" element={<MainContent />} />
        <Route path="/chart" element={<AnalysisChart/>} />
        <Route path="/save-exit" element={<SaveExitPage />} />
      </Routes>
    </Router>
  );
};

export default App;
