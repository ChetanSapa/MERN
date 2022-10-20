import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

const CreatePage = () => {
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const navigate = useNavigate()
    const {request} = useHttp()
    const pressHandler = async e => {
        if (e.key === 'Enter') {
            try {
                console.log(link, auth.token)
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log(data)
                navigate(`/detail/${data.link._id}`)
            } catch (e) {
            }
        }
    }
    return (
        <div className={'row'}>
            <div className="col s8 offset-s2 pt">
                <input
                    placeholder="Put the link"
                    id="email"
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                />
                <label htmlFor="link">Type your link</label>
            </div>
        </div>
    );
};

export default CreatePage;