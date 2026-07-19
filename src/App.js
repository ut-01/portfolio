import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Assets/styles/App.css';
import Terminal from './Components/Terminal';
import Home from './Components/views/Home';
import Projects from './Components/views/Projects';
import Blogs from './Components/views/Blogs';
import NavBar from './Components/NavBar';
import { PortfolioProvider } from './Context/PortfolioContext';
// import Modal from './Components/common/Modal';


export default class App extends Component {
	state={
		showTerminal: false
	}

	toggleTerminal = (e, sta) =>{
		const {showTerminal} = this.state;
		this.setState({showTerminal: sta || !showTerminal});
	}

	render(){

		const {showTerminal} = this.state;

		return (
			<PortfolioProvider>
				<BrowserRouter>
					<NavBar toggleTerminal={this.toggleTerminal} />
					{showTerminal &&
						<>
							<Terminal toggleTerminal={this.toggleTerminal} />
							<div className="close-terminal-btn m-halfr p-halfr fade-appear-01 b-1r pointer" onClick={this.toggleTerminal}>&times;</div>
						</>}
					<Routes>
						<Route path="/projects" element={<Projects />} />
						<Route path="/blogs" element={<Blogs />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</BrowserRouter>
			</PortfolioProvider>
		);
	}
}