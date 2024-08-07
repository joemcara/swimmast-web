import { create } from "zustand";

//REGISTER FORM DATA
const createIdSlice = (set) => ({
    id: null,
    setId: (value) =>
        set(() => ({
            id: value,
        })),
});

const createFirstNameSlice = (set) => ({
    firstName: "",
    setFirstName: (value) =>
        set(() => ({
            firstName: value,
        })),
});

const createLastNameSlice = (set) => ({
    lastName: "",
    setLastName: (value) =>
        set(() => ({
            lastName: value,
        })),
});

const createBirthdateSlice = (set) => ({
    birthdate: null,
    setBirthdate: (value) =>
        set(() => ({
            birthdate: value,
        })),
});

const createAgeSlice = (set) => ({
    age: 0,
    setAge: (value) =>
        set(() => ({
            age: value,
        })),
});

const createReceiptNumberSlice = (set) => ({
    receiptNumber: "",
    setReceiptNumber: (value) =>
        set(() => ({
            receiptNumber: value,
        })),
});

const createEmailSlice = (set) => ({
    email: "",
    setEmail: (value) =>
        set(() => ({
            email: value,
        })),
});

const createAddressSlice = (set) => ({
    address: "",
    setAddress: (value) =>
        set(() => ({
            address: value,
        })),
});

const createRepresentativeSlice = (set) => ({
    representative: "",
    setRepresentative: (value) =>
        set(() => ({
            representative: value,
        })),
});

const createRelationshipSlice = (set) => ({
    relationship: "",
    setRelationship: (value) =>
        set(() => ({
            relationship: value,
        })),
});

const createPhoneNumberSlice = (set) => ({
    phoneNumber: "",
    setPhoneNumber: (value) =>
        set(() => ({
            phoneNumber: value,
        })),
});

const createInstructorSlice = (set) => ({
    instructor: null,
    setInstructor: (value) =>
        set(() => ({
            instructor: value,
        })),
});

const createCourseTypeSlice = (set) => ({
    courseType: null,
    setCourseType: (value) =>
        set(() => ({
            courseType: value,
        })),
});

const createEnrollmentStatusSlice = (set) => ({
    enrollmentStatus: null,
    setEnrollmentStatus: (value) =>
        set(() => ({
            enrollmentStatus: value,
        })),
});

const createEnrollmentDurationSlice = (set) => ({
    enrollmentDuration: [],
    setEnrollmentDuration: (value) =>
        set(() => ({
            enrollmentDuration: value,
        })),
});

const createPaymentStatusSlice = (set) => ({
    paymentStatus: null,
    setPaymentStatus: (value) =>
        set(() => ({
            paymentStatus: value,
        })),
});

const createCreditSlice = (set) => ({
    credit: 0,
    setCredit: (value) =>
        set(() => ({
            credit: value,
        })),
});

const createPaymentMethodSlice = (set) => ({
    paymentMethod: "CASH",
    setPaymentMethod: (value) =>
        set(() => ({
            paymentMethod: value,
        })),
});

const createPaymentSlice = (set) => ({
    payment: 0,
    setPayment: (value) =>
        set(() => ({
            payment: value,
        })),
});

const createRoleSlice = (set) => ({
    role: null,
    setRole: (value) =>
        set(() => ({
            role: value,
        })),
});

const createUsernameSlice = (set) => ({
    username: "",
    setUsername: (value) =>
        set(() => ({
            username: value,
        })),
});

//FOR "INDIVIDUAL" COURSE TYPE
const createNumberOfDaysSlice = (set) => ({
    numbersOfDays: "",
    setNumberOfDays: (value) =>
        set(() => ({
            numbersOfDays: value,
        })),
});

const createCourseDaysSlice = (set) => ({
    courseDays: [],
    setCourseDays: (value) =>
        set(() => ({
            courseDays: value,
        })),
});

//FOR "OTHERS" COURSE TYPES
const createCourseSlice = (set) => ({
    course: null,
    setCourse: (value) =>
        set(() => ({
            course: value,
        })),
});

//IS INTRUCTOR
const createIsInstructorSlice = (set) => ({
    isInstructor: false,
    setIsInstructor: (value) =>
        set(() => ({
            isInstructor: value,
        })),
});


const createEnrollmentIdSlice = (set) => ({
    enrollmentId: null,
    setEnrollmentId: (value) =>
        set(() => ({
            enrollmentId: value,
        })),
});


const createResetSlice = (set) => ({
    reset: () =>
        set(() => ({
            id: null,
            username: null,
            firstName: "",
            lastName: "",
            birthdate: null,
            age: 0,
            receiptNumber: "",
            email: "",
            address: "",
            representative: "",
            relationship: "",
            phoneNumber: "",
            instructor: null,
            courseType: null,
            enrollmentStatus: null,
            enrollmentDuration: [],
            paymentStatus: null,
            credit: 0,
            paymentMethod: "CASH",
            payment: 0,
            role: null,
            numbersOfDays: "",
            courseDays: [],
            course: null,
            isInstructor: false,
        })),
});

const createEditSlice = (set) => ({
    edit: (data) =>
        set(() => ({
            id: data?.applicant?.id?.toString(),
            username: data?.username,
            firstName: data?.first_name,
            lastName: data?.last_name,
            birthdate: data?.applicant?.birthdate ? new Date(data?.applicant?.birthdate) : null,
            age: data?.age,
            receiptNumber: data?.receiptNumber,
            email: data?.email,
            address: data?.address,
            representative: data?.applicant?.representative?.name,
            relationship: data?.applicant?.representative?.relationship,
            phoneNumber: data?.phone_number,
            instructor: data?.instructor,
            courseType: data?.courseType,
            enrollmentStatus: data?.enrollment_status_id?.toString(),
            enrollmentDuration: [new Date(data?.start_date), new Date(data?.due_date)],
            paymentStatus: data?.payment_status_id?.toString(),
            credit: data?.credit,
            paymentMethod: "CASH",
            payment: data?.payment,
            role: data?.role_id?.toString(),
            numbersOfDays: data?.numbersOfDays,
            courseDays: data?.courseDays,
            course: data?.course,
            isInstructor: data?.isInstructor,
            enrollmentId: data?.id,

        })),
});

const useSwimmerFormStore = create((...a) => ({
    ...createFirstNameSlice(...a),
    ...createLastNameSlice(...a),
    ...createBirthdateSlice(...a),
    ...createAgeSlice(...a),
    ...createReceiptNumberSlice(...a),
    ...createEmailSlice(...a),
    ...createAddressSlice(...a),
    ...createRepresentativeSlice(...a),
    ...createRelationshipSlice(...a),
    ...createPhoneNumberSlice(...a),
    ...createInstructorSlice(...a),
    ...createCourseTypeSlice(...a),
    ...createEnrollmentStatusSlice(...a),
    ...createEnrollmentDurationSlice(...a),
    ...createPaymentStatusSlice(...a),
    ...createCreditSlice(...a),
    ...createPaymentMethodSlice(...a),
    ...createPaymentSlice(...a),
    ...createRoleSlice(...a),
    ...createUsernameSlice(...a),
    //FOR "INDIVIDUAL" COURSE TYPE
    ...createNumberOfDaysSlice(...a),
    ...createCourseDaysSlice(...a),
    //FOR "OTHERS" COURSE TYPES
    ...createCourseSlice(...a),
    ...createIdSlice(...a),

    ...createIsInstructorSlice(...a),
    ...createResetSlice(...a),
    ...createEditSlice(...a),
    ...createEnrollmentIdSlice(...a),
}));

export default useSwimmerFormStore;
