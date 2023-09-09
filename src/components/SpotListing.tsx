import { useState } from "react";
import axios from "axios";

type region = {
    name: string;
    region_count: number;
    isActive: boolean;
};

type climbingType = {
    name: string;
    climb_type_count: number;
    region_count: number;
    isActive: boolean;
};

type filters = {
    regions: region[];
    climbingType: climbingType[];
};

type spot = {
    regions: region[];
    climbingType: climbingType[];
};

type GetSpotsResponse = {
    filters: filters;
    spots: spot[];
    limit: number;
    spotsCount: number;
    paginationSize: number;
};

function SpotListing() {
    const [currentPage, setCurrentPage] = useState(0);

    const [filters, setFilters] = useState<filters>({
        regions: [],
        climbingType: [],
    });
    const [spots, setSpots] = useState<spot[]>();
    const [limit, setLimit] = useState<number>(0);
    const [spotsCount, setSpotsCount] = useState<number>(0);
    const [paginationSize, setPaginationSize] = useState<number>(0);

    async function getSpotsByPage(requested_page: number) {
        let request_page = requested_page - 1;
        if (requested_page <= 0) {
            request_page = 0;
        }

        let filterRegions: string[] = [];
        let filterClimbingType: string[] = [];

        if (filters) {
            filters.regions.forEach((el: region) => {
                el.isActive ? filterRegions.push(el.name) : false;
            });

            filters.climbingType.forEach((el) => {
                el.isActive ? filterClimbingType.push(el.name) : false;
            });
        }

        type requestParameters = {
            i: number;
            t?: string;
            u?: string;
        };

        let params: requestParameters = {
            i: request_page,
        };

        if (filterRegions != null) params.t = filterRegions.toString();
        if (filterClimbingType != null)
            params.u = filterClimbingType.toString();

        try {
            const { data, status } = await axios.get<GetSpotsResponse>(
                "/api/spots",
                {
                    params,
                }
            );

            setLimit(data.limit);
            setSpotsCount(data.spotsCount);
            setSpots(data.spots);
            setFilters(data.filters);
            if (requested_page >= 1) {
                setCurrentPage(requested_page);
            }
            return data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.log("error message: ", error.message);
                return error.message;
            } else {
                console.log("unexpected error: ", error);
                return "An unexpected error occurred";
            }
        }
    }

    getSpotsByPage(1);

    function CurrentPagePlusOne() {
        return "Hello";
    }

    function CurrentPagePlusTwo() {
        return "Hello";
    }

    return (
        <>
            {/* <div className=""> */}
            <div className="filters w-1/4">
                <div
                    id="accordion-flush"
                    data-accordion="open"
                    data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    data-inactive-classes="text-gray-500 dark:text-gray-400"
                >
                    <h2 id="accordion-flush-heading-1">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                            data-accordion-target="#accordion-flush-body-1"
                            aria-expanded="true"
                            aria-controls="accordion-flush-body-1"
                        >
                            <span>Region</span>
                            <svg
                                data-accordion-icon
                                className="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id="accordion-flush-body-1"
                        className="hidden bg-white"
                        aria-labelledby="accordion-flush-heading-1"
                    >
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                            {filters.regions.map((region, index) => (
                                <div
                                    className="flex justify-between cursor-pointer"
                                    v-on:click="region.isActive ? filterDeactivated(region.name, 'region') : filterActivated(region.name, 'region')"
                                >
                                    <p>{region.name}</p>
                                    <p className="text-gray-500">
                                        {region.region_count}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h2 id="accordion-flush-heading-2">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                            data-accordion-target="#accordion-flush-body-2"
                            aria-expanded="true"
                            aria-controls="accordion-flush-body-2"
                        >
                            <span>Climbing type</span>
                            <svg
                                data-accordion-icon
                                className="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id="accordion-flush-body-2"
                        className="hidden bg-white"
                        aria-labelledby="accordion-flush-heading-2"
                    >
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                            <div
                                className=""
                                v-for="(climb_type, index) in filters.climbingType"
                            >
                                {filters.climbingType.map(
                                    (climbingType, index) => (
                                        <div
                                            className="flex justify-between cursor-pointer"
                                            v-on:click="climb_type.isActive ? filterDeactivated(climb_type.name, 'climbingType') : filterActivated(climb_type.name, 'climbingType')"
                                        >
                                            <p>{climbingType.name}</p>
                                            <p className="text-gray-500">
                                                {climbingType.region_count}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="regions">
                <h3>Climb type</h3>
                <div className="" v-for="(region, index) in filters.regions">
                    <p
                    v-on:click="region.isActive ? filterDeactivated(region.name, 'region') : filterActivated(region.name, 'region')">
                    { region.name } { region.region_count }</p>
                </div>
                </div> */}

                {/* <div className="climb_type">
                <div className="" v-for="(climb_type, index) in filters.climbingType">
                    <p
                    v-on:click="climb_type.isActive ? filterDeactivated(climb_type.name, 'climbingType') : filterActivated(climb_type.name, 'climbingType')">
                    { climb_type.name } { climb_type.climb_type_count }</p>
                </div>
                </div> */}
            </div>
            <div className="rounded-md bg-gray-200 w-3/4">
                <div className="flex flex-wrap auto-rows-max justify-center items-stretch py-4">
                    {/* <Spot v-for="(spot, index) in spots" className="m-2" :spot="spot" :index="index" :key="index" /> */}
                </div>
                <div className="flex justify-center rounded-b-md bg-white py-4">
                    <nav className="cursor-pointer">
                        <ul className="inline-flex -space-x-px text-sm">
                            <li>
                                <a
                                    className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    v-on:click="
                                isCurrentPageLessXPossible(1)
                                ? getSpotsByPage(currentPage - 1)
                                : null
                                "
                                >
                                    Previous
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    v-on:click="
                                isCurrentPageLessXPossible(2)
                                ? getSpotsByPage(currentPage - 2)
                                : null"
                                >
                                    {currentPage <= 2 ? "-" : currentPage - 2}{" "}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    v-on:click="
                                isCurrentPageLessXPossible(1)
                                ? getSpotsByPage(currentPage - 1)
                                : null"
                                >
                                    {currentPage == 1 ? "-" : currentPage - 1}
                                </a>
                            </li>
                            <li>
                                <a
                                    aria-current="page"
                                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                >
                                    {currentPage}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    v-on:click="
                                isCurrentPagePlusXPossible(1)
                                ? getSpotsByPage(currentPage + 1)
                                : null
                                "
                                >
                                    {CurrentPagePlusOne()}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    v-on:click="
                                isCurrentPagePlusXPossible(2)
                                ? getSpotsByPage(currentPage + 2)
                                : null
                                "
                                >
                                    {CurrentPagePlusTwo()}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    v-on:click="
                                isCurrentPagePlusXPossible(1)
                                ? getSpotsByPage(currentPage + 1)
                                : null
                                "
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

export default SpotListing;
