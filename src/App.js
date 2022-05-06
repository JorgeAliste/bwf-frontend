import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";
import Main from "./components/layout/main";
import theme from "./theme";
import {ThemeProvider} from "@mui/material";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from "./hooks/useAuth";
import {ToastContainer} from 'react-toastify';


function App() {
    const user = JSON.parse(localStorage.getItem('bwf-user'))
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider user={user}>
                <div className="App">
                    <Router>
                        <Header/>
                        <div className={"general-content"}>
                            <Sidebar/>
                            <Main/>
                        </div>
                    </Router>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </AuthProvider>
        </ThemeProvider>
    )
        ;
}

export default App;
