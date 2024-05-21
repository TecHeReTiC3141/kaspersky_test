import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading.tsx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import React, { useEffect, useMemo, useState } from "react";
import TableDashboard from "./components/dashboards/TableDashboard.tsx";
import CardDashboard from "./components/dashboards/CardDashboard.tsx";
import GroupDashboard from "./components/dashboards/GroupDashboard.tsx";
import SelectDashboardVariant from "./components/SelectDashboardVariant.tsx";
import { Employee, useEmployeeData } from "./context/EmployeeContext.tsx";
import { RxArrowTopRight, RxArrowBottomRight } from "react-icons/rx";
import { DashboardProps } from "./components/dashboards/Props.ts";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import clsx from "clsx";


export const dashboardVariants: Record<string, React.ComponentType<DashboardProps>> = {
    "table": TableDashboard,
    "card": CardDashboard,
    "group": GroupDashboard,
}

export default function DashboardPage() {

    const [ activeVariant, setActiveVariant ] = useState<keyof typeof dashboardVariants>("table");

    const {
        employees,
        setGroups,
        setEmployees,
        sortedField,
        setSortedField,
        isSortAscending,
        setIsSortAscending
    } = useEmployeeData();

    const groupQuery = useQuery<string[]>({
        queryKey: [ "groups" ],

        queryFn: async () => {
            const response = await fetch("http://localhost:3000/groups", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });
            return response.json();
        },

    });

    useEffect(() => {
        setGroups(groupQuery.data || []);
    }, [ groupQuery.data, setGroups ]);

    const groupsCount = groupQuery.data?.length;

    const employeesQuery = useQuery<Employee[]>({
        queryKey: [ "employees" ],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/employees", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
            return response.json();
        },
        enabled: !!groupsCount,
    });

    useEffect(() => {
        setEmployees(employeesQuery.data || []);
    }, [ employeesQuery.data, setEmployees ]);

    const finalEmployees = useMemo(() => {
        if (sortedField !== null) {
            return employees.sort((emp1, emp2) => {
                if (emp1[ sortedField ] === undefined || emp2[ sortedField ] === undefined) return 0;
                if (isSortAscending && emp1[ sortedField ]! < emp2[ sortedField ]!
                    || !isSortAscending && emp1[ sortedField ]! > emp2[ sortedField ]!) return -1;
                if (emp1[ sortedField ] === emp2[ sortedField ]) return 0;
                return 1;
            });
        }
        return employees;
    }, [ employees, isSortAscending, sortedField ]);

    if (groupQuery.isLoading) {
        return <Loading text="группы"/>
    }

    if (groupQuery.isError) {
        console.log("Error fetching groups", groupQuery.error);
        throw new Error("Извините, мы не смогли загрузить группы. Попробуйте еще раз через некоторое время");
    }

    if (employeesQuery.isLoading) {
        return <Loading text="сотрудников"/>
    }

    if (employeesQuery.isError) {
        console.log("Error fetching employees", employeesQuery.error);
        throw new Error("Извините, мы не смогли загрузить сотрудников. Попробуйте еще раз через некоторое время");
    }

    const ActiveDashboard = dashboardVariants[ activeVariant ]

    // TODO: move code to get sorted employees list there
    return (
        <div className="w-full">
            <div className="flex justify-between items-start mb-4 px-4 gap-x-6 max-h-11">
                <button className="flex items-center border border-gray-400 p-2.5 rounded-lg gap-x-3">
                    <input type="text" placeholder="Поиск..."
                           className="bg-transparent px-2 flex-1 focus:outline-none"/>
                    <FaMagnifyingGlass size={24} className="text-gray-600"/>
                </button>
                <div
                    className="w-56 border border-gray-500 rounded-md overflow-y-hidden transition-all duration-200
                        h-11 hover:h-48 text-center z-10 bg-gray-200 pt-1.5 flex flex-col gap-y-3 items-center">
                    <h5 className="text-lg font-bold">Сортировка</h5>
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
                        DESC <RxArrowBottomRight size={24}/>
                        <div
                            className="rounded-full w-14 h-8 border-2 border-gray-900 dark:border-white bg-transparent p-2 relative">
                            <div
                                className={clsx(isSortAscending ? "left-7" : "left-1", "h-5 w-5 rounded-full absolute top-1 bg-gray-900 dark:bg-white transition-all duration-300")}/>
                        </div>
                        ASC <RxArrowTopRight size={24}/>
                    </button>

                </div>

                <div className="flex-1"></div>
                <SelectDashboardVariant active={activeVariant} setActive={setActiveVariant}/>
            </div>
            <ActiveDashboard employees={finalEmployees}/>
        </div>
    )
}