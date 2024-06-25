import { create } from 'zustand'


//REGISTER FORM DATA
const createNamesSlice = (set) => ({
    names: "",
    setNames: (value) =>
        set(() => ({
            names: value
        }))
})

const createLastNamesSlice = (set) => ({
    lastNames: "",
    setLastNames: (value) =>
        set(() => ({
            lastNames: value
        }))
})

const createBirthDateSlice = (set) => ({
    birthDate: new Date(),
    setBirthDate: (value) =>
        set(() => ({
            birthDate: value
        }))
})

const createAgeSlice = (set) => ({
    age: 0,
    setAge: (value) =>
        set(() => ({
            age: value
        }))
})

const createVoucherNumberSlice = (set) => ({
    voucherNumber: "",
    setVoucherNumber: (value) =>
        set(() => ({
            voucherNumber: value
        }))
})

const createEmailSlice = (set) => ({
    email: "",
    setEmail: (value) =>
        set(() => ({
            email: value
        }))
})

const createAddressSlice = (set) => ({
    address: "",
    setAddress: (value) =>
        set(() => ({
            address: value
        }))
})

const createCellphoneNumberSlice = (set) => ({
    cellphoneNumber: "",
    setCellphoneNumber: (value) =>
        set(() => ({
            cellphoneNumber: value
        }))
})

const createCourseTypeSlice = (set) => ({
    courseType: null,
    setCourseType: (value) =>
        set(() => ({
            courseType: value
        }))
})

const createEnrollmentStatusSlice = (set) => ({
    enrollmentStatus: null,
    setEnrollmentStatus: (value) =>
        set(() => ({
            enrollmentStatus: value
        }))
})

const createEnrollmentDurationSlice = (set) => ({
    enrollmentDuration: [],
    setEnrollmentDuration: (value) =>
        set(() => ({
            enrollmentDuration: value
        }))
})

const createPaymentStatusSlice = (set) => ({
    paymentStatus: null,
    setPaymentState: (value) =>
        set(() => ({
            paymentStatus: value
        }))
})

const createCreditSlice = (set) => ({
    credit: 0,
    setCredit: (value) =>
        set(() => ({
            credit: value
        }))
})

const createPaymentMethodSlice = (set) => ({
    paymentMethod: "TRANSACTION",
    setPaymentMethod: (value) =>
        set(() => ({
            paymentMethod: value
        }))
})

const createPaymentSlice = (set) => ({
    payment: 0,
    setPayment: (value) =>
        set(() => ({
            payment: value
        }))
})

const createRoleSlice = (set) => ({
    role: null,
    setRole: (value) =>
        set(() => ({
            role: value
        }))
})

//FOR "INDIVIDUAL" COURSE TYPE
const createNumberOfDaysSlice = (set) => ({
    numbersOfDays: "",
    setNumberOfDays: (value) =>
        set(() => ({
            numbersOfDays: value
        }))
})

const createCourseDaysSlice = (set) => ({
    courseDays: [],
    setCourseDays: (value) =>
        set(() => ({
            courseDays: value
        }))
})

//FOR "OTHERS" COURSE TYPES
const createCourseSlice = (set) => ({
    course: null,
    setCourse: (value) =>
        set(() => ({
            course: value
        }))
})


const useInstructorFormStore = create((...a) => ({
    ...createNamesSlice(...a),
    ...createLastNamesSlice(...a),
    ...createBirthDateSlice(...a),
    ...createAgeSlice(...a),
    ...createVoucherNumberSlice(...a),
    ...createEmailSlice(...a),
    ...createAddressSlice(...a),
    ...createCellphoneNumberSlice(...a),
    ...createCourseTypeSlice(...a),
    ...createEnrollmentStatusSlice(...a),
    ...createEnrollmentDurationSlice(...a),
    ...createPaymentStatusSlice(...a),
    ...createCreditSlice(...a),
    ...createPaymentMethodSlice(...a),
    ...createPaymentSlice(...a),
    ...createRoleSlice(...a),
    //FOR "INDIVIDUAL" COURSE TYPE
    ...createNumberOfDaysSlice(...a),
    ...createCourseDaysSlice(...a),
    //FOR "OTHERS" COURSE TYPES
    ...createCourseSlice(...a),
}))

export default useInstructorFormStore;