import { deleteSearchValue } from "@/app/actions/catalog-actions";
import { SubmitButton } from "@/components/submit-buttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Params = Promise<{ id: string }>

export default async function DeleteBom({ params }: { params: Params }) {
  const { id } = await params
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Är du säker?</CardTitle>
          <CardDescription>
            Katalogvärdet och kopplade artiklar kommer tas bort,
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/catalog">Avbryt</Link>
          </Button>
          <form action={deleteSearchValue}>
            <input type="hidden" name="Id" value={id} />
            <SubmitButton variant="destructive" text="Radera Katalogvärde" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
