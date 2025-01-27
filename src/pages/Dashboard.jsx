import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Error from "@/components/ui/error";
import { UrlState } from "@/context";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Input } from "@/components/ui/input";
import { BarLoader } from "react-spinners";
import LinkCard from "@/components/link-card";
import CreateLink from "@/components/create-link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Filter } from "lucide-react";
import { getClicks } from "@/db/apiClicks";
import LinkCardSkeleton from "@/components/ui/linkcard-skeleton";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewType, setViewType] = useState("detail");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const totalPages = Math.ceil((filteredUrls?.length || 0) / itemsPerPage);
  const paginatedUrls = filteredUrls?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      localStorage.setItem("currentPage", page);
    }
  };

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
        <div className="flex flex-wrap items-center sm:justify-end gap-4 rounded-lg my-4">
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

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-5 w-full mt-4">
              <LinkCardSkeleton />
            </div>
          ))}
        </div>
      ) : error ? (
        <Error message={error.message} />
      ) : paginatedUrls?.length ? (
        paginatedUrls.map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} viewType={viewType} />
        ))
      ) : (
        <div className="flex flex-col items-center py-10 gap-6">
          <p className="text-center text-2xl text-sky-500">
            Không có liên kết nào
          </p>
          <img src="/empty.svg" alt="empty" className="h-40"/>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className={"mt-6"}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              />
            </PaginationItem>
            {[...Array(totalPages).keys()].map((page) => {
              const pageIndex = page + 1;
              if (pageIndex === currentPage || (pageIndex < currentPage + 2 && pageIndex > currentPage - 2)) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(pageIndex)}
                      className={pageIndex === currentPage ? "font-bold text-blue-500 shadow-md shadow-gray-400 dark:shadow-gray-600" : ""}
                    >
                      {pageIndex}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              if (pageIndex === currentPage - 2 || pageIndex === currentPage + 2) {
                return <PaginationEllipsis key={page} />;
              }
              return null;
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

export default Dashboard;
