import React, { useState } from 'react'
import { TextInput, Button, Group, Box, Modal } from '@mantine/core'
import ChatHeader from './ChatHeader'
import SingleChatMessage from './SingleChatMessage'
import { BiSend } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import {
	useGetChatsQuery,
	usePostChatMutation,
	useUpdateMessageMutation,
} from '../../features/chat/chatApi'

const ChatModal = ({ applicant }) => {
	const [opened, setOpened] = useState(false)
	let candidate
	let employer
	const { id, firstName, lastName, email, role } = applicant
	const { email: userEmail, role: userRole } = useSelector(
		state => state.auth.user
	)

	if (userRole === 'candidate') {
		candidate = userEmail
		employer = email
	} else {
		candidate = email
		employer = userEmail
	}
	const { data, isFetching, isLoading } = useGetChatsQuery({
		candidate,
		employer,
	})
	const [updateMessage] = useUpdateMessageMutation()
	const [postMessage] = usePostChatMutation()

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
		} else {
			postMessage({
				employer,
				candidate,
				messages: [{ [userRole]: message }],
			})
		}
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
					setOpened(true)
				}}
			>
				<Modal
					opened={opened}
					onClose={() => setOpened(false)}
					centered
					transition="fade"
					transitionDuration={600}
					transitionTimingFunction="ease"
					size="md"
					overflow="inside"
					title={<ChatHeader applicant={applicant}></ChatHeader>}
				>
					{/* Modal content */}
					<>
						<div
						// style={{
						// 	height: '600px',
						// 	// overflow: 'auto',
						// 	display: 'flex',
						// 	flexDirection: 'column-reverse',
						// }}
						>
							{isLoading && <div>Loading...</div>}
							{data?.data[0]?.messages?.map((message, index) => {
								return (
									<SingleChatMessage
										key={index}
										message={message}
									></SingleChatMessage>
								)
							})}
						</div>
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
				</Modal>
				Send Message
			</Button>
		</Group>
	)
}

export default ChatModal
