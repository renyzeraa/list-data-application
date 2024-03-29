import { Plus, Search, FileDown, MoreHorizontal, Filter } from 'lucide-react'
// import { Header } from './components/header'
// import { Tabs } from './components/tabs'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Pagination } from './components/pagination'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateTagForm } from './components/create-tag-form'

export interface TagResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tag[]
}

export interface Tag {
  title: string
  slug: string
  amountOfVideos: number
  id: string
}

export function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? ''

  const [filter, setFilter] = useState(urlFilter);

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ['get-tags', urlFilter, page] /* cria um id no cache do navegador,se for o mesmo id nao precisa recarregar os dados */,
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`)
      const data = await response.json()
      return data
    },
    placeholderData: keepPreviousData /* evita de piscar a tela*/,
    staleTime: 1000 * 60 /* ele recarrega em 1 minuto */,
  })

  function handleFilter() {
    setSearchParams((params) => {
      params.set('page', '1');
      params.set('filter', filter);

      return params;
    });
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="py-10">
      <div>
        {
          /* quando utilizar setar space-y-8 na classe da div pai
            <Header></Header> 
            <Tabs></Tabs> 
           */
        }
      </div>
      <main className="max-w-6xl space-y-5 mx-auto">
        <div className='flex items-center gap-3'>
          <h1 className="text-xl font-bold">Tags</h1>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant='primary'>
                <Plus className='size-3'></Plus>
                Create new
              </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className='fixed inset-0 bg-black/70'>
                <Dialog.Content className='fixed right-0 bottom-0 top-0 h-screen min-w-[320px] bg-zinc-950 border-l border-l-zinc-900 p-10 space-y-10'>
                  <div className='space-y-3'>
                    <Dialog.Title className='text-xl font-bold text-zinc-50 m-'>
                      Create tag
                    </Dialog.Title>
                    <Dialog.Description className='text-zinc-500 text-sm'>
                      Tags can be used to group videos about similar concepts
                    </Dialog.Description>
                    <Dialog.Close></Dialog.Close>
                  </div>
                  <CreateTagForm>

                  </CreateTagForm>
                </Dialog.Content>
              </Dialog.Overlay>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-2'>
            <Input variant='filter'>
              <Search className='size-3' />
              <Control
                placeholder='Search tags...'
                onChange={(e): void => setFilter(e.target.value)}
                value={filter}
              />
            </Input>
            <Button onClick={handleFilter}>
              <Filter className='size-3' />
              Apply Filter
            </Button>
          </div>
          <Button>
            <FileDown className='size-3' />
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              tagsResponse?.data.map((tag) => {
                return (
                  <TableRow key={tag.id}>
                    <TableCell></TableCell>
                    <TableCell>
                      <div className='flex flex-col gap-0.5'>
                        <span className='font-medium'>{tag.title}</span>
                        <span className='text-xs text-zinc'>{tag.slug}</span>
                      </div>
                    </TableCell>
                    <TableCell className='text-zinc-300'>
                      {tag.amountOfVideos} video(s)
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button size='icon'>
                        <MoreHorizontal className='size-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        {tagsResponse &&
          <Pagination
            pages={tagsResponse.pages}
            items={tagsResponse.items}
            page={page} />
        }
      </main>
    </div>
  )
}
