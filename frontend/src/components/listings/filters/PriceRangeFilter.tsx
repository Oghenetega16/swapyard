"use client";

const MIN_PRICE_LIMIT = 0;
const MAX_PRICE_LIMIT = 1000000;

interface PriceRangeFilterProps {
    min: number;
    max: number;
    onChange: (type: 'min' | 'max', value: number) => void;
}

export const PriceRangeFilter = ({ min, max, onChange }: PriceRangeFilterProps) => {
    const minPercent = ((min - MIN_PRICE_LIMIT) / (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) * 100;
    const maxPercent = ((max - MIN_PRICE_LIMIT) / (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) * 100;

    return (
        <div className="mb-8">
            <style jsx>{`
                .range-slider {
                    position: absolute;
                    width: 100%;
                    height: 5px;
                    pointer-events: none;
                    appearance: none;
                    background: transparent;
                    z-index: 20;
                }
                .range-slider::-webkit-slider-thumb {
                    pointer-events: auto;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: white;
                    border: 2px solid #002147;
                    border-radius: 50%;
                    cursor: pointer;
                }
                .range-slider::-moz-range-thumb {
                    pointer-events: auto;
                    width: 16px;
                    height: 16px;
                    background: white;
                    border: 2px solid #002147;
                    border-radius: 50%;
                    cursor: pointer;
                }
            `}</style>
            
            <h4 className="font-semibold text-sm mb-4 text-gray-800">Price Range</h4>
            
            <div className="relative w-full h-1 bg-gray-200 rounded-full mb-6 mt-2">
                <div 
                    className="absolute h-full bg-[#002147] rounded-full"
                    style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                ></div>
                <input 
                    type="range" 
                    min={MIN_PRICE_LIMIT} 
                    max={MAX_PRICE_LIMIT} 
                    value={min} 
                    onChange={(e) => onChange('min', Number(e.target.value))}
                    className="range-slider -top-0.5 left-0"
                    aria-label="Minimum price slider"
                />
                <input 
                    type="range" 
                    min={MIN_PRICE_LIMIT} 
                    max={MAX_PRICE_LIMIT} 
                    value={max} 
                    onChange={(e) => onChange('max', Number(e.target.value))}
                    className="range-slider -top-0.5 left-0"
                    aria-label="Maximum price slider"
                />
            </div>

            <div className="flex items-center gap-2">
                <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 w-full flex items-center">
                    <span className="text-xs text-gray-400 mr-1">₦</span>
                    <input 
                        type="number" 
                        className="bg-transparent w-full text-sm outline-none text-gray-700" 
                        value={min}
                        onChange={(e) => onChange('min', Number(e.target.value))}
                        aria-label="Minimum price input"
                    />
                </div>
                <span className="text-gray-400">-</span>
                <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 w-full flex items-center">
                    <span className="text-xs text-gray-400 mr-1">₦</span>
                    <input 
                        type="number" 
                        className="bg-transparent w-full text-sm outline-none text-gray-700" 
                        value={max}
                        onChange={(e) => onChange('max', Number(e.target.value))}
                        aria-label="Maximum price input"
                    />
                </div>
            </div>
        </div>
    );
};