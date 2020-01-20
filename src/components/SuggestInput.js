import React from 'react';
import { Input as AntInput } from 'antd';
import Autosuggest from 'react-autosuggest';

const Input = React.forwardRef(({ id, inputProps, invalid, ...props }, ref) => (
    <AntInput id={id} {...props} {...inputProps} ref={ref} />
));

const SuggestInput = React.forwardRef(({ value, placeholder, suggestions, disabled, onFetchSuggestions, onClearSuggestions, onChange }, $ref) => {
    return(
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onFetchSuggestions}
            onSuggestionsClearRequested={onClearSuggestions}
            getSuggestionValue={({ item }) => item.name}
            onSuggestionSelected={(e) => {
                e.preventDefault();
            }}
            focusInputOnSuggestionClick={false}
            renderSuggestion={({ item: { name } }) => {
                return(
                    <button
                        className={`suggestion`}
                    >{ name }</button>
                );
            }}
            renderInputComponent={inputProps => (
                <Input
                    inputProps={inputProps}
                    ref={$ref}
                />
            )}
            multiSection={true}
            renderSectionTitle={({ title }) => <h5>{ title }</h5>}
            getSectionSuggestions={({ items }) => items}
            inputProps={{
                placeholder,
                value,
                disabled,
                onChange: (e, { newValue }) => {
                    onChange(newValue);
                }
            }}
        />
    );
});

SuggestInput.defaultProps = {
    suggestions: [],
}

export default SuggestInput;