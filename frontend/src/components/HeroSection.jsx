import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 min-h-screen flex flex-col items-center justify-center p-6'>
            <span className='inline-block px-8 py-4 rounded-full bg-yellow-100 text-[#511660] font-semibold text-lg shadow-lg'>
                Unlocking Potential, Shaping Futures
            </span>
            <h1 className='text-5xl font-extrabold text-center mt-6'>
                <span className="text-[#702459]">Explore Opportunities <br /> Submit Applications</span>
                <br />
                <span className='text-[#d53f8c]'> & Secure Your Ideal Career</span>
            </h1>
            <p className='mt-4 text-lg text-gray-700 text-center max-w-3xl'>
                Career Pathways is an innovative platform connecting job seekers with their ideal career opportunities through advanced search and application tools.
            </p>
            <div className="flex w-full max-w-md shadow-lg border border-gray-300 rounded-full mt-8 bg-white overflow-hidden">
                <Input
                    type="text"
                    placeholder="Unlock Your Ultimate Job"
                    onChange={(e) => setQuery(e.target.value)}
                    className="outline-none border-none w-full px-4 py-3 text-lg"
                />
                <Button onClick={searchJobHandler} className="bg-[#b83280] hover:bg-[#a62a6e] transition-colors rounded-r-full p-3">
                    <Search className='h-6 w-6 text-white' />
                </Button>
            </div>
        </div>
    )
}

export default HeroSection
