import React  from 'react'
import BabyLI from '../BabyLI'
import uniqid from 'uniqid'
import './style.scss'

const BabiesList = ({ babies, isEditable = true, showAge = true }) => {
    const deleteBaby = (e) => {
        e.preventDefault()
        console.log('delete')
    }

    return (
        <div className="babies">
            {babies
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(item => 
                    <BabyLI baby={item} 
                            deleteBaby={isEditable ? deleteBaby : undefined} 
                            showAge={showAge}
                            key={uniqid()} />
                )
            }
        </div>
    )
}

export default BabiesList