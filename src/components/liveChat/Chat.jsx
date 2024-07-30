import React from 'react'
import {ChatsCircle} from "@phosphor-icons/react"
import './chat.css'
import { Link } from 'react-router-dom'


const Chat = () => {
  return (
    <Link to="/Support" className='bubble'><ChatsCircle className='icon'></ChatsCircle> </Link>
  )
}

export default Chat