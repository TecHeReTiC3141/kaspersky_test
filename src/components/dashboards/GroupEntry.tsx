import { EntryProps } from "./Props.ts";
import clsx from "clsx";

export default function GroupEntry({ employee, setIsSelected, isSelected }: EntryProps) {
    // TODO: add position property to Employee
    return (
        <div
            className={clsx("relative p-2 flex justify-between items-center gap-x-3 cursor-pointer border mb-2",
                isSelected ? "bg-blue-200 border-blue-400" : "hover:bg-gray-100/90 border-gray-700")}
            onClick={() => {
                setIsSelected(prev => ({
                    ...prev,
                    [ employee.id ]: !isSelected,
                }));
            }}>
            <div>
                <h6 className="">{employee.name}</h6>
                <p className="text-xs">{employee.position}</p>
            </div>
        </div>
    )
}