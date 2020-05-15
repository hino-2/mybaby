import React, { useState, useEffect } from 'react'
import { useSelector }     from 'react-redux'
import BabiesList          from '../BabiesList'
import './style.scss'

const WeigthCalc = () => {
    const user = useSelector(state => state.user)
    const babies = user ? user.babies : [
        {
            name: 'Мальчик',
            gender: 'm',
            id: 'genericBoy'
        },
        {
            name: 'Девочка',
            gender: 'f',
            id: 'genericGirl'
        },
    ]
    const [calcParams, setCalcParams] = useState({})

    const loadParams = (e) => { 
        const selectedBaby = babies.find(baby => baby.id === e.target.id)
        setCalcParams({
            id: selectedBaby.id,
            weigths: selectedBaby.weigths
        })
        
        document.querySelectorAll('.weigth-calc .babies .baby-li').forEach(item => 
            item.style.border = ''    
        )
        document.querySelector(`.weigth-calc .babies .baby-li#${selectedBaby.id}`).style.border = '3px solid green'


        console.log(selectedBaby)
    }

    useEffect(() => {
        if (calcParams.id)
            document.querySelector(`.weigth-calc .babies .baby-li#${calcParams.id}`).style.border = '3px solid green'
    })

    return (
        <div className="weigth-calc">
            <div className="desc">
                <h2>Калькулятор веса</h2>
                <p>
                    Я калькулятор веса ваших утят.<br />Я помогу вам рассчитать прибавки в весе и покажу сколько весит обычный утенок в этом возрасте.
                </p>
                <h3>Как я работаю:</h3>
                <p>
                    Сначала, мне нужно узнать какого пола ваш утенок и когда он появился на свет.<br />
                    Затем, мне нужны даты и веса, по которым можно рассчитать прибавки.<br />
                    Не все родители успевают записывать веса своих утят точно по месяцам. Ничего страшного, бывает. Укажите дату и сколько весил ваш утенок в этот день, и я постараюсь рассчитать остальное за вас. <font>Начните с даты рождения!</font>
                </p>
            </div>
            <div onClick={loadParams}>
                <BabiesList babies={babies} isEditable={false} showAge={user !== null} />
            </div>
            <div className="weigths">
                <div className="row">
                    <div className="label">
                        Дата
                    </div>
                    <div className="label">
                        Вес, г
                    </div>
                    <div className="label">
                        Норма, г
                    </div>
                </div>
                <div className="row">
                    <div className="date">
                        <input type="date" id="weigth-calc-dob" />
                    </div>
                    <div className="weigth">
                        <input type="text" />
                    </div>
                    <div className="normal">
                        <font>
                            &nbsp;
                        </font>
                    </div>
                </div>
                <div className="row">
                    <div className="date">
                    </div>
                    <div className="weigth">
                    </div>
                    <div className="normal">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeigthCalc