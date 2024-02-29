import React, { useState, useEffect } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, List, ListItem, VStack, Text, useToast } from "@chakra-ui/react";
import { FaCloudSunRain } from "react-icons/fa";

const fetchEarthquakeData = () => {
  // This function simulates fetching earthquake data from an API.
  return new Promise((resolve) => {
    setTimeout(() => {
      const sampleData = "2024/02/25, 4\n2024/02/26, 5\n2024/02/27, 3";
      resolve(sampleData);
    }, 1000); // Simulate network request delay
  });
};

const Index = () => {
  useEffect(() => {
    fetchEarthquakeData().then((data) => {
      setEarthquakeData(data);
    });
  }, []);
  const [earthquakeData, setEarthquakeData] = useState("");
  const [predictions, setPredictions] = useState([]);
  const toast = useToast();

  const handleEarthquakeDataChange = (event) => {
    setEarthquakeData(event.target.value);
  };

  const predictEarthquakes = () => {
    const dataLines = earthquakeData.trim().split("\n");
    if (dataLines.length === 0 || !dataLines[0]) {
      toast({
        title: "エラー",
        description: "有効な地震データを入力してください。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const lastLine = dataLines[dataLines.length - 1];
    const lastIntensity = parseInt(lastLine.split(", ")[1]);
    const futureEarthquakes = dataLines.map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + (index + 1) * 10); // Predict earthquakes every 10 days
      const nextIntensity = ((lastIntensity + index) % 7) + 1; // Increment the seismic intensity for each prediction
      return `予測: ${date.toLocaleDateString()} - 震度 ${nextIntensity}`;
    });

    if (futureEarthquakes.length === 0) {
      toast({
        title: "エラー",
        description: "有効な地震データを入力してください。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setPredictions(futureEarthquakes);
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          地震予測サイト <FaCloudSunRain />
        </Heading>
        <FormControl>
          <FormLabel>過去の地震データを入力:</FormLabel>
          <Input as="textarea" placeholder="年/月/日, 震度 (例: 2023/01/01, 5)" value={earthquakeData} onChange={handleEarthquakeDataChange} height="200px" />
        </FormControl>
        <Button colorScheme="blue" onClick={predictEarthquakes}>
          予測する
        </Button>
        <Box w="100%">
          {predictions.length > 0 && (
            <Box>
              <Heading as="h2" size="md" mb={4}>
                地震予測結果
              </Heading>
              <List spacing={3}>
                {predictions.map((prediction, index) => (
                  <ListItem key={index}>
                    <Text>{prediction}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
