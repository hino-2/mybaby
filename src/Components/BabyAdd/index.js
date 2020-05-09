import React, { useState } from 'react'
import Button              from '@material-ui/core/Button'
import { makeStyles }      from '@material-ui/core/styles'
import { Image, 
         Transformation }  from 'cloudinary-react'
import { formatDate }      from '../../utils'
import { bigButton }       from '../../utils/buttonStyles'
import './style.scss'

const addNewBabyButtonStyle = {
    ...bigButton,
    root: {
        ...bigButton.root,
        '&:hover': {
            ...bigButton['&.hover'],
            background: '#017301'
        },
        background: 'forestgreen',
        height: 44,
        width: '100%',
        border: 'none',
    },
    label: {
        ...bigButton.label,
        textTransform: 'none',
    },
}
const useStyles = makeStyles(addNewBabyButtonStyle)

const BabyAdd = () => {
    const classes = useStyles()
    const [nowJeSuis, setNowJeSuis] = useState('leButton')

    const toggleBabyGender = () => {
        const babyGenderElement = document.querySelector('#baby-gender')
        const babyAddElement    = document.querySelector('.baby-add')
        babyGenderElement.toggleAttribute("checked")
        babyGenderElement.checked ? babyAddElement.style.background = 'hotpink'
                                  : babyAddElement.style.background = 'dodgerblue'
    }

    if(nowJeSuis === 'leButton')
        return (
            <div style={{width: "100%", marginTop: "2px"}}>
                <Button classes={{
                        root: classes.root,
                        label: classes.label,
                    }} onClick={() => setNowJeSuis('leForm')}>
                        Добавить утенка
                </Button>
            </div>
        )

    return (
        <div className="baby-add">
            <div style={{display: "inline-block"}}>
                <Image cloudName="hino-2" publicId="v1/mybaby/duck.png">
                    <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                </Image>
            </div>
            <div className="name">
                <input type="text" />
            </div>
            <div>
                <input type="checkbox" id="baby-gender" style={{display: "none"}} defaultChecked="false" />
                <label htmlFor="baby-gender" onClick={toggleBabyGender}>
                    LALA
                </label>
            </div>
            <div>
                <input type="date" />
            </div>
            <div style={{cursor: "pointer"}} onClick={() => setNowJeSuis('leButton')}>
                <Image cloudName="hino-2" publicId="v1/mybaby/close.png">
                    <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                </Image>
            </div>
        </div>
    )
}

export default BabyAdd