import React from "react";
import {
  Box,
  Text,
  Flex,
  Avatar,
  AvatarGroup,
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import { DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { Chart, useChart } from "@chakra-ui/charts";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useDashboard } from "../../lib/hooks/useDashboard";

export default function Index() {
  const { isLoading, stats, monthlySales, recentSales } = useDashboard();

  const chart = useChart({
    data: monthlySales,
    series: [{ name: "sales", color: "#adfa1d" }],
  });

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

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
      <Flex gap={4} direction={{ base: "column", md: "row" }}>
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={{ base: "full", md: "25%" }}
        >
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Text fontSize={"sm"} fontWeight={"medium"}>
              Total Revenue
            </Text>
            <DollarSign size={16} color="gray" />
          </Flex>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            $
            {stats.totalRevenue.value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Text>
          <Text fontSize={"sm"} color="gray.500">
            {stats.totalRevenue.percentChange > 0 ? "+" : ""}
            {stats.totalRevenue.percentChange.toFixed(2)}% from last month
          </Text>
        </Box>

        {/* Products Card */}
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={{ base: "full", md: "25%" }}
        >
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Text fontSize={"sm"} fontWeight={"medium"}>
              Products
            </Text>
            <Package size={16} color="gray" />
          </Flex>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {stats.products.change > 0 ? "+" : ""}
            {stats.products.change}
          </Text>
          <Text fontSize={"sm"} color="gray.500">
            {stats.products.percentChange > 0 ? "+" : ""}
            {stats.products.percentChange.toFixed(2)}% from last month
          </Text>
        </Box>

        {/* Orders Card */}
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={{ base: "full", md: "25%" }}
        >
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Text fontSize={"sm"} fontWeight={"medium"}>
              Orders
            </Text>
            <ShoppingCart size={16} color="gray" />
          </Flex>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {stats.orders.change > 0 ? "+" : ""}
            {stats.orders.change}
          </Text>
          <Text fontSize={"sm"} color="gray.500">
            {stats.orders.percentChange > 0 ? "+" : ""}
            {stats.orders.percentChange.toFixed(2)}% from last month
          </Text>
        </Box>

        {/* Active Users Card */}
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={{ base: "full", md: "25%" }}
        >
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Text fontSize={"sm"} fontWeight={"medium"}>
              Active Users
            </Text>
            <Users size={16} color="gray" />
          </Flex>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            +{stats.users.value}
          </Text>
          <Text fontSize={"sm"} color="gray.500">
            +{stats.users.newUsers} new users
          </Text>
        </Box>
      </Flex>

      {/* Rest of your code for charts and recent sales... */}
      <Flex gap={4} marginTop={8} direction={{ base: "column", md: "row" }}>
        <Box
          borderWidth="2px"
          borderRadius={"lg"}
          borderColor="gray.200"
          p={4}
          width={{ base: "full", md: "55%" }}
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
                  notation: "compact",
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
          width={{ base: "full", md: "45%" }}
        >
          <Text fontSize={"2xl"} fontWeight={"semibold"}>
            Recent Sales
          </Text>
          {recentSales.length === 0 ? (
            <Text textAlign="center" py={8} color="gray.500">
              No recent sales data
            </Text>
          ) : (
            recentSales.map((sale) => (
              <Grid
                key={sale.id}
                templateColumns="repeat(12, 1fr)"
                gap="4"
                alignItems="center"
                marginTop={4}
              >
                <GridItem colSpan={1}>
                  <AvatarGroup>
                    <Avatar.Root>
                      <Avatar.Fallback>
                        {sale.customerName.charAt(0)}
                      </Avatar.Fallback>
                      <Avatar.Image src="" />
                    </Avatar.Root>
                  </AvatarGroup>
                </GridItem>
                <GridItem colSpan={8} fontSize={"sm"}>
                  <Text fontWeight={"medium"}>{sale.customerName}</Text>
                  <Text color="gray.500">{sale.customerEmail}</Text>
                </GridItem>
                <GridItem colSpan={3} textAlign={"right"} fontWeight={"medium"}>
                  +${sale.amount.toFixed(2)}
                </GridItem>
              </Grid>
            ))
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
