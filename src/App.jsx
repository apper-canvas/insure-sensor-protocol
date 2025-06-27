import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Clients from '@/components/pages/Clients';
import Policies from '@/components/pages/Policies';
import Pipeline from '@/components/pages/Pipeline';
import Tasks from '@/components/pages/Tasks';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </Layout>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastStyle={{
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        />
      </div>
    </Router>
  );
}

export default App;