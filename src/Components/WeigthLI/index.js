import React              from 'react'
import { Image, 
         Transformation } from 'cloudinary-react'
import './style.scss'

const WeigthLI = ({ weigth, isEditable = true }) => {
    console.log(weigth)
    return (
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
                <div className="weigth-delete">
                    { isEditable ?
                        <Image cloudName="hino-2" 
                            publicId="v1/mybaby/close.png" 
                            id={weigth.id}
                            onClick={() => console.log(weigth.id)}
                            title="Удалить">
                            <Transformation height="20" width="20" quality="auto:good" crop="fit" />
                        </Image>
                        : []
                    }
                </div>
        </div>
    )
}

export default WeigthLI