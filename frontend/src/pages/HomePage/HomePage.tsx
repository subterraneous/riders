import "./HomePage.scss"

import { useLoaderData } from "react-router-dom"
import { useForm } from "react-hook-form"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Container from "@mui/material/Container"
import FormControl from "@mui/material/FormControl"
import Icon from "@mui/material/Icon"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import type { TListingsResponse } from "@/schemas"
import type { SearchForm } from "@/forms"
import { QueryValidation } from "@/forms"
import { ListingCard } from "@/components"

export default function HomePage() {
  const { listings } = useLoaderData() as TListingsResponse

  const form = useForm<SearchForm>()

  const handleSubmit = ({ query }: SearchForm) => {
    console.log(query)
  }

  return (
    <Box className="home-page">
      <Container className="hp-section hp-search">
        <Box className="hps-header">
          <Typography variant="h6">Alugue uma bicicleta</Typography>

          <Typography variant="body2">Descubra o padrão ouro em aluguel de bicicletas</Typography>
        </Box>

        <Card className="hps-card" variant="outlined">
          <FormControl
            className="hpsc-form"
            component="form"
            fullWidth
            noValidate
            autoComplete="off"
            onSubmit={form.handleSubmit(handleSubmit)}>
            <Typography className="hpscf-title" variant="h6">
              Encontre seu anunciado
            </Typography>

            <TextField
              className="hpscf-field"
              fullWidth
              label="Buscar"
              placeholder="O que você procura?"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon>search</Icon>
                  </InputAdornment>
                )
              }}
              error={!!form.formState.errors.query}
              helperText={form.formState.errors.query?.message}
              {...form.register("query", QueryValidation)}
            />

            <Button fullWidth disableElevation variant="contained" type="submit">
              Encontrar
            </Button>
          </FormControl>
        </Card>
      </Container>

      {!!listings.length && (
        <Container className="hp-section">
          <Typography variant="h6" gutterBottom>
            Anúncios recentes
          </Typography>

          <Stack className="hps-carousel">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </Stack>
        </Container>
      )}
    </Box>
  )
}
