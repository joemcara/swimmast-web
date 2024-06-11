import { create } from 'zustand'

const createCourseTypeSlice = (set) => ({
    courseType: "todos",
    setCourseType: (value) =>
        set(() => ({
            courseType: value
        }))
})

const createTrainerSlice = (set) => ({
    trainer: "todos",
    setTrainer: (value) =>
        set(() => ({
            trainer: value
        }))
})

const createScheduleSlice = (set) => ({
    schedule: "todos",
    setSchedule: (value) =>
        set(() => ({
            schedule: value
        }))
})

// const createRestablecerSlice = (set) => ({
//     createCourseTypeSlice().setCourseType("todos"),
// })

const useCoursesFilterStore = create((...a) => ({
    ...createCourseTypeSlice(...a),
    ...createTrainerSlice(...a),
    ...createScheduleSlice(...a)
}))

export default useCoursesFilterStore;