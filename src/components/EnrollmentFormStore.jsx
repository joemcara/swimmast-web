import { create } from "zustand";

const createIdSlice = (set) => ({
    id: null,
    setId: (value) =>
        set(() => ({
            id: value,
        })),
});


const createReceiptNumberSlice = (set) => ({
    receiptNumber: "",
    setReceiptNumber: (value) =>
        set(() => ({
            receiptNumber: value,
        })),
});


const createInstructorSlice = (set) => ({
    instructor: null,
    setInstructor: (value) =>
        set(() => ({
            instructor: value,
        })),
});


const createCourseSlice = (set) => ({
    course: null,
    setCourse: (value) =>
        set(() => ({
            course: value,
        })),
});


const createEnrollmentStatusSlice = (set) => ({
    enrollmentStatus: null,
    setEnrollmentStatus: (value) =>
        set(() => ({
            enrollmentStatus: value,
        })),
});


const createPaymentValueSlice = (set) => ({
    paymentValue: 0,
    setPaymentValue: (value) =>
        set(() => ({
            paymentValue: value,
        })),
});


const createPaymentMethodSlice = (set) => ({
    paymentMethod: "CASH",
    setPaymentMethod: (value) =>
        set(() => ({
            paymentMethod: value,
        })),
});


const createPaymentStatusSlice = (set) => ({
    paymentStatus: null,
    setPaymentStatus: (value) =>
        set(() => ({
            paymentStatus: value,
        })),
});


const createEnrollmentDurationSlice = (set) => ({
    enrollmentDuration: [],
    setEnrollmentDuration: (value) =>
        set(() => ({
            enrollmentDuration: value,
        })),
});


const createResetSlice = (set) => ({
    reset: () =>
        set(() => ({
            id: null,
            receiptNumber: "",
            instructor: null,
            course: null,
            enrollmentStatus: null,
            paymentValue: 0,
            paymentMethod: "CASH",
            paymentStatus: null,
            enrollmentDuration: [],
        })),
});


const createEditSlice = (set) => ({
    edit: (data) =>
        set(() => ({
            id: data.id,
            receiptNumber: data.receiptNumber,
            instructor: data.instructor,
            course: data.course,
            enrollmentStatus: data.enrollmentStatus,
            paymentValue: data.paymentValue,
            paymentMethod: data.paymentMethod,
            paymentStatus: data.paymentStatus,
            enrollmentDuration: [new Date(data?.start_date), new Date(data?.due_date)],
        })),
});


const useEnrollmentFormStore = create((set) => ({
    ...createIdSlice(set),
    ...createReceiptNumberSlice(set),
    ...createInstructorSlice(set),
    ...createCourseSlice(set),
    ...createEnrollmentStatusSlice(set),
    ...createPaymentValueSlice(set),
    ...createPaymentMethodSlice(set),
    ...createPaymentStatusSlice(set),
    ...createEnrollmentDurationSlice(set),
    ...createResetSlice(set),
    ...createEditSlice(set),
}));

export default useEnrollmentFormStore;