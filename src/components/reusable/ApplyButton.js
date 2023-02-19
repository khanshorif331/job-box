import { useState } from 'react'
import { useInterval } from '@mantine/hooks'
import { createStyles, Button, Progress } from '@mantine/core'

const useStyles = createStyles(() => ({
	button: {
		position: 'relative',
		// backgroundColor: 'indigo',
		// border: '2px solid indigo',
		// borderRadius: '30%',
		transition: 'background-color 150ms ease',
		'&:hover': {
			backgroundColor: 'indigo',
		},
	},

	progress: {
		position: 'absolute',
		bottom: -1,
		right: -1,
		left: -1,
		top: -1,
		height: 'auto',
		backgroundColor: 'transparent',
		zIndex: 0,
	},

	label: {
		position: 'relative',
		zIndex: 1,
	},
}))

const ApplyButton = ({ handleApply }) => {
	const { classes, theme } = useStyles()
	const [progress, setProgress] = useState(0)
	const [loaded, setLoaded] = useState(false)

	const interval = useInterval(
		() =>
			setProgress(current => {
				if (current < 100) {
					return current + 1
				}

				interval.stop()
				setLoaded(true)
				return 0
			}),
		10
	)
	return (
		<div>
			<Button
				fullWidth
				className={classes.button}
				onClick={() => {
					loaded ? setLoaded(false) : !interval.active && interval.start()
					handleApply()
				}}
				color={loaded ? 'teal' : theme.primaryColor}
			>
				<div className={classes.label}>
					{progress !== 0 ? 'Applying...' : loaded ? 'Applied' : 'Apply'}
				</div>
				{progress !== 0 && (
					<Progress
						value={progress}
						className={classes.progress}
						color={theme.fn.rgba(
							theme.colors[theme.primaryColor][2],
							0.35
						)}
						radius="sm"
					/>
				)}
			</Button>
		</div>
	)
}

export default ApplyButton
