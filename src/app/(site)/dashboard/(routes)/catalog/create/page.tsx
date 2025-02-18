"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { searchValueSchema } from "@/lib/zodSchemas";
import { createSearchValue } from "@/app/actions/catalog-actions";
import { SubmitButton } from "@/components/submit-buttons";
import { useAtomValue } from "jotai";
import { searchValueTypesAtom } from "@/atoms/catalogAtoms";
import { useActionState } from "react";
import { useCurrentSession } from "@/hooks/use-current-session";

function CreateSearchValuePage() {
  const seatchValueTypes = useAtomValue(searchValueTypesAtom);
  const { user}  = useCurrentSession()

  const [lastResult, action] = useActionState(createSearchValue, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: searchValueSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>SÖKVÄRDE</CardTitle>
          <CardDescription>
            Här kan du skapa ett nytt sökvärde
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <Label>Sökvärde</Label>
              <Input
                type="text"
                key={fields.value.key}
                name={fields.value.name}
                defaultValue={fields.value.initialValue}
                className="w-full"
              />
                <Input
                type="hidden"
                key={fields.countryCode.key}
                name={fields.countryCode.name}
                defaultValue={user?.locale}
              />
              <p className="text-red-500">{fields.value.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Typ</Label>
              <Select
                key={fields.valueType.key}
                name={fields.valueType.name}
                defaultValue={fields.valueType.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="söktyp" />
                </SelectTrigger>
                <SelectContent>
                  {seatchValueTypes.data && seatchValueTypes.data.map((vt: any) => (
                    <SelectItem key={vt.id} value={vt.id.toString()}>
                      {vt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.valueType.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Skapa Sökvärde" />
        </CardFooter>
      </Card>
    </form>
  )
}

export default CreateSearchValuePage
