import "bulma/css/bulma.css"
import "bulma/css/bulma.min.css"
import 'font-awesome/css/font-awesome.min.css'
import './Dashboard.css'
import { useEffect, useState } from "react"
import axios from "axios"
import AlbumModal from "../components/AlbumModal"

function Dashboard() {

    const [data, setData] = useState(JSON.parse(sessionStorage.getItem('data')))
    const [hidden, setHidden] = useState('')
    const [albums, setAlbums] = useState('')

    const toggle = () => {
        if (hidden === '') setHidden('is-active')
        else setHidden('')
    }

    const signout = () => {
        window.location = '/login'
        sessionStorage.removeItem('data')
        setData('')
    }
    const getAlbums = async () => {
        axios.get('https://jsonplaceholder.typicode.com/albums').then(response => {
            let cards = response.data.map(e => {
                if (e.userId === data.id) return <AlbumModal title={e.title} id={e.id}></AlbumModal>
                else return ''
            })
            setAlbums(cards)
        })
    }
    useEffect(() => {
        if (data !== null) getAlbums()
    }, [])

    return (<div className='dashboardContainer'>
        {data !== null ? <>
            <nav className='navbar has-background-info is-fixed-top' aria-label="main navigation">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className={'dropdown is-right ' + hidden}>
                            <div className="dropdown-trigger">
                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={e => {
                                    toggle()
                                    e.stopPropagation()
                                }} onfocusout={() => { setHidden('is-hidden') }}>
                                    <span>{data.name}</span>
                                </button>
                            </div>
                            <div className={'dropdown-menu'} id="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content has-text-left pl-4" style={{'width': '20em'}}>
                                    <div className=''><i className="fa fa-envelope"></i> <a href={'mailto:' + data.email}>{data.email}</a></div>
                                    <div className='pt-2'><i className="fa fa-phone"></i> {data.phone}</div>
                                    <div className='pt-2'><i className="fa fa-globe"></i> <a href={'http://' + data.website}>{data.website}</a></div>
                                    <div className='pt-2'><div className='has-text-weight-semibold'>City: {data.address.city}</div></div>
                                    <div className='pt-2'><div className='has-text-weight-semibold'>Company: {data.company.name}</div></div>
                                    <hr class="dropdown-divider"></hr>
                                    <button className='button is-danger' onClick={signout}>Sign out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='section'>
                <h1 className='is-size-1 mb-6'>Albums</h1>
                <div className='columns is-multiline'>
                    {albums}
                </div>
            </div>
        </> : <div className='section'><div><i className='fa fa-warning is-size-2'></i></div><h1 className='is-size-1'>Hold on Chief!</h1><h2>You are not signed in. Please sign in one the <a href='/login'>login</a> page.</h2></div>}

    </div>)
}

export default Dashboard