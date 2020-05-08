import React, { useState,
                useEffect } from 'react'
import { useHistory }       from 'react-router-dom'
import { useSelector }      from 'react-redux'
import Button               from '@material-ui/core/Button'
import { makeStyles }       from '@material-ui/core/styles'
import { Image, 
         Transformation }   from 'cloudinary-react'
import { bigButton }     from '../../utils/buttonStyles'         
import './style.scss'

const useStyles = makeStyles(bigButton)

const Register = () => {
    const history = useHistory()
    const classes = useStyles()
    const user    = useSelector(state => state.user)

    const [message, setMessage] = useState('')
    const [gender, setGender]   = useState('m')

    const handleSuccessfulRegistration = () => {
        document.querySelector('#name').value     = ''
        document.querySelector('#email').value    = ''
        document.querySelector('#password').value = ''
        setMessage(
            <div className="message">
                Ура! Вы зарегистрированы!<br />
                Когда вы дочитаете эту фразу, появится страница входа
            </div>
        )
        setTimeout(() => {
            if(history.location.pathname !== '/login')
                history.push('/login')
        }, 4000)
    }

    const registerNewUser = async () => {
        const name   = document.querySelector('#name').value
        const email  = document.querySelector('#email').value
        const pass   = document.querySelector('#password').value

        if(!email || !pass || !name) return;
        
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name, 
                "email": email, 
                "password": pass,
                "gender": gender
            })
        })
        if(response.status !== 200) {
            setMessage(
                <div className="message">
                    Не удалось зарегистрироваться<br />
                    Жаловаться сюда:&nbsp;
                        <a href='mailto:info-corona@mail.ru'>почта для жалований</a>
                </div>
            )
            return
        }

        const result = await response.json()

        switch (result.result) {
            case 'success':
                handleSuccessfulRegistration()
                break
            case 'existing email':
                setMessage(
                    <div className="message">
                        Пользователь с такой электронной почтой уже зарегистрирован
                    </div>
                )
                break
            default:
                setMessage(
                    <div className="message">
                        Случилось нечто очень странное<br />
                        Жаловаться сюда:&nbsp;
                            <a href='mailto:info-corona@mail.ru'>почта для жалований</a>
                    </div>
                )
                break
        }
    }

    const handleGenderPick = (e) => {
        const papa = document.querySelector('#gender-select-li-papa')
        const mama = document.querySelector('#gender-select-li-mama')
        const text = document.querySelector('.gender-text')

        if(e.target.id === 'papa-img') {
            setGender('m')
            papa.style.backgroundColor = '#80808070'
            mama.style.backgroundColor = '#80808000'
            text.style.color           = 'cornflowerblue'
            text.style.border          = '2px solid cornflowerblue'
        } else {
            setGender('f')
            papa.style.backgroundColor = '#80808000'
            mama.style.backgroundColor = '#80808070'
            text.style.color           = 'lightcoral'
            text.style.border          = '2px solid lightcoral'
        }
    }

    useEffect(() => {
        if(user) history.push('/')
    }, [user])
    
    if(user) return null

    return (
        <div className="register">
            <div>
                &nbsp;
            </div>
            <div className="gender-select">
                <div className="gender-select-li" 
                     id="gender-select-li-papa" 
                     style={{backgroundColor: "#80808070", borderRadius: "10px"}}>
                    <input type="checkbox" id="papa" style={{display: "none"}} defaultChecked="true" />
                    <label htmlFor="papa">
                        <Image cloudName="hino-2" publicId="v1/mybaby/duck-papa.svg" onClick={handleGenderPick} id="papa-img">
                                <Transformation height="260" width="200" quality="auto:good" crop="fit" />
                        </Image>
                    </label>
                </div>
                <div className="gender-select-li"
                     id="gender-select-li-mama" >
                    <input type="checkbox" id="mama" style={{display: "none"}} defaultChecked="false" />
                    <label htmlFor="mama">
                        <Image cloudName="hino-2" publicId="v1/mybaby/duck-mama.svg" onClick={handleGenderPick} id="mama-img">
                                <Transformation height="260" width="200" quality="auto:good" crop="fit" />
                        </Image>
                    </label>
                </div>
            </div>
            <div className="gender-text">
                { gender === 'm' ? 'Я папа' : 'Я мама' }
            </div>
            <div className="form__group field">
                <input type="input" className="form__field" placeholder="Имя" id="name" autoComplete="false" required />
                <label htmlFor="name" className="form__label">Имя</label>
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
                }} onClick={() => registerNewUser()}>
                    Зарегистрироваться
                </Button>
            </div>
            <div>
                {message}
            </div>
        </div>
    );
}

export default Register;