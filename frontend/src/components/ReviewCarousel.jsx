import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const categories = [
   "BELLA", "AMAZON", "GOOGLE", "MICROSOFT", "INSTAGRAM", "FACEBOOK", "IBM", "APPLE"
];

const ReviewCarousel = () => {
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
                                    className="bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-colors duration-300"
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

export default ReviewCarousel;
