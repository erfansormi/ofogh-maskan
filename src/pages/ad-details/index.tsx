import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/use-fetch";
import { AdsDataType } from "../../utils/schemas/ads";
import Layout from "../../components/layout";
import TemplateDataStates from "../../components/common/template-data-states";
import Map from "../../components/common/map";
import { numberSeparator } from "../../utils/numbers";
import LinerAdDetail from "./components/liner-ad-detail";
import CopyIcon from "../../components/ui/copy-icon";
import { timeAgo } from "../../utils/time";
import Button from "../../components/ui/button";
import EditAdModal from "./components/edit-ad-modal";
import { useUserContext } from "../../context/user-context";
import DeleteAdModal from "./components/delete-ad-modal";

const AdDetails = () => {
  const params = useParams();
  const { user } = useUserContext();
  const { data, error, loading } = useFetch<AdsDataType>(`/ads/${params.id}`);

  const isOwner = data && user && data.userId === user.id;

  return (
    <Layout>
      <TemplateDataStates
        error={error}
        isLoading={loading}
        loadingItemsCount={2}
        classNames={{
          root: "!md:grid-cols-2 !grid-cols-1 max-w-4xl mx-auto gap-8 mt-10 place-items-center",
          skeleton: "h-72",
        }}
      >
        <div className="max-w-4xl flex md:flex-row flex-col gap-8 col-span-full w-full">
          <div className="basis-full md:basis-1/2 flex flex-col gap-4">
            {/* DETAILS */}
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl">{data?.title}</h1>
                <p className="mt-2 text-sm text-slate-500">
                  {data?.createdAt && timeAgo(data.createdAt)}
                </p>
              </div>
              <hr />

              <LinerAdDetail title="متراژ" value={data?.meterage} />
              <hr />

              <LinerAdDetail
                title="قیمت"
                value={data?.price ? numberSeparator(data.price) : null}
              />
              <hr />

              <LinerAdDetail
                title="شماره موبایل"
                value={
                  <span className="flex items-center gap-1">
                    <CopyIcon text={data?.phoneNumber || ""} />

                    <a className="text-inherit font-normal" href={`tel:${data?.phoneNumber}`}>
                      {data?.phoneNumber}
                    </a>
                  </span>
                }
              />
              <hr />

              <div className="flex flex-col gap-3">
                <span className="font-medium text-blue-500">توضیحات</span>
                <p className="whitespace-pre leading-loose">{data?.description}</p>
              </div>
            </div>

            {/* OWNER BUTTONS */}
            {isOwner ? (
              <>
                <hr />
                <div className="self-end flex items-center gap-2 text-sm">
                  {data && <EditAdModal defaultValues={data} id={params.id ? +params.id : 1} />}
                  <DeleteAdModal />
                </div>
              </>
            ) : null}
          </div>

          {/* LOCATION */}
          <div className="basis-full md:basis-1/2 min-h-72 flex flex-col gap-4">
            <div className="*:min-h-72 h-full">
              <Map staticMap position={data?.location} />
            </div>

            <LinerAdDetail title="استان" value={data?.province} />
            <hr />

            <LinerAdDetail title="شهر" value={data?.city} />
            <hr />

            <p>{data?.address}</p>
          </div>
        </div>
      </TemplateDataStates>
    </Layout>
  );
};

export default AdDetails;
