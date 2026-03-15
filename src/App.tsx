import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/Dashboard";
import { ThemeProvider } from "./theme";
import SmartFlowDashboard from './components/SmartFlowDashboard';
import Overview from "./pages/Overview";
import LiveCameraFeed from "./pages/LiveCameraFeed";
import CongestionDensity from "./pages/CongestionDensity";
import SignalTimings from "./pages/SignalTimings";
import NotFound from "./pages/NotFound";
import HistoricalAnalysis from './components/HistoricalAnalysis';
import BottleneckReport from "./components/BottleneckReport";

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/dashboard" element={<SmartFlowDashboard />} />
          <Route path="/signals" element={<SignalTimings />} />
          <Route path="/cameras" element={<LiveCameraFeed />} />
          <Route path="/congestion" element={<CongestionDensity />} />
          <Route path="/flow" element={<div className="p-8 text-center text-slate-200">Traffic Flow analytics are coming soon.</div>} />
          <Route path="/bottlenecks" element={<BottleneckReport />} />
          <Route path="/history" element={<HistoricalAnalysis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
