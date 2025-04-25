import { UIProvider } from "./components/ui/provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { Grid, GridItem } from "@chakra-ui/react";
import { LayoutPanelLeft, Package, Users, ShoppingCart } from "lucide-react";

function App() {
  const routes = [
    {
      route: "/",
      element: <Home />,
      title: "Dashboard",
      icon: <LayoutPanelLeft />,
      description: "ECommerce application",
    },

    {
      route: "/user",
      element: <User />,
      title: "User",
      icon: <Users />,
      description: "User page",
    },
    {
      route: "/product",
      element: <Product />,
      title: "Product",
      icon: <Package />,
      description: "Product page",
    },
    {
      route: "/order",
      element: <Order />,
      title: "Order",
      icon: <ShoppingCart />,
      description: "Order page",
    },
  ];

  return (
    <UIProvider>
      <Grid
        templateAreas={{
          md: `"header header"
                  "sidebar main"`,
          base: `"header header"
                  "main main"`,
        }}
        gridTemplateRows={"auto 1fr"}
        gridTemplateColumns={{ md: "200px 1fr", base: "1fr" }}
      >
        <GridItem area={"header"}>
          <Navbar />
        </GridItem>
        <GridItem area={"sidebar"} display={{ base: "none", md: "block" }}>
          <Sidebar routes={routes} />
        </GridItem>
        <GridItem area={"main"}>
          <BrowserRouter>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.route} element={route.element} />
              ))}
            </Routes>
          </BrowserRouter>
        </GridItem>
      </Grid>
    </UIProvider>
  );
}

export default App;
