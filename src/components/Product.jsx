import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export default function BasicCard(props) {
  const { product } = props;
  return (
    <Card
      sx={{
        minWidth: 150,
        height: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
          {product.name}
        </Typography>
        <Typography sx={{ mb: 2, color: "text.secondary", fontSize: 14 }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mb: 1.5,
          }}
        >
          <Chip color="green" label={product.price} />
          <Chip color="orange" label={product.category} />
        </Box>

        {/*everything below has a left margin of 8 for some reason. and i can't remove it. */}

        <Button variant="contained" fullWidth sx={{ mb: 1.5 }} color="blue">
          Add To Cart
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            m: 0,
          }}
        >
          <Button variant="contained" color="indigo">
            Edit
          </Button>
          <Button variant="contained" color="red">
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
