import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Trash } from "lucide-react";

// eslint-disable-next-line react/prop-types
function DeleteLink({ fnDelete, onSuccess, loadingDelete }) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    fnDelete()
      .then(() => {
        if (onSuccess) {
          onSuccess(); 
        }
        setOpen(false);
      })
      .catch(() => {
        setOpen(false);
      });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => setOpen(true)}
            disabled={loadingDelete}
          >
            {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa liên kết này?</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa liên kết này không? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className={"gap-4"}>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteLink;
