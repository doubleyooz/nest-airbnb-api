import React, {useState, useMemo} from 'react';

import './styles.css';
import api from '../../services/api';

import camera from '../../assets/camera.svg';


export default function New({ history }){
    const [company, setCompany] = useState('');
    const [tech, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', tech);
        data.append('price', price);


        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }


    return (
        <form onSubmit={handleSubmit}>
            <label
                className={thumbnail ? 'has-thumbnail' : ''}
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
            >
                
                <input
                type="file"                        
                onChange={event => setThumbnail(event.target.files[0])}
                
                />
                <img src={camera} alt="Select Image"/>
                
                

            </label>

            <label htmlFor="company">EMPRESA *</label>
                <input 
                    id="company"
                    placeholder="Sua empresa incrível"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                />

            <label htmlFor="techs">TECNOLOGIAS *</label>
                <input 
                    id="tech"
                    placeholder="Sua empresa incrível"
                    value={tech}
                    onChange={event => setTechs(event.target.value)}
                />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
                <input 
                    id="price"
                    placeholder="Valor cobrado por dia"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                />

            <button type= 'submit' className="btn">Cadastrar</button>    
        </form>
    )
}