
import DeleteBomForm from "./bom-form";

type Params = Promise<{ id: string }>

export default async function DeleteBom({ params }: { params: Params }) {
  const { id } = await params

  return (
    <DeleteBomForm bomId={id} />
  );
}
