import React from 'react'
import { useGetJobsQuery } from '../../features/job/jobApi'

const EmployerDashboard = () => {
	const { data, isLoading, isError } = useGetJobsQuery()
	const applicants = data.data
	console.log(applicants, 'dash')
	return (
		<div>
			<h1>This is Employer Dashboard</h1>
			<p>Total Applicants : {data?.applicants?.length}</p>
		</div>
	)
}

export default EmployerDashboard
