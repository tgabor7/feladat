import "bulma/css/bulma.css"
import "./Login.css"
import axios from 'axios'
import { useState } from 'react'
import {validateUser} from '../actions'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUserNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const getUserData = async () => {
        let response = await axios.get('https://jsonplaceholder.typicode.com/users')
        return response.data.find(e => e.username === username)
    }

    const validatePassword = async () => {
        if(password === '' && username === '') {
            setPasswordError('Enter your credentials!')
            return false
        }
        if (password !== '123456'){
            setPasswordError('Incorrect password!')
            return false
        }
        setPasswordError('')
        return true
    }

    const validateForm = async () => {
        let user = await validateUser(username)
        if(!user){
            if(username === '') setUserNameError('Enter a username!')
            else setUserNameError('User not found!')
            return false
        }else{
            setUserNameError('')
        }
        let password = await validatePassword()

        return password && user
    }

    return (<div className='loginContainer'>
        <div className="card p-4">
            <header className='card-header has-text-justified'>
                <div className='card-header-title is-size-3'>Login</div>
            </header>
            <div className='field pt-5'>
             <label className='label has-text-left'>Username</label>

                <div className='control'>
                    <div className='field'>
                        <input className='input' value={username} onChange={e=>{setUsername(e.target.value)}} type='text' placeholder='Enter username'></input>
                        <div className='p-2 is-size-5 has-text-danger'>{usernameError}</div>
                    </div>
                </div>
            </div>

            <div className='field'>
            <label className='label has-text-left'>Password</label>

                <div className='control'>

                    <div className='field'>
                        <input className='input' value={password} onChange={e=>{setPassword(e.target.value)}} type='password' placeholder='Enter password'></input>
                        <div className='p-2 is-size-5 has-text-danger'>{passwordError}</div>
                    </div>
                </div>
            </div>

            <button className='button' onClick={async ()=>{
                let valid = await validateForm()
                if(valid){
                    let data = await getUserData()
                    sessionStorage.setItem('data', JSON.stringify(data))
                    window.location = '/dashboard'
                }
            }}>Login</button>
        </div>
    </div>)
}

export default Login