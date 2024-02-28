import { Check, X } from "lucide-react";
import { Button } from "./ui/button";

export function CreateTagForm() {
  return (
    <form className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="name">Tag Name</label>
        <input className="border-zinc-800 rounded-lg px-3 py-2 bg-zinc-800/50 w-full" id="name" type="text" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">Slug</label>
        <input className="border-zinc-800 rounded-lg px-3 py-2 bg-zinc-800/50 w-full" id="slug" type="text" readOnly />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button>
          <X className="size-3" />
          Cancel
        </Button>
        <Button type="submit" className=" bg-teal-400 text-teal-950" >
          <Check className="size-3" />
          Save
        </Button>
      </div>
    </form>
  )
}