import React from 'react'
import './style.scss'

const Baby = ({ match }) => {


    return (
        <div>
            { match.params.name }
        </div>
    )
}

export default Baby