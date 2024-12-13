import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chart from "@/components/ui/custom/Chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import dateformat from "dateformat";

type singleStockState = Record<string, any>;
interface ObjectLiteral {
  [key: string]: any;
}

const StockInfo = () => {
  const { stockSymbol } = useParams();
  const [singleStockData, setSingleStockData] = useState<singleStockState>();
  const [chartData, setChartData] = useState([]);
  const [currentRange, setCurrentStockRange] = useState("1d");

  // const [currentStockRange, setCurrentStockRange] = useState("1D");

  useEffect(() => {
    getSingleStockInfo();
  }, []);

  useEffect(() => {
    formatChartData();
  }, [singleStockData]);

  const getSingleStockInfo = async () => {
    const stockRes = await axios(
      `${import.meta.env.VITE_DEV_URL}stocks/getSingleStock/${stockSymbol}/1D`
    );
    setSingleStockData(() => ({ ...stockRes.data }));
  };

  const stockValueRange = async (timeRange: string) => {
    setCurrentStockRange(timeRange);
    const stockRes = await axios(
      `${
        import.meta.env.VITE_DEV_URL
      }stocks/getSingleStock/${stockSymbol}/${timeRange}`
    );
    setSingleStockData(() => ({ ...stockRes.data }));
  };

  const formatChartData = () => {
    let formattedDate = "";
    let uniqueDates = new Set();
    const dataArr = singleStockData?.quotes?.map((item: ObjectLiteral) => {
      console.log(item, "item");
      switch (currentRange) {
        case "1D":
          formattedDate = dateformat(item.date, "dd/mm");
          break;
        case "5D":
          formattedDate = dateformat(item.date, "dd/mm");
          break;

        case "1M":
          formattedDate = dateformat(item.date, "dd/mm");
          break;
        case "6M":
          formattedDate = dateformat(item.date, "mm/yyyy");
          break;

        case "YTD":
          formattedDate = dateformat(item.date, "mm/yy");
          break;

        case "1Y":
          formattedDate = dateformat(item.date, "mm/yy");
          break;

        case "5Y":
          formattedDate = dateformat(item.date, "mm/yy");
          break;

        default:
          break;
      }

      if (uniqueDates.has(formattedDate)) {
        formattedDate = "";
      } else {
        uniqueDates.add(formattedDate);
      }

      return {
        value: Number(item?.close?.toFixed(2)),
        date: formattedDate,
      };
    });

    // dataArr?.unshift({ value: 0, date: "" });
    setChartData(dataArr);
  };

  const stockPeriodArr = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y"];

  return (
    <div className="py-8 px-4 md:px-12">
      <div className="sm:w-[70%] sm:h-[70%] lg:w-[90%] lg:h-[10%]">
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
        </Tabs>

        <Chart
          key={singleStockData?.meta.symbol}
          singleStockData={chartData ?? {}}
        />
      </div>
    </div>
  );
};

export default StockInfo;
