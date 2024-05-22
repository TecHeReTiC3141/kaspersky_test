import { FaMagnifyingGlass } from "react-icons/fa6";
import { Employee, useEmployeeData } from "../../context/EmployeeContext.tsx";

export default function SearchDropdown() {

    const { setSearchValue, setSearchField, searchValue, searchField } = useEmployeeData();
    return (
        <div
            className="w-56 border border-gray-500 rounded-md overflow-hidden transition-all duration-200
                        h-11 hover:h-48 text-center max-sm:w-10 max-sm:min-w-10 max-sm:hover:w-48 group
                        z-10 bg-gray-200 dark:bg-gray-800 pt-1.5 flex flex-col gap-y-3 items-center max-md:text-sm">
            <h5 className="sm:text-lg font-bold flex items-center gap-x-2">
                <span className="hidden sm:block group-hover:block">Поиск</span>
                <FaMagnifyingGlass size={24}/>
            </h5>
            <label htmlFor="searchField" className="block">
                <p>Поле поиска:</p>
                <select name="searchField" id="searchField"
                        className="mt-2 dark:bg-gray-600 focus:outline-none  max-sm:w-28 max-lg:w-32" value={searchField || "none"}
                        onChange={event => {
                            const newValue = event.currentTarget.value === "none" ? null : event.currentTarget.value;
                            setSearchField(newValue as keyof Employee);
                        }}>
                    <option value="none">Выберите поле:</option>
                    <option value="name">Полное имя</option>
                    <option value="accountName">Учетная запись</option>
                    <option value="email">Электронная почта</option>
                    <option value="group">Группа</option>
                    <option value="phoneNumber">Номер телефона</option>
                </select>
            </label>
            <label htmlFor="searchValue" className="block">

                <p>Что нужно найти:</p>
                <input type="text" placeholder="Поиск..." name="searchValue" value={searchValue}
                       onChange={event => setSearchValue(event.currentTarget.value)}
                       className="bg-transparent px-2 py-1 mt-2 flex-1 focus:outline-none max-sm:w-28 max-lg:w-32 border border-gray-500 rounded-md"/>
            </label>

        </div>
    )
}