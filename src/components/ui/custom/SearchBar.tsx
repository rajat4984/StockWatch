import { Search, ChartCandlestick } from "lucide-react"
import { ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react"

const SearchBar = () => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
                <input placeholder="Search your favourite stock" className="main-input pl-3 placeholder-gray-300 w-[350px] md:w-[500px] h-[50px] rounded-lg" />
                {/* <Search className="text-gray-400 absolute right-3 top-[30%]" /> */}
                <ChartCandlestick strokeWidth={1.4} className="text-gray-300 absolute right-3 top-[30%]" />

            </div>

            <div className="flex justify-between m-5">
                <div className="flex items-center gap-1 text-positive-green cursor-pointer">
                    Top gainers <ArrowUpWideNarrow />
                </div>

                <div className="flex items-center gap-1 text-negetive-red cursor-pointer">
                    Top losers <ArrowDownWideNarrow />
                </div>
            </div>
        </div>
    )
}

export default SearchBar;