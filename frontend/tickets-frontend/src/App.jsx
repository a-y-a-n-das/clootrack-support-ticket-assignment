import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import UpdateTicket from "./pages/UpdateTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tickets/create" element={<CreateTicket />} />
        <Route path="/tickets/:id" element={<UpdateTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
