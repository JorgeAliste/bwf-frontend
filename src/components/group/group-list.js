import React, {useState, useEffect} from 'react';
import {getGroups} from "../../services/group-services";
import GroupListItem from "./group-list-item";

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
                return <GroupListItem key={group.id} group={group}/>
            })}
        </div>
    );
}

export default GroupList;
