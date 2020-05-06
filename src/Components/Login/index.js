import React, { useState }  from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch }      from 'react-redux'
import Cookies              from 'universal-cookie'
import Button               from '@material-ui/core/Button'
import { makeStyles }       from '@material-ui/core/styles'
import { userLogin }        from '../../actions'
import './style.scss'

const useStyles = makeStyles({
    root: {
        background: '#df641a', 
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 62,
        width: 300,
        lineHeight: 'normal',
        padding: '0 20px',
        minWidth: '100px',
        "&:hover": {
            backgroundColor: "#cc9a00",
        }
    },
    label: {
      textTransform: 'capitalize',
    },
})

const Login = () => {
    const dispatch = useDispatch()
    const history  = useHistory()
    const classes  = useStyles()

    const [message, setMessage] = useState('')

    const logIn = async () => {
        const email = document.querySelector('#email').value
        const pass  = document.querySelector('#password').value

        if(!email || !pass) return
        
        // const response = await fetch('/login', {
        //     method: 'POST',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({"email": email, "password": pass})
        // })
        // if(response.status !== 200) {
        //     setMessage(<>
        //         <div className="message">
        //             Не удалось авторизоваться<br />
        //             Жаловаться сюда:&nbsp
        //                 <a href='mailto:info-corona@mail.ru'>почта для жалований</a>
        //         </div>                
        //     </>)
        //     return
        // }
        // const user = await response.json()

        // if(user.userID) {
            const user = {
                id: 1,
                userName: 'Игорь Ушаков',
                gender: 'm',
                babies: [
                    {
                        id: 'b1',
                        name: 'Даша',
                        gender: 'f'
                    },
                    {
                        id: 'b2',
                        name: 'Ваня',
                        gender: 'm'
                    }
                ]
            }
            const cookie = new Cookies()
            cookie.set('mybaby-user', user, {path: "/", maxAge: 3600})
            dispatch(userLogin(user))
            // context.setUser(user)
            history.push("/")
        // } else {
        //     setMessage(
        //         <div className="message">
        //             Неправильный e-mail или пароль
        //         </div>
        //     )
        // }
    }

    return (
        <div className="login">
            <div>
                &nbsp;
            </div>
            <div className="form__group field">
                <input type="input" className="form__field" placeholder="E-mail" id="email" autoComplete="false" required />
                <label htmlFor="email" className="form__label">E-mail</label>
            </div>
            <div className="form__group field">
                <input type="password" className="form__field" placeholder="Пароль" id="password" required />
                <label htmlFor="password" className="form__label">Пароль</label>
            </div>
            <div>
                &nbsp;
            </div>
            <div>
                <Button classes={{
                    root: classes.root,
                    label: classes.label,
                }} onClick={() => logIn()}>
                    Войти
                </Button>
            </div>
            <div>
                &nbsp;
            </div>
            <div>
                <Link to='/register' style={{textDecoration: "none"}}>
                    <Button classes={{
                        root: classes.root,
                        label: classes.label,
                    }} onClick={() => logIn()}>
                        Регистрация
                    </Button>
                </Link>
            </div>
            <div style={{marginTop: "30px"}}>
                {message}
            </div>
        </div>
    )
}

export default Login