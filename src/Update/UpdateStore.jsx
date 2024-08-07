import { create } from "zustand";

const createSelectedItemSlice = (set) => ({
    selectedItem: null,
    setSelectedItem: (value) =>
        set(() => ({
            selectedItem: value,
        })),
});

const createSelectedEnrollmentSlice = (set) => ({
    selectedEnrollment: null,
    setSelectedEnrollment: (value) =>
        set(() => ({
            selectedEnrollment: value,
        })),
});

const createStudentsSlice = (set) => ({
    students: [],
    setStudents: (value) =>
        set(() => ({
            students: value,
        })),
});

const createEnrollmentsSlice = (set) => ({
    enrollments: [],
    setEnrollments: (value) =>
        set(() => ({
            enrollments: value,
        })),
});

const useUpdateStore = create((...a) => ({
    ...createStudentsSlice(...a),
    ...createSelectedItemSlice(...a),
    ...createEnrollmentsSlice(...a),
    ...createSelectedEnrollmentSlice(...a),
}));

export default useUpdateStore;
