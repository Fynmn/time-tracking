import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthWrapper } from "./auth/AuthWrapper";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthWrapper></AuthWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
