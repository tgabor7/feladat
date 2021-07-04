import React from 'react'
import AlbumModal from '../AlbumModal'
import {render,screen,cleanup} from '@testing-library/react'

test('AlbumModal renders', ()=>{
    render(<AlbumModal title='test'></AlbumModal>)
    const albumElement = screen.getByTestId('album-1')
    expect(albumElement).toBeInTheDocument()
})
test('AlbumModal title property', ()=>{
    render(<AlbumModal title='test'></AlbumModal>)
    const albumElement = screen.getByTestId('album-1')
    expect(albumElement).toBeInTheDocument()
    expect(albumElement).toHaveTextContent('test')
})
