import React              from 'react'
import { Link }           from 'react-router-dom'
import { Image, 
         Transformation } from 'cloudinary-react'
import { formatDate }     from '../../utils'
import BabyDelete         from '../BabyDelete'
// import BabyEdit           from '../BabyEdit'
import './style.scss'

const BabyLI = ({ baby, isEditable, showAge }) => {
    const calculateLifeSpan = (dateOfBirth) => {
        if(!dateOfBirth) return

        const today = new Date()
        const dob   = new Date(dateOfBirth)
        const yearsOld  = Math.floor((today - dob) / (1000*60*60*24*365))
        const monthsOld = Math.floor((today - dob) / (1000*60*60*24) / 31 % 12)
        const daysOld   = Math.floor((today - dob) / (1000*60*60*24) % 31)
        const yearWordMap = [
            'лет', 'год', 'года', 'года', 'года', 'лет'
        ]
        const daysWordMap = [
            '', 'день', 'дня', 'дня', 'дня', 'дней'
        ]

        let res =  yearsOld  > 0 ? `${yearsOld} ${yearWordMap[yearsOld] ? yearWordMap[yearsOld] : 'лет'}` : ''
            res += monthsOld > 0 ? ` ${monthsOld} мес` : ''
        if(!res) res = `${daysOld} ${daysWordMap[daysOld] ? daysWordMap[daysOld] : 'дней'}`

        return res
    }

    return (
        <Link to={`/babies/${baby.name}`}>
            <div className="baby-li" 
                 style={{gridTemplateColumns: showAge ? '1fr 2fr 2fr 2fr 1fr' : '1fr 2fr 1fr', 
                         backgroundColor: baby.gender === 'm' ? 'dodgerblue' : 'hotpink'}}>
                <div style={{display: "inline-block"}}>
                    <Image cloudName="hino-2" publicId="v1/mybaby/duck.png" title="Утенок">
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
                    isEditable ?
                        <div>
                            <BabyDelete baby={baby} />
                            &nbsp;
                            {/* <BabyEdit baby={baby} /> */}
                        </div>
                    : []
                }
            </div>
        </Link>
    )
}

export default BabyLI