import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export default function Header() {
  return (
    <Box sx={{ py: 2 }}>
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="600"
        sx={{ pb: 3 }}
      >
        Welcome To PQRS III
      </Typography>
      <Divider />
    </Box>
  );
}
