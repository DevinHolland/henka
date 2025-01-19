export interface NestedCheckboxOptions {
    [key: string]: NestedCheckboxOption;
}

export interface NestedCheckboxOption {
    selected?: boolean;
    label: string;
    bitMaskId?: bigint;
    children?: NestedCheckboxOptions
}

interface NestedCheckboxProps {
    options: NestedCheckboxOptions;
    setOptions: React.Dispatch<React.SetStateAction<NestedCheckboxOptions>>;
    onChange?: () => void;
}

function handleAncestors(topLevelOption: NestedCheckboxOption, keysExcludingSelected: string[]) {
    const ancestors = keysExcludingSelected.reduce((acc: NestedCheckboxOption[], key) => {
        const child = acc[acc.length - 1].children![key];
        return [...acc, child];
    }, [topLevelOption]);

    ancestors.reverse().forEach((ancestor) => {
        ancestor.selected = Object.values(ancestor.children!).every(child => child.selected);
    });
}

function handleChildren(option: NestedCheckboxOption, selected: boolean) {
    option.selected = selected;
    if (option.children) {
        Object.values(option.children).forEach(child => handleChildren(child, selected));
    }
}

export function getSelectedLowestLevelOptions(options: NestedCheckboxOptions): NestedCheckboxOption[] {
    const selectedOptions: NestedCheckboxOption[] = [];

    for (const key in options) {
        const option = options[key];
        if (!option.children && option.selected) {
            selectedOptions.push(option);
        } else if (option.children) {
            selectedOptions.push(...getSelectedLowestLevelOptions(option.children));
        }
    }

    return selectedOptions;
}

export function getOptionsBitmask(options: NestedCheckboxOption[]): bigint {
    return options.reduce((acc, option) => acc + (option.bitMaskId ? option.bitMaskId : 0n), 0n)
}

export const NestedCheckbox: React.FC<NestedCheckboxProps> = ({ options, setOptions, onChange }) => {
    const handleCheckboxChange = (key: string) => {
        setOptions(prevOptions => {
            const newOptions = structuredClone(prevOptions);
            const keys = key.split('.');
            const topLevelOption = newOptions[keys[0]];

            if (keys.length > 1) {
                const selectedOption = keys.slice(1).reduce((acc, key) => acc.children![key]!, topLevelOption);
                selectedOption.selected = !selectedOption.selected;
                handleAncestors(topLevelOption, keys.slice(1, keys.length - 1));
                handleChildren(selectedOption, selectedOption.selected);
            } else {
                topLevelOption.selected = !topLevelOption.selected;
                handleChildren(topLevelOption, topLevelOption.selected);
            }
            if(onChange) {
                onChange();
            }
            return newOptions;
        });
    };

    const renderCheckboxes = (options: NestedCheckboxOptions, parentKeyPath?: string) => {
        const keyPath = parentKeyPath ? `${parentKeyPath}.` : '';

        return Object.keys(options).map(key => (
            <div key={`${keyPath}${key}`} style={{ marginLeft: '20px' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={options[key].selected ? true : false}
                        onChange={() => handleCheckboxChange(`${keyPath}${key}`)}
                    />
                    {options[key].label}
                </label>
                {options[key].children && renderCheckboxes(options[key].children!, `${keyPath}${key}`)}
            </div>
        ));
    };

    return (
        <div>
            {renderCheckboxes(options)}
        </div>
    );
}
