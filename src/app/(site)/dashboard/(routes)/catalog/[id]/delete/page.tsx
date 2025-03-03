import DeleteSearchValueForm from "./searchvalue-form";

type Params = Promise<{ id: string }>

export default async function DeleteSearchValuePage({ params }: { params: Params }) {
  const { id } = await params

  return (
    <DeleteSearchValueForm searchId={id} />
  );
}
