import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {

	const [devs, setDevs] = useState([])

	const notifyError = (data) => {
		toast.error(`${data}`, {
			position: toast.POSITION.TOP_CENTER
		});
	}

	const notifySucess = (data) => {
		toast.success(`${data}`, {
			position: toast.POSITION.TOP_CENTER
		});
	}

	useEffect(() => {
		async function loadDevs() {
			const response = await api.get('/devs')

			setDevs(response.data)
		}

		loadDevs()
	}, [])

	async function handleAddDev(data) {

		const response = await api.post('/devs', data)

		if (response.data.error) {
			notifyError(response.data.error)
		} else {
			setDevs([...devs, response.data])
		}

	}

	async function deleteDev(_id) {
		const response = await api.delete(`/devs/${_id}`)

		notifySucess(response.data.message)

		const newDevs = devs.filter((dev) => dev._id !== _id)

		setDevs(newDevs)
	}

	async function updateDev(_id){
		console.log('teste')
	}

	return (
		<div id="app">
			<aside>
				<strong>Cadastrar</strong>
				<DevForm onSubmit={handleAddDev} />
			</aside>
			<main>
				<ul>
					{devs.map((dev) => (
						<DevItem key={dev._id} dev={dev} deleteDev={deleteDev} updateDev={updateDev} />
					))}
				</ul>
				<ToastContainer />
			</main>
		</div>
	);
}

export default App;
