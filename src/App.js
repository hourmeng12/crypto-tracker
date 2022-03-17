import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';
import Crypto from './routes/Crypto';
import { Navigate, useLocation } from 'react-router';
import { useScrollToTop } from './hooks';
import NotFound from './routes/NotFound';

function App() {
  useScrollToTop();
  const location = useLocation();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="cryptocurrencies">
          <Route
            index
            element={<Navigate to="/" replace state={{ location }} />}
          />
          <Route path=":cryptoId" element={<Crypto />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
