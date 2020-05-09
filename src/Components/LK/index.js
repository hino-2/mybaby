import React, { useEffect, 
                useState }  from 'react'
import { useSelector }      from 'react-redux'
import { useHistory }       from 'react-router-dom'
import BabiesList           from '../BabiesList'
import BabyAdd              from '../BabyAdd'
import './style.scss'

const LK = () => {
    const user    = useSelector(state => state.user)
    const history = useHistory()

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
            <BabiesList babies={user.babies} />
            <div>
                &nbsp;
            </div>

            <div>
                &nbsp;
            </div>
            <BabyAdd />
            <div>
                &nbsp;
            </div>
        </div>
    )
}

export default LK