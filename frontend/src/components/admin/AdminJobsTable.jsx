import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="p-4 bg-pink-50 rounded-lg shadow-lg">
            <Table className="border-separate border-spacing-2 border border-pink-200">
                <TableCaption className="text-pink-600">Recent Employment Listings</TableCaption>
                <TableHeader className="bg-white">
                    <TableRow>
                        <TableHead className="text-pink-800">Company Name</TableHead>
                        <TableHead className="text-pink-800">Role</TableHead>
                        <TableHead className="text-pink-800">Date</TableHead>
                        <TableHead className="text-right text-pink-800">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id} className="hover:bg-pink-50 cursor-pointer">
                                <TableCell className="text-pink-700">{job?.company?.name}</TableCell>
                                <TableCell className="text-pink-700">{job?.title}</TableCell>
                                <TableCell className="text-pink-700">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right text-pink-700">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-pink-600 hover:text-pink-800 transition-colors" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-pink-50 border border-pink-200 rounded-md shadow-md">
                                            <div 
                                                onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                className='flex items-center gap-2 p-2 hover:bg-pink-100 cursor-pointer rounded-md'>
                                                <Edit2 className='w-4 text-pink-600' />
                                                <span className='text-pink-700'>Edit</span>
                                            </div>
                                            <div 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className='flex items-center gap-2 p-2 hover:bg-pink-100 cursor-pointer rounded-md mt-2'>
                                                <Eye className='w-4 text-black-600' />
                                                <span className='text-black-700'>View</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminJobsTable;
