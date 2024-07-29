import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { File, ListFilter } from "lucide-react"
  

const ProjectDetail = () => {
  return (
    <>
      <section className="bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center items-center p-5">
            <div className="w-60 h-60 relative">
              <Image
                src="/assets/images/FundM3-Logo-02.jpg"
                alt="Project Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="md:w-2/3 p-5">
            <h1 className="text-2xl font-bold mb-2">AR3NA</h1>
            <p className="text-gray-500 mb-2">
              Created by <Link href="/creator-link">W3D</Link> | Latest Update 17 May 2024 | 888 Sponsors
            </p>
            <p className="text-gray-700 mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <div className="flex gap-4">
              <Button className="bg-black text-white px-4 py-2 rounded-full">Sponsor Me</Button>
              <Button className="bg-black text-white px-4 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12.93A1 1 0 0010 4a1 1 0 00-1 .07v4.86A1 1 0 0010 11a1 1 0 001-1V5.07z" clipRule="evenodd" />
                </svg>
              </Button>
              <Button className="bg-black text-white px-4 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3.293 7.293L13 11.586V7h-2v4.586l-2.293-2.293-1.414 1.414L12 14.414l4.707-4.707-1.414-1.414z" />
                </svg>
              </Button>
              <Button className="bg-black text-white px-4 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.371 0 0 5.371 0 12c0 5.022 3.053 9.283 7.372 11.135.539.1.736-.232.736-.518 0-.258-.01-1.1-.014-1.994-2.999.652-3.635-1.443-3.635-1.443-.491-1.248-1.199-1.581-1.199-1.581-.979-.669.075-.655.075-.655 1.083.076 1.653 1.112 1.653 1.112.963 1.652 2.526 1.174 3.143.899.098-.698.377-1.174.686-1.445-2.395-.273-4.919-1.197-4.919-5.333 0-1.178.422-2.14 1.114-2.894-.111-.272-.484-1.367.106-2.85 0 0 .907-.292 2.971 1.104A10.372 10.372 0 0112 6.845c.92.004 1.846.124 2.712.364 2.062-1.396 2.968-1.104 2.968-1.104.591 1.483.218 2.578.107 2.85.693.754 1.112 1.716 1.112 2.894 0 4.147-2.528 5.057-4.929 5.325.388.333.731.992.731 2v2.965c0 .288.194.624.741.518C20.949 21.277 24 17.021 24 12c0-6.629-5.371-12-12-12z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-dotted-pattern bg-cover bg-center py-5 md:py-10 px-[135px]'>
        <Tabs defaultValue="1">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="1">Description</TabsTrigger>
                    <TabsTrigger value="2">Sponsor List</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                // variant="outline"
                                // size="sm"
                                className="h-7 gap-1 text-sm"
                            >
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                            Fulfilled
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                            Declined
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                            Refunded
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        // size="sm"
                        // variant="outline"
                        className="h-7 gap-1 text-sm"
                    >
                    <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                </div>
            </div>
            <TabsContent value="2">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <CardTitle>Sponsor List</CardTitle>
                        <CardDescription>
                            Recent sponsor from your donators.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead>Sponsor By</TableHead>
                                {/* <TableHead className="hidden sm:table-cell">
                                Status
                                </TableHead> */}
                                <TableHead className="hidden md:table-cell">
                                Date
                                </TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            <TableRow className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">Liam Johnson</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        liam@example.com
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                2023-06-23
                                </TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <div className="font-medium">Olivia Smith</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    olivia@example.com
                                </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                2023-06-24
                                </TableCell>
                                <TableCell className="text-right">$150.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Noah Williams</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        noah@example.com
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                2023-06-25
                                </TableCell>
                                <TableCell className="text-right">$350.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <div className="font-medium">Emma Brown</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    emma@example.com
                                </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                2023-06-26
                                </TableCell>
                                <TableCell className="text-right">$450.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <div className="font-medium">Liam Johnson</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    liam@example.com
                                </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                2023-06-23
                                </TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <div className="font-medium">Olivia Smith</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    olivia@example.com
                                </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                2023-06-24
                                </TableCell>
                                <TableCell className="text-right">$150.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <div className="font-medium">Emma Brown</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    emma@example.com
                                </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                2023-06-26
                                </TableCell>
                                <TableCell className="text-right">$450.00</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </section>
    </>
  )
}

const Button = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <button className={`flex items-center justify-center ${className}`}>
    {children}
  </button>
)

export default ProjectDetail
