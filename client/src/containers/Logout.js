import { useEffect } from 'react'

export default function Logout(props) {
    let history = props.history

    useEffect(() => {
        localStorage.clear();
        props.setIsLoggedIn(false);
        props.setCart([])
        history.push({pathname:'/'});
    }, [history, props])

    return null
}

