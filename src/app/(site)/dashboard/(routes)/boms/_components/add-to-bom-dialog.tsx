
import { toast } from "sonner"
import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle} from "@/components/ui/dialog";
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Bom } from "@/types";

interface Props {
  bom: Bom,
  rowIds: any,
  open: boolean;
  onClose: () => void;
}

export default function AddToBomDialog({
  bom,
  rowIds,
  open,
  onClose,
}: Props) {

  const [option, setOption] = useState('0');
  // const bom = useAtomValue(bomAtom);
  // const rowIds = useAtomValue(selectedRowIds);
  // const { mutate: addItemsToBom, isError: bomError, isPending } = useAtomValue(addToBom);

  // const addItems = async () => {
  //   addItemsToBom({ bomId: bom?.id!, items: rowIds, option: option })
  //   onClose()
  //   if (!bomError)
  //     toast.success("Artiklar tillaggda till bomlistan")
  // }

  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lägg till Artiklar till bomlistan - {bom.id}</DialogTitle>
        </DialogHeader>
        <div >
          <Select value={option} onValueChange={setOption}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Välj alternativ för updatering" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Alternativ</SelectLabel>
                <SelectItem value="0">Bomrader</SelectItem>
                <SelectItem value="1">Bomrader + Katalograder</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            variant="default"

          >
            Updatera
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Avbryt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
