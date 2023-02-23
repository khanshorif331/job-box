import {
	createStyles,
	Text,
	Avatar,
	Group,
	TypographyStylesProvider,
	Paper,
} from '@mantine/core'
import { useSelector } from 'react-redux'

const useStyles = createStyles(theme => ({
	comment: {
		padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
	},

	body: {
		paddingLeft: 54,
		paddingTop: theme.spacing.sm,
		fontSize: theme.fontSizes.sm,
	},

	content: {
		'& > p:last-child': {
			marginBottom: 0,
		},
	},
}))

const SingleChatMessage = ({ message }) => {
	let currentUserMessage = false
	const { role, firstName, laseName } = useSelector(state => state.auth.user)
	if (role === Object.keys(message)[0]) {
		currentUserMessage = true
	} else {
		currentUserMessage = false
	}
	const { classes } = useStyles()
	return (
		<Paper
			sx={{
				marginTop: '10px',
				width: '70%',
				...(currentUserMessage
					? { marginLeft: 'auto' }
					: { marginRight: 'auto' }),
			}}
			withBorder
			radius="md"
			className={classes.comment}
		>
			<Group>
				<Avatar src="" alt="avatar" radius="xl" />
				<div>
					<Text size="sm">
						{currentUserMessage ? firstName : 'Other Guy'}
					</Text>
					<Text size="xs" color="dimmed">
						30 minutes ago
					</Text>
				</div>
			</Group>
			<TypographyStylesProvider className={classes.body}>
				<div
					className={classes.content}
					dangerouslySetInnerHTML={{
						__html: message[Object.keys(message)[0]],
					}}
				/>
			</TypographyStylesProvider>
		</Paper>
	)
}

export default SingleChatMessage
