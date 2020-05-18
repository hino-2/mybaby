import React  from 'react'
import WeigthLI from '../WeigthLI'
import uniqid from 'uniqid'
import './style.scss'

const WeigthList = ({ weigths = [], isEditable = true }) => (
    <div className="weigths">
        {weigths
            .sort((a, b) => !a.date.localeCompare(b.date))
            .map(item => 
                <WeigthLI weigth={item} isEditable={isEditable} key={uniqid()} />
            )
        }
    </div>
)

export default WeigthList