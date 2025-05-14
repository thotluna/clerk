'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { ContestFormData, contestFormSchema } from '../schemas/contest.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { constestFormDefaultValues } from '../constants/constants'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown, Command } from 'lucide-react'
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import ConnectGitHubButton from './button-github'

interface Props {
  userId: string
  owner?: string
  repositories?: string[]
}

export function ContestForm({ userId, owner, repositories }: Props) {
  const [openRepositories, setOpenRepositories] = useState(false)
  const form = useForm<ContestFormData>({
    resolver: zodResolver(contestFormSchema),
    defaultValues: constestFormDefaultValues,
  })

  const onSubmitHandler = () => {
    console.log({ userId })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Concurso</FormLabel>
              <FormControl>
                <Input placeholder="Concurso de programación" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Busquemos el mejor desarrollador de Frontend de la web"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {repositories && repositories.length > 0 && (
          <FormField
            control={form.control}
            name="nameRepository"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Nombre de Repositorio</FormLabel>
                <Popover
                  open={openRepositories}
                  onOpenChange={setOpenRepositories}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[200px] justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? repositories.find(
                              (repository) => repository === field.value
                            )
                          : 'Selecciona el repositorio'}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>
                          No hay repositorios disponibles
                        </CommandEmpty>
                        <CommandGroup>
                          {repositories.map((repository) => (
                            <CommandItem
                              value={repository}
                              key={repository}
                              onSelect={() => {
                                form.setValue('nameRepository', repository)
                              }}
                            >
                              {repository}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  repository === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {(!repositories || !owner) && <ConnectGitHubButton />}
      </form>
    </Form>
  )
}
