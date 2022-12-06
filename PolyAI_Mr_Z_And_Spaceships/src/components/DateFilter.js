import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { FormControl, FormLabel, Select, Box } from '@chakra-ui/react';
import moment from 'moment';

function Filldate(setDate,manuDate){
  manuDate = moment(new Date(manuDate)).format;
  document.getElementById('dateZ').value=manuDate;
}

function DateFilter({ dateSelector, setDateSelector, manuDate, setDate}) {
  return (
    <FormControl>
      <FormLabel>Date of Manufacture (MM-DD-YYYY)</FormLabel>
      <Select value={dateSelector} onChange={e => {setDateSelector(e.target.value)}}>
        <option value="af">After</option>
        <option value="be">Before</option>
        <option value="on">On</option>
      </Select>
      <Box w="20%" borderWidth="1px" borderRadius="lg" mt={4}>
      <DatePicker
          id = "dateZ"
          selected={manuDate}
          onChange={date => setDate(date)}            
        />
      </Box>
    </FormControl>
  );
}

export default DateFilter;




