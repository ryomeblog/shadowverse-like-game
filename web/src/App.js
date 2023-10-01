import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainMenu from './pages/MainMenu';
import GameScreen from './pages/GameScreen';
import CardCreationScreen from './pages/CardCreationScreen';
import DeckEditingScreen from './pages/DeckEditingScreen';
import MatchingRoom from './pages/MatchingRoom';
import RequireAuth from './auth/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<MainMenu />} />
        </Route>
        <Route path="/battle/:matchStatusId" element={<RequireAuth />}>
          <Route index element={<GameScreen />} />
        </Route>
        <Route path="/create" element={<RequireAuth />}>
          <Route index element={<CardCreationScreen />} />
        </Route>
        <Route path="/deck" element={<RequireAuth />}>
          <Route index element={<DeckEditingScreen />} />
        </Route>
        <Route path="/match" element={<RequireAuth />}>
          <Route index element={<MatchingRoom />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
