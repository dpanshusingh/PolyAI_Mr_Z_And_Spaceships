import { FormControl, FormLabel, Select } from '@chakra-ui/react';

function LaserFilter({ checked, setPulseLaser }) {
  return (
    <FormControl>
      <FormLabel>With Pulse Laser?</FormLabel>
    <Select value={checked} onChange={e => {setPulseLaser(e.target.value)}}>
        <option value="true">True</option>
        <option value="false">False</option>
      </Select>
      </FormControl>
  );
}

export default LaserFilter;
