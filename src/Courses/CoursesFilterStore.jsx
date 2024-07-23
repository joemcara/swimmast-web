import { create } from 'zustand'

const createCourseTypeSlice = (set) => ({
    courseType: [],
    setCourseType: (value) =>
        set(() => ({
            courseType: value
        }))
})

const createSearchStore = (set) => ({
    search: "",
    setSearch: (value) =>
        set(() => ({
            search: value
        }))
})

const createCurrentPageSlice = (set) => ({
    currentPage: 1,
    setCurrentPage: (value) =>
        set(() => ({
            currentPage: value
        }))
})

const createResetFiltersSlice = (set) => ({
    resetFilters: () =>
        set(() => ({
            courseType: "",
            search: "",
        })
        )
})
const useCoursesFilterStore = create((...a) => ({
    ...createCourseTypeSlice(...a),
    ...createSearchStore(...a),
    ...createCurrentPageSlice(...a),
    ...createResetFiltersSlice(...a)
}))

export default useCoursesFilterStore;