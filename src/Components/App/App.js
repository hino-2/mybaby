import React, { useEffect }             from 'react'
import { useDispatch }   from 'react-redux'
import NavBar            from '../NavBar'
import Container         from '../Container'
import Cookies           from 'universal-cookie'
import { BrowserRouter } from 'react-router-dom'
import { userLogin }     from '../../actions'
import './App.scss';

const App = () => {
	const cookie = new Cookies()
	const user = cookie.get('mybaby-user')
	console.log(user)
	const dispatch = useDispatch()

	useEffect(() => {
		if (user) dispatch(userLogin(user))
	}, [user])

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
 