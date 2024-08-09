import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';

import { RadioGroup } from '../ui/radio-group';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';



const SignUp = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const {loading}=useSelector(store => store.auth);
    const dispatch=useDispatch();
    const navigate = useNavigate();


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }



    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} action="" className="bg-white w-full max-w-md border border-gray-200 rounded-lg p-6 shadow-lg my-10">
                    <h1 className="font-bold text-[#702459] text-center mb-6 text-2xl">Connect, Grow, Succeed - Sign Up Now!</h1>
                    <div className="mb-4">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="ABC"
                            className="mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <Label>Email-Id</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="abc@gmail.com"
                            className="mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <Label>Contact number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="1234567890"
                            className="mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="1234"
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-6">
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="employee" className="cursor-pointer">Employee</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2" className="cursor-pointer">Employer</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="mb-4">
                        <Label>Profile</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer mt-1"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        {

                            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white mb-4">Enroll</Button>
                        }
                        <span className="text-center mt-2">
                            Already Registered? <Link to="/login" className="text-blue-600">Login</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
