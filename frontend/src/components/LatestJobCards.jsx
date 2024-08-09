import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)}className='p-6 rounded-lg shadow-lg bg-white border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer'>
            <div>
                <h1 className="font-semibold text-xl text-gray-800">{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-3 text-[#d53f8c]'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className="bg-pink-100 text-pink-700 font-semibold" variant="ghost">{job?.position} Positions</Badge>
                <Badge className="bg-yellow-100 text-yellow-500 font-semibold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="bg-green-400 text-gray-800 font-semibold" variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards;