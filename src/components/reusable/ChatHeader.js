import {
	UnstyledButton,
	Group,
	Avatar,
	Text,
	createStyles,
} from '@mantine/core'

const useStyles = createStyles(theme => ({
	user: {
		display: 'block',
		width: '100%',
		padding: theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[8]
					: theme.colors.gray[0],
		},
	},
}))

const ChatHeader = ({ applicant }) => {
	const { firstName, lastName, email, _id } = applicant

	const { classes } = useStyles()

	return (
		<UnstyledButton className={classes.user}>
			<Group>
				<Avatar sx={{ color: '#691f74' }} radius="xl" />

				<div style={{ flex: 1 }}>
					<Text color="#691f74" size="sm" weight={500}>
						{firstName + ' ' + lastName}
					</Text>

					<Text color="dimmed" size="xs">
						{email}
					</Text>
				</div>
			</Group>
		</UnstyledButton>
	)
}

export default ChatHeader
