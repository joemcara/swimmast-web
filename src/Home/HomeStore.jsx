import { create } from 'zustand'

const createStudentsSlice = (set) => ({
    students: [],
    setStudents: (value) =>
        set(() => ({
            students: value
        }))
})

const createSelectedItemSlice = (set) => ({
    selectedItem: null,
    setSelectedItem: (value) =>
        set(() => ({
            selectedItem: value
        }))
})

const useHomeStore = create((...a) => ({
    ...createStudentsSlice(...a),
    ...createSelectedItemSlice(...a)
}))

export default useHomeStore;