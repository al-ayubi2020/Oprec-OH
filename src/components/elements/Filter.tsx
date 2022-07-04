import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Router, useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { useNavbarContext } from './NavbarContext'

interface FilterProps {
  isSearchOpen: any
}

const Filter: React.FC<FilterProps> = ({ isSearchOpen }) => {
  const people = [
    { id: 1, name: 'Category', unavailable: false },
    { id: 2, name: 'artwork', unavailable: false },
    { id: 3, name: 'anime', unavailable: false },
    { id: 4, name: 'meme', unavailable: true },
    { id: 5, name: 'photography', unavailable: false },
    { id: 6, name: 'furry', unavailable: false },
  ]
  const [selected, setSelected] = useState(people[0])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  const router = useRouter()

  const {
    arrayFilter,
    setIsSearch,
    setArrayFiltered,
    arrayFiltered,
    setArrayFilter,
  } = useNavbarContext()

  const handleFilter = () => {
    setArrayFilter(
      arrayFilter.map(
        (item: any) =>
          (item.uploaded_at = new Date(item.uploaded_at).toDateString())
      )
    )
    setArrayFiltered(
      arrayFilter.filter(
        (item: any) =>
          item.title.toLowerCase().match(title.toLowerCase()) &&
          item.category
            .toLowerCase()
            .match(
              selected.name.toLowerCase() == 'category'
                ? ''
                : selected.name.toLowerCase()
            ) &&
          item.uploaded_at.match(date)
      )
    )

    setIsSearch(true)
  }

  console.log(date)
  console.log(arrayFiltered)

  return (
    <Transition appear show={isSearchOpen} as={Fragment}>
      <Transition.Child
        enter="duration-300 transition-opacity"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300  transition-opacity"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="md:h-20 bg-red-300 md:flex items-center px-10 gap-5 py-5 md:py-0 grid grid-cols-1">
          <div className="md:flex gap-5 w-full grid grid-cols-1">
            <input
              className="w-full md:w-6/12 h-10 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              id="inline-full-name"
              type="text"
              placeholder="title"
              onChange={e => setTitle(e.target.value)}
            />
            <div className="w-full md:w-3/12">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                  <Listbox.Button className="h-10 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {people.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-amber-100 text-amber-900'
                                : 'text-gray-900'
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <p
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {person.name}
                              </p>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <input
              onChange={e =>
                setDate(
                  !e.target.value ? '' : new Date(e.target.value).toDateString()
                )
              }
              className="md:w-3/12 w-full h-10 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              id="inline-date"
              type="date"
            />
          </div>
          <button
            onClick={() => {
              !date && !title && selected.name.toLowerCase() == 'category'
                ? router.reload()
                : handleFilter()
            }}
            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Search
          </button>
        </div>
      </Transition.Child>
    </Transition>
  )
}

export default Filter
