import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";


const MarketingPage = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col">
                <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
                    <Medal className="h-6 w-6 mr-2" />
                    Your Gateway to Achievements
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
                Welcome to Achiveo - Where goals 
                </h1>
                <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-3 w-fit">
                    become realities.
                </div>
            </div>
            <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
            Foster teamwork, organize projects effortlessly, and unlock new productivity levels - your perfect companion for achieving goals is Achievo.

            </div>
            <Button className="mt-6" size='lg' asChild><Link href='/sign-up'>Get Taskify for free</Link></Button>
        </div>
    );
};

export default MarketingPage;
