import { dashboardVariants } from "../../DashboardPage.tsx";
import { IconType } from "react-icons";
import { BsTable } from "react-icons/bs";
import { BsHddStack } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import clsx from "clsx";


const variants: { [ k: keyof typeof dashboardVariants ]: IconType } = {
    "table": BsTable,
    "card": FaRegAddressCard,
    "group": BsHddStack,
}

interface SelectDashboardVariantProps {
    active: string,
    setActive: (value: string) => void,
}

export default function SelectDashboardVariant({ active, setActive }: SelectDashboardVariantProps) {
    return (
        <div className="group relative">
            <div className="items-center gap-x-1 md:gap-x-3 px-1.5 xs:px-2 py-1 bg-gray-200 dark:bg-gray-800
         border border-gray-600 dark:border-gray-400 rounded-md hidden group-hover:flex max-xs:rounded-tr-none max-xs:z-10  max-xs:absolute top-full right-0 xs:flex">
                {Object.entries(variants)
                    .map(([ key, Icon ]) => (
                        <div key={key} className="border-r pr-1 md:pr-3 border-gray-700 last:border-r-0 last:pr-0">
                            <button className={clsx(" p-1 rounded-md", active === key ?
                                "bg-yellow-300 dark:bg-yellow-500" : "hover:bg-blue-300 hover:dark:bg-blue-400")}
                                    disabled={active === key} onClick={() => setActive(key)}>
                                <Icon size={24}/>
                            </button>
                        </div>
                    ))}
            </div>
            <div className="flex  px-1.5 py-1 border border-gray-600 dark:border-gray-400 rounded-md xs:hidden group-hover:rounded-b-none">
                {Object.entries(variants)
                    .filter(([ key, ]) => key === active)
                    .map(([ key, Icon ]) => (
                        <div key={key} className="border-r pr-1 md:pr-3 border-gray-700 last:border-r-0 last:pr-0">
                            <button className={clsx(" p-1 rounded-md bg-yellow-300 dark:bg-yellow-500")}
                                    disabled={active === key} onClick={() => setActive(key)}>
                                <Icon size={24}/>
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    )
}