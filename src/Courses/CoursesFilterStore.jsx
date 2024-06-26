import { create } from 'zustand'

const createCourseTypeSlice = (set) => ({
    courseType: "todos",
    setCourseType: (value) =>
        set(() => ({
            courseType: value
        }))
})

const createInstructorSlice = (set) => ({
    instructor: "todos",
    setInstructor: (value) =>
        set(() => ({
            instructor: value
        }))
})

const createScheduleSlice = (set) => ({
    schedule: "00:00:00",
    setSchedule: (value) =>
        set(() => ({
            schedule: value
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
            courseType: null,
            instructor: null,
            schedule: null
        })
        )
})
const useCoursesFilterStore = create((...a) => ({
    ...createCourseTypeSlice(...a),
    ...createInstructorSlice(...a),
    ...createScheduleSlice(...a),
    ...createCurrentPageSlice(...a),

    ...createResetFiltersSlice(...a)
}))

export default useCoursesFilterStore;