import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {getGroups} from "../services/group-services";

function GroupList() {

    const [groups, setGroups] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {

        const getData = async () => {
            await getGroups().then(resp => setGroups(resp)).catch(() => setError(true))
        }
        setLoading(true)
        getData().catch(error => console.log(error));
        setLoading(false)
    }, [])

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            {groups && groups.map(group => {
                return <Link key={group.id} to={`/details/${group.id}`}>
                    <p>{group.name}</p>
                </Link>
            })}
        </div>
    );
}

export default GroupList;
