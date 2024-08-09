import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Shortlisted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log(`Updating status for ID: ${id} to ${status}`);
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log('API Response:', res.data);
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error during status update:', error);
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            toast.error(errorMessage);
        }
    }

    return (
        <div className="p-4 bg-pink-50 rounded-lg shadow-md">
            <Table className="w-full">
                <TableCaption className="text-pink-600 font-semibold text-lg mb-4">A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="bg-pink-100 text-pink-800 py-3 px-4 text-left">FullName</TableHead>
                        <TableHead className="bg-pink-100 text-pink-800 py-3 px-4 text-left">Email</TableHead>
                        <TableHead className="bg-pink-100 text-pink-800 py-3 px-4 text-left">Contact</TableHead>
                        <TableHead className="bg-pink-100 text-pink-800 py-3 px-4 text-left">Resume</TableHead>
                        <TableHead className="bg-pink-100 text-pink-800 py-3 px-4 text-left">Date</TableHead>
                        <TableHead className="bg-pink-100 text-pink-800 py-3 px-4 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="odd:bg-pink-50 even:bg-pink-100">
                                <TableCell className="bg-white py-3 px-4">{item?.applicant?.fullname || 'NA'}</TableCell>
                                <TableCell className="bg-white py-3 px-4">{item?.applicant?.email || 'NA'}</TableCell>
                                <TableCell className="bg-white py-3 px-4">{item?.applicant?.phoneNumber || 'NA'}</TableCell>
                                <TableCell className="bg-white py-3 px-4">
                                    {
                                        item?.applicant?.profile?.resume ? 
                                        <a className="text-pink-600 underline hover:text-pink-800" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a> 
                                        : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className="bg-white py-3 px-4">
                                    {item?.applicant?.createdAt ? item.applicant.createdAt.split("T")[0] : 'NA'}
                                </TableCell>
                                <TableCell className="bg-white py-3 px-4 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-pink-600 cursor-pointer hover:text-pink-800" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white border border-pink-200 rounded-lg shadow-lg">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex items-center my-2 px-2 py-1 cursor-pointer hover:bg-pink-100 rounded'>
                                                        <span className="text-pink-600">{status}</span>
                                                    </div>
                                                ))
                                            }
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

export default ApplicantsTable;
