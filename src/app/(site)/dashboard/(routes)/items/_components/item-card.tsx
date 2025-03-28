
import { OeItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/config/routes";
import { useTranslations } from "next-intl";

interface CardProps {
  item: OeItem;
  handleClick: () => void;
}

export const ItemCard = ({
  item,
  handleClick,
}: CardProps) => {
  const t = useTranslations('OEPage');
  return (
    <section
      // onClick={handleClick}
      className="flex min-h-[100px] w-full flex-col justify-between bg-muted hover:bg-accent rounded-[14px] px-5 py-2 max-w-[500px]">
      <article>
        <div className="flex flex-col gap-1">
          <div onClick={handleClick} className="flex items-center justify-between cursor-pointer">
            <span className="truncate w-full">{item.oeName} </span>
          </div>
          <p className="text-xs text-muted-foreground">{item.oeItemId}</p>
          <p className="text-xs text-muted-foreground">{item.brand.name} - {item.productGroup.name} - Land {item.countryCode}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{t('created')} {formatDate(item.created)} {t('updated')} {formatDate(item.modified)}</p>
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
                    <Link href={routes.editItem(item.oeItemId)}>
                      {t('show')}
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
