import { create } from 'zustand'

const createStudentsSlice = (set) => ({
    students: [],
    setStudents: (value) =>
        set(() => ({
            students: value
        }))
})

const useHomeStore = create((...a) => ({
    ...createStudentsSlice(...a)
}))

export default useHomeStore;