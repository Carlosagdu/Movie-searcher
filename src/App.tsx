import * as React from 'react';
import PermanentDrawerLeft from './components/Navbar/Navbar'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/home'

export default function App() {
  return (
    <BrowserRouter>
      <PermanentDrawerLeft>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </PermanentDrawerLeft>
    </BrowserRouter>
  );
}
