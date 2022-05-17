import React from 'react';
import GroupList from "../group/group-list";
import {Routes, Route} from 'react-router-dom';
import GroupDetails from "../group/group-details";
import Register from "../user/register";
import Account from "../user/account";
import Event from "../events/event";

function Main() {

    return (
        <div className={"main"}>
            <Routes>
                <Route path='/' element={<GroupList/>}/>
                <Route path='/details/:id' element={<GroupDetails/>}/>
                <Route path='/event/:id' element={<Event/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/account' element={<Account/>}/>
            </Routes>

        </div>
    );
}

export default Main;
