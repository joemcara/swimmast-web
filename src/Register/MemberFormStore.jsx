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
    birthDate: "",
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

const createRepresentativeSlice = (set) => ({
    representative: "",
    setRepresentative: (value) =>
        set(() => ({
            representative: value
        }))
})

const createFamilyBondSlice = (set) => ({
    familyBond: "",
    setFamilyBond: (value) =>
        set(() => ({
            familyBond: value
        }))
})

const createCellphoneNumberSlice = (set) => ({
    cellphoneNumber: "",
    setCellphoneNumber: (value) =>
        set(() => ({
            cellphoneNumber: value
        }))
})

const createTrainerSlice = (set) => ({
    trainer: null,
    setTrainer: (value) =>
        set(() => ({
            trainer: value
        }))
})

const createCourseTypeSlice = (set) => ({
    courseType: "INDIVIDUAL",
    setCourseType: (value) =>
        set(() => ({
            courseType: value
        }))
})

const createApplicationStateSlice = (set) => ({
    applicationState: null,
    setApplicationState: (value) =>
        set(() => ({
            applicationState: value
        }))
})

const createApplicationDurationSlice = (set) => ({
    applicationDuration: [],
    setApplicationDuration: (value) =>
        set(() => ({
            applicationDuration: value
        }))
})

const createPaymentStateSlice = (set) => ({
    paymentState: null,
    setPaymentState: (value) =>
        set(() => ({
            paymentState: value
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


const useMemberFormStore = create((...a) => ({
    ...createNamesSlice(...a),
    ...createLastNamesSlice(...a),
    ...createBirthDateSlice(...a),
    ...createAgeSlice(...a),
    ...createVoucherNumberSlice(...a),
    ...createEmailSlice(...a),
    ...createAddressSlice(...a),
    ...createRepresentativeSlice(...a),
    ...createFamilyBondSlice(...a),
    ...createCellphoneNumberSlice(...a),
    ...createTrainerSlice(...a),
    ...createCourseTypeSlice(...a),
    ...createApplicationStateSlice(...a),
    ...createApplicationDurationSlice(...a),
    ...createPaymentStateSlice(...a),
    ...createCreditSlice(...a),
    ...createPaymentMethodSlice(...a),
    ...createPaymentSlice(...a),
    //FOR "INDIVIDUAL" COURSE TYPE
    ...createNumberOfDaysSlice(...a),
    ...createCourseDaysSlice(...a),
    //FOR "OTHERS" COURSE TYPES
    ...createCourseSlice(...a),
}))

export default useMemberFormStore;