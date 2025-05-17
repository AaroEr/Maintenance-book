type Props = {
  onAdd: () => void
}

const AddCard = ({ onAdd }: Props) => {
  return (
    <button
      onClick={onAdd}
      className="bg-white hover:bg-gray-300 cursor-pointer rounded-xl flex items-center justify-center text-gray-700 text-2xl font-bold p-4 w-full"
    >
      +
    </button>
  )
}

export default AddCard
