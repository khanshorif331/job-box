import { Button } from '@mantine/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useJobByIdQuery } from '../../features/job/jobApi'
import Loading from './Loading'
import TableForApplicants from './TableForApplicants'

const Applicants = () => {
	const { id } = useParams()
	const { data, isLoading, isFetching, isError, isSuccess } =
		useJobByIdQuery(id)

	const { applicants } = data?.data || {}
	if (isFetching) {
		return <Loading></Loading>
	}
	console.log(applicants)
	return (
		<div className="bg-secondary/20 shadow-lg p-10 rounded-2xl w-full h-full">
			<h1 className="text-center text-xl">
				Total applicants : {applicants?.length}
			</h1>
			{applicants?.length > 0 && (
				<TableForApplicants applicants={applicants}></TableForApplicants>
			)}
			{/* {applicants?.map(applicant => {
				return <li>{applicant?.email}</li>
			})} */}
		</div>
	)
}

export default Applicants
