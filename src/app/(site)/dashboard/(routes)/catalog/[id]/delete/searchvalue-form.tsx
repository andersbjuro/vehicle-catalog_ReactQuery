"use client"

import { deleteSearchValue } from "@/actions/catalog";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DeleteSearchValueForm({ searchId }: { searchId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => {
      return deleteSearchValue(searchId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalog"] })
      router.push('/dashboard/catalog')
    },
  })

  const removeSearchValue = async () => {
    await mutation.mutateAsync()
  }

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Är du säker?</CardTitle>
          <CardDescription>
            Katalogvärdet och kopplade artiklar kommer tas bort
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/catalog">Avbryt</Link>
          </Button>

          {mutation.isPending ? (
            <Button disabled variant='destructive'>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Arbetar
            </Button>
          ) : (
            <Button variant='destructive' onClick={() => removeSearchValue()}>
              Radera Sökvärde
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
