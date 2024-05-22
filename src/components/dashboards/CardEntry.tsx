import { EntryProps } from "./Props.ts";
import clsx from "clsx";
import { TiCloudStorage } from "react-icons/ti";
import Highlighter from "react-highlight-words";
import { useEmployeeData } from "../../context/EmployeeContext.tsx";


export default function CardEntry({ employee, setIsSelected, isSelected }: EntryProps) {

    const { searchField, searchValue } = useEmployeeData();

    return (
        <div className={clsx("relative px-6 pt-8 pb-6 rounded flex flex-col items-center gap-y-3 cursor-pointer border",
            isSelected ? "bg-blue-200 border-blue-400 dark:bg-blue-700/50" :
                "bg-gray-300 hover:bg-gray-400/90 dark:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700")}
             onClick={() => {
                 setIsSelected(prev => ({
                     ...prev,
                     [ employee.id ]: !isSelected,
                 }));
             }}>
            <h5 className="font-bold text-lg text-center">{searchField === "name" && searchValue ? <Highlighter
                highlightClassName="bg-yellow-400 dark:bg-yellow-500"
                searchWords={[ searchValue ]}
                autoEscape={true}
                textToHighlight={employee.name}
            /> : employee.name}</h5>
            <img src="/avatar_placeholder.png" alt="Avatar" className="w-28"/>
            <p className={clsx("py-2", employee.group === null && "font-bold")}>
                {searchField === "group" && searchValue ?
                    <Highlighter
                        highlightClassName="bg-yellow-400 dark:bg-yellow-500"
                        searchWords={[ searchValue ]}
                        autoEscape={true}
                        textToHighlight={employee.group || "Unmanaged"}
                    /> : employee.group || "Unmanaged"}</p>
            <p className="max-sm:text-sm">{searchField === "phoneNumber" && searchValue ? <Highlighter
                highlightClassName="bg-yellow-400 dark:bg-yellow-500"
                searchWords={[ searchValue ]}
                autoEscape={true}
                textToHighlight={employee.phoneNumber}
            /> : employee.phoneNumber}</p>

            <input className="absolute top-3 left-3" type="checkbox" readOnly
                   checked={isSelected}/>

            <TiCloudStorage size={28} className="absolute top-1.5 right-3"/>


        </div>
    )
}