"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials = [
    {
        name: "Leonard",
        avatar: "A",
        title: "Physicist",
        description: "Finally, a place that pulls all of my favorite ai models into one simple dashboard!"
    },
    {
        name: "Sheldon",
        avatar: "A",
        title: "Theoretical Physicist",
        description: "This is the bees knees!"
    },
    {
        name: "Walowitz",
        avatar: "A",
        title: "Engineer",
        description: "Engineers don't get PHd's, OKAY?"
    },
    {
        name: "Kuthrapali",
        avatar: "A",
        title: "Physicist",
        description: "Tearing the face off the universe to say, hey girl, what's up?"
    },
]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                 <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                 </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
        )
    };
    

