"use client"

import { useAuth } from "@clerk/nextjs";
import { LandingNavbar } from "./landing-navbar";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { Button } from "./ui/button";
export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text 4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>All of your AI tools in one place</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-600">
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Chatbot.",
                                "Image Generation",
                                "Music Generation",
                                "Code Generation",
                                "Video Generation",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />

                </div>
                <div className="text-sm md:text-xl font-light text-white">
                    Create AI content 10x faster with all of your tools in one place
                </div>
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                    Start Generating For Free
                </Button>
                </Link>
            </div>
            <div className="text-white text-xs md:text-sm font-normal">
                No credit card needed!
            </div>
        </div>       

    )
}