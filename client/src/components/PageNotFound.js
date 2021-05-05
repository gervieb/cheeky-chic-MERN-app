
import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className="notfound-wrapper">
            <img src="https://i.imgur.com/qIufhof.png" alt="caution cone icon"/>
            <div className="info">
                <h1>Oops..</h1>
                <h1>Page Not Found!</h1>
                <Link to="/">GO TO HOME</Link>
            </div>
        </div >
    )
}

export default PageNotFound