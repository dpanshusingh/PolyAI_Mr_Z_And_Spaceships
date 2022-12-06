import {
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

function SpeedFilter({
  speedSelector,
  setSpeedSelector,
  selectedMaxSpeed,
  setSelectedMaxSpeed,
}) {
  return (
    <FormControl>
      <FormLabel>Max Speed (between 50 and 200)</FormLabel>
      <Select value={speedSelector} onChange={e => {setSpeedSelector(e.target.value)}} pb={3}>
        <option value="gr">Greater than</option>
        <option value="le">Less than</option>
        <option value="ex">Exactly</option>
      </Select>
      <NumberInput
        min={50}
        max={200}
        value={selectedMaxSpeed}
        onChange={val => {setSelectedMaxSpeed(val)}}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}

export default SpeedFilter;
