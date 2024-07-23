import { create } from 'zustand'

const createCoursesSlice = (set) => ({
    courses: [],
    setCourses: (value) =>
        set(() => ({
            courses: value
        }))
})

const createCourseTypesSlice = (set) => ({
    courseTypes: [],
    setCourseTypes: (value) =>
        set(() => ({
            courseTypes: value
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

const useCourseStore = create((...a) => ({
    ...createCoursesSlice(...a),
    ...createCourseTypesSlice(...a),
    ...createSelectedItemSlice(...a),
    ...createTotalPagesSlice(...a),
}))

export default useCourseStore;