import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";

function GroupDetails() {

    const {id} = useParams();

    return (
        <div>
            <h1>Details for group {id}!</h1>
        </div>
    );
}

export default GroupDetails;
