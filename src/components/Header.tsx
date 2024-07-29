import { memo } from "react";
import { BiPlus } from "react-icons/bi";
import { PiSortAscendingThin } from "react-icons/pi";
import { Users } from "src/types";

const Header: React.FC<{ size: number; id: keyof Users }> = memo(({ size, id }) => {
  return (
    <div className="form-control flex flex-col gap-y-3">
      <div className="flex justify-between items-center px-2">
        <label className="label cursor-pointer flex justify-start gap-x-2">
          <input type="checkbox" checked={false} defaultChecked className="checkbox" />
          <span className="font-semibold text-lg label-text capitalize">{id}</span>
        </label>

        {id === "applied" && (
          <button className="flex text-[10px] truncate items-center p-2 rounded-xl border-none text-primary bg-gray-200">
            <BiPlus className="text-xl" /> Add Applications
          </button>
        )}

        <PiSortAscendingThin className="text-gray-500 text-2xl" />
      </div>

      <div className="flex justify-between items-center px-2">
        <span className="text-2xl font-bold flex gap-x-1 items-center">
          0 <span className="text-xs text-gray-400">REJECTED</span>
        </span>

        <span className="text-2xl font-bold flex gap-x-1 items-center">
          {size} <span className="text-xs text-gray-400">TOTAL</span>
        </span>
      </div>
    </div>
  );
});

export default Header;
