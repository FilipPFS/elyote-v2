import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderTableFilters } from "@/constants";
import clsx from "clsx";

const TableFilters = () => {
  return (
    <div className={clsx("hidden md:flex flex-wrap  w-full items-center")}>
      {orderTableFilters.map(({ label, options }) => (
        <Select key={label}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={label} />
          </SelectTrigger>
          <SelectContent>
            {options.map((el, index) => (
              <SelectItem key={index} value={el.value}>
                {el.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
};

export default TableFilters;
