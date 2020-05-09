import React              from 'react'
import { Link }           from 'react-router-dom'
import { Image, 
         Transformation } from 'cloudinary-react'
import { formatDate }     from '../../utils'
import './style.scss'

const BabyLI = ({ baby, deleteBaby, showAge }) => {
    const calculateLifeSpan = (dateOfBirth) => {
        const today = new Date()
        const dob   = new Date(dateOfBirth)
        const yearsOld  = Math.floor((today - dob) / (1000*60*60*24*365))
        const monthsOld = Math.floor((today - dob) / (1000*60*60*24) / 31 % 12)
        const yearWordMap = [
            'лет', 'год', 'года', 'года', 'года', 'лет'
        ]
        if(yearsOld > 0)
            return `${yearsOld} ${yearWordMap[yearsOld] ? yearWordMap[yearsOld] : 'лет'} ${monthsOld} мес`
        else 
            return `${monthsOld} мес`
    }

    return (
        <Link to={`/babies/${baby.name}`}>
            <div className="baby-li" 
                 style={{gridTemplateColumns: showAge ? '1fr 2fr 2fr 2fr 1fr' : '1fr 2fr 1fr', 
                         backgroundColor: baby.gender === 'm' ? 'dodgerblue' : 'hotpink'}}>
                <div style={{display: "inline-block"}}>
                    <Image cloudName="hino-2" publicId="v1/mybaby/duck.png">
                        <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                    </Image>
                </div>
                <div className="name">
                    {baby.name}
                </div>
                {
                    showAge ?
                        <>
                            <div>
                                {calculateLifeSpan(baby.dob)}
                            </div>
                            <div>
                                {formatDate(baby.dob)}
                            </div>
                        </>
                    : []
                }
                {
                    deleteBaby ?
                        <div onClick={deleteBaby}>
                            <Image cloudName="hino-2" publicId="v1/mybaby/close.png">
                                <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                            </Image>
                        </div>
                    : []
                }
            </div>
        </Link>
    )
}

export default BabyLI