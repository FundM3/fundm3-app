// src/components/common/SponsorList.tsx

import React from 'react'
import { sponsors } from '@/app/_data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SponsorList = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sponsor By</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sponsors.map((sponsor, index) => (
          <TableRow key={index} className={index % 2 === 0 ? "bg-accent" : ""}>
            <TableCell>
              <div className="font-medium">{sponsor.name}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {sponsor.email}
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{sponsor.date}</TableCell>
            <TableCell className="text-right">{sponsor.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SponsorList
