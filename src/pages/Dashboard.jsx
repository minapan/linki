import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

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

  const filteredUrls = urls
    ?.filter((url) =>
      url.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

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

    {urls?.length > 0 && (
      <div className="my-4">
        <div className="flex justify-between items-center flex-row-reverse">
          <div className="flex items-center gap-4">
            <Select onValueChange={(value) => setSortField(value)} value={sortField}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Ngày tạo</SelectItem>
                <SelectItem value="title">Tiêu đề</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
            </Button>
          </div>
        </div>
      </div>
    )}


    {filteredUrls?.length ? (
      filteredUrls.map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))
    ) : (
      <p className="text-center text-gray-400 mt-10">Không có liên kết nào</p>
    )}
  </>);
}

export default Dashboard;