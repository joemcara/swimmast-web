import { create } from 'zustand';

const createCourseNameSlice = (set) => ({
    courseName: "",
    setCourseName: (value) =>
        set(() => ({
            courseName: value
        }))
})


const createInstructorSlice = (set) => ({
    instructor: null,
    setInstructor: (value) =>
        set(() => ({
            instructor: value
        }))
})

const createCourseTypeSlice = (set) => ({
    courseType: null,
    setCourseType: (value) =>
        set(() => ({
            courseType: value
        }))
})

const createEnrollmentDuration = (set) => ({
    enrollmentDuration: [],
    setEnrollmentDuration: (value) =>
        set(() => ({
            enrollmentDuration: value
        }))
})

const createCourseStatusSlice = (set) => ({
    courseStatus: null,
    setCourseStatus: (value) =>
        set(() => ({
            courseStatus: value
        }))
})

const createCoursePriceSlice = (set) => ({
    coursePrice: 0.0,
    setCoursePrice: (value) =>
        set(() => ({
            coursePrice: value
        }))
})

const createStartTimeSlice = (set) => ({
    startTime: "",
    setStartTime: (value) =>
        set(() => ({
            startTime: value
        }))
})

const createEndTimeSlice = (set) => ({
    endTime: "",
    setEndTime: (value) =>
        set(() => ({
            endTime: value
        }))
})

const createResetSlice = (set) => ({
    reset: () =>
        set(() => ({
            courseName: "",
            instructor: null,
            courseType: null,
            enrollmentDuration: [],
            courseStatus: null,
            coursePrice: 0.0,
            startTime: "",
            endTime: ""
        }))
})

const useCourseFormStore = create((...a) => ({
    ...createCourseNameSlice(...a),
    ...createInstructorSlice(...a),
    ...createCourseTypeSlice(...a),
    ...createEnrollmentDuration(...a),
    ...createCourseStatusSlice(...a),
    ...createCoursePriceSlice(...a),
    ...createStartTimeSlice(...a),
    ...createEndTimeSlice(...a),
    ...createResetSlice(...a)
}))

export default useCourseFormStore;