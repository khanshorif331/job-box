import React from 'react'

import { useState } from 'react'
import {
	createStyles,
	Table,
	ScrollArea,
	UnstyledButton,
	Group,
	Text,
	Center,
	TextInput,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
	IconSelector,
	IconChevronDown,
	IconChevronUp,
} from '@tabler/icons-react'

const useStyles = createStyles(theme => ({
	th: {
		padding: '0 !important',
	},

	control: {
		width: '100%',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	icon: {
		width: 21,
		height: 21,
		borderRadius: 21,
	},
}))

const TableForApplicants = ({ applicants }) => {
	console.log(applicants)
	const [search, setSearch] = useState('')
	console.log(search)
	const [sortedData, setSortedData] = useState(applicants)
	const [sortBy, setSortBy] = useState(null)
	const [reverseSortDirection, setReverseSortDirection] = useState(false)

	function Th({ children, reversed, sorted, onSort }) {
		const { classes } = useStyles()
		const Icon = sorted
			? reversed
				? IconChevronUp
				: IconChevronDown
			: IconSelector
		return (
			<th className={classes.th}>
				<UnstyledButton onClick={onSort} className={classes.control}>
					<Group position="apart">
						<Text weight={500} size="sm">
							{children}
						</Text>
						<Center className={classes.icon}>
							<Icon size={14} stroke={1.5} />
						</Center>
					</Group>
				</UnstyledButton>
			</th>
		)
	}

	function filterData(data, search) {
		const query = search.toLowerCase().trim()
		return data.filter(item =>
			keys(data[0]).some(key => item[key].toLowerCase().includes(query))
		)
	}

	function sortData(data, payload) {
		const { sortBy } = payload

		if (!sortBy) {
			return filterData(data, payload.search)
		}

		return filterData(
			[...data].sort((a, b) => {
				if (payload.reversed) {
					return b[sortBy].localeCompare(a[sortBy])
				}

				return a[sortBy].localeCompare(b[sortBy])
			}),
			payload.search
		)
	}

	const setSorting = field => {
		const reversed = field === sortBy ? !reverseSortDirection : false
		setReverseSortDirection(reversed)
		setSortBy(field)
		setSortedData(sortData(applicants, { sortBy: field, reversed, search }))
	}

	const handleSearchChange = event => {
		const { value } = event.currentTarget
		setSearch(value)
		setSortedData(
			sortData(applicants, {
				sortBy,
				reversed: reverseSortDirection,
				search: value,
			})
		)
	}

	const rows = sortedData.map((row, index) => (
		<tr key={row.name}>
			<td>{index + 1}</td>
			<td>{row.id}</td>
			<td>{row.email}</td>
			<td>
				<button className="btn">Details</button>
			</td>
		</tr>
	))
	return (
		<div>
			<ScrollArea>
				<TextInput
					placeholder="Search by any field"
					mb="md"
					// icon={<IconSearch size={14} stroke={1.5} />}
					value={search}
					onChange={handleSearchChange}
				/>
				<Table
					highlightOnHover
					horizontalSpacing="md"
					verticalSpacing="xs"
					sx={{ tableLayout: 'scroll', minWidth: 700 }}
				>
					<thead>
						<tr>
							<Th>SL</Th>
							<Th
								sorted={sortBy === 'id'}
								reversed={reverseSortDirection}
								onSort={() => setSorting('id')}
							>
								Applicant's ID
							</Th>
							<Th
								sorted={sortBy === 'email'}
								reversed={reverseSortDirection}
								onSort={() => setSorting('email')}
							>
								Email
							</Th>
							<Th
								sorted={sortBy === 'company'}
								reversed={reverseSortDirection}
								onSort={() => setSorting('company')}
							>
								Action
							</Th>
						</tr>
					</thead>
					<tbody>
						{rows.length > 0 ? (
							rows
						) : (
							<tr>
								<td colSpan={Object.keys(applicants[0]).length}>
									<Text weight={500} align="center">
										Nothing found
									</Text>
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</ScrollArea>
		</div>
	)
}

export default TableForApplicants
