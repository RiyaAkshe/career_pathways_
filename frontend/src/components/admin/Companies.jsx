import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'


const Companies = () => {
    useGetAllCompanies();
    const[input,setInput]=useState("");
    const navigate=useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 p-6'>
                <div className='flex items-center justify-between my-5 bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 shadow-lg p-6 rounded-lg'>
                    <Input
                        className="w-1/3 p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={()=>navigate("/admin/companies/create") }className="bg-pink-500 text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-300 ease-in-out p-2 rounded-lg">
                    Advertise Company
                    </Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies
