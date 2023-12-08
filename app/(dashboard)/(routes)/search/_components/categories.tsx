import { Category } from "@prisma/client"
import { FileClock } from "lucide-react"
import CategoryItems from "./category-items";

interface CategoriesProps {
    items: Category[]
}



const Categories = ({
    items
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        {items.map((item) => {
            return (
            <CategoryItems
            key={item.id}
            label={item.name}
            // icon={iconMap[item.name]}
            value={item.id}
            />
        )})}
    </div>
  )
}

export default Categories