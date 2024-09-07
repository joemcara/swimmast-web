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


const createRepresentativeSlice = (set) => ({
    representative: "",
    setRepresentative: (value) =>
        set(() => ({
            representative: value,
        })),
});


const createIsInstructorSlice = (set) => ({
    isInstructor: false,
    setIsInstructor: (value) =>
        set(() => ({
            isInstructor: value,
        })),
});


const createRelationshipSlice = (set) => ({
    relationship: "",
    setRelationship: (value) =>
        set(() => ({
            relationship: value,
        })),
});


const createResetSlice = (set) => ({
    reset: () =>
        set(() => ({
            id: null,
            firstName: "",
            lastName: "",
            birthdate: null,
            age: 0,
            role: null,
            username: null,
            email: "",
            phoneNumber: "",
            representative: "",
            relationship: "",
            isInstructor: false,
        })),
});

const createEditSlice = (set) => ({
    edit: (data) =>
        set(() => ({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            birthdate: data.birthdate,
            age: data.age,
            role: data.role,
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            representative: data.representative,
            relationship: data.relationship,
            isInstructor: data.isInstructor,
        })),
});

const useUserFormStore = create((...a) => ({
    ...createIdSlice(...a),
    ...createFirstNameSlice(...a),
    ...createLastNameSlice(...a),
    ...createBirthdateSlice(...a),
    ...createAgeSlice(...a),
    ...createRoleSlice(...a),
    ...createUsernameSlice(...a),
    ...createEmailSlice(...a),
    ...createPhoneNumberSlice(...a),
    ...createRepresentativeSlice(...a),
    ...createRelationshipSlice(...a),
    ...createIsInstructorSlice(...a),
    ...createResetSlice(...a),
    ...createEditSlice(...a),
}));

export default useUserFormStore;
