import React from 'react'
import { TextInput, Button, Group } from '@mantine/core'
import { openModal, closeAllModals } from '@mantine/modals'

const ChatModal = ({ id }) => {
	console.log(id)
	return (
		// <div>
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
						title: 'Subscribe to newsletter ',
						children: (
							<>
								<TextInput
									label="Your email"
									placeholder="Your email"
									data-autofocus
								/>
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
									fullWidth
									onClick={closeAllModals}
									mt="md"
								>
									Submit {id}
								</Button>
							</>
						),
					})
				}}
			>
				Send Message
			</Button>
		</Group>
		// </div>
	)
}

export default ChatModal
