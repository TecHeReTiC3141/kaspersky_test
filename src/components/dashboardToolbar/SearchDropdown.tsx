import { FaMagnifyingGlass } from "react-icons/fa6";
import { Employee, useEmployeeData } from "../../context/EmployeeContext.tsx";

export default function SearchDropdown() {

    const {setSearchValue, setSearchField, searchValue, searchField} = useEmployeeData();
    return (
        <div
            className="w-56 border border-gray-500 rounded-md overflow-y-hidden transition-all duration-200
                        h-11 hover:h-48 text-center z-10 bg-gray-200 dark:bg-gray-800 pt-1.5 flex flex-col gap-y-3 items-center">
            <h5 className="text-lg font-bold flex items-center gap-x-2">
                Поиск <FaMagnifyingGlass size={24}/>
            </h5>
            <label htmlFor="searchField" className="block">
                <p>Поле поиска:</p>
                <select name="searchField" id="searchField"
                        className="mt-2 dark:bg-gray-600 focus:outline-none" value={searchField || "none"}
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
                       className="bg-transparent px-2 py-1 mt-2 flex-1 focus:outline-none  border border-gray-500 rounded-md"/>
            </label>

        </div>
    )
}