import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import JobCard from '../../components/reusable/JobCard'
import { useGetPostedJobsQuery } from '../../features/job/jobApi'
import { BiMessageSquareAdd } from 'react-icons/bi'

const PostedJobs = () => {
	const { email } = useSelector(state => state.auth.user)
	const { data, isFetching, isError } = useGetPostedJobsQuery(email)
	const totalJobs = data?.data
	console.log(data?.data)
	if (isFetching) {
		return <p> Looading.!!</p>
	}
	return (
		<div className="flex justify-center items-center overflow-auto p-5 md:p-10">
			<div className="bg-secondary/20 shadow-lg p-10 rounded-2xl w-full h-full  ">
				<p className="text-center text-primary text-xl border-b-2 border-primary p-2">
					You Posted {totalJobs?.length} Jobs
				</p>
				{totalJobs?.length === 0 ? (
					<Link to="/dashboard/add-job">
						<button className="text-center flex justify-center items-center mx-auto hover:text-primary pt-5">
							<BiMessageSquareAdd className=" text-primary text-6xl mx-auto p-2 "></BiMessageSquareAdd>
							Add New Jobs
						</button>
					</Link>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 p-5">
						{totalJobs?.map(job => (
							<JobCard jobData={job} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default PostedJobs
