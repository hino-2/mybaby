import   React            from 'react'
import { Image, 
         Transformation } from 'cloudinary-react'
import './style.scss'

const WeigthDelete = ({ babyId, weigth = {}, deleteWeigth }) => (
    <div className="weigth-delete">
        <Image cloudName="hino-2" 
            publicId="v1/mybaby/close.png" 
            id={weigth.id}
            onClick={deleteWeigth}
            title="Удалить">
            <Transformation height="20" width="20" quality="auto:good" crop="fit" />
        </Image>
    </div>
)

export default WeigthDelete