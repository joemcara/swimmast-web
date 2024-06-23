import { create } from "zustand";

const createEnrollmentStatusSlice = (set) => ({
    enrollmentStatus: 'todos',
    setEnrollmentStatus: (value) =>
        set(() => ({
            enrollmentStatus: value,
        })),
});

const createCourseSlice = (set) => ({
    course: 'todos',
    setCourse: (value) =>
        set(() => ({
            course: value,
        })),
});

const createPaymentStatusSlice = (set) => ({
    paymentStatus: 'todos',
    setPaymentStatus: (value) =>
        set(() => ({
            paymentStatus: value,
        })),
});

const createResetFiltersSlice = (set) => ({
    resetFilters: () =>
        set(() => ({
            enrollmentStatus: 'todos',
            course: 'todos',
            paymentStatus: 'todos',
        })),
});

const createCurrentPageSlice = (set) => ({
    currentPage: 1,
    setCurrentPage: (value) =>
        set(() => ({
            currentPage: value,
        })),
});

const useHomeFilterStore = create((...a) => ({
    ...createEnrollmentStatusSlice(...a),
    ...createCourseSlice(...a),
    ...createPaymentStatusSlice(...a),
    ...createCurrentPageSlice(...a),

    ...createResetFiltersSlice(...a),
}));

export default useHomeFilterStore;