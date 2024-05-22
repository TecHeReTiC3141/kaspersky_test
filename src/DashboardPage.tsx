import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading.tsx";
import React, { useEffect, useMemo, useState } from "react";
import TableDashboard from "./components/dashboards/TableDashboard.tsx";
import CardDashboard from "./components/dashboards/CardDashboard.tsx";
import GroupDashboard from "./components/dashboards/GroupDashboard.tsx";
import SelectDashboardVariant from "./components/dashboardToolbar/SelectDashboardVariant.tsx";
import { Employee, useEmployeeData } from "./context/EmployeeContext.tsx";
import { DashboardProps } from "./components/dashboards/Props.ts";
import SearchDropdown from "./components/dashboardToolbar/SearchDropdown.tsx";
import SortDropdown from "./components/dashboardToolbar/SortDropdown.tsx";
import ToTopButton from "./components/ToTopButton.tsx";
import { filter, orderBy } from 'lodash';



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
        isSortAscending,
        searchField,
        searchValue,
    } = useEmployeeData();

    const groupQuery = useQuery<string[]>({
        queryKey: [ "groups" ],

        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/groups`, {
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
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/employees`, {
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
        // TODO: think about adding tests to this section
        let temp = [...employees];

        if (searchField && searchValue) {
            const lowerToValue = searchValue.toLowerCase();
            temp = filter(temp, (employee) => {
                const fieldValue = employee[searchField] ?? "Unmanaged";
                return fieldValue.toLowerCase().includes(lowerToValue);
            });
        }

        if (sortedField) {
            temp = orderBy(temp, [sortedField], [isSortAscending ? 'asc' : 'desc']);
        }
        return temp;
    }, [ employees, isSortAscending, searchField, searchValue, sortedField ]);

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
    return (
        <div className="w-full">
            <div className="flex justify-between items-start mb-4 px-1 xs:px-4 gap-x-4 sm:gap-x-6 max-h-[60px] sticky
            top-0 w-full bg-gray-200 dark:bg-gray-800 py-2 border border-t-0 rounded-md border-gray-400 z-10">
                <SearchDropdown/>
                <SortDropdown/>
                <h4 className="hidden md:block lg:text-lg font-bold lg:mt-1.5">Всего {finalEmployees.length} сотрудников</h4>
                <div className="hidden sm:block flex-1"></div>
                <SelectDashboardVariant active={activeVariant} setActive={setActiveVariant}/>
            </div>
            <div className="w-full px-2">
                {finalEmployees.length > 0 ? <ActiveDashboard employees={finalEmployees}/> :
                    <p className="text">Нет сотрудников, удовлетворяющих фильтру поиска</p>}
            </div>
            <ToTopButton />
        </div>
    )
}