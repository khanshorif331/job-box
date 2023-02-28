import React from 'react'
import { useSelector } from 'react-redux'
import { useGetChatsByEmailQuery } from '../../../features/chat/chatApi'

const Chats = () => {
	const { role, email } = useSelector(state => state.auth.user)
	const { data } = useGetChatsByEmailQuery({
		role,
		email,
	})
	console.log(data?.data)
	return (
		<div>
			<h1>This is chats</h1>
		</div>
	)
}

export default Chats
