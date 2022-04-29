import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {getGroup} from "../services/group-services";

function GroupDetails() {

    const {id} = useParams();

    const [group, setGroup] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {

        const getData = async () => {
            await getGroup(id).then(resp => setGroup(resp)).catch(() => setError(true))
        }
        setLoading(true)
        getData().catch(error => console.log(error));
        setLoading(false)
    }, [])

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            < Link to={'/'}>Main Page</Link>
            <h1>Details for group {id}!</h1>
        </div>
    );
}

export default GroupDetails;
