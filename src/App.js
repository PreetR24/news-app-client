import Navbar from './Components/Navbar';
import News from './Components/News';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {    
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<News />} />
                    <Route path="/search/:searchUsing" element={<News />} />
                    <Route path="/:country?/:category?" element={<News />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;