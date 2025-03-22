import {
  Autocomplete,
  CircularProgress,
  TextField,
  Checkbox,
  ListItemText
} from "@mui/material";
import React, { useState } from "react"

type PropType = {
  options: Array<{
    id?: string | number;
    value?: any;
    label?: string;
    name?: string;
  }>;
  multiSelect?: boolean;
  label?: string;
  filterSelected?: boolean;
  value: any;
  loading?: boolean;
  clearable?: boolean;
  hideChevron?: boolean;
  handleOnChange: (data: any) => void;
  disabledOptions?: (option: any) => boolean;
  renderCheckboxes?: boolean;
  checkBox?: boolean;
  placeholder?: string;
  className?: string;
  error?: boolean;
  helperText?: string;
  hideTags?: boolean;
  disabled?: boolean;
  defaultChevron?: boolean;
  handleKeyDown?: (e: any) => void;
};

const CustomDropdown = ({
  options,
  multiSelect = false,
  label = "",
  filterSelected = true,
  value = [],
  handleOnChange,
  loading = false,
  clearable = false,
  hideChevron = false,
  disabledOptions,
  checkBox = false,
  placeholder = "",
  className,
  error,
  helperText,
  hideTags = false,
  disabled = false,
  defaultChevron = false,
  handleKeyDown
}: PropType) => {
  const [open, setOpen] = useState(false);

  const handleDropdownChange = (selectedOptions: any) => {
    handleOnChange(selectedOptions);

    setOpen(false);
  };

  const handleOptionDisable = (option: any, value: any) => {
    if (checkBox) return false;
    const isSelected = multiSelect
      ? value.some((val: any) => val?.id === option?.id)
      : value?.id === option?.id;

    return (
      (filterSelected && isSelected) ||
      (disabledOptions ? disabledOptions(option) : false)
    );
  };

  return (
    <div >
      <Autocomplete
        onKeyDown={handleKeyDown}
        open={open}
        disabled={disabled}
        onClose={() => setOpen(false)}
        multiple={multiSelect}
        options={options || []}
        freeSolo={hideChevron}
        disableClearable={!clearable}
        popupIcon={
          defaultChevron ? undefined : loading ? (
            ""
          ) : (
            <ExpandMoreIcon fontSize="large" />
          )
        }
        sx={{
          width: "100%",
          height: "100%",
          "& .MuiInputBase-root": {
            minHeight: "100%",
            backgroundColor: "transparent",
            borderRadius: "8px",
            padding: "10px"
          },
          "& .MuiFormHelperText-root": {
            fontSize: "14px",
            fontFamily: "Poppins",
            padding: 0,
            margin: 0,
            height: "100%",
            minHeight: "100%",
            backgroundColor: "transparent",
            borderRadius: "8px",
            paddingBlock: "0px"
          }
        }}
        onChange={(_, newValue) => {
          handleDropdownChange(newValue);
        }}
        value={multiSelect ? value || [] : value || null}
        getOptionLabel={(option) => option?.label || option?.name}
        defaultValue={multiSelect ? [options[0]] : null}
        filterSelectedOptions={filterSelected}
        loading={loading}
        getOptionDisabled={(option) => {
          return handleOptionDisable(option, value);
        }}
        renderTags={hideTags ? () => null : undefined}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            label={label}
            disabled={disabled}
            style={{ height: "100%" }}
            onClick={(e) => {
              if (disabled) {
                e.stopPropagation();
              } else if (loading) {
                e.stopPropagation();
              } else {
                setOpen(!open);
              }
            }}
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
              }
            }}
          />
        )}
        renderOption={(props, option) => {
          const isSelected = multiSelect
            ? value.some((val: any) => val?.id === option?.id)
            : value?.id === option?.id;

          return (
            <li
              {...props}
              key={option.id}
              onClick={() => {
                let newValue;
                if (multiSelect) {
                  newValue = isSelected
                    ? value.filter((val: any) => val?.id !== option?.id)
                    : [...value, option];
                } else {
                  newValue = isSelected ? null : option;
                }
                handleDropdownChange(newValue);
                setOpen(false);
              }}
              style={{ cursor: "pointer" }}
            >
              {checkBox && (
                <Checkbox
                  checked={isSelected}
                  onChange={() => {}}
                  disabled={disabledOptions ? disabledOptions(option) : false}
                />
              )}
              <ListItemText primary={option.label || option.name} />
            </li>
          );
        }}
      />
    </div>
  );
};
export default CustomDropdown;
