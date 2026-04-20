"use client";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { options } from "@/lib/data";

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  // Map dateQuery (value) về label để hiển thị
  const currentLabel = dateQuery
    ? options.find((option) => option.value === dateQuery)?.label
    : options[0]?.label || "";

  return (
    <Combobox
      value={currentLabel} // Set value là label
      onValueChange={(selectedLabel) => {
        // Map label về value khi chọn
        const selectedValue = options.find(
          (option) => option.label === selectedLabel,
        )?.value;
        setDateQuery(selectedValue || "");
      }}
      items={options}
    >
      <ComboboxTrigger className="h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors cursor-pointer flex items-center justify-between min-w-[200px]">
        <ComboboxValue placeholder="Select optional" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {options.map((item) => (
            <ComboboxItem
              key={item.value}
              value={item.label}
              onSelect={() => {
                setDateQuery(item.value);
              }}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default DateTimeFilter;
