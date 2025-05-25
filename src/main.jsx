import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import DashboardLayoutAccountSidebar from "./pages/dashboard.jsx";
import GetSession from "./utils/session.jsx";
import AdminDashboard from "./pages/admindashboard.jsx";
import CompleteDataProvider from "./context/completeData.jsx";
import DataTable from "./components/datagrid.jsx";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import "./index.css";
import Viewdetails from "./pages/eventviewpage.jsx";





createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CopilotKit publicApiKey='ck_pub_646cd5b5e24347ec0f6acac5479a0af5'> 
        <CompleteDataProvider>
          <GetSession />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<App />} />
            <Route
              path="/dashboard"
              element={<DashboardLayoutAccountSidebar />}
            />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/vieweventdetails/:id" element={<Viewdetails/>}/>
          </Routes>
        </CompleteDataProvider>
      </CopilotKit>
    </BrowserRouter>
  </StrictMode>
);
