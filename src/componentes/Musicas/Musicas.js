import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

const musicasLocal = [{
    artist: "Artista 1",
    id: "1",
    name: "Musica1",
    url: "http://spoti4.future4.com.br/1.mp3"
},
{
    artist: "Artista 2",
    id: "2",
    name: "Musica2",
    url: "http://spoti4.future4.com.br/2.mp3"
},
{
    artist: "Artista 3",
    id: "3",
    name: "Musica3",
    url: "http://spoti4.future4.com.br/3.mp3"
}]

export default function Musicas(props) {

    const [art, setArt] = useState('')
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleUrl = (e)=>{
        setUrl(e.target.value)
    }

    const handleArt = (e)=>{
        setArt(e.target.value)
    }

    const getMusics = () => {
        const input = {
            headers: {
                Authorization: 'guilherme-mesquita-ammal'
            }
        }

        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, input)
        .then((response)=>{
            setMusicas(response.data.result.tracks)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    getMusics()

    const removeTrack = (id) => {
        const input = {
            headers: {
                Authorization: 'guilherme-mesquita-ammal'
            }
        }

        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`, input)
        .then((response)=>{
            setMusicas(response.data.result.tracks)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const addTrack = () => {
        const input = {
            headers: {
                Authorization: 'guilherme-mesquita-ammal'
            }
        }

        const body = {
            name: name,
            artist: art,
            url: url
        }

        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, input)
        .then((res) => {
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const [musicas, setMusicas] = useState(musicasLocal)

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={() => removeTrack(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={art} onChange={handleArt}/>
                <InputMusica placeholder="musica" value={name} onChange={handleName}/>
                <InputMusica placeholder="url" value={url} onChange={handleUrl}/>
                <Botao onClick={addTrack}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

