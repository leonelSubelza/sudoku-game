"use client"

interface Props {
  value: string;
}

function CellComponent({value}: Props) {
  return ( 
    <div className="w-14 h-14 p-2 border border-slate-300 flex justify-center items-center cursor-pointer">
      <p className="text-center select-none">
      {value}
      </p>
    </div>
   );
}

export default CellComponent;