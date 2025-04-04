
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { translation } from "@/config/translation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

interface Props {
  vehicle: any,
}

export default function VehicleInfoDialog({ vehicle }: Props) {
  const t = useTranslations(translation.ecePage);
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='default' variant='default' disabled={vehicle === undefined}>
          <span>{t('moreInfo')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader >
          <DialogTitle>{t('moreInfoTitle')}</DialogTitle>
        </DialogHeader>
        <div className="w-full h-[600px] flex flex-col mt-3">
          <div className="rounded-md border flex overflow-hidden text-sm">
            <Table >
              <TableHeader className="sticky top-0 z-10 bg-muted">
                <TableRow>
                  <TableHead className="w-[200px]">Title</TableHead>
                  <TableHead >Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{t('rn01')}</TableCell>
                  <TableCell>{vehicle?.rn01}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('fo06')}</TableCell>
                  <TableCell>{vehicle?.fo06}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('fo13')}</TableCell>
                  <TableCell>{vehicle?.fo13}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('fb07')}</TableCell>
                  <TableCell>{vehicle?.fb07}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('fb01')}</TableCell>
                  <TableCell>{vehicle?.fb01}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('fo14')}</TableCell>
                  <TableCell>{vehicle?.fo14}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('fo04')}</TableCell>
                  <TableCell>{vehicle?.fo04}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('fo12dat')}</TableCell>
                  <TableCell>{formatDate(vehicle?.fo12dat)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('fb05')}</TableCell>
                  <TableCell>{vehicle?.fb05}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('td11')}</TableCell>
                  <TableCell>{vehicle?.td11}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('td20')}</TableCell>
                  <TableCell>{vehicle?.td20}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('td21')}</TableCell>
                  <TableCell>{vehicle?.td21}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('td49')}</TableCell>
                  <TableCell>{vehicle?.td49}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('td25')}</TableCell>
                  <TableCell>{vehicle?.td25}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('td29')}</TableCell>
                  <TableCell>{vehicle?.td29}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('td42')}</TableCell>
                  <TableCell>{vehicle?.td42}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('be02dat')}</TableCell>
                  <TableCell>{vehicle?.be02dat ? formatDate(vehicle?.be02dat) : ''}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
