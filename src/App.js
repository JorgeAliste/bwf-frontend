import React from 'react';
import './App.css';
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Main from "./components/main";
import theme from "./theme";
import {ThemeProvider} from "@mui/material";


function App() {

    return (
        <ThemeProvider theme={theme}>
            <div className="App">

                <Header/>
                <div className={"general-content"}>
                    <Sidebar/>
                    <Main/>
                </div>

            </div>
        </ThemeProvider>
    )
        ;
}

export default App;
