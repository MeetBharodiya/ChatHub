import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Page from "./pages/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </div>
  );
}

export default App;
