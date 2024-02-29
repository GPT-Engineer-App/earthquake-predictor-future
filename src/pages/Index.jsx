import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, List, ListItem, VStack, Text, useToast } from "@chakra-ui/react";
import { FaCloudSunRain } from "react-icons/fa";

const Index = () => {
  const [earthquakeData, setEarthquakeData] = useState("");
  const [predictions, setPredictions] = useState([]);
  const toast = useToast();

  const handleEarthquakeDataChange = (event) => {
    setEarthquakeData(event.target.value);
  };

  const predictEarthquakes = () => {
    // Dummy prediction function - in real application, use a proper algorithm
    const dataLines = earthquakeData.trim().split("\n");
    const futureEarthquakes = dataLines.map((line, index) => {
      const date = new Date();
      date.setDate(date.getDate() + (index + 1) * 10); // Dummy prediction: Earthquakes every 10 days
      return `予測: ${date.toLocaleDateString()} - 震度 ${Math.floor(Math.random() * 7) + 1}`;
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