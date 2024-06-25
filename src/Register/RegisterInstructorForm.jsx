import { Group, InputLabel, InputWrapper, Input } from "@mantine/core";
import { CustomButton, CustomDateInput, CustomDatePickerInput, CustomNumberInput, CustomSelect, CustomTextInput, SelectPaymentMethod } from "../components/CustomInputs";
import useRegisterStore from "./RegisterStore";


export default function RegisterInstructorForm({ store }) {
    const registerStore = useRegisterStore();
    return (
        <form>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 pb-4">
                <CustomTextInput
                    label=" Nombres"
                    withAsterisk
                    placeholder="Ingrese sus nombres"
                    className='sm:col-span-2'
                    value={store.names}
                    onChange={e => store.setNames(e.currentTarget.value)}
                />
                <CustomTextInput
                    label="Apellidos"
                    withAsterisk
                    placeholder="Ingrese sus apellidos"
                    className="sm:col-span-2"
                    value={store.lastNames}
                    onChange={e => store.setLastNames(e.currentTarget.value)}
                />

                <div className='sm:col-span-2 grid sm:grid-cols-7 gap-x-3'>
                    <CustomSelect
                        label="Rol"
                        data={["DEPORTISTA", "MIEMBRO"]}
                        className='sm:col-span-4'
                        value={store.role}
                        onChange={store.setRole}
                    />

                </div>
                <CustomTextInput
                    leftSectionPointerEvents="none"
                    className="sm:col-span-2 "
                    withAsterisk
                    label="Correo Electrónico: "
                    placeholder="nombre@dominio.com"
                    value={store.email}
                    onChange={e => store.setEmail(e.currentTarget?.value)}
                />

                <CustomSelect
                    label="Tipo de clase:"
                    placeholder="Elegir Paquete "
                    withAsterisk
                    data={registerStore.courseTypes}
                    className="sm:col-span-2"
                    value={store.courseType}
                    onChange={store.setCourseType}
                />
                <div className='sm:col-span-2 grid sm:grid-cols-4 gap-x-3'>
                    <CustomSelect
                        label="Curso"
                        className='sm:col-span-3'
                        data={registerStore.courses}
                        value={store.course}
                        onChange={store.setCourse}
                    />

                    <InputWrapper>
                        <InputLabel>Precio: </InputLabel>
                        <Input value={store.course || 0} readOnly />
                    </InputWrapper>
                </div>


            </div>

            <Group justify="center">
                <CustomButton onClick={e => null} text={"Guardar"} bgColor={'#15192F'} />
            </Group>
        </form>
    );
}