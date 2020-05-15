import React             from 'react'
import { useDispatch }   from 'react-redux'
import NavBar            from '../NavBar'
import Container         from '../Container'
import Cookies           from 'universal-cookie'
import { BrowserRouter } from 'react-router-dom'
import { userLogin }     from '../../actions'
import './App.scss'

const App = () => {
	const cookie   = new Cookies()
	const user     = cookie.get('mybaby-user')
	const dispatch = useDispatch()
	
	console.log(user)

	if (user) dispatch(userLogin(user))

	return (
		<BrowserRouter>
			<div className="app">
				<div className="left-panel">
					<NavBar />
				</div>
				<div className="right-panel">
					<Container />
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
 