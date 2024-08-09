import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (companies) {
            const filteredCompany = companies.filter((company) => {
                if (!searchCompanyByText) {
                    return true;
                }
                return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
            });
            setFilterCompany(filteredCompany);
        }
    }, [companies, searchCompanyByText]);

    return (
        <div className='p-6 bg-pink-50 rounded-lg shadow-lg'>
            <Table className="min-w-full bg-white rounded-lg overflow-hidden">
                <TableCaption className="text-lg font-semibold text-pink-600 mb-4">Overview of Your Recent Company Registrations</TableCaption>
                <TableHeader className="bg-pink-100 border-b border-pink-200">
                    <TableRow>
                        <TableHead className="py-3 px-4 text-pink-700">Logo</TableHead>
                        <TableHead className="py-3 px-4 text-pink-700">Name</TableHead>
                        <TableHead className="py-3 px-4 text-pink-700">Date</TableHead>
                        <TableHead className="py-3 px-4 text-right text-pink-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="py-4 px-4 text-center text-pink-600">
                                You haven't registered any company yet!
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company) => (
                            <TableRow key={company.id} className="border-b border-pink-200 hover:bg-gray-100 transition-colors duration-200">
                                <TableCell className="py-4 px-4">
                                    <Avatar>
                                        <AvatarImage src={company.logo} className="w-12 h-12 rounded-full border border-pink-300" />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="py-4 px-4 text-pink-800">{company.name}</TableCell>
                                <TableCell className="py-4 px-4 text-pink-600">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="py-4 px-4 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-pink-600 hover:text-pink-800 cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white border border-pink-200 rounded-lg shadow-lg">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
                                                <Edit2 className="w-4 text-pink-600" />
                                                <span className="text-pink-600">Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
