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
        <section className="py-12 bg-white" aria-label="Key Features">
            <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-12">
                {featureList.map((feat, i) => (
                    <div key={i} className="flex items-start gap-4 max-w-sm">
                        <div className="shrink-0 flex items-center justify-center w-12.5 h-12.5 bg-[#012E4C] rounded-full">
                            <Image 
                                src={feat.icon}
                                alt={feat.title}
                                width={19} 
                                height={19} 
                                className="object-contain"
                            />
                        </div>
                        
                        {/* Text Container */}
                        <div className="flex flex-col">
                            <h3 className="font-bold text-gray-900 text-lg leading-tight">
                                {feat.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                                {feat.description}
                            </p>
                        </div>
                    </div>
                    ))}
            </div>
        </section>
    );
};