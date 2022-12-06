import {
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';

function ColorFilter({ selectedColors, colorSelector, setColorSelector, setSelectedColors}) {
  // const colors = [{'red':false, 'blue':false, 'yellow':false, 'orange':false, 'green':false, 'violet':false}];

  const handleSelectColor = e => {
    if (e.target.checked) {
      setSelectedColors(currentColors => [...currentColors, e.target.value]);
    } else {
      setSelectedColors(currentColors =>
        currentColors.filter(color => color !== e.target.value)
      );
    }
  };

  return (
    <FormControl>
      <FormLabel>Colours</FormLabel>
      <Select defaultValue={"all"} onChange={e => {setColorSelector(e.target.value)}}>
        <option value="all">All of</option>
        <option value="any">Any of</option>
        <option value="non">None of</option>
      </Select>
      <SimpleGrid columns={3} columnGap={3} rowGap={3} w="full">
        {Object.keys(selectedColors).map(color => (
          <GridItem colSpan={1}>
            <Checkbox
              onChange={e => { handleSelectColor(e)}}
              defaultChecked={selectedColors[0][color]}
            >
              {color.toUpperCase() + color.substring(1)}
            </Checkbox>
          </GridItem>
        ))}
      </SimpleGrid>
    </FormControl>
  );
}

export default ColorFilter;
