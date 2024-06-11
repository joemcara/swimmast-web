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

const createTrainersSlice = (set) => ({
    trainers: [],
    setTrainers: (value) =>
        set(() => ({
            trainers: value
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
    ...createTrainersSlice(...a),
    ...createSchedulesSlice(...a),
}))

export default useCourseStore;