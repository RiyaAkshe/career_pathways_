import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    //const user = false;
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
       
        <div className='bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 shadow-lg'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>
                <div>
                    <h1 className='text-3xl font-bold text-[#702459]'>
                        Career<span className='text-[#a61c8a]'>Pathways</span>
                    </h1>
                </div>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-8'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className="hover:text-[#a61c8a] cursor-pointer"><Link to="/">Home</Link></li>
                                    <li className="hover:text-[#a61c8a] cursor-pointer"><Link to="/jobs">Jobs</Link></li>
                                    <li className="hover:text-[#a61c8a] cursor-pointer"><Link to="/browse">Browse</Link></li>
                                    <li className="hover:text-[#a61c8a] cursor-pointer"><Link to="/reviews">Company Reviews</Link></li>
                                </>
                            )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline" className="border-[#a61c8a] text-[#a61c8a] hover:bg-[#fbb6ce]">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#a61c8a] hover:bg-[#b83280] text-white">Sign-Up</Button></Link>
                            </div>
                        ) : (
                            <div className='flex items-center gap-4'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-3 w-80 bg-white border border-gray-300 rounded-md shadow-lg">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                </Avatar>
                                                <div>
                                                    <h6 className="font-medium text-[#a61c8a]">{user?.fullname}</h6>
                                                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button variant="link" className="p-0 text-[#a61c8a] hover:underline"><Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link" className="p-0 text-[#a61c8a] hover:underline">Log-Out</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;
