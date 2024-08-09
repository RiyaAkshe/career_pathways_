import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [fileType, setFileType] = useState('');
    const [isResumeUploaded, setIsResumeUploaded] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        if (!user) {
            toast.error('Please log in to apply for a job.');
            return;
        }
        if (!isResumeUploaded) {
            toast.error('You must upload a resume before applying for a job.');
            return;
        }

        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res && res.data && res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            } else {
                toast.error('An unexpected error occurred.');
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.message || 'An error occurred.');
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        }
    };

    const handleFileUpload = (event) => {
        event.preventDefault();
        if (!fileType) {
            toast.error('Please select an option.');
            return;
        }

        // Handle file upload logic here
        setIsResumeUploaded(true); // Mark resume as uploaded
        toast.success(`${fileType} file uploaded successfully.`);
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch job details.');
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-4xl mx-auto my-6'>
            <div className='bg-pink-50 shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105'>
                <div className='flex items-center justify-between border-b border-gray-200 pb-4 mb-4 p-4'>
                    <div>
                        <h1 className='font-bold text-xl text-[#97266d]'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-2'>
                            <Badge className="bg-pink-100 text-pink-700 font-semibold px-2 py-1 rounded-full" variant="ghost">{singleJob?.position} Positions</Badge>
                            <Badge className="bg-yellow-100 text-yellow-500 font-semibold px-2 py-1 rounded-full" variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full" variant="ghost">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={applyJobHandler}
                        disabled={isApplied || !isResumeUploaded}
                        className={`rounded-lg px-4 py-2 text-white font-bold ${isApplied || !isResumeUploaded ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#ed64a6] hover:bg-[#702459] transition duration-300 ease-in-out'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h1 className='border-b-2 border-gray-300 font-bold text-xl text-[#97266d] font-semibold py-2 mb-2 px-4'>Job Description</h1>
                <div className='space-y-3 px-4 pb-4'>
                    <h1 className='text-base font-semibold'>Role: <span className='text-pink-800 text-[#97266d] italic'>{singleJob?.title}</span></h1>
                    <h1 className='text-base font-semibold'>Location: <span className='text-pink-800 text-[#97266d] italic'>{singleJob?.location}</span></h1>
                    <h1 className='text-base font-semibold'>Description: <span className='text-pink-800 text-[#97266d] italic'>{singleJob?.description}</span></h1>
                    <h1 className='text-base font-semibold'>Experience: <span className='text-pink-800 text-[#97266d] italic'>{singleJob?.experience} yrs</span></h1>
                    <h1 className='text-base font-semibold'>Salary: <span className='text-pink-800 text-[#97266d] italic'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='text-base font-semibold'>Total Applicants: <span className='text-pink-800 text-[#97266d] italic'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='text-base font-semibold'>Posted Date: <span className='text-pink-800 text-[#97266d] italic'>{singleJob?.createdAt.split("T")[0]}</span></h1>

                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className='bg-[#ed64a6] text-white rounded-lg px-4 py-2 mt-4'
                    >
                        Upload Resume
                    </Button>
                </div>
            </div>

            {/* Dialog for Resume Upload */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <DialogContent>
                    <div className='flex flex-col space-y-4'>
                        <Button
                            onClick={() => setFileType('new')}
                            className='bg-pink-500 text-white rounded-lg px-4 py-2'
                        >
                            Upload New Resume
                        </Button>
                        <Button
                            onClick={() => setFileType('existing')}
                            className='bg-pink-400 text-white rounded-lg px-4 py-2'
                        >
                            Upload Existing Resume
                        </Button>
                        {fileType && (
                            <form onSubmit={handleFileUpload} className='flex flex-col space-y-4'>
                                <input
                                    type="file"
                                    required
                                    className='border border-gray-300 rounded-lg px-4 py-2'
                                />
                                <Button
                                    type="submit"
                                    className='bg-pink-600 text-white rounded-lg px-4 py-2'
                                >
                                    Submit
                                </Button>
                            </form>
                        )}
                    </div>
                </DialogContent>
                <DialogFooter>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default JobDescription;
