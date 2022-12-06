import { React, useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import {
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Button,
} from '@chakra-ui/react';
import moment from 'moment';


import ColorFilter from './ColorFilter';
import SpeedFilter from './SpeedFilter';
import DateFilter from './DateFilter';
import LaserFilter from './LaserFilter';




function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  let selectedColorsUrl = [{}];
  
  let speedSelectorUrl = 'gr';
  if(searchParams.get("speed")){
    speedSelectorUrl = searchParams.get("speed").substring(0, 2);
  }
  let selectedMaxSpeedUrl = '50';
    if(searchParams.get("speed")){
      selectedMaxSpeedUrl = searchParams.get("speed").substring(2, 5);
  }

  let colorSelectorUrl = "all";
  if(searchParams.get("colorSel")){
    colorSelectorUrl = searchParams.get("colorSel");
  }
  
  let selectedColoursFromUrl = []
  if(searchParams.get("color")){
    selectedColoursFromUrl = searchParams.get("color").split(',');
    // console.log(selectedColoursFromUrl);
    for (let i = 0; i < selectedColoursFromUrl.length; i++) {
      selectedColorsUrl[0][selectedColoursFromUrl[i]] = true;
      console.log(selectedColoursFromUrl[i]);
  }
  }
  
  let dateSelectorUrl = "af";
  if(searchParams.get("date")){
    dateSelectorUrl = searchParams.get("date").substring(0, 2);
  }

  let manuDateUrl = "";
  if(searchParams.get("date")){
    manuDateUrl = searchParams.get("date").substring(2, 12);
  }
    
  let pulseLaserUrl = false;
  if(searchParams.get("laser")){
    pulseLaserUrl = searchParams.get("laser");
  }

  const [queryString, setQueryString] = useState('');

  const [colorSelector, setColorSelector] = useState(colorSelectorUrl,'all');
  const [selectedColors, setSelectedColors] = useState(selectedColorsUrl,[{'red':false, 'blue':false, 'yellow':false, 'orange':false, 'green':false, 'violet':false}]);
  const [speedSelector, setSpeedSelector] = useState(speedSelectorUrl,'gr');
  const [selectedMaxSpeed, setSelectedMaxSpeed] = useState(selectedMaxSpeedUrl,'');
  const [dateSelector, setDateSelector] = useState(dateSelectorUrl,'af');

  const [manuDate, setDate] = useState(Date.parse(manuDateUrl),Date.parse('01-01-2001'));
  const [pulseLaser, setPulseLaser] = useState(pulseLaserUrl,'false');
  
  useEffect(() => {
      if(pulseLaserUrl != pulseLaser){
        searchParams.set("laser",pulseLaser);
        setSearchParams(searchParams);
      }
    },[pulseLaser] );

  useEffect(() => {
    let manuDateScreen = moment(manuDate).format('MM-DD-YYYY');
    if(dateSelectorUrl != dateSelector){
      searchParams.set("date",dateSelector + manuDateScreen);
      setSearchParams(searchParams);
    }
  },[dateSelector] );

  useEffect(() => {
    let manuDateScreen = moment(manuDate).format('MM-DD-YYYY');
    if(manuDateUrl != manuDateScreen){

      searchParams.set("date",dateSelector + manuDateScreen);
      setSearchParams(searchParams);
    }
  },[manuDate] );

  useEffect(() => {
    if(speedSelectorUrl != speedSelector){
      searchParams.set("speed",speedSelector + selectedMaxSpeed);
      setSearchParams(searchParams);
    }
  }, [speedSelector]);
    
    
    useEffect(() => {
      if(selectedMaxSpeedUrl != selectedMaxSpeed){
        searchParams.set("speed",speedSelector + selectedMaxSpeed);
        setSearchParams(searchParams);
      }
      buildQueryString();
    }, [selectedMaxSpeed]);

  // useEffect(() => {
  //   // setSelectedColors(selectedColors => [...selectedColors, searchParams.get("color")]);
  // }, [searchParams]);

  useEffect(() => {
    if(colorSelectorUrl != colorSelector){
      searchParams.set("colorSel", colorSelector);
      setSearchParams(searchParams);
    }
  }, [colorSelector]);

  let selectedColorsQuery = Object.values(selectedColors[0])
  .filter((key) => key == true)
  .reduce((obj, key) => {
      return Object.assign(obj, 
        [key]
      );
}, {});

  useEffect(() => {
    if(selectedColorsUrl != selectedColors){
      searchParams.set("color", selectedColors);
      console.log(selectedColors);
      setSearchParams(searchParams);
    }
    // buildQueryString();
  }, [selectedColors]);

  const buildQueryString = () => {
    let query = '/spaceships?';

    // Colors

//     let selectedColorsQuery = Object.values(selectedColors[0])
//   .filter((key) => key == true)
//   .reduce((obj, key) => {
//       return Object.assign(obj, 
//         [key]
//       );
// }, {});
    if (selectedColors.length > 0) {
      const selectedColorsQuery = Object.values(selectedColors[0])
      .filter((key) => key == true)
      .reduce((obj, key) => {
          return Object.assign(obj, 
            [key]
          );
    }, {});
      console.log(selectedColorsQuery);
      query += 'colorSel=' + colorSelector + '&color=';
      query += selectedColorsQuery[0];
      // selectedColorsQuery.slice(1,selectedColors.length+1).forEach(color => (query += '%2C' + color));
    }

    // Max Speed
    if (selectedMaxSpeed !== '') {
      if (query.length > 1) query += '&';
      query += 'speed=' + speedSelector + selectedMaxSpeed;
    }

    // Date of manuacture
    if (manuDate !== '') {
      if (query.length > 1) query += '&';
      query += 'date=' + dateSelector + moment(manuDate).format('MM-DD-YYYY');
    }

    // Pulse laser
    if (query.length > 1) query += '&';
    query += 'laser=' + pulseLaser;

    setQueryString(query);
  };

  useEffect(() => {
    buildQueryString();
  }, );

  



  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Mr Z's Spaceships</Heading>
        <Text>
          Choose from the different filters to search for spaceships
        </Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={1}>
          <ColorFilter
            selectedColors={selectedColors}
            colorSelector={colorSelector}
            setColorSelector={setColorSelector}
            setSelectedColors={setSelectedColors}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SpeedFilter
            speedSelector={speedSelector}
            setSpeedSelector={setSpeedSelector}
            selectedMaxSpeed={selectedMaxSpeed}
            setSelectedMaxSpeed={setSelectedMaxSpeed}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <DateFilter
            dateSelector={dateSelector}
            setDateSelector={setDateSelector}
            manuDate={manuDate}
            setDate={setDate}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <LaserFilter 
          checked={pulseLaser}
          setPulseLaser={setPulseLaser}
          />
        </GridItem>
      </SimpleGrid>
      <Text size="l">Generated query string:</Text>
      <Text>{queryString}</Text>
    </VStack>
  );
}

export default Filters;
