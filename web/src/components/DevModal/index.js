import React, { useState } from 'react';
import Modal from 'react-modal';
import { IoIosClose } from 'react-icons/io';

import './styles.css'

Modal.setAppElement('#root')

function DevModal({ visible, closeModal, handleUpdate }) {

    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')

    async function Update(e) {
        e.preventDefault()

        closeModal()

        let dataUpdate = {}

        if (name) {
            dataUpdate = { ...dataUpdate, name }
        }

        if (techs) {
            dataUpdate = { ...dataUpdate, techs }
        }
        if (latitude) {
            dataUpdate = { ...dataUpdate, latitude }
        }

        if (longitude) {
            dataUpdate = { ...dataUpdate, longitude }
        }

        if (bio) {
            dataUpdate = { ...dataUpdate, bio }
        }

        await handleUpdate(dataUpdate)

        setTechs('')
        setLatitude('')
        setLongitude('')
        setName('')
        setBio('')
    }

    return (
        <div className="container">
            <Modal
                className="Dev-modal"
                overlayClassName="Overlay"
                isOpen={visible}
                onRequestClose={closeModal}
                contentLabel="Example Modal">

                <div className="close">
                    <IoIosClose onClick={closeModal} className="Icon" size={40} color={'#A00'} />
                </div>

                <strong className="Title">Editar Dev</strong>

                <form className="formUpdate" onSubmit={Update}>
                    <div className="input-block">
                        <label htmlFor="nome">Nome</label>
                        <input name="nome" id="nome" value={name} onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="input-block">
                        <label htmlFor="bio">Bio</label>
                        <input name="bio" id="bio" value={bio} onChange={e => setBio(e.target.value)} />
                    </div>

                    <div className="input-block">
                        <label htmlFor="techsUpdate">Tecnologias</label>
                        <input name="techsUpdate" id="techsUpdate" value={techs} onChange={e => setTechs(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <div className="input-block">
                            <label htmlFor="latitudeUpdate">Latitude</label>
                            <input type="number" name="latitudeUpdate" id="latitudeUpdate" value={latitude}
                                onChange={e => setLatitude(e.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="longitudeUpdate">Longitude</label>
                            <input type="number" name="longitudeUpdate" id="longitudeUpdate" value={longitude}
                                onChange={e => setLongitude(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit">Atualizar</button>
                </form>
            </Modal>
        </div>
    );
}

export default DevModal
