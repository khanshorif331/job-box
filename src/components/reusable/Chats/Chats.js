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
			<h1 className="text-xl"> This is chats</h1>
			<p>No need to go to the </p>
		</div>
	)
}

export default Chats
