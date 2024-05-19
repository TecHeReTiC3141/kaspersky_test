import { dashboardVariants } from "../DashboardPage.tsx";
import { IconType } from "react-icons";
import { BsTable } from "react-icons/bs";
import { BsHddStack } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";


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

    const ActiveIcon = variants[ active ];
    return (
        <div className="flex flex-row-reverse items-center gap-x-3 px-2 py-1 border border-gray-600
            rounded-md w-12 hover:w-40 transition-all duration-300 overflow-x-hidden">
            {<div className="border-l pl-3 border-gray-700 last:border-l-0 last:pr-0">
                <button className="hover:bg-blue-300 p-1 rounded-md" onClick={() => setActive(active)}>
                    <ActiveIcon size={24}/>
                </button>
            </div>}
            {Object.entries(variants).filter(([ key ]) => key !== active)
                .map(([ key, Icon ]) => (
                    <div className="border-l pl-3 border-gray-700 last:border-l-0 last:pr-0">
                        <button className="hover:bg-blue-300 p-1 rounded-md" onClick={() => setActive(key)}>
                            <Icon size={24}/>
                        </button>
                    </div>
                ))}
        </div>
    )
}