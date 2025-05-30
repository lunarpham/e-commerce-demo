import { UIProvider } from "./components/ui/provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import SidebarWithDrawer from "./components/layout/SidebarWithDrawer";
import { Grid, GridItem, Spinner, Flex } from "@chakra-ui/react";
import { LayoutPanelLeft, Package, Users, ShoppingCart } from "lucide-react";
import { Toaster } from "./components/ui/toaster";

// Lazy load components
const Home = lazy(() => import("./pages/Home/Home"));
const User = lazy(() => import("./pages/User/User"));
const Product = lazy(() => import("./pages/Product/Product"));
const Order = lazy(() => import("./pages/Order/Order"));

// Loading fallback
const LoadingFallback = () => (
  <Flex justify="center" align="center" height="80vh">
    <Spinner size="xl" />
  </Flex>
);

const LazyComponent = ({ component: Component }) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

function App() {
  const routes = [
    {
      route: "/",
      element: <LazyComponent component={Home} />,
      title: "Dashboard",
      icon: <LayoutPanelLeft />,
      description: "ECommerce application",
    },
    {
      route: "/user",
      element: <LazyComponent component={User} />,
      title: "User",
      icon: <Users />,
      description: "User page",
    },
    {
      route: "/product",
      element: <LazyComponent component={Product} />,
      title: "Product",
      icon: <Package />,
      description: "Product page",
    },
    {
      route: "/order",
      element: <LazyComponent component={Order} />,
      title: "Order",
      icon: <ShoppingCart />,
      description: "Order page",
    },
  ];

  return (
    <BrowserRouter>
      <UIProvider defaultTheme="light">
        <Grid
          templateAreas={{
            md: `"header header"
                 "sidebar main"`,
            base: `"header"
                  "main"`,
          }}
          gridTemplateRows={"auto 1fr"}
          gridTemplateColumns={{ md: "200px 1fr", base: "1fr" }}
        >
          <GridItem area={"header"} zIndex={1000} position="sticky" top="0">
            <Navbar />
          </GridItem>

          <SidebarWithDrawer routes={routes} />

          <GridItem area={"main"}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.route} element={route.element} />
              ))}
            </Routes>
          </GridItem>
        </Grid>
        <Toaster />
      </UIProvider>
    </BrowserRouter>
  );
}

export default App;
