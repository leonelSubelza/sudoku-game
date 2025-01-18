"use client"

const numbers: number[] = [0,1,2,3,4,5,6,7,8,9]

function BoardButtons() {
  return ( 
    <div className="flex mx-auto">
      {
        numbers.map( value => (
          <button className="w-10 h-10 m-2 p-2 border border-slate-200 rounded-md">
            {value===0 ? '' : value}
          </button>
        ))
      }
    </div>
   );
}

export default BoardButtons;