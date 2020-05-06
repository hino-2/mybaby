import React, { useState, 
                useEffect } from 'react'
import { Link }             from 'react-router-dom'
import { useSelector }      from 'react-redux'
import uniqid               from 'uniqid'
import Button               from '@material-ui/core/Button'
import { makeStyles }       from '@material-ui/core/styles'
import { Image, 
         Transformation }   from 'cloudinary-react'
import { isMobile }         from '../../utils'
import './style.scss'

const useStyles = makeStyles({
    root: {
        background: '#ff3a69',  
        borderRadius: 3,
        border: '1px solid white',
        color: 'white',
        height: 40,
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
    const [babyList, setBabyList] = useState([])
    const [userName, setUserName] = useState('Я Родитель')
    const user = useSelector(state => state.user)

    const classes = useStyles()

    useEffect(() => {
        if(user) {
            setUserName(user.gender === 'm' ? 'я Папа' : 'я Мама')
            setBabyList(user.babies.sort((a, b) => a.name.localeCompare(b.name)).map(item => 
                <Link to={`/babies/${item.name}`} key={uniqid()}>
                    <div className="baby-li" style={{backgroundColor: item.gender === 'm' ? 'dodgerblue' : 'hotpink'}}>
                        <div style={{display: "inline-block"}}>
                            <Image cloudName="hino-2" publicId="v1/mybaby/duck.png">
                                <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                            </Image>
                        </div>
                        <div style={{display: "inline-block", verticalAlign: "top"}}>
                            {item.name}
                        </div>
                    </div>
                </Link>
            ))
            return;
        }
        
        setUserName('Я Родитель')
        setBabyList(<></>)
    }, [user])

    return(
        <div className="navbar">
            <div className="title">
                <Link to="/">
                    <font color="white" style={{fontSize: "18px"}}>
                        MyBaby.ru
                    </font>
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
                    <Link to='/LK' style={{color: "#0000f0"}}>
                        <div style={{display: "inline-block", padding: "2px"}}>
                            <img src="/img/user-solid.svg" alt="Личный кабинет" width="20px" height="20px"/>
                        </div>
                        <div style={{display: "table-cell", verticalAlign: "middle", padding: "2px"}}>
                            { userName }
                        </div>
                    </Link>
                    :
                    userName
                }
            </div>
            <div id="babies" style={{width: '100%'}}>
                { babyList }
            </div>
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