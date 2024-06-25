import { create } from "zustand";

const createUserSlice = (set) => ({
    user: {},
    setUser: (value) =>
        set(() => ({
            user: value
        }))
})

const useLoginStore = create((...a) => ({
    ...createUserSlice(...a),
}));

export default useLoginStore;