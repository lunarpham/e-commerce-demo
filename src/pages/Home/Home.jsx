import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { DollarSign } from "lucide-react";
import { Chart, useChart } from "@chakra-ui/charts";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Grid, GridItem } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@chakra-ui/react";

export default function Home() {
  const chart = useChart({
    data: [
      { sales: 6000, month: "January" },
      { sales: 5000, month: "February" },
      { sales: 4500, month: "March" },
      { sales: 6000, month: "April" },
      { sales: 7000, month: "May" },
      { sales: 6300, month: "June" },
      { sales: 7200, month: "July" },
      { sales: 8500, month: "August" },
      { sales: 7900, month: "September" },
      { sales: 9000, month: "October" },
      { sales: 9500, month: "November" },
      { sales: 8800, month: "December" },
    ],
    series: [{ name: "sales", color: "green.solid" }],
  });

  const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
  ];

  return (
    <Flex
      as="div"
      direction="column"
      padding={8}
      color={"black"}
      minHeight="100vh"
      backgroundColor="white"
      borderLeftWidth={1}
      borderLeftColor="gray.200"
      gap={4}
    >
      <Text as={"h1"} fontWeight={"bold"} fontSize="3xl">
        Dashboard
      </Text>
      <Flex gap={4}>
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={"25%"}
        >
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Text fontSize={"sm"} fontWeight={"medium"}>
              Total Reveune
            </Text>
            <DollarSign size={16} color="gray" />
          </Flex>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            $45,231.89
          </Text>
          <Text fontSize={"sm"} color="gray.500">
            +12% from last month
          </Text>
        </Box>
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={"25%"}
        >
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Text fontSize={"sm"} fontWeight={"medium"}>
              Product
            </Text>
            <DollarSign size={16} color="gray" />
          </Flex>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            +24
          </Text>
          <Text fontSize={"sm"} color="gray.500">
            +12.4% from last month
          </Text>
        </Box>
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={"25%"}
        >
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Text fontSize={"sm"} fontWeight={"medium"}>
              Product
            </Text>
            <DollarSign size={16} color="gray" />
          </Flex>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            +24
          </Text>
          <Text fontSize={"sm"} color="gray.500">
            +12.4% from last month
          </Text>
        </Box>
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={"25%"}
        >
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Text fontSize={"sm"} fontWeight={"medium"}>
              Product
            </Text>
            <DollarSign size={16} color="gray" />
          </Flex>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            +24
          </Text>
          <Text fontSize={"sm"} color="gray.500">
            +12.4% from last month
          </Text>
        </Box>
      </Flex>
      <Flex gap={4} marginTop={8}>
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={"55%"}
        >
          <Text fontSize={"2xl"} fontWeight={"semibold"}>
            Overview
          </Text>
          <Chart.Root chart={chart} width="100%" padding={0} marginTop={4}>
            <BarChart data={chart.data}>
              <XAxis
                axisLine={false}
                tickLine={false}
                dataKey={chart.key("month")}
                tickFormatter={(value) => value.slice(0, 3)}
                width={100}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={chart.formatNumber({
                  style: "currency",
                  currency: "USD",
                  notation: "scientific",
                })}
                width={50}
              />
              {chart.series.map((item) => (
                <Bar
                  isAnimationActive={false}
                  key={item.name}
                  dataKey={chart.key(item.name)}
                  fill={chart.color(item.color)}
                  radius={[8, 8, 0, 0]}
                />
              ))}
            </BarChart>
          </Chart.Root>
        </Box>
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={"45%"}
        >
          <Text fontSize={"2xl"} fontWeight={"semibold"}>
            Recent Sales
          </Text>
          <Grid
            templateColumns="repeat(12, 1fr)"
            gap="4"
            alignItems="center"
            marginTop={4}
          >
            <GridItem colSpan={1}>
              <AvatarGroup>
                <Avatar.Root>
                  <Avatar.Fallback />
                  <Avatar.Image src="" />
                </Avatar.Root>
              </AvatarGroup>
            </GridItem>
            <GridItem colSpan={8} fontSize={"sm"}>
              <Text fontWeight={"medium"}>Olivia Martin</Text>
              <Text color="gray.500">olivia.martin@email.com</Text>
            </GridItem>
            <GridItem colSpan={3} textAlign={"right"} fontWeight={"medium"}>
              +$1,999.00
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Flex>
  );
}
