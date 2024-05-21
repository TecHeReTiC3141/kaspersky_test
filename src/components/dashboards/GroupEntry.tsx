import { EntryProps } from "./Props.ts";
import clsx from "clsx";
import Highlighter from "react-highlight-words";
import { useEmployeeData } from "../../context/EmployeeContext.tsx";

export default function GroupEntry({ employee, setIsSelected, isSelected }: EntryProps) {

    const { searchField, searchValue } = useEmployeeData();

    return (
        <div
            className={clsx("relative p-2 flex justify-between items-center gap-x-3 cursor-pointer border mb-2",
                isSelected ? "bg-blue-200 border-blue-400 dark:bg-blue-700/50" : "hover:bg-gray-100/90 dark:hover:bg-gray-700 border-gray-700")}
            onClick={() => {
                setIsSelected(prev => ({
                    ...prev,
                    [ employee.id ]: !isSelected,
                }));
            }}>
            <div>
                <h6 className="">{searchField === "name" && searchValue ? <Highlighter
                    highlightClassName="bg-yellow-400 dark:bg-yellow-500"
                    searchWords={[ searchValue ]}
                    autoEscape={true}
                    textToHighlight={employee.name}
                /> : employee.name}</h6>
                <p className="text-xs">{searchField === "position" && searchValue ? <Highlighter
                    highlightClassName="bg-yellow-400 dark:bg-yellow-500"
                    searchWords={[ searchValue ]}
                    autoEscape={true}
                    textToHighlight={employee.position}
                /> : employee.position}</p>
            </div>
        </div>
    )
}