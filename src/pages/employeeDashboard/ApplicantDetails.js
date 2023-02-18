import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUsersQuery } from '../../features/auth/authApi'

const ApplicantDetails = () => {
	const { id } = useParams()
	const { data } = useGetUsersQuery()
	console.log(data, 'details data')
	const applicant = data?.data?.find(applicant => applicant._id === id)
	console.log(applicant, 'applicant')
	const {
		address,
		city,
		country,
		email,
		firstName,
		gender,
		lastName,
		postcode,
		role,
		_id,
	} = applicant
	return (
		<div>
			<h1>This is {firstName + ' ' + lastName}</h1>
		</div>
	)
}

export default ApplicantDetails
