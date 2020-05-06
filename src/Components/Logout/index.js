import { useEffect }   from 'react'
import { useDispatch } from 'react-redux'
import { useHistory }  from 'react-router-dom'
import Cookies         from 'universal-cookie'
import { userLogin }   from '../../actions'

const Logout = () => {
    const dispatch = useDispatch()
    const history  = useHistory()

    useEffect(() => {
        const doLogout = async () => {
            // const response = await fetch('/logoutUser?_method=DELETE', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({"userID": context.user.userID})
            // })
            // if(response.status !== 200) {
            //     history.push("/")
            //     return
            // }
            
            // const result = await response.json()

            const result = { result: 'success'}
            if(result.result === 'success') {
                dispatch(userLogin(null))
                const cookie = new Cookies()
                cookie.remove('mybaby-user')
                history.push("/")
            }
        }
        doLogout()
    }, [])
    
    return null
}

export default Logout