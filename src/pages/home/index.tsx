import { Image } from "lucide-react";
import Card from "../../components/ui/card";
import Layout from "../../components/layout";
import { useFetch } from "../../hooks/use-fetch";
import { AdsDataType } from "../../utils/schemas/ads";
import BrandTitle from "../../components/common/brand-title";
import TemplateDataStates from "../../components/common/template-data-states";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/time";

const HomePage = () => {
  const { data, error, loading } = useFetch<AdsDataType[]>("/ads");

  return (
    <Layout>
      <div className="flex flex-col gap-6 min-h-[calc(100dvh-6rem)]">
        <div className="center">
          <h1 className="text-3xl">
            <span>
              خرید مسکن نو با <BrandTitle hasLink={false} />
            </span>
          </h1>
        </div>

        {/* AD CARDS */}
        <div className="grow flex-col mt-10 w-full">
          <TemplateDataStates
            error={error}
            isLoading={loading}
            isDataEmpty={!!(data && data.length < 1)}
          >
            {data?.map((item) => (
              <Card key={item.id}>
                <Link
                  className="flex flex-col text-slate-500 dark:text-slate-400 gap-4 text-inherit"
                  to={`/ad-details/${item.id}`}
                >
                  <div className="bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 center h-28">
                    <Image size={60} />
                  </div>
                  <div>
                    <span className="mb-1 block font-medium text-slate-700 dark:text-slate-50">
                      {item.province}
                    </span>
                    <p className="text-sm h-10 line-clamp-2">{item.address}</p>
                  </div>
                  <span className="text-xs font-normal self-end">{timeAgo(item.createdAt)}</span>
                </Link>
              </Card>
            ))}
          </TemplateDataStates>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
