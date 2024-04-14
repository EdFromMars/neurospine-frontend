import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
const filter = createFilterOptions();

export default function BasicAutocomplete({elementos, state, setState, propiedad}) {
  
  return (
    <Autocomplete
      placeholder=""
      options={elementos}
      sx={{ width: '100%', bg: 'white' }}
      onChange={(event, newValue) => {
        console.log(newValue);
        if (newValue && newValue.inputValue) {
          setState({
            ...state,
            [propiedad]: newValue.inputValue,
          });
        } else if (newValue && newValue.label) {
          // Create a new value from the user input
          setState({
            ...state,
            [propiedad]: newValue.label,
          });
        } else {
          setState({
            ...state,
            [propiedad]: '',
          });
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Agregar "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        if (option.title) {
          return option.title;
        }
        // Option with a label property
        if (option.label) {
          return option.label;
        }
        // If none of the above conditions are met, return an empty string
        return '';
      }}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          {option.title?.startsWith('Agregar "') && (
            <ListItemDecorator>
              +
            </ListItemDecorator>
          )}

          {option.title || option.label || option}
        </AutocompleteOption>
      )}
    />
  );
}