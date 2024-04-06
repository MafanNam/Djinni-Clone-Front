// @ts-ignore
export default function CategoryCard({name}) {
  return (
    <div className='bg-white dark:bg-gray-800 dark:bg-opacity-50 p-7 flex gap-4'>
      <div>
        <h2 className='font-medium'>{name}</h2>
      </div>
    </div>
  )
}