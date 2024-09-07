import { create } from "zustand";

const createInstructorsSlice = (set) => ({
    instructors: [],
    setInstructors: (value) =>
        set(() => ({
            instructors: value
        }))
})

const createCourseTypesSlice = (set) => ({
    courseTypes: [],
    setCourseTypes: (value) =>
        set(() => ({
            courseTypes: value
        }))
})

const createCourseStatusesSlice = (set) => ({
    courseStatuses: [],
    setCourseStatuses: (value) =>
        set(() => ({
            courseStatuses: value
        }))
})

const createEnrollmentStatusesSlice = (set) => ({
    enrollmentStatuses: [],
    setEnrollmentStatuses: (value) =>
        set(() => ({
            enrollmentStatuses: value
        }))
})

const createPaymentStatusesSlice = (set) => ({
    paymentStatuses: [],
    setPaymentStatuses: (value) =>
        set(() => ({
            paymentStatuses: value
        }))
})

const createCoursesSlice = (set) => ({
    courses: [],
    setCourses: (value) =>
        set(() => ({
            courses: value
        }))
})

const createRolesSlice = (set) => ({
    roles: [],
    setRoles: (value) =>
        set(() => ({
            roles: value
        }))
})

const createUsernamesSlice = (set) => ({
    usernames: [],
    setUsernames: (value) =>
        set(() => ({
            usernames: value
        }))
})

const createWeekdaysSlice = (set) => ({
    weekdays: [],
    setWeekdays: (value) =>
        set(() => ({
            weekdays: value
        }))
})


const createUsersSlice = (set) => ({
    users: [],
    setUsers: (value) =>
        set(() => ({
            users: value
        })
        )
})


const createEnrollmentsSlice = (set) => ({
    enrollments: [],
    setEnrollments: (value) =>
        set(() => ({
            enrollments: value
        })
        )
})


const useFormStore = create((...a) => ({
    ...createInstructorsSlice(...a),
    ...createCourseTypesSlice(...a),
    ...createCourseStatusesSlice(...a),
    ...createEnrollmentStatusesSlice(...a),
    ...createPaymentStatusesSlice(...a),
    ...createCoursesSlice(...a),
    ...createRolesSlice(...a),
    ...createUsernamesSlice(...a),
    ...createWeekdaysSlice(...a),
    ...createUsersSlice(...a),
    ...createEnrollmentsSlice(...a),
}))

export default useFormStore;