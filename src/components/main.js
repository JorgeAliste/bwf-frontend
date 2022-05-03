import React from 'react';
import GroupList from "./group-list";
import {Routes, Route} from 'react-router-dom';
import GroupDetails from "./group-details";
import Register from "./register";

function Main() {

    return (
        <div className={"main"}>
            <Routes>
                <Route path='/' element={<GroupList/>}/>
                <Route path='/details/:id' element={<GroupDetails/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>

        </div>
    );
}

export default Main;
