import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chart from "@/components/ui/custom/Chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type singleStockState = Record<string, any>;

const StockInfo = () => {
  const { stockSymbol } = useParams();
  const [singleStockData, setSingleStockData] = useState<singleStockState>();
  // const [currentStockRange, setCurrentStockRange] = useState("1D");

  useEffect(() => {
    getSingleStockInfo();
  }, []);

  const getSingleStockInfo = async () => {
    const stockRes = await axios(
      `${import.meta.env.VITE_DEV_URL}stocks/getSingleStock/${stockSymbol}/1D`
    );
    setSingleStockData(() => ({ ...stockRes.data }));
  };

  const stockValueRange = async (timeRange: string) => {
    // setCurrentStockRange(timeRange);
    const stockRes = await axios(
      `${
        import.meta.env.VITE_DEV_URL
      }stocks/getSingleStock/${stockSymbol}/${timeRange}`
    );
    setSingleStockData(() => ({ ...stockRes.data }));
  };

  const stockPeriodArr = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y"];

  return (
    <div className="py-8 px-10">
      <div className="  sm:w-[70%] sm:h-[70%] lg:w-[50%] lg:h-[50%]">
        <div className="flex items-center gap-5">
          <h1 className="text-xl ">
            {singleStockData?.meta.longName}{" "}
            <span className="font-medium">
              ({singleStockData?.meta.symbol})
            </span>
          </h1>
          <Button size="sm" className="cursor-pointer">
            <FolderPlus /> Watchlist
          </Button>
        </div>

        <div className="mt-2">
          <p className="text-2xl flex items-start">
            246.74 <span className="text-base mt-1 ml-2">+3.59</span>
            <span className="text-base mt-1 ml-1">(+1.50%)</span>
          </p>
        </div>

        <Tabs defaultValue={stockPeriodArr[0]}>
          <TabsList className="w-[90vw] lg:w-[40vw] sm:w-[60vw] justify-between mt-6 mb-4">
            {stockPeriodArr.map((period, index) => {
              return (
                <TabsTrigger
                  onClick={() => stockValueRange(period)}
                  value={period}
                  key={index}
                >
                  {period}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {/* <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>

        <Chart
          key={singleStockData?.meta.symbol}
          singleStockData={singleStockData ?? {}}
        />
      </div>
    </div>
  );
};

export default StockInfo;
