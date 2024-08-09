import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer","Data Scientist","Product Design Engineer","Software Engineer","Community Manager","Cloud Solutions Architect"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCart = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);
    return (
        <div className='w-full bg-white p-4 rounded-md shadow-md'>
            <h1 className='font-bold text-lg text-pink-600'>Filter Jobs</h1>
            <hr className='mt-2 border-pink-300' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index} className='my-4'>
                        <h1 className='font-bold text-md text-pink-500'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={itemId} className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem
                                        value={item}
                                        id={itemId}
                                        className='text-pink-600 border-pink-300 focus:ring-pink-400'
                                    />
                                    <Label
                                        htmlFor={itemId}
                                        className='text-gray-700'
                                    >
                                        {item}
                                    </Label>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCart
