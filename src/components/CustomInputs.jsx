import { ActionIcon, Button, FileInput, Group, NumberInput, PasswordInput, Select, Text, TextInput } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCash, IconPhoto } from "@tabler/icons-react";

export function CustomButton(props) {
    return (
        <Button bg={props.bgColor || '#0730BE'} w={props.w || 200} radius={'sm'} mt={8} onClick={props.onClick} >
            <Text fw={600}>{props.text}</Text>
        </Button>
    );
}

export function LoginTextInput(props) {
    return (
        <CustomTextInput
            label={props.label}
            placeholder={props.placeholder}
            type={props.type}
            radius={'sm'}
            className={'w-4/6 sm:w-5/12'}
        />
    );

}

export function LoginPasswordInput(props) {
    return (
        <CustomPasswordInput
            label={props.label}
            placeholder={props.placeholder}
            radius={'sm'}
            className={'w-4/6 sm:w-5/12'}
        />
    );

}

export function CustomTextInput(props) {
    return (
        <TextInput
            label={props.label}
            placeholder={props.placeholder}
            radius={props.radius || 'sm'}
            type={props.type || 'text'}
            className={props.className || 'sm:col-span-2'}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

export function CustomPasswordInput(props) {
    const [visible, { toggle }] = useDisclosure(false);
    return (
        <PasswordInput
            label={props.label}
            placeholder={props.placeholder}
            radius={props.radius || 'sm'}
            visible={visible}
            onVisibilityChange={toggle}
            className={props.className || 'w-4/6 sm:w-5/12'}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

export function CustomDateInput(props) {
    return (
        <DateInput
            label={props.label}
            placeholder={props.placeholder}
            value={props.value}
            defaultValue={props.defaultValue}
            withAsterisk={props.withAsterisk}
            onChange={props.onChange}
            radius={props.radius || 'sm'}
            className={props.className || 'sm:col-span-2'}
        />
    );
}

export function CustomDatePickerInput(props) {
    return (
        <DatePickerInput
            type="range"
            label={props.label}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            className="sm:col-span-2"
        />
    );
}

export function CustomNumberInput(props) {
    return (
        <NumberInput
            allowDecimal={props.allowDecimal}
            withAsterisk={props.withAsterisk}
            value={props.value}
            label={props.label}
            hideControls={props.hideControls}
            className={props.className || 'col-span-1'}
            onChange={props.onChange}
        />
    );
}

export function CustomSelect(props) {
    return (
        <Select
            data={props.data}
            withAsterisk={props.withAsterisk}
            label={props.label}
            radius={props.radius || 'sm'}
            placeholder={props.placeholder}
            className={props.className || 'sm:col-span-2'}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

export function SelectPaymentMethod(props) {
    return (
        <div className="sm:col-span-2 grid grid-cols-2">
            <label className="col-span-2 block text-sm font-medium leading-6 text-gray-900">Forma de pago: </label>
            <ActionIcon.Group>
                <ActionIcon
                    variant="default"
                    size="lg"
                    aria-label="Gallery"
                    onClick={() => props.store?.setPaymentMethod('TRANSACTION')}
                    style={{ backgroundColor: props.store?.paymentMethod === 'TRANSACTION' ? 'green' : 'transparent' }}
                >
                    <IconPhoto style={{ width: '50px' }} stroke={1.5} />
                </ActionIcon>

                <ActionIcon
                    variant="default"
                    size="lg"
                    aria-label="Settings"
                    onClick={() => props.store?.setPaymentMethod('CASH')}
                    style={{ backgroundColor: props.store?.paymentMethod === 'CASH' ? 'green' : 'transparent' }}
                >
                    <IconCash style={{ width: '50px' }} stroke={1.5} />
                </ActionIcon>
            </ActionIcon.Group>
            {props.store?.paymentMethod === "TRANSACTION" && <FileInput placeholder="Seleccionar archivo" size="xs" variant='filled' multiple onChange={(e) => console.log(e)} />}
        </div>
    );
}