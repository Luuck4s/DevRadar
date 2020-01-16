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
import DevModal from './components/DevModal'

function App() {

	const [devs, setDevs] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
	const [idDevUpdate, setIdDevUpdate] = useState('')

	const notifyError = (data) => {
		toast.error(`${data}`, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 2000
		});
	}

	const notifySucess = (data) => {
		toast.success(`${data}`, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 2000
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

	async function showModalUpdate(_id) {
		setIdDevUpdate(_id)
		setModalVisible(true)
	}

	async function handleUpdate(data) {
		const response = await api.put(`/devs/${idDevUpdate}`, data)
		if (response.data.error) {
			notifyError(response.data.error)
		} else {
			const updatedDev = devs.map((dev) => {
				if (dev._id === idDevUpdate) {
					const { name, bio, techs } = data
					
					if (name) {
						dev = { ...dev, name }
					}

					if (bio) {
						dev = { ...dev, bio }
					}

					if (techs) {
						let newTechs = techs.split(', ')
						dev = { ...dev, techs: newTechs }
					}
				}

				return dev
			})
			setDevs(updatedDev)

			notifySucess(response.data.message)
		}
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
						<DevItem key={dev._id} dev={dev} deleteDev={deleteDev} updateDev={showModalUpdate} />
					))}
				</ul>
			</main>
			<ToastContainer />
			<DevModal visible={modalVisible} closeModal={() => setModalVisible(false)} handleUpdate={handleUpdate} />
		</div>
	);
}

export default App;
