import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    
    // Add a default empty array in case `allAppliedJobs` is undefined
    const appliedJobs = allAppliedJobs || [];

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <TableCaption className="text-lg font-semibold text-pink-300">Job Application History</TableCaption>
                <TableHeader className="bg-gray-100 border-b border-gray-200">
                    <TableRow>
                        <TableHead className="py-3 px-4 text-left text-gray-700">Date</TableHead>
                        <TableHead className="py-3 px-4 text-left text-gray-700">Job Role</TableHead>
                        <TableHead className="py-3 px-4 text-left text-gray-700">Company</TableHead>
                        <TableHead className="py-3 px-4 text-right text-gray-700">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appliedJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan="4" className="py-3 px-4 text-center text-gray-600">You haven't applied to any job yet.</TableCell>
                            </TableRow>
                        ) : (
                            appliedJobs.map((appliedJob) => (
                                <TableRow
                                    key={appliedJob._id}
                                    className="hover:bg-gray-50 transition-colors duration-300 ease-in-out"
                                >
                                    <TableCell className="py-3 px-4 text-gray-600">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="py-3 px-4 text-gray-600">{appliedJob.job?.title}</TableCell>
                                    <TableCell className="py-3 px-4 text-gray-600">{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="py-3 px-4 text-right">
                                        <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
