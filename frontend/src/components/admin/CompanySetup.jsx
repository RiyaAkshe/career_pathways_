import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
   const params = useParams();
   const navigate = useNavigate();
   const { singleCompany, loading: companyLoading, error: companyError } = useSelector(store => store.company); // Added error handling
   const [input, setInput] = useState({
      name: "",
      description: "",
      website: "",
      location: "",
      file: null
   });
   const [loading, setLoading] = useState(false);

   // Fetch company details
   useGetCompanyById(params.id);

   useEffect(() => {
      if (singleCompany) {
         setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: null // Reset file to prevent displaying old file data
         });
      }
   }, [singleCompany]);

   const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
   }

   const changeFileHandler = (e) => {
      const file = e.target.files?.[0];
      setInput({ ...input, file });
   }

   const submitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);
      if (input.file) {
         formData.append("file", input.file);
      }
      try {
         setLoading(true);
         const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
         });
         if (res.data.success) {
            toast.success(res.data.message);
            navigate("/admin/companies");
         }
      } catch (error) {
         console.error("Error updating company:", error);
         toast.error(error.response?.data?.message || "Error updating company");
      } finally {
         setLoading(false);
      }
   }

   if (companyLoading) return <div className="text-center p-4">Loading...</div>;
   if (companyError) return <div className="text-center p-4 text-red-600">Error loading company data: {companyError}</div>;

   return (
      <div className='bg-pink-50 min-h-screen'>
         <Navbar />
         <div className='max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg'>
            <form onSubmit={submitHandler} className='space-y-6'>
               <div className='flex items-center gap-5 p-4 border-b border-pink-200 mb-6'>
                  <Button 
                     onClick={() => navigate("/admin/companies")}
                     variant="outline"
                     className="flex items-center gap-2 text-pink-500 border-pink-500 hover:bg-pink-100"
                  >
                     <ArrowLeft className='h-5 w-5' />
                     <span>Back</span>
                  </Button>
                  <h1 className='font-serif text-2xl text-pink-700'>Company Setup</h1>
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                     <Label className='text-pink-600'>Company Name</Label>
                     <Input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={changeEventHandler}
                        className='border-pink-300 focus:border-pink-500 focus:ring-pink-200'
                     />
                  </div>
                  <div className='space-y-2'>
                     <Label className='text-pink-600'>Description</Label>
                     <Input
                        type="text"
                        name="description"
                        value={input.description}
                        onChange={changeEventHandler}
                        className='border-pink-300 focus:border-pink-500 focus:ring-pink-200'
                     />
                  </div>
                  <div className='space-y-2'>
                     <Label className='text-pink-600'>Website</Label>
                     <Input
                        type="text"
                        name="website"
                        value={input.website}
                        onChange={changeEventHandler}
                        className='border-pink-300 focus:border-pink-500 focus:ring-pink-200'
                     />
                  </div>
                  <div className='space-y-2'>
                     <Label className='text-pink-600'>Location</Label>
                     <Input
                        type="text"
                        name="location"
                        value={input.location}
                        onChange={changeEventHandler}
                        className='border-pink-300 focus:border-pink-500 focus:ring-pink-200'
                     />
                  </div>
                  <div className='space-y-2'>
                     <Label className='text-pink-600'>Logo</Label>
                     <Input
                        type="file"
                        accept="image/*"
                        onChange={changeFileHandler}
                        className='border-pink-300 focus:border-pink-500 focus:ring-pink-200'
                     />
                  </div>
               </div>
               {
                  loading ? 
                  <Button className="w-full my-4 bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"> 
                     <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
                  </Button> : 
                  <Button type="submit" className="w-full my-4 bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300">Update</Button>
               }
            </form>
         </div>
      </div>
   )
}

export default CompanySetup;
