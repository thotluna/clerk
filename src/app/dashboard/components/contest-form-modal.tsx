import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Plus } from 'lucide-react'
import { ContestFormServer } from './contest-form-server'

export function ContestFormModal() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center cursor-pointer border border-accent px-4 py-2 rounded-md hover:bg-accent/80 hover:text-accent-foreground transition">
        <Plus className="mr-2" />
        Crear nuevo concurso
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo concurso</DialogTitle>
          <ContestFormServer />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
