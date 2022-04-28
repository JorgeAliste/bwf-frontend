import React, {useState, useEffect} from 'react';

function GroupList() {

    const [groups, setGroups] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {

        const getData = async () => {
            await fetch('http://127.0.0.1:8000/bwfapi/groups/')
                .then(resp => resp.json())
                .then(resp => {
                    setGroups(resp);
                })
                .catch(() => setError(true))
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
                return <p key={group.id}>{group.name}</p>
            })}
        </div>
    );
}

export default GroupList;
