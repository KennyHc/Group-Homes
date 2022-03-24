// import * as React from "react";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { TextField } from "@mui/material";
// import { Col, Row, Container } from "react-bootstrap";
// import Grid from "@mui/material/Grid";
// import axios from "axios";
//
// export default function Contact() {
//   const [name, setName] = useState();
//   const [email, setEmail] = useState();
//
//   return (
//     <Container>
//       <Col>
//         <Row style={{ margin: "70px" }} className="justify-content-md-center">
//           <Card variant="outlined">
//             <CardContent>
//               <Typography
//                 sx={{ fontSize: 18 }}
//                 color="text.primary"
//                 gutterBottom
//               >
//                 Add a contact
//               </Typography>
//
//               <TextField
//                 id="outlined-basic"
//                 label="Name"
//                 variant="outlined"
//                 autoFocus
//               />
//
//               <TextField
//                 className="spaced-2"
//                 id="outlined-basic"
//                 label="E-mail"
//                 variant="outlined"
//                 autoFocus
//               />
//             </CardContent>
//             <CardActions>
//               <Button size="small" variant="contained">
//                 Add contact
//               </Button>
//             </CardActions>
//           </Card>
//         </Row>
//       </Col>
//     </Container>
//   );
// }
