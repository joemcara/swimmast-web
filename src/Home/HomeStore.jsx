import { create } from 'zustand'

const createStudentsSlice = (set) => ({
    students: [],
    setStudents: (value) =>
        set(() => ({
            students: value
        }))
})

const createEnrollmentStatusesSlice = (set) => ({
    enrollmentStatuses: [],
    setEnrollmentStatuses: (value) =>
        set(() => ({
            enrollmentStatuses: value
        }))
})

const createCoursesSlice = (set) => ({
    courses: [],
    setCourses: (value) =>
        set(() => ({
            courses: value
        }))
})

const createPaymentStatusesSlice = (set) => ({
    paymentStatuses: [],
    setPaymentStatuses: (value) =>
        set(() => ({
            paymentStatuses: value
        }))
})

const createSelectedItemSlice = (set) => ({
    selectedItem: null,
    setSelectedItem: (value) =>
        set(() => ({
            selectedItem: value
        }))
})

const createTotalPagesSlice = (set) => ({
    totalPages: 0,
    setTotalPages: (value) =>
        set(() => ({
            totalPages: value
        }))
})

const useHomeStore = create((...a) => ({
    ...createStudentsSlice(...a),
    ...createEnrollmentStatusesSlice(...a),
    ...createCoursesSlice(...a),
    ...createPaymentStatusesSlice(...a),
    ...createSelectedItemSlice(...a),

    ...createTotalPagesSlice(...a),
}))

export default useHomeStore;