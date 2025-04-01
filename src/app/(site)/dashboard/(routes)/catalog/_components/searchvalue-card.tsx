import { SearchValue } from "@/types";
import { formatDate } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/config/routes";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";

interface CardProps {
  searchValue: SearchValue;
  handleClick: () => void;
}

export const SearchValueCard = ({
  searchValue,
  handleClick,
}: CardProps) => {
  const t = useTranslations(translation.catalogPage);
  return (
    <section
      className="flex min-h-[100px] w-full flex-col justify-between bg-muted hover:bg-accent rounded-[14px] px-5 py-2 max-w-[500px]">
      <article>
        <div className="flex flex-col gap-1">
          <div onClick={handleClick} className="flex items-center justify-between cursor-pointer">
            <span className="truncate w-full">{searchValue.value} </span>
            <span className="ml-5 whitespace-nowrap text-xs text-muted-foreground">{searchValue.noOfItems}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2"> {searchValue?.searchValueType?.id} - {searchValue!.searchValueType!.name} - Land {searchValue?.countryCode}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{t('created')} {formatDate(searchValue.created!)} {t('updated')} {formatDate(searchValue.modified!)}</p>
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
                    <Link href={routes.editCatalog(searchValue.id)}>
                      {t('show')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={routes.deleteCatalog(searchValue.id)}>
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
