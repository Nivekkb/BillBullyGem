import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const activities = [
    { type: "Credit Dispute", description: "Disputed late payment with Equifax", status: "Completed", date: "June 15, 2024", amount: "+25 pts" },
    { type: "Bill Negotiation", description: "Negotiated with Comcast/Xfinity", status: "Success", date: "June 12, 2024", amount: "-$35.00/mo" },
    { type: "Subscription", description: "Canceled Netflix subscription", status: "Canceled", date: "June 10, 2024", amount: "-$15.49/mo" },
    { type: "Credit Dispute", description: "Sent debt validation to Midland Credit", status: "Pending", date: "June 5, 2024", amount: "" },
    { type: "Bill Negotiation", description: "Negotiated with AT&T Wireless", status: "Failed", date: "May 28, 2024", amount: "$0.00" },
]

export function RecentActivity() {
  const getBadgeVariant = (status: string) => {
    switch(status.toLowerCase()){
      case 'completed':
      case 'success':
      case 'canceled':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Activity</CardTitle>
        <CardDescription>
          A log of all recent actions taken on your behalf.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{activity.type}</TableCell>
                <TableCell>{activity.description}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(activity.status)}>{activity.status}</Badge>
                </TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell className="text-right font-medium">{activity.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
