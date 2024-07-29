"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <Select>
          <SelectTrigger className="lg:select-field-2 select-field">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="select-item p-regular-14">All</SelectItem>
            <SelectItem value="projects" className="select-item p-regular-14">Projects</SelectItem>
            <SelectItem value="creators" className="select-item p-regular-14">Creators</SelectItem>
          </SelectContent>
        </Select>
      )
}

export default Filter
