import { EntryProps } from "./Props.ts";
import clsx from "clsx";
import { TiCloudStorage } from "react-icons/ti";


export default function CardEntry({ employee, setIsSelected, isSelected }: EntryProps) {

    // TODO: think about making clicking whole card select entry
    return (
        <div className={clsx("relative px-6 pt-8 pb-6 rounded flex flex-col items-center gap-y-3 cursor-pointer border",
            isSelected ? "bg-blue-200 border-blue-400" : "bg-gray-300 hover:bg-gray-400/90")}>
            <h5 className="font-bold text-lg">{employee.name}</h5>
            <img src="/avatar_placeholder.png" alt="Avatar" className="w-28"/>
            <p>{employee.group || <span className="bold">Unamanaged</span>}</p>
            <p>{employee.phoneNumber}</p>

            <input className="absolute top-3 left-3" type="checkbox"
                   checked={isSelected} onChange={event => {
                const check = event.currentTarget?.checked;
                console.log(event.currentTarget, event.currentTarget?.checked);
                setIsSelected(prev => ({
                    ...prev,
                    [ employee.id ]: check,
                }));
            }}/>

            <TiCloudStorage size={28} className="absolute top-1.5 right-3"/>


        </div>
    )
}