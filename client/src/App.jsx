import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import LoginForm from './components/LoginForm';
import YaVotaste from './components/YaVotaste';
import VotingForm from './components/VotingForm';

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/ya-votaste" element={<YaVotaste />} />
        <Route path="/votar" element={<VotingForm />} />
      </Routes>
    </div>
  );
}
