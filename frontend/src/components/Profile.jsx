import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    // Determine if resume is available
    const isResume = !!user?.profile?.resume;

    return (
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-2xl mt-8 p-8 transition-transform transform hover:scale-105">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <Avatar className="h-24 w-24 border-4 border-pink-500 shadow-lg rounded-full">
                            <AvatarImage
                                src="https://i.pinimg.com/564x/a0/b0/e8/a0b0e899f18c003c7d43269e561c3b0f.jpg"
                                className="object-cover rounded-full"
                            />
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">{user?.fullname}</h1>
                            <p className="mt-2 text-gray-700 text-sm max-w-lg">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail className="text-gray-600" />
                        <span className="text-gray-800">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact className="text-gray-600" />
                        <span className="text-gray-800">{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1 className="font-bold text-pink-600 text-xl">Skills</h1>
                    <div className="flex items-center gap-2 mt-2">
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold text-pink-600">Resume</Label>

                    {
                        isResume ? <a target='_blank' rel='noopener noreferrer' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }

                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h1 className="text-2xl font-bold text-pink-600 mb-4">Application Records</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
