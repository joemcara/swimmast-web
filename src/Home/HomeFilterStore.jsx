import { create } from "zustand";

const createEnrollmentStatusSlice = (set) => ({
    enrollmentStatus: [],
    setEnrollmentStatus: (value) =>
        set(() => ({
            enrollmentStatus: value,
        })),
});

const createSearchSlice = (set) => ({
    search: '',
    setSearch: (value) =>
        set(() => ({
            search: value,
        })),
});

const createPaymentStatusSlice = (set) => ({
    paymentStatus: [],
    setPaymentStatus: (value) =>
        set(() => ({
            paymentStatus: value,
        })),
});

const createResetFiltersSlice = (set) => ({
    resetFilters: () =>
        set(() => ({
            enrollmentStatus: [],
            paymentStatus: [],
            search: "",
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
    ...createSearchSlice(...a),
    ...createPaymentStatusSlice(...a),
    ...createCurrentPageSlice(...a),

    ...createResetFiltersSlice(...a),
}));

export default useHomeFilterStore;