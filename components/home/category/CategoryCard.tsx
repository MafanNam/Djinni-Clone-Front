import {Card, CardHeader} from "@/components/ui/card";

export default function CategoryCard({name}: {name: string}) {
  return (
    <Card className=''>
      <CardHeader>
        <h2 className='font-medium'>{name}</h2>
      </CardHeader>
    </Card>
  )
}