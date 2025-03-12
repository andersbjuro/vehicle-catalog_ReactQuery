"use client"

import { deleteBom } from "@/actions/bom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DeleteBomForm({ bomId }: { bomId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => {
      return deleteBom(bomId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boms"] })
      router.push(routes.boms)
    },
  })

  const removeBom = async () => {
    await mutation.mutateAsync()
  }

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Är du säker?</CardTitle>
          <CardDescription>
            Alla data och bomrader kommer tas bort,
            men inte kopplade artiklar i katalogen
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href={routes.boms}>Avbryt</Link>
          </Button>

          {mutation.isPending ? (
            <Button disabled variant='destructive'>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Arbetar
            </Button>
          ) : (
            <Button variant='destructive' onClick={() => removeBom()}>
              Radera Bom
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
