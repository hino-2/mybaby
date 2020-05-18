import React, { useState, 
                useEffect } from 'react'
import { useSelector }      from 'react-redux'
import Button               from '@material-ui/core/Button'
import { makeStyles }       from '@material-ui/core/styles'
import { Image, 
         Transformation }   from 'cloudinary-react'
import BabiesList           from '../BabiesList'
import WeigthList           from '../WeigthList'
import { bigButton }        from '../../utils/buttonStyles'
import uniqid               from 'uniqid'
// import WeigthLI from '../WeigthLI'
import './style.scss'

const addWeigthEntryButtonStyle = {
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
const calculateButtonStyle = {
    ...bigButton,
    root: {
        ...bigButton.root,
        '&:hover': {
            ...bigButton['&.hover'],
            background: '#9e8360'
        },
        background: 'burlywood',
        height: 40,
        width: '100%',
        border: 'none',
    },
    label: {
        ...bigButton.label,
        textTransform: 'none',
    },
}
const useStylesAddButton  = makeStyles(addWeigthEntryButtonStyle)
const useStylesCalcButton = makeStyles(calculateButtonStyle)

const WeigthCalc = () => {
    const user     = useSelector(state => state.user)
    const classesAddButton  = useStylesAddButton()
    const classesCalcButton = useStylesCalcButton()
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
    const [calcParams, setCalcParams] = useState({ id: '', weigths: [] })

    const addWeigthEntry = () => {
        setCalcParams(prev => {
            return {
                ...prev,
                weigths: [
                    ...prev.weigths,
                    {
                        date: '',
                        weigth: '',
                        id: uniqid()
                    }
                ]
            }
        })
    }

    const loadParams = (e) => { 
        const selectedBaby = babies.find(baby => baby.id === e.target.id)
        setCalcParams({
            id: selectedBaby.id,
            weigths: selectedBaby.weigths || []
        })
        
        document.querySelectorAll('.weigth-calc .babies .baby-li').forEach(item => item.style.border = '')
        document.querySelector(`.weigth-calc .babies .baby-li#${selectedBaby.id}`).style.border = '3px solid green'


        console.log(selectedBaby)
    }

    const calculateAndSave = () => {
        let result = [
            ...calcParams.weigths,
            {
                date: '2020-01-01',
                weigth: 4000
            },
            {
                date: '2020-02-01',
                weigth: 4500
            },
            {
                date: '2020-03-01',
                weigth: 5000
            },
            {
                date: '2020-04-01',
                weigth: 5500
            },
        ]


    }

    useEffect(() => {
        let selectedBabyLI
        if (calcParams.id) {
            selectedBabyLI = document.querySelector(`.weigth-calc .babies .baby-li#${calcParams.id}`)
        if (selectedBabyLI)
            selectedBabyLI.style.border = '3px solid green'
        }
    })

    return (
        <div className="weigth-calc">
            <div className="desc">
                <h2>Калькулятор веса</h2>
                <p>
                    Я калькулятор веса ваших утят. Я помогу вам рассчитать прибавки в весе и покажу сколько весит обычный утенок в этом возрасте.
                </p>
                <h3>Как я работаю:</h3>
                <p>
                    Сначала, мне нужно узнать какого пола ваш утенок и когда он появился на свет.<br />
                    Затем, мне нужны даты и веса, по которым можно рассчитать прибавки.<br />
                    Не все родители успевают записывать веса своих утят точно по месяцам. Ничего страшного. Укажите любую дату и сколько весил ваш утенок в этот день, и я постараюсь рассчитать остальное за вас. <font>Начните с даты рождения!</font>
                </p>
                {
                    user ?
                        <p>
                            При рассчете введенные значение сохраняются. Чтобы их не нужно было вводить каждый раз заново, <font>выберите утенка из списка.</font>
                        </p> : []
                }
            </div>
            <div onClick={loadParams}>
                <BabiesList babies={babies} isEditable={false} showAge={user !== null} />
            </div>
            <div className="calc">
                <div className="headers">
                    <div className="label">
                        Дата
                    </div>
                    <div className="label">
                        Вес, г
                    </div>
                    <div className="label">
                        Норма, г
                    </div>
                    <div>
                        &nbsp;
                    </div>
                </div>
                <WeigthList weigths={calcParams.weigths} />
            </div>
            <div className="buttons">
                <div>
                    <Button classes={{
                            root: classesAddButton.root,
                            label: classesAddButton.label,
                        }} onClick={addWeigthEntry}>
                            Добавить дату и вес
                    </Button>
                </div>
                <div>
                    <Button classes={{
                            root: classesCalcButton.root,
                            label: classesCalcButton.label,
                        }} onClick={calculateAndSave}>
                            Рассчитать и сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WeigthCalc