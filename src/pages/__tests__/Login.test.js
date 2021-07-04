import React from 'react'
import {render,screen,cleanup} from '@testing-library/react'
import Login from '../Login'
import {validateUser} from '../../actions'

test('Login renders',()=>{
    render(<Login></Login>)
})
test('Username validation test', async ()=>{
    let valid = await validateUser('Bret')
    let notValid = await validateUser('notavaliduser')
    expect(valid).toBe(true)
    expect(notValid).toBe(false)
})