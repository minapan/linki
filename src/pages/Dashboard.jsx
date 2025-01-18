import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Error from "@/components/ui/error";
import { UrlState } from "@/context";
import { getClicks } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import LinkCard from "@/components/link-card";
import CreateLink from "@/components/create-link";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewType, setViewType] = useState("detail");

  const { user } = UrlState();
  const { loading, data: urls, error, fn: fnUrls } = useFetch(getUrls, user.id);
  const { loading: loadingClicks, data: clicks, fn: fnClicks } = useFetch(getClicks, urls?.map((url) => url.id));

  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls
    ?.filter((url) => url.title.toLowerCase().includes(searchQuery.toLowerCase()))
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

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Liên kết đã tạo</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tổng số lượt clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between my-5">
        <h1 className="text-3xl font-bold">Danh sách liên kết</h1>
        <CreateLink />
      </div>

      <div className="relative mb-4">
        <Input type="text" placeholder="Tìm kiếm..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <Filter className="absolute right-2 top-2" />
      </div>

      {(loading || loadingClicks) && <BarLoader width={"100%"} color={"#36d7b7"} />}
      {error && <Error message={error?.message} />}

      {urls?.length > 0 && (
        <div className="flex flex-wrap items-center sm:justify-end gap-4 rounded-lg shadow-md my-4">
          <div className="flex items-center gap-2 flex-wrap">
            Sắp xếp theo:
            <Select onValueChange={(value) => setSortField(value)} value={sortField}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Ngày tạo</SelectItem>
                <SelectItem value="title">Tiêu đề</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSortOrder(value)} value={sortOrder}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Thứ tự sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Tăng dần</SelectItem>
                <SelectItem value="desc">Giảm dần</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            Dạng xem:
            <Select onValueChange={(value) => setViewType(value)} value={viewType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Chế độ xem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Cơ bản</SelectItem>
                <SelectItem value="detail">Chi tiết</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {filteredUrls?.length ? (
        filteredUrls.map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} viewType={viewType} />
        ))
      ) : (
        <p className="text-center text-gray-400 mt-10">Không có liên kết nào</p>
      )}
    </>
  );
}

export default Dashboard;
