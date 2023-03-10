import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ jobData }) => {
	const navigate = useNavigate()
	const {
		_id,
		position,
		companyName,
		location,
		employmentType,
		applicants,
		email,
	} = jobData || {}
	const { user } = useSelector(state => state.auth)

	return (
		<div
			key={_id}
			className="border border-gray-300 shadow-xl p-5 rounded-2xl text-primary"
		>
			<div className="flex justify-between  text-primary">
				<div>
					<p className="text-xl">{position}</p>
					<small className="text-primary/70 ">
						by{' '}
						<span className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all">
							{companyName}
						</span>
					</small>
				</div>
				<p>{location}</p>
			</div>
			<div className="flex justify-between items-center mt-5">
				<p>{employmentType}</p>
				{user?.role === 'employer' && (
					<button
						className="btn"
						onClick={() => navigate(`/dashboard/applicants/${_id}`)}
						disabled={user?.role !== 'employer'}
					>
						Applicants : {applicants?.length}
					</button>
				)}
				{user?.role === 'candidate' && (
					<button
						className="btn"
						onClick={() => navigate(`/dashboard/employerDetail/${_id}`)}
					>
						Recruiter
					</button>
				)}
				<button
					className="btn"
					onClick={() => navigate(`/job-details/${_id}`)}
				>
					Details
				</button>
			</div>
		</div>
	)
}

export default JobCard
