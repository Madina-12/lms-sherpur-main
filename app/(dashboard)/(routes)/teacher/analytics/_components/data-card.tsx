import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/format-price"

interface DataCardProps {
    label: string
    value: number
    shouldFormat? : boolean
}

const DataCard = ({label, value, shouldFormat}:DataCardProps) => {
    
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-2">
        <CardTitle className=" text-sm font-medium">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {shouldFormat? formatPrice(value) : value}
        </div>
      </CardContent>
    </Card>

    
  )
}

export default DataCard