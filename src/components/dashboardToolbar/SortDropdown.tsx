import { FaSort } from "react-icons/fa6";
import { Employee, useEmployeeData } from "../../context/EmployeeContext.tsx";
import { FaSortAlphaDownAlt, FaSortAlphaUpAlt } from "react-icons/fa";
import clsx from "clsx";

export default function SortDropdown() {

    const {setSortedField, sortedField, isSortAscending, setIsSortAscending} = useEmployeeData();
    return (
        <div
            className="w-56 overflow-y-hidden transition-all duration-200 border border-gray-500 rounded-md
                        h-11 hover:h-48 text-center z-10 bg-gray-200 pt-1.5 flex flex-col gap-y-3 items-center">
            <h5 className="text-lg font-bold flex items-center gap-x-2">Сортировка <FaSort size={24}/></h5>
            <label htmlFor="sortedField" className="block">
                <p>Поле сортировки:</p>
                <select name="sortedField" id="sortedField" className="mt-2" value={sortedField || "none"}
                        onChange={event => {
                            const newValue = event.currentTarget.value === "none" ? null : event.currentTarget.value;
                            setSortedField(newValue as keyof Employee);
                        }}>
                    <option value="none">Выберите поле:</option>
                    <option value="name">Полное имя</option>
                    <option value="accountName">Учетная запись</option>
                    <option value="email">Электронная почта</option>
                    <option value="group">Группа</option>
                    <option value="phoneNumber">Номер телефона</option>
                </select>
            </label>
            <p>Направление сортировки:</p>
            <button onClick={() => setIsSortAscending(prev => !prev)}
                    className="flex gap-3 items-center cursor-pointer">
                <FaSortAlphaDownAlt size={24}/>
                <div
                    className="rounded-full w-14 h-8 border-2 border-gray-900 dark:border-white bg-transparent p-2 relative">
                    <div
                        className={clsx(isSortAscending ? "left-7" : "left-1", "h-5 w-5 rounded-full absolute top-1 bg-gray-900 dark:bg-white transition-all duration-300")}/>
                </div>
                <FaSortAlphaUpAlt size={24}/>
            </button>

        </div>
    )
}