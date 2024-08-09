import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

//const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    return (
        <div className='bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 min-h-screen py-10'>
            <div className='max-w-7xl mx-auto my-20'>
                <h1 className='text-3xl font-bold text-[#d53f8c]'>
                    <span className='text-[#702459]'>Premier & Current </span> 
                    Employment Opportunities
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
                    {
                          allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default LatestJobs;
