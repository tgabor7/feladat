import axios from "axios"

export const validateUser = async user => {
    let response = await axios.get('https://jsonplaceholder.typicode.com/users')
    let names = response.data.map(e => { return e.username })
    if (!names.includes(user)) {
        return false
    }
    return true
}