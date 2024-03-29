
interface IProps {
  review: string
  name: string
  position: string
  organization: string
}

export default function ReviewCard({ review, name, position, organization }: IProps) {
  return (
    <div className='shadow-xl border border-gray-200 text-center p-8 w-full max-w-[900px] rounded-md m-auto bg-purple-100 bg-opacity-50 backdrop-blur-2xl'>
      <p className='leading-loose text-gray-500 font-medium'>&quot;{review}&quot;</p>
      <p className='font-semibold text-lg mt-8'>{name}</p>
      <p className='text-gray-400 font-medium mt-2'>{position} at {organization}</p>
    </div>
  )
}