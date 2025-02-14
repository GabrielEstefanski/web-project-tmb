const Tooltip = ({ label }: { label: string }) => {
  return (
    <span className="absolute whitespace-nowrap -top-10 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-base px-3 py-2
                  rounded-lg opacity-0 group-hover:opacity-100 transition">
      {label}
    </span>
  )
}

export default Tooltip;