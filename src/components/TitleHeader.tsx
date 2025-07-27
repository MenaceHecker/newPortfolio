const TitleHeader = ({title, sub}: {title: string, sub: string}) => {
  return (
    <div className="flex flex-col items-center gap-5">
        <div className='inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-600 border'>
            <p>{sub}</p>
        </div>
        <div className="font-semibold md:text-5xl text-3xl text-center">
          {title}
        </div>
    </div>
  )
}

export default TitleHeader