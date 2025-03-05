import { LoaderCircle } from 'lucide-react'

export default function loading() {
  return (
    <div className="flex flex-1 items-center justify-center mx-auto">
      <LoaderCircle className="size-24 animate-spin" />
    </div>
  )
}
