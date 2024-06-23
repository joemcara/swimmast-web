import { create } from 'zustand'

const createCoursesSlice = (set) => ({
    courses: [],
    setCourses: (value) =>
        set(() => ({
            courses: value
        }))
})

const createCourseTypesSlice = (set) => ({
    courseTypes: [],
    setCourseTypes: (value) =>
        set(() => ({
            courseTypes: value
        }))
})

const createInstructorsSlice = (set) => ({
    instructod: [],
    setInstructors: (value) =>
        set(() => ({
            instructors: value
        }))
})

const createSchedulesSlice = (set) => ({
    schedules: [],
    setSchedules: (value) =>
        set(() => ({
            schedules: value
        }))
})

const useCourseStore = create((...a) => ({
    ...createCoursesSlice(...a),
    ...createCourseTypesSlice(...a),
    ...createInstructorsSlice(...a),
    ...createSchedulesSlice(...a),


}))

export default useCourseStore;