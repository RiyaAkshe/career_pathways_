import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Company name is required.');
            return;
        }

        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success('Company registered successfully!');
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            // Display error message from the response if available
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }

    return (
        <div className='bg-pink-50 min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10'>
                <div className='my-10'>
                    <h1 className='font-serif text-4xl text-pink-700'>Your Company Name</h1>
                    <p className='text-gray-600 mt-2'>What would you like to give your company name? You can change this later.</p>
                </div>

                <Label className="text-pink-600">Company Name</Label>
                <Input
                    type="text"
                    className="my-2 border-pink-300 focus:border-pink-500 focus:ring focus:ring-pink-200"
                    placeholder="Google, Microsoft"
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                />
                <div className='flex items-center gap-4 my-10'>
                    <Button
                        variant="outline"
                        className="border-pink-500 text-pink-500 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-pink-500 text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
