import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUsersQuery } from '../../features/auth/authApi'
import { useJobByIdQuery } from '../../features/job/jobApi'

const EmployerDetail = () => {
	const { id } = useParams()
	const { data: email } = useJobByIdQuery(id)
	const employerEmail = email?.data?.email
	// console.log(email, 'employer email')
	const { data: userData, isFetching } = useGetUsersQuery()
	// console.log(userData, 'user data')
	const recruiter = userData?.data?.find(user => user.email === employerEmail)
	console.log(recruiter, 'recruiter')
	return (
		<div>
			<h1>
				This is {id},email : {employerEmail}
			</h1>
		</div>
	)
}

export default EmployerDetail
