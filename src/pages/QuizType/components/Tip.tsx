

const Tip = ({detail}:{detail?:string}) => {
    return (
        <div className="bg-blue-100 p-4 text-black text-xs mt-6">
        <p>
          <b>Tip:</b> {detail}
          {/* Do not select an answer too quickly. You may hear
          one of the words from the options, but you need to match based
          on the entire meaniong of the options given not only one word. */}
        </p>
      </div>
    )
}

export default Tip
