export interface NestedCheckboxOptions {
    [key: string]: NestedCheckboxOption;
}

export interface NestedCheckboxOption {
    selected?: boolean;
    label: string;
    children?: NestedCheckboxOptions
}

interface NestedCheckboxProps {
    options: NestedCheckboxOptions;
    setOptions: React.Dispatch<React.SetStateAction<NestedCheckboxOptions>>;
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

export function getSelectedLowestLevelOptions(options: NestedCheckboxOptions, parentKey?: string): string[] {
    const selectedOptions: string[] = [];

    for (const key in options) {
        const option = options[key];
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (!option.children && option.selected) {
            selectedOptions.push(fullKey);
        } else if (option.children) {
            selectedOptions.push(...getSelectedLowestLevelOptions(option.children, fullKey));
        }
    }

    return selectedOptions;
}

export const NestedCheckbox: React.FC<NestedCheckboxProps> = ({ options, setOptions }) => {
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
