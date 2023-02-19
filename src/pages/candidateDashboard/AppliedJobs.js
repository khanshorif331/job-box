import React from 'react'
import { useSelector } from 'react-redux'
import JobCard from '../../components/reusable/JobCard'
import Loading from '../../components/reusable/Loading'
import { useGetAppliedJobsQuery } from '../../features/job/jobApi'

const AppliedJobs = () => {
	const {
		user: { email },
	} = useSelector(state => state.auth)
	console.log(email, 'email')
	const { data, isLoading } = useGetAppliedJobsQuery(email)
	console.log(data, 'applied jobs')

	if (isLoading) {
		return <Loading />
	}

	return (
		<div>
			<h1 className="text-xl py-5 text-center text-primary font-semibold">
				Applied jobs : {data?.data?.length}
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
				{data?.data?.map(job => (
					<JobCard jobData={job} />
				))}
			</div>
		</div>
	)
}

export default AppliedJobs
