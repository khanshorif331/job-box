import React, { useState } from 'react'
import { TextInput, Button, Group, Box } from '@mantine/core'
import { openModal, closeAllModals } from '@mantine/modals'
import ChatHeader from './ChatHeader'
import SingleChatMessage from './SingleChatMessage'
import { BiSend } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import {
	useGetChatsQuery,
	useUpdateMessageMutation,
} from '../../features/chat/chatApi'

const ChatModal = ({ applicant }) => {
	let candidate
	let employer
	const { id, firstName, lastName, email, role } = applicant
	const {
		email: userEmail,
		role: userRole,
		isLoading,
	} = useSelector(state => state.auth.user)

	if (userRole === 'candidate') {
		candidate = userEmail
		employer = email
	} else {
		candidate = email
		employer = userEmail
	}
	const { data } = useGetChatsQuery({ candidate, employer })
	const [updateMessage] = useUpdateMessageMutation()
	// if (data?.data?.length > 0) {
	// }
	const handleSendMessage = e => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const message = formData.get('message')
		updateMessage({
			id: data?.data[0]?._id,
			message: {
				[userRole]: message,
			},
		})
		e.target.reset()
	}

	return (
		<Group position="center">
			<Button
				sx={{
					bg: 'primary',
					color: '#691f74',
					border: '1px solid #691f74',
					borderRadius: '15px',
					'&:hover': {
						backgroundColor: '#691f74',
						color: '#fff',
					},
				}}
				onClick={() => {
					openModal({
						title: <ChatHeader applicant={applicant}></ChatHeader>,
						children: (
							<>
								{data?.data[0].messages.map(message => {
									return (
										<SingleChatMessage
											message={message}
										></SingleChatMessage>
									)
								})}

								<form onSubmit={handleSendMessage}>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-evenly',
											paddingTop: '15px',
										}}
									>
										<TextInput
											name="message"
											placeholder="Write your message here..."
											data-autofocus
											// onChange={e => setMessage(e.target.value)}
										/>
										<Button
											type="submit"
											sx={{
												backgroundColor: '#691f74 !important',
												color: '#fff',
											}}
										>
											<BiSend
												fontSize={24}
												style={{
													height: '30px',
													width: '30px',
													color: '#fff',
													cursor: 'pointer',
												}}
											>
												Send
											</BiSend>
										</Button>
									</Box>
								</form>
							</>
						),
					})
				}}
			>
				Send Message
			</Button>
		</Group>
	)
}

export default ChatModal
