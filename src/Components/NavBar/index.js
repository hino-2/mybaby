import React, { useState, 
                useEffect } from 'react'
import { Link }             from 'react-router-dom'
import { useSelector }      from 'react-redux'
import Button               from '@material-ui/core/Button'
import { makeStyles }       from '@material-ui/core/styles'
import { isMobile }         from '../../utils'
import { smallButton }      from '../../utils/buttonStyles'
import BabiesList           from '../BabiesList'
import './style.scss'

const useStyles = makeStyles(smallButton)

const NavBar = () => {
    const [userGender, setUserGender] = useState('')
    const user = useSelector(state => state.user)

    const classes = useStyles()

    useEffect(() => {
        if(user) {
            setUserGender(user.gender === 'm' ? 'Папин кабинет' : 'Мамин кабинет')
            return
        }
        
        setUserGender('')
    }, [user])
    
    return(
        <div className="navbar">
            <div className="title">
                <Link to="/" style={{color: "#ff003d", fontSize: "26px"}}>
                    MyBaby.ru
                </Link>
            </div>
            <div className="account">
                <Link to={ user ? '/logout' : '/login' }>
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
                    <Link to='/LK' style={{color: user.gender === "m" ? "cornflowerblue" : "lightcoral"}}>
                        <div style={{display: "inline-block", padding: "2px"}}>
                            <img src="/img/user-solid.svg" alt="Личный кабинет" width="20px" height="20px"/>
                        </div>
                        <div className="user-gender">
                            { userGender }
                        </div>
                    </Link>
                    :
                    userGender
                }
            </div>
            { user ? 
                <BabiesList babies={user.babies} isEditable={false} showAge={false} />
                : []
            }
            <div className="functions">
                <Link to='/weightcalc'>
                    <div className="functions-li">
                        Вес
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default NavBar