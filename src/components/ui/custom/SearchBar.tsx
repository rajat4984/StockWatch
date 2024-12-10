import axios from "axios";
import { ChartCandlestick } from "lucide-react";
import { ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type searchItem = Record<string, any>;

interface searchSuggestionProps {
  searchData: searchItem[];
}

const SearchSuggestion = ({ searchData }: searchSuggestionProps) => {
  return (
    <div className="absolute  w-full ">
      {searchData.slice(0, 4).map((searchStock, index) => {
        return (
          searchStock.quoteType == "EQUITY" && (
            <div
              className="bg-[#232323] p-3 last:rounded-b-lg border-b border-gray-700 hover:bg-[#353535] cursor-pointer text-sm"
              key={index}
            >
              <Link
                to={`/stockInfo/${searchStock.symbol}`}
                className="flex justify-between items-start"
              >
                <div>
                  <p>{searchStock.symbol}</p>
                  <p>{searchStock.longname}</p>
                </div>

                <p>{searchStock.quoteType}</p>
              </Link>
            </div>
          )
        );
      })}
    </div>
  );
};

const SearchBar = () => {
  const [searchData, setSearchData] = useState<searchItem[]>([]);
  const [searchString, setSearchString] = useState<string>("");

  const searchSuggestion = async (searchTerm: string) => {
    const searchRes = await axios(
      `http://localhost:4000/stocks/search/${searchTerm}`
    );

    setSearchString(searchTerm);
    setSearchData([...searchRes.data.quotes]);
  };
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="relative">
        <input
          placeholder="Search your favourite stock"
          className={`main-input pl-3 placeholder-gray-300 w-[350px] md:w-[500px] h-[50px] transition-all rounded-t-lg ${
            !searchString && "rounded-lg"
          }`}
          onChange={(e) => searchSuggestion(e.target.value)}
        />
        {/* <Search className="text-gray-400 absolute right-3 top-[30%]" /> */}
        <ChartCandlestick
          strokeWidth={1.4}
          className="text-gray-300 absolute right-3 top-[30%]"
        />
        {searchString && <SearchSuggestion searchData={searchData} />}
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
  );
};

export default SearchBar;
