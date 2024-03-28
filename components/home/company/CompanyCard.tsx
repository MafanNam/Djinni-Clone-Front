
// @ts-ignore
export default function CompanyCard({id, title}) {

  return (
    <div className='bg-gray-100 p-7 flex gap-4'>
      {/*<div className='w-12 h-12 rounded-md shrink-0'>*/}
      {/*  <img src={image} alt={title} />*/}
      {/*</div>*/}
      <div>
        <h2 className='font-medium'>{title}</h2>
      </div>
    </div>
  )
}