import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getDonationsByDonor } from '@/lib/api/donationApi'  
import { middleEllipsis } from '@/lib/utils/common'
import { formatDate } from '@/lib/utils/formatters'

interface Donation {
  id: number;
  transactionHash: string;
  donor: string;
  recipient: string;
  totalAmount: number;
  recipientAmount: number;
  fee: number;
  blockNumber: number;
  timestamp: Date;
}

interface SponsorListProps {
  donorAddress: string;
}

const SponsorListProfile: React.FC<SponsorListProps> = ({ donorAddress }) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const data = await getDonationsByDonor(donorAddress);
        setDonations(data.donations);
      } catch (error) {
        setError('Failed to fetch donations');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [donorAddress]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (donations.length === 0) {
    return <p>No donations found.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Donated By</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation, index) => (
          <TableRow key={index} className={index % 2 === 0 ? "bg-accent" : ""}>
            <TableCell>
              <div className="font-medium">{middleEllipsis(donation.donor, 5)}</div>
              {/* <div className="hidden text-sm text-muted-foreground md:inline">
                {donation.email}
              </div> */}
            </TableCell>
            <TableCell className="text-center">{formatDate(new Date(donation.timestamp).toISOString()) || ""}</TableCell>
            <TableCell className="text-right">{donation.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SponsorListProfile
