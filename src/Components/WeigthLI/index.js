import React        from 'react'
import WeigthDelete from '../WeigthDelete'
import './style.scss'

const WeigthLI = ({ babyId, weigth, isEditable = true, deleteWeigth }) => (
    <div className="weigth-li">
            <div className="date">
                <input type="date" defaultValue={weigth.date} />
            </div>
            <div className="weigth">
                <input type="text" defaultValue={weigth.weigth} />
            </div>
            <div className="normal">
                <font>
                    &nbsp;
                </font>
            </div>
            { isEditable ?
                <WeigthDelete babyId={babyId} weigth={weigth} deleteWeigth={deleteWeigth} />
                : []
            }
    </div>
)

export default WeigthLI