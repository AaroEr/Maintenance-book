type Props = {
    text: string
}

const Text = ({ text }: Props) => {
    return (
        <div className="mt-4 px-4">
            <p className="text-white text-lg font-semibold">{text}</p>
        </div>
    )

}

export default Text