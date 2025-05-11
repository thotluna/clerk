'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import ConnectGitHubButton from './button-github'
import { Switch } from '@/components/ui/switch'
import { useContentForm } from '../hooks/use-contest-form'
import { constestFormDefaultValues } from '../constants/constants'

interface Props {
  userId: string
  repositories?: string[]
  owner: string
}

export function ContestForm({ repositories, owner, userId }: Props) {
  const { openRepositories, setOpenRepositories, form, onSubmit } =
    useContentForm(constestFormDefaultValues, owner, userId)
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              Nombre del Concurso
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="Mi nuevo concurso"
                  {...field}
                />
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
              Descripción del Concurso
              <FormControl>
                <Textarea
                  placeholder="El concurso de la landing page más linda del mundo"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nameRepository"
          render={({ field }) => (
            <FormItem>
              Nombre del repositorio
              <div className="flex gap-4">
                {repositories && repositories.length > 0 && (
                  <>
                    <FormControl>
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
                                'w-[375px] justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? repositories.find(
                                    (repository) => repository === field.value
                                  )
                                : 'Selecciona un repositorio'}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[375px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Busca repositorios..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No hay repositorios</CommandEmpty>
                              <CommandGroup>
                                {repositories.map((repository) => (
                                  <CommandItem
                                    value={repository}
                                    key={repository}
                                    onSelect={() => {
                                      form.setValue(
                                        'nameRepository',
                                        repository
                                      )
                                      setOpenRepositories(false)
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
                    </FormControl>
                    <FormMessage />
                  </>
                )}
                {!repositories && <ConnectGitHubButton />}
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                Etiqueta del issues
                <FormControl>
                  <Input autoComplete="off" placeholder="concurso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Activar el concurso</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              Inicio del concurso
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              Fin de la entrega de proyectos
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const startDate = form.getValues('startDate')
                      return (
                        (startDate && date < startDate) || date < new Date()
                      )
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex  flex-row-reverse gap-4 mt-4  ">
          <Button disabled={form.formState.isLoading || !owner} type="submit">
            Submit
          </Button>
          <Button variant="outline" type="reset" onClick={() => form.reset()}>
            clear
          </Button>
        </div>
      </form>
    </Form>
  )
}
