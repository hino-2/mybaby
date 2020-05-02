import React, { useState, 
                useEffect } from 'react'
import { Link }             from 'react-router-dom'
import { useSelector }      from 'react-redux'
import Button               from '@material-ui/core/Button'
import { makeStyles }       from '@material-ui/core/styles'
import { Image, 
         Transformation }   from 'cloudinary-react'
import Login                from '../Login'
import { isMobile }         from '../../utils'
import './style.scss'

const useStyles = makeStyles({
    root: {
        background: '#ff3a69',  
        borderRadius: 3,
        border: '1px solid white',
        color: 'white',
        height: 28,
        lineHeight: 'normal',
        padding: '0 20px',
        width: 'calc(100% - 10px)',
        "&:hover": {
          backgroundColor: "#ff003d",
        }
    },
    label: {
      textTransform: 'capitalize',
    },
})

const NavBar = () => {
    const title    = <font color="white" style={{fontSize: "18px"}}>Мой ребёнок</font>
    const [babyList, setBabyList] = useState([])
    const [userName, setUserName] = useState('Я Родитель')
    const user   = useSelector(state => state.user)

    const classes = useStyles()

    useEffect(() => {
        if(user) {
            setUserName(user.userName)
            setBabyList(user.babies)
            return;
        }
        
        setUserName('Я Родитель')
    }, [user])

    return(
        <div className="navbar">
            <div className="title">
                <Link to="/" style={{"textDecoration": "none"}}>
                    {title}
                </Link>
            </div>
            <div className="account">
                <Link to={ user ? '/logout' : '/login' } 
                      style={{"textDecoration": "none"}}>
                    <Button classes={{
                        root: classes.root,
                        label: classes.label,
                    }}>
                        { user ? 'Выйти' : 'Войти' }
                    </Button>
                </Link>
            </div>
            <div className="greetings">
                { user ?
                    <Link to='/LK' style={{color: "#fedd56"}}>
                        {userName}
                    </Link>
                    :
                    `${userName}`
                }
            </div>
            <div>
                {/* { babyName } */}
            </div>            
        </div>
    )
}

export default NavBar