import React from 'react';
import Banner from '../Components/Banner';
import StaticSection from '../Components/StaticSection';
import { useLoaderData } from 'react-router';
import VehicleCard from '../Components/VehicleCard';

const Home = () => {

    const data = useLoaderData();

    return (
        <div>
            <Banner></Banner>
            <StaticSection></StaticSection>
            <div>
                <h1 className="text-center text-3xl font-semibold my-8">Latest Vehicles</h1>
                <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                    {data.map((vehicle) => (
                        <VehicleCard vehicle={vehicle} key={vehicle._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;