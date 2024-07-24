import { ActionIcon, Button, Checkbox, FileInput, Group, MultiSelect, NumberInput, PasswordInput, Select, Text, TextInput } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCash, IconPhoto } from "@tabler/icons-react";
import { useRef } from "react";
import 'dayjs/locale/es';
export function CustomButton(props) {
    return (
        <Button bg={props.bgColor || '#0730BE'} w={props.w || 200} radius={'sm'} mt={props.mt || 0} onClick={props.onClick} >
            <Text fw={600}>{props.text}</Text>
        </Button>
    );
}

export const LoginTextInput = (props) => {
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
            disabled={props.disabled}
            variant={props.variant}
            readOnly={props.readOnly}
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
            valueFormat={props.valueFormat || 'YYYY-MM-DD'}
            radius={props.radius || 'sm'}
            className={props.className || 'sm:col-span-2'}
            locale="es"
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
            locale="es"
            valueFormat={props.valueFormat || 'YYYY-MM-DD'}
            className={props.className || 'sm:col-span-2'}
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
            searchable={props.searchable || false}
        />
    );
}

export function CustomMultiSelect(props) {
    return (
        <MultiSelect
            data={props.data || []}
            label={props.label}
            radius={props.radius || 'sm'}
            className={props.className || 'sm:col-span-2'}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

export function SelectPaymentMethod(props) {

    const fileInputRef = useRef(null);
    return (
        <div className="sm:col-span-2 grid grid-cols-2">
            <label className="col-span-2  text-sm font-semibold leading-6 text-gray-900">Forma de pago </label>
            <Group className="col-span-2" grow gap={0} mt={0}>
                <ActionIcon
                    variant="default"
                    size="lg"
                    aria-label="Gallery"
                    onClick={() => {
                        props.store?.setPaymentMethod('TRANSACTION')
                        fileInputRef.current?.click()
                    }}
                    style={{ backgroundColor: props.store?.paymentMethod === 'TRANSACTION' ? 'green' : 'transparent' }}
                >
                    <IconPhoto style={{ width: '50px' }} stroke={1.25} />
                </ActionIcon>

                {<FileInput size="xs" multiple onChange={(e) => console.log(e)} ref={fileInputRef} className="hidden" />}
                <ActionIcon
                    variant="default"
                    size="lg"
                    aria-label="Settings"
                    onClick={() => props.store?.setPaymentMethod('CASH')}
                    style={{ backgroundColor: props.store?.paymentMethod === 'CASH' ? 'green' : 'transparent' }}
                >
                    <IconCash style={{ width: '50px' }} stroke={1.5} />
                </ActionIcon>
            </Group>
        </div>
    );
}

export function CustomCheckbox(props) {
    return (
        <Checkbox
            label={props.label}
            styles={{
                label: {
                    fontWeight: 600,
                }
            }}
            className={props.className}
            checked={props.checked}
            onChange={props.onChange}
            color={props.color || '#2C3E50'}
            iconColor="#fff"
        />
    )
}