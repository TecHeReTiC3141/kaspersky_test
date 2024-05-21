import { createContext, ReactNode, useContext, useState } from "react";

export interface Employee {
    id: string;
    name: string;
    accountName: string;
    email: string;
    group: string | null;
    position: string;
    phoneNumber: string;
}

export interface EmployeeDataContextValue {
    groups: string[],
    setGroups: (value: (((prevState: string[]) => string[]) | string[])) => void,
    employees: Employee[],
    setEmployees: (value: (((prevState: Employee[]) => Employee[]) | Employee[])) => void,
    selected: { [ k: string ]: boolean },
    setSelected: (value: (((prevState: { [ k: string ]: boolean }) => { [ k: string ]: boolean }) | {
        [ k: string ]: boolean
    })) => void,
    sortedField: keyof Employee | null,
    setSortedField: (value: keyof Employee | null) => void,
    isSortAscending: boolean,
    setIsSortAscending: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    searchField: keyof Employee | null,
    setSearchField: (value: keyof Employee | null) => void,
    searchValue: string,
    setSearchValue: (value: string) => void,
}

const EmployeeDataContext = createContext<EmployeeDataContextValue | Record<string, never>>({});


export function useEmployeeData() {
    return useContext(EmployeeDataContext) as EmployeeDataContextValue;
}

export default function EmployeeDataProvider({ children }: { children: ReactNode }) {

    const [ groups, setGroups ] = useState<string[]>([]);

    const [ employees, setEmployees ] = useState<Employee[]>([]);

    const [ selected, setSelected ] = useState<{ [ k: string ]: boolean }>({});

    const [ sortedField, setSortedField ] = useState<keyof Employee | null>(null);

    const [ isSortAscending, setIsSortAscending ] = useState<boolean>(true);

    const [ searchField, setSearchField ] = useState<keyof Employee | null>(null);

    const [ searchValue, setSearchValue ] = useState<string>("");

    const value = {
        groups,
        setGroups,
        employees,
        setEmployees,
        selected,
        setSelected,
        sortedField,
        setSortedField,
        isSortAscending,
        setIsSortAscending,
        searchField,
        setSearchField,
        searchValue,
        setSearchValue
    };

    return (
        <EmployeeDataContext.Provider value={value}>
            {children}
        </EmployeeDataContext.Provider>
    );

}

