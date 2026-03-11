import Image from "next/image";

export const FeatureIcons = () => {
    const featureList = [
        {
            title: "Secure Transaction",
            description: "Your transactions are secure and with the latest encryption.",
            icon: "/assets/icons/secure.svg" 
        },
        {
            title: "Easy Returns & Refunds",
            description: "Hassle-free returns, refunds and exchanges on eligible items.",
            icon: "/assets/icons/returns.svg" 
        },
        {
            title: "Localized Experience", 
            description: "Browse and sell items locally with location-based listings.",
            icon: "/assets/icons/location.svg" 
        }
    ];

    return (
        <section className="py-8 md:py-12 bg-white" aria-label="Key Features">
            <div className="container mx-auto px-6 md:px-10 lg:px-12 xl:px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {featureList.map((feat, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="shrink-0 flex items-center justify-center w-12 h-12 md:w-12.5 md:h-12.5 bg-[#012E4C] rounded-full mt-0.5">
                                <Image 
                                    src={feat.icon}
                                    alt={feat.title}
                                    width={20} 
                                    height={20} 
                                    className="object-contain w-5 h-5 md:w-4.75 md:h-4.75"
                                />
                            </div>
                            
                            {/* Text Container */}
                            <div className="flex flex-col">
                                <h3 className="font-bold text-gray-900 text-base md:text-lg leading-tight">
                                    {feat.title}
                                </h3>
                                <p className="text-gray-600 text-sm mt-1.5 md:mt-2 leading-relaxed">
                                    {feat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};