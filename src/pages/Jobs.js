import React from 'react'
import { useEffect } from 'react'
import JobCard from '../components/reusable/JobCard'
import Loading from '../components/reusable/Loading'
import { useGetJobsQuery } from '../features/job/jobApi'

const Jobs = () => {
	const { data, isLoading, isError, isFetching } = useGetJobsQuery()
	console.log(data?.data)

	if (isFetching) {
		return <Loading></Loading>
	}

	return (
		<div className="pt-14">
			<div className="bg-primary/10 p-5 rounded-2xl">
				<h1 className="font-semibold text-xl">Find Jobs</h1>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 p-5">
				{data?.data?.map(job => (
					<JobCard jobData={job} />
				))}
			</div>
		</div>
	)
}

export default Jobs
