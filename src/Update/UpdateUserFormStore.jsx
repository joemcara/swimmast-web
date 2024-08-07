import { create } from "zustand";

const createUserIdSlice = (set) => ({
    userId: null,
    setUserId: (value) =>
        set(() => ({
            userId: value,
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


const createRoleSlice = (set) => ({
    role: "",
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


const createEmailSlice = (set) => ({
    email: "",
    setEmail: (value) =>
        set(() => ({
            email: value,
        })),
});


const createPhoneNumberSlice = (set) => ({
    phoneNumber: "",
    setPhoneNumber: (value) =>
        set(() => ({
            phoneNumber: value,
        })),
});


const createRepresentativeIdSlice = (set) => ({
    representativeId: null,
    setRepresentativeId: (value) =>
        set(() => ({
            representativeId: value,
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


const createEnrollmentStatusSlice = (set) => ({
    enrollmentStatus: null,
    setEnrollmentStatus: (value) =>
        set(() => ({
            enrollmentStatus: value,
        })),
});


const createPaymentStatusSlice = (set) => ({
    paymentStatus: null,
    setPaymentStatus: (value) =>
        set(() => ({
            paymentStatus: value,
        })),
});


const createPaymentValueSlice = (set) => ({
    paymentValue: 0,
    setPaymentValue: (value) =>
        set(() => ({
            paymentValue: value,
        })),
});


const createAgeSlice = (set) => ({
    age: 0,
    setAge: (value) =>
        set(() => ({
            age: value,
        })),
});


const createEditSlice = (set) => ({
    edit: (user) =>
        set(() => ({
            firstName: user.first_name,
            lastName: user.last_name,
            birthdate: user.birthdate ? new Date(user.birthdate) : null,
            role_id: user.role_id,
            role: user.role,
            username: user.username,
            email: user.email,
            phoneNumber: user.phone_number,
            representativeId: user.representantive_id || null,
            representative: user.representative || "",
            relationship: user.relationship || "",
            isInstructor: user.role === "INSTRUCTOR",
        })),
});


const createResetSlice = (set) => ({
    reset: () =>
        set(() => ({
            userId: null,
            firstName: "",
            lastName: "",
            birthdate: null,
            role: "",
            username: "",
            email: "",
            phoneNumber: "",
            representativeId: null,
            representative: "",
            relationship: "",
            isInstructor: false,
            enrollmentId: null,
            enrollmentStatus: null,
            paymentStatus: null,
        })),
});



const useUpdateUserFormStore = create((...a) => ({
    ...createUserIdSlice(...a),
    ...createFirstNameSlice(...a),
    ...createLastNameSlice(...a),
    ...createBirthdateSlice(...a),
    ...createRoleSlice(...a),
    ...createUsernameSlice(...a),
    ...createEmailSlice(...a),
    ...createPhoneNumberSlice(...a),
    ...createRepresentativeIdSlice(...a),
    ...createRepresentativeSlice(...a),
    ...createRelationshipSlice(...a),
    ...createIsInstructorSlice(...a),
    ...createEnrollmentIdSlice(...a),
    ...createEditSlice(...a),
    ...createResetSlice(...a),
    ...createEnrollmentStatusSlice(...a),
    ...createPaymentStatusSlice(...a),
    ...createPaymentValueSlice(...a),
    ...createAgeSlice(...a),
}));

export default useUpdateUserFormStore;
