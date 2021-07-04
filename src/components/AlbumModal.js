import React, { Component } from "react"
import axios from "axios"

class AlbumModal extends Component {
    constructor(props) {
        super(props)

        this.state = { show: '', details: '' }

        this.hide = this.hide.bind(this)
    }
    show() {
        axios.get('https://jsonplaceholder.typicode.com/photos').then(r => {
            let details = r.data.filter(e => e.albumId === this.props.id)
            details = details.map(e => {
                return <div className='column'><div className='card'><div className='card-content'><p>{e.title}<img alt='albumphoto' className='pt-4' src={e.thumbnailUrl} /></p></div></div></div>
            })
            this.setState({ details: <div className='columns is-multiline'>{details}</div> })
        })
        this.setState({ show: 'is-active' })
    }
    hide() {
        this.setState({ show: '' })
    }
    render() {
        return <div data-testid='album-1'><div className='column'>
            <div className='card album' onClick={() => {
                this.show()
            }}><>{this.props.title}</></div>
        </div><div className={'modal ' + this.state.show}>
                <div className="modal-background" onClick={(e) => { this.hide() }}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.props.title}</p>
                        <button className='delete' onClick={this.hide}></button>
                    </header>
                    <section className="modal-card-body">
                        {this.state.details}
                    </section>
                </div>
            </div></div>
    }
}

export default AlbumModal