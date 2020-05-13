import React, { useState } from 'react'
import Button              from '@material-ui/core/Button'
import { makeStyles }      from '@material-ui/core/styles'
import { Image, 
         Transformation }  from 'cloudinary-react'
import { setUserCookie }   from '../../utils'
import { bigButton }       from '../../utils/buttonStyles'
import { userLogin }       from '../../actions'
import { useDispatch }     from 'react-redux'
import uniqid              from 'uniqid'
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
        height: 40,
        width: '100%',
        border: 'none',
    },
    label: {
        ...bigButton.label,
        textTransform: 'none',
    },
}
const useStyles = makeStyles(addNewBabyButtonStyle)

const BabyAdd = ({ userId }) => {
    const classes  = useStyles()
    const today    = new Date().toLocaleDateString('en-CA')
    const dispatch = useDispatch()

    const [nowJeSuis, setNowJeSuis] = useState('leButton')
    const [gender, setGender]       = useState('m')

    const toggleBabyGender = () => {
        const babyGenderCheckbox = document.querySelector('#baby-gender')
        const babyAddDiv         = document.querySelector('.baby-add')
        if(babyGenderCheckbox.checked) {
            babyAddDiv.style.background = 'hotpink'
            setGender('f')
        } else {
            babyAddDiv.style.background = 'dodgerblue'
            setGender('m')
        }
    }

    const submitNewBaby = async () => {
        const newBaby = {
            id: uniqid(),
            name: document.querySelector('#baby-name').value,
            gender: document.querySelector('#baby-gender').checked ? 'f' : 'm',
            dob: document.querySelector('#baby-dob').value
        }

        const response = await fetch('/newBaby', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: userId, newBaby: newBaby})
        })

        if(response.status !== 200) {
            console.log(response.error)
            return
        }

        const newUser = await response.json()

        setUserCookie('mybaby-user', newUser)
        dispatch(userLogin(newUser))

        setNowJeSuis('leButton')
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
                <Image cloudName="hino-2" publicId="v1/mybaby/duck.png" title="Утенок">
                    <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                </Image>
            </div>
            <div className="name">
                <input type="text" id="baby-name" placeholder="Имя утенка" />
            </div>
            <div>
                <input type="checkbox" 
                       id="baby-gender" 
                       onChange={toggleBabyGender} 
                       style={{display: "none"}} 
                       checked={gender !== 'm'}/>
                <label htmlFor="baby-gender" style={{cursor: "pointer", textDecoration: "underline"}}>
                    {gender === 'm' ? "мальчик" : "девочка"}
                </label>
            </div>
            <div className="date">
                <input type="date" id="baby-dob" defaultValue={today} />
            </div>
            <div style={{cursor: "pointer"}}>
                <Image cloudName="hino-2" 
                       publicId="v1/mybaby/close.png" 
                       onClick={() => setNowJeSuis('leButton')} 
                       title="Отмена">
                    <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                </Image>
                &nbsp;
                <Image cloudName="hino-2" 
                       publicId="v1/mybaby/submit3.png" 
                       onClick={submitNewBaby}
                       title="Добавить">
                    <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                </Image>
            </div>
        </div>
    )
}

export default BabyAdd