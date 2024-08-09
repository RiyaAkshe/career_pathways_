import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const categories = [
   "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Product Design Engineer", "Software Engineer", "Community Manager", "Cloud Solutions Architect"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filterJobsByCategory = (category) => {
        dispatch(setSearchedQuery(category));
        navigate("/browse"); // Navigate to the browse page where jobs are filtered by the category
    };

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        categories.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <Button
                                    onClick={() => filterJobsByCategory(cat)}
                                    variant="outline"
                                    className="bg-[#b83280] text-white"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
