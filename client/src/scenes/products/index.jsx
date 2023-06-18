import { React, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Product = ({
  _id,
  name,
  price,
  description,
  category,
  rating,
  supply,
  stats,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: "14px" }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          sx={{ marginBottom: "1.5rem" }}
          color={theme.palette.secondary[400]}
        >
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          see more
        </Button>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{ color: theme.palette.neutral[300] }}
        >
          <CardContent>
            <Typography>id: {_id}</Typography>
            <Typography>Supply left: {supply}</Typography>
            <Typography>
              Sales this year: {stats.yearlySalesTotal}
            </Typography>
            <Typography>
              Unit sold this year: {stats.yearlyTotalSoldUnits}
            </Typography>
          </CardContent>
        </Collapse>
      </CardActions>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box margin="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="Below is your list of products" />
      {data || !isLoading ? (
        <Box
          marginTop="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              price,
              description,
              category,
              rating,
              supply,
              stats,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                price={price}
                description={description}
                category={category}
                rating={rating}
                supply={supply}
                stats={stats}
              />
            )
          )}
        </Box>
      ) : (
        <>Is Loading...</>
      )}
    </Box>
  );
};

export default Products;
