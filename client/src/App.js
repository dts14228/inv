import { useState, useEffect } from 'react';
import { Box, Container, Grid, CssBaseline } from "@mui/material";
import Header from './components/Header'
import Portfolio from './components/Portfolio';
import API from './api'
import { theme } from './global/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

const App = () => {
  const [portfolioData, setPortfolioData] = useState([]);

  const getPortfolioData = async () => {
    try {
      const response = await API.get('/portfolio-data');
      setPortfolioData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPortfolioData();
  }, []);

  return (
    // StyledEngineProvider allows CSS-in-JS to be used
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box
          sx={{
            display: "flex",
            height: "100%",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flex: "1 1 auto",
              overflow: "hidden",
              paddingTop: "64px",
            }}
          >
            <Box
              sx={{
                paddingTop: "56px",
                paddingBottom: "24px",
                overflow: "auto",
              }}
            >
              <Box>
                <Container>
                  <Grid container spacing={3}>
                    <Portfolio data={portfolioData} />
                  </Grid>
                </Container>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
