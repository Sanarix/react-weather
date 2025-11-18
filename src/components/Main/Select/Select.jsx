import { memo } from "react";
import Select from "react-select";

const SelectComponent = ({seacrhSortedList, handler, searchQuery, menuIsOpen, searchHandler}) => {
  return (
    <Select
      options={
          seacrhSortedList?.map((el) => ({
              value: el.name,
              label: el.name,
          })) || []
      }
      onChange={handler}
      onInputChange={(value) => searchHandler(value)}
      value={
          searchQuery ? { value: searchQuery, label: searchQuery } : null
      }
      placeholder="Поиск города"
      isClearable
      menuIsOpen={menuIsOpen}
      noOptionsMessage={() => "Город не найден"}
      styles={{
          dropdownIndicator: (base) => ({
              ...base,
              display: "none", // скрываем стрелку
              zIndex: 200,
          }),
          control: (base) => ({
              ...base,
              width: "100%",
              height: "50px",
              zIndex: 200,
          }),
          container: (base) => ({ ...base, width: "100%" }),
      }}
  />
  )
}
export default memo(SelectComponent);