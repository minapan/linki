import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Error from "@/components/ui/error";
import { UrlState } from "@/context";
import { getClicks } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input"
import { useEffect } from "react";
import { useState } from "react";
import { BarLoader } from "react-spinners";
import LinkCard from "@/components/link-card";
import CreateLink from "@/components/create-link";

function Dashboard() {
  const [ searchQuery, setSearchQuery ] = useState("");
  const { user } = UrlState();
  const { loading, data: urls, error, fn: fnUrls } = useFetch(getUrls, user.id);
  const { 
    loading: loadingClicks, 
    data: clicks, 
    fn: fnClicks 
  } = useFetch(
    getClicks, 
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (<>
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Liên kết đã tạo</CardTitle>
        </CardHeader>
        <CardContent><p>{urls?.length || 0}</p></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tổng số lượt clicks</CardTitle>
        </CardHeader>
        <CardContent><p>{clicks?.length || 0}</p></CardContent>
      </Card>
    </div>

    <div className="flex justify-between my-5">
      <h1 className="text-3xl font-bold">Các liên kết</h1>
      <CreateLink />
    </div>

    <div className="relative mb-4">
      <Input type="text" placeholder="Tìm kiếm..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></Input>
      <Filter className="absolute right-2 top-2" />
    </div>
    {(loading || loadingClicks) && (<BarLoader width={"100%"} color={"#36d7b7"} />)}
    {error && <Error message={error?.message} />}
    {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
  </>);
}

export default Dashboard;