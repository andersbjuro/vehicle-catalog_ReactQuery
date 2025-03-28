
import { Bom } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { routes } from "@/config/routes";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";

interface CardProps {
  bom: Bom;
  handleClick: () => void;
}

export const BomCard = ({
  bom,
  handleClick,
}: CardProps) => {
  const t = useTranslations(translation.bompage);
  return (
    <section
      className="flex min-h-[100px] w-full flex-col justify-between bg-muted hover:bg-accent rounded-[14px] px-5 py-2 max-w-[500px]">
      <article>
        <div className="flex flex-col gap-1">
          <div onClick={handleClick} className="flex items-center justify-between cursor-pointer">
            <span className="truncate w-full">{bom.name} </span>
            <span className="ml-5 whitespace-nowrap text-xs text-muted-foreground">{bom.noOfItems}</span>
          </div>
          <p className="text-xs text-muted-foreground">{bom.id}</p>
          <p className="text-xs text-muted-foreground">{bom.brand.name} - {bom.productGroup.name} - Land {bom.countryCode}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{t('created')} {formatDate(bom.created)} {t('updated')} {formatDate(bom.modified)}</p>
            <div className="ml-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={routes.editBom(bom.id)}>
                      {t('show')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={routes.deleteBom(bom.id)}>
                      {t('delete')}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}
