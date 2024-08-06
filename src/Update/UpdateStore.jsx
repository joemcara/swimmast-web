import { create } from "zustand";

const createStudentsSlice = (set) => ({
    students: [],
    setStudents: (value) =>
        set(() => ({
            students: value,
        })),
});

const useUpdateStore = create((...a) => ({
    ...createStudentsSlice(...a),
}));

export default useUpdateStore;
