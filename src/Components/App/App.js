import React               from 'react'
import NavBar              from '../NavBar'
import Container           from '../Container'
import { BrowserRouter }   from 'react-router-dom'
import './App.scss';

const App = () => (
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

export default App
 