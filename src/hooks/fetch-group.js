import {useState, useEffect} from "react";
import {getGroup} from "../services/group-services";

export function useFetchGroup(groupId) {
    const [group, setGroup] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            await getGroup(groupId).then(resp => setGroup(resp)).catch(() => setError(true))
        }
        setLoading(true)
        getData().catch(error => console.log(error));
        setLoading(false)
    }, [groupId])

    return [group, loading, error]
}