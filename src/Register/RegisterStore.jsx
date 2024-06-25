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

const useRegisterStore = create((...a) => ({
    ...createInstructorsSlice(...a),
    ...createCourseTypesSlice(...a),
    ...createEnrollmentStatusesSlice(...a),
    ...createPaymentStatusesSlice(...a),
    ...createCoursesSlice(...a),
    ...createRolesSlice(...a),
}))

export default useRegisterStore;