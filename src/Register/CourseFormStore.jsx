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

const createCourseStateSlice = (set) => ({
    courseState: null,
    setCourseState: (value) =>
        set(() => ({
            courseState: value
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

const useCourseFormStore = create((...a) => ({
    ...createCourseNameSlice(...a),
    ...createInstructorSlice(...a),
    ...createCourseTypeSlice(...a),
    ...createEnrollmentDuration(...a),
    ...createCourseStateSlice(...a),
    ...createCoursePriceSlice(...a),
    ...createStartTimeSlice(...a),
    ...createEndTimeSlice(...a)
}))

export default useCourseFormStore;