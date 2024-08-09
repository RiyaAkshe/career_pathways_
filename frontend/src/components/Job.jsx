import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    // Function to return a fixed value of 32 days ago
    const daysAgoFunction = () => 32;

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 transform transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="flex items-center justify-between">
                <p className="text-sm text-pink-800">{daysAgoFunction() === 0 ? "Today" : `${daysAgoFunction()} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button >
            </div>
            <div className="flex items-center gap-2 my-2">
                <Button className="p-0" variant="outline" size="icon">
                    <div className="relative">
                        <Avatar className="border-4 border-pink-500 rounded-full">
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </div>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-pink-500">India</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className="bg-pink-100 text-pink-700 font-semibold" variant="ghost">{job?.position} Positions</Badge>
                <Badge className="bg-yellow-100 text-yellow-500 font-semibold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="bg-green-400 text-gray-800 font-semibold" variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="bg-[#b83280] text-white hover:bg-[#a0266f] border border-[#b83280]"
                    variant="outline"
                >
                    Details
                </Button>

                <Button className="bg-[#fbb6ce] text-black hover:bg-[#f49db4] hover:text-white" variant="outline">View Later</Button>
            </div>
        </div>
    );
}

export default Job;
