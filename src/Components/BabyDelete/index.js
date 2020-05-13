import   React            from 'react'
import { useSelector }    from 'react-redux'
import { Image, 
         Transformation } from 'cloudinary-react'
import { useDispatch }    from 'react-redux'
import { setUserCookie }  from '../../utils'
import { userLogin }      from '../../actions'

const BabyDelete = ({ baby }) => {
    const userId   = useSelector(state => state.user._id)
    const dispatch = useDispatch()

    const deleteBaby = async (e) => {
        e.preventDefault()
        
        const response = await fetch('/deleteBaby', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId, baby: baby})
        })

        if(response.status !== 200) {
            console.log(response.error)
            return
        }

        const newUser = await response.json()
        console.log(newUser)

        setUserCookie('mybaby-user', newUser) 
        dispatch(userLogin(newUser))
    }

    return (
        <Image cloudName="hino-2" 
            publicId="v1/mybaby/close.png" 
            id={baby.id}
            onClick={deleteBaby}
            title="Удалить">
            <Transformation height="20" width="20" quality="auto:good" crop="fit" />
        </Image>
    )
}

export default BabyDelete