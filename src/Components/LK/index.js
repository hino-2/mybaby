import React, { useEffect, 
                useState }  from 'react'
import { useSelector }      from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { Image, 
         Transformation }   from 'cloudinary-react'
import Button               from '@material-ui/core/Button'
import { makeStyles }       from '@material-ui/core/styles'
import uniqid               from 'uniqid'
import { formatDate }       from '../../utils'
import { bigButton}         from '../../utils/buttonStyles'
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
    },
    label: {
        ...bigButton.label,
        textTransform: 'none',
    },
}
const useStyles = makeStyles(addNewBabyButtonStyle)

const LK = () => {
    const user    = useSelector(state => state.user)
    const history = useHistory()
    const classes = useStyles()

    const calculateLifeSpan = (dateOfBirth) => {
        const today = new Date()
        const dob   = new Date(dateOfBirth)
        const yearsOld  = Math.floor((today - dob) / (1000*60*60*24*365))
        const monthsOld = Math.floor((today - dob) / (1000*60*60*24) / 31)
        return `${yearsOld} лет ${monthsOld} мес`
    }

    const deleteBaby = (e) => {
        e.preventDefault()
        console.log('delete')
    }
    
    const generateBabiesListJSX = () => {
        return user.babies.sort((a, b) => a.name.localeCompare(b.name)).map(item => 
            <Link to={`/babies/${item.name}`} key={uniqid()}>
                <div className="baby-li" style={{backgroundColor: item.gender === 'm' ? 'dodgerblue' : 'hotpink'}}>
                    <div style={{display: "inline-block"}}>
                        <Image cloudName="hino-2" publicId="v1/mybaby/duck.png">
                            <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                        </Image>
                    </div>
                    <div className="name">
                        {item.name}
                    </div>
                    <div>
                        {calculateLifeSpan(item.dob)}
                    </div>
                    <div>
                        {formatDate(item.dob)}
                    </div>
                    <div onClick={deleteBaby}>
                        <Image cloudName="hino-2" publicId="v1/mybaby/close.png">
                            <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                        </Image>
                    </div>
                </div>
            </Link>
        )
    }

    const [babies, setBabies] = useState(user ? generateBabiesListJSX() : <></>)

    useEffect(() => {
        if(!user) history.push('/login')
    }, [user])

    if(!user) return null

    return (
        <div className="lk">
            <div>
                &nbsp;
            </div>
            <div className="item-label">
                Меня зовут
            </div>
            <div>
                &nbsp;
            </div>
            <div>
                &nbsp;
            </div>
            <div className="form__group field">
                <input type="input" 
                       className="form__field" 
                       placeholder="Имя" 
                       id="name" 
                       autoComplete="false" 
                       defaultValue={user.name} 
                       style={{color: user.gender === 'm' ? 'cornflowerblue' : 'lightcoral'}}
                       required />
            </div>
            <div>
                &nbsp;
            </div>
            <div>
                &nbsp;
            </div>
            <div className="item-label">
                Моя почта
            </div>
            <div>
                &nbsp;
            </div>
            <div>
                &nbsp;
            </div>
            <div className="form__group field">
                <input type="input" 
                       className="form__field" 
                       placeholder="E-mail" 
                       id="email" 
                       autoComplete="false" 
                       defaultValue={user.email} 
                       style={{color: user.gender === 'm' ? 'cornflowerblue' : 'lightcoral'}}
                       required />
            </div>
            <div>
                &nbsp;
            </div>
            <div>
                &nbsp;
            </div>
            <div className="item-label">
                Мои утята
            </div>
            <div>
                &nbsp;
            </div>
            <div>
                &nbsp;
            </div>
            <div className="babies">
                { babies }
            </div>
            <div>
                &nbsp;
            </div>
            <div>
                &nbsp;
            </div>
            <div style={{marginTop: "10px"}}>
                <Button classes={{
                        root: classes.root,
                        label: classes.label,
                    }}>
                        Добавить утенка
                </Button>
            </div>
            <div>
                &nbsp;
            </div>
        </div>
    )
}

export default LK