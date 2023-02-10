import React from 'react'
import { useParams } from 'react-router-dom'
import { useJobByIdQuery } from '../../features/job/jobApi'

const Applicants = () => {
	const { id } = useParams()
	const { data, isLoading, isError, isSuccess } = useJobByIdQuery(id)

	const { applicants } = data?.data || {}
	console.log(applicants)
	return (
		<div>
			<h1>Total applicants : {applicants?.length}</h1>
			<p>hello</p>
		</div>
	)
}

export default Applicants
