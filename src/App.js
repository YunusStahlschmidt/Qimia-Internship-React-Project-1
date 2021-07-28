
import React from 'react'
import TaskList from './routes/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

const options = {
	position: positions.MIDDLE
};


export default function App() {
	return (
		<Provider template={AlertMUITemplate} {...options}>
			<TaskList/>	
		</Provider>
	)
}


