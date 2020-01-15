import React from 'react'
import './styles.css'
import { IoMdTrash, IoMdBrush} from 'react-icons/io';

function DevItem({ dev, deleteDev, updateDev}) {
    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <div className="dev-editable">
                <IoMdTrash onClick={() => deleteDev(dev._id)} className="Icon" size={20} color={'#A00'} />
                <IoMdBrush onClick={() => updateDev(dev._id)} className="Icon" size={20} />
            </div>
            <p>{dev.bio}</p>
            <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${dev.github_username}`}>Acessar perfil no github</a>
        </li>
    )
}

export default DevItem