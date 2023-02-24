import React, { useState } from 'react'
import { TextInput, Button, Group, Box } from '@mantine/core'
import { openModal, closeAllModals } from '@mantine/modals'
import ChatHeader from './ChatHeader'
import SingleChatMessage from './SingleChatMessage'
import { BiSend } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import {
	useGetChatsQuery,
	usePostChatMutation,
	useUpdateMessageMutation,
} from '../../features/chat/chatApi'
import { useEffect } from 'react'

const ChatModal = ({ applicant }) => {
	let candidate
	let employer
	const { id, firstName, lastName, email, role } = applicant
	const [chatData, setChatData] = useState(null)
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

	const { data, isFetching } = useGetChatsQuery({ candidate, employer })
	const [updateMessage] = useUpdateMessageMutation()
	const [postMessage] = usePostChatMutation()
	useEffect(() => {
		console.log('getting data', chatData)
		setChatData(data?.data[0]?.messages)
	}, [data, chatData])
	if (isFetching) {
		return <div>Loading...</div>
	}

	console.log(candidate, employer, 'candidate and employer')
	const handleSendMessage = e => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const message = formData.get('message')
		if (data?.data?.length > 0) {
			updateMessage({
				id: data?.data[0]?._id,
				message: {
					[userRole]: message,
				},
			})
		}
		postMessage({
			employer,
			candidate,
			messages: [{ [userRole]: message }],
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
								{chatData?.map((message, index) => {
									return (
										<SingleChatMessage
											key={index}
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
