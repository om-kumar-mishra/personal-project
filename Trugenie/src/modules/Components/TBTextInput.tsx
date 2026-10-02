import { Text, TextInput, TextInputProps } from "@mantine/core";
import { PolymorphicComponentProps } from "@mantine/utils";
import React, { useRef, useState } from "react";

export interface TBTextInputProps
  extends PolymorphicComponentProps<"input", TextInputProps> {
  regex?: RegExp;
  warningMessage?: string;
}

const TBTextInput = React.forwardRef<HTMLInputElement, TBTextInputProps>(
  function TBTextInput(props, ref) {
    const { regex, warningMessage, ...inputProps } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    //#region [useState]
    const [error, setError] = useState<string | null>(null);
    //#endregion

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const sanitizedValue = inputValue.replace(regex || /[^]/g, "");
      // check if the input value matches the regex pattern
      if (regex && regex.test(inputValue)) {
        setError(
          warningMessage
            ? warningMessage
            : "Input must match the required pattern."
        );
      } else {
        setError(null);
      }

      if (inputRef.current && regex) {
        inputRef.current.value = sanitizedValue;
      }

      // clear error after 3500ms
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = setTimeout(() => setError(null), 3500);

      if (inputProps.error) {
        setError(null);
      }

      if (inputProps.onChange) {
        if (regex) {
          event.target.value = sanitizedValue;
        }
        inputProps.onChange(event);
      }
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (inputRef.current) {
        // removed white spaces
        const trimmedValue = inputRef.current.value.trim();
        inputRef.current.value = trimmedValue;
        // calling handleInputChange function to validate the input and assign the validated data to input
        handleInputChange(event);
      }

      // handling the onBlur function of input props and passing the event, so it can handle the user's onBlur
      if (inputProps.onBlur) {
        inputProps.onBlur(event);
      }
    };

    return (
      <>
        <TextInput
          {...inputProps}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          ref={(element) => {
            inputRef.current = element;
            if (ref) {
              if (typeof ref === "function") {
                ref(element);
              } else {
                ref.current = element;
              }
            }
          }}
        />
        {error && (
          <Text fz="xs" c="#fa5252">
            {error}
          </Text>
        )}
      </>
    );
  }
);

export default TBTextInput;
