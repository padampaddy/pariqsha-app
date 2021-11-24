const Tip = ({ detail }: { detail?: string }) => {
  return (
    <div className="bg-blue-100 p-4 text-black text-xs mt-6">
      <b>Tip:</b> {detail}
    </div>
  );
};

export default Tip;
