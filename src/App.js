import Navbar from './Components/Navbar';
import News from './Components/News';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    const pageSize = 5;
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route exact path='/' element={<News newsKey="general" pageSize={pageSize} country="us" category="general" />} />
                    <Route exact path='/business' element={<News newsKey="business" pageSize={pageSize} country="us" category="business" />} />
                    <Route exact path='/entertainment' element={<News newsKey="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
                    <Route exact path='/health' element={<News newsKey="health" pageSize={pageSize} country="us" category="health" />} />
                    <Route exact path='/general' element={<News newsKey="general" pageSize={pageSize} country="us" category="general" />} />
                    <Route exact path='/science' element={<News newsKey="science" pageSize={pageSize} country="us" category="science" />} />
                    <Route exact path='/sports' element={<News newsKey="sports" pageSize={pageSize} country="us" category="sports" />} />
                    <Route exact path='/technology' element={<News newsKey="technology" pageSize={pageSize} country="us" category="technology" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;