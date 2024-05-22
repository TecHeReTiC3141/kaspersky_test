import { useEffect, useState } from "react";
import clsx from "clsx";
import { FaArrowUpLong } from "react-icons/fa6";


export default function ToTopButton() {
    const [ scrollTop, setScrollTop ] = useState<number>(0);
    useEffect(() => {
        if (!window) return;
        const onScroll = (e: Event) => {
            setScrollTop((e.target as Document).documentElement.scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [ scrollTop ]);

    return (
        <div
            className={clsx(typeof window !== "undefined" && scrollTop > Math.round( window?.innerHeight * .75) ? "animated-fade" : "hidden",
                "group fixed right-8 bottom-8 rounded-full shadow-transparent hover:shadow-gray-700 hover:dark:shadow-gray-400 shadow")}>
            <button tabIndex={0} onClick={() => {
                window.scrollTo({
                    behavior: "smooth",
                    left: 0,
                    top: 0,
                });
            }} className="bg-blue-500 w-10 h-10 sm:w-12 sm:h-12 flex rounded-full items-center justify-center text-white">
                <FaArrowUpLong size={26}/>
            </button>
        </div>
    )
}