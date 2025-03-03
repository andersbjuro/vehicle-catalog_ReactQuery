import { z } from "zod";

export const createSearchValueSchema  = z.object({
  searchValue: z.string().min(3,'Namn måste vara mellan 3 och 25 tecken').max(25,'Namn måste vara mellan 3 och 25 tecken'),
  valueType: z.number().gt(0,'Typ är obligatoriskt'),
  countryCode: z.number().gt(0)
});

export const createBomSchema = z.object({
  name: z.string().min(3,'Namn måste vara mellan 3 och 100 tecken').max(100,'Namn måste vara mellan 3 och 100 tecken'),
  brandId: z.number().gt(0,'Varumärke är obligatoriskt'),
  productGroupId: z.number().gt(0,'Produktgrupp är obligatoriskt'),
  countryCode: z.number().gt(0)
});

export const searchValueSchema = z.object({
  value: z.string().min(3).max(50),
  valueType: z.number(),
  countryCode: z.number()
});
