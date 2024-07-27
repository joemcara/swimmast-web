import { create } from 'zustand';

const createIdSlice = (set) => ({
    id: null,
    setId: (value) =>
        set(() => ({
            id: value
        }))
})

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

const createDescriptionSlice = (set) => ({
    description: "",
    setDescription: (value) =>
        set(() => ({
            description: value
        }))
})

const createWeekdaysSlice = (set) => ({
    weekdays: [],
    setWeekdays: (value) =>
        set(() => ({
            weekdays: value
        }))
})

const createAvailableSlice = (set) => ({
    available: true,
    setAvailable: (value) =>
        set(() => ({
            available: value
        }))
})

const createResetSlice = (set) => ({
    reset: () =>
        set(() => ({
            id: null,
            courseName: "",
            instructor: null,
            courseType: null,
            enrollmentDuration: [],
            courseStatus: null,
            coursePrice: 0.0,
            startTime: "",
            endTime: "",
            description: "",
            weekdays: [],
            available: true
        }))
})

const createEditSlice = (set) => ({
    edit: (course) =>
        set(() => ({
            id: course?.id,
            courseName: course?.name,
            instructor: course?.instructor?.id?.toString(),
            courseType: course?.course_type?.id?.toString(),
            enrollmentDuration: [new Date(course.start_date), new Date(course.due_date)],
            courseStatus: course?.course_status?.id?.toString(),
            coursePrice: course?.price,
            startTime: course?.start_time,
            endTime: course?.end_time,
            description: course?.description,
            weekdays: course?.weekdays?.map(id => id.toString()),
            available: course?.available
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
    ...createResetSlice(...a),
    ...createEditSlice(...a),
    ...createDescriptionSlice(...a),
    ...createWeekdaysSlice(...a),
    ...createAvailableSlice(...a),
}))

export default useCourseFormStore;