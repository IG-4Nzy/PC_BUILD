import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldVariants
} from "@mui/material";
import { joinClass } from "../../helpers/utils";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./index.module.scss";
import wordings from "../../libs/wordings";
import { useTranslation } from "react-i18next";

type PropType = {
  className?: string;
  name: string;
  label?: string;
  variant?: TextFieldVariants;
  type?: string;
  id?: string;
  value: string | number;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  onBlur?: () => void;
  customStyles?: Object;
  placeholder?: string;
  showCharacterCount?: boolean;
  maxCharacter?: number;
  shadow?: boolean;
  autofocus?: boolean;
  handleKeyDown?: (e: any) => void;
  readonly?: boolean;
  borderRadius?: string;
  shrink?: boolean;
  autoComplete?: "on" | "off" | "username" | "new-password";
  multiline?: boolean;
  rows?: number;
  required?: boolean;
};

const CustomTextfield = ({
  className,
  name,
  label,
  variant,
  type,
  id,
  value = "",
  handleOnChange,
  error,
  helperText,
  onBlur,
  customStyles,
  placeholder,
  showCharacterCount = false,
  maxCharacter = 125,
  shadow = false,
  autofocus = false,
  handleKeyDown,
  borderRadius = "8px",
  autoComplete = "off",
  shrink = false,
  multiline = false,
  rows = 1,
  required = false
}: PropType) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className={joinClass(className, styles["custom-text-field"])}>
      <TextField
        id={id}
        fullWidth
        autoFocus={autofocus}
        name={name}
        style={customStyles}
        label={label}
        variant={variant}
        type={showPassword ? "text" : type}
        value={value}
        onChange={handleOnChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        autoComplete={autoComplete}
        rows={rows}
        multiline={multiline}
        required={required}
        slotProps={{
          inputLabel: { shrink: shrink },
          input: {
            ...(type === "password" && {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff titleAccess={t(wordings.hidePassword)} />
                    ) : (
                      <Visibility titleAccess={t(wordings.showPassword)} />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            })
          }
        }}
        sx={{
          width: "100% !important",
          height: "100%",

          boxShadow: shadow ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" : "",
          "& .MuiOutlinedInput-root": {
            width: "100%",
            height: "100%",
            paddingBlock: "5px",
            borderRadius: borderRadius
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0
            }
          },
          "& .MuiFormHelperText-root": {
            fontSize: "14px",
            fontFamily: "Poppins",
            padding: 0,
            margin: 0
          }
        }}
      />
      {showCharacterCount && (
        <p>{`${value.toString()?.length} / ${maxCharacter}`}</p>
      )}
    </div>
  );
};

export default CustomTextfield;
