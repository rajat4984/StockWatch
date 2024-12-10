import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chart from "@/components/ui/custom/Chart";

const StockInfo = () => {
  const stockPeriodArr = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y"];
  return (
    <div className="py-8 px-10">
      <div className="  sm:w-[70%] sm:h-[70%] lg:w-[50%] lg:h-[50%]">
        <div className="flex items-center gap-5">
          <h1 className="text-xl ">
            Apple Inc. <span className="font-medium">(AAPL)</span>
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
                <TabsTrigger value={period} key={index}>
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

        <Chart />
      </div>
    </div>
  );
};

export default StockInfo;
