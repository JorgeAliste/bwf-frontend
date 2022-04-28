import React from 'react';
import './App.css';
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Main from "./components/main";


function App() {

    return (
        <div className="App">
            <div className="App-header">
                <Header/>
                <div>
                    <Sidebar/>
                    <Main/>
                </div>
            </div>

        </div>
    );
}

export default App;
