import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

function Link() {
  const navigate = useNavigate()
  const { user } = UrlState()
  const { id } = useParams()
  const { loading, data: url, fn, error } = useFetch(getUrl, { id, user_id: user?.id })
  const { loading: loadingStats, data: stats, fn: fnStats } = useFetch(getClicksForUrl, id)
  const { loading: loadingDelete, error: errorDelete, fn: fnDelete } = useFetch(deleteUrl, id)

  useEffect(() => {
    fn()
    fnStats()
  }, [])

  if (!loading && !url) navigate("/error/404")

  return (<>
    {(loading || loadingStats) && (<BarLoader width={"100%"} color={"#36d7b7"} />)}
    <div>
      <span>{url?.title}</span>
    </div>
  </>);
}

export default Link;