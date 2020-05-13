import React  from 'react'
import BabyLI from '../BabyLI'
import uniqid from 'uniqid'
import './style.scss'

const BabiesList = ({ babies = [], isEditable = true, showAge = true }) => (
    <div className="babies">
        {babies
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(item => 
                <BabyLI baby={item} 
                        isEditable={isEditable} 
                        showAge={showAge}
                        key={uniqid()} />
            )
        }
    </div>
)

export default BabiesList