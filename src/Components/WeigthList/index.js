import React  from 'react'
import WeigthLI from '../WeigthLI'
import uniqid from 'uniqid'
import './style.scss'

const WeigthList = ({ babyId = '', weigths = [], isEditable = true, deleteWeigth }) => (
    <div className="weigths">
        {weigths
            .sort((a, b) => !a.date.localeCompare(b.date))
            .map(item => 
                <WeigthLI weigth={item} babyId={babyId} isEditable={isEditable} key={uniqid()} deleteWeigth={deleteWeigth} />
            )
        }
    </div>
)

export default WeigthList