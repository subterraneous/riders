import "./ListingPage.scss"

import clsx from "clsx"
import format from "date-fns/format"
import { Suspense } from "react"
import { Await, useLoaderData } from "react-router-dom"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Icon from "@mui/material/Icon"
import LinearProgress from "@mui/material/LinearProgress"
import Rating from "@mui/material/Rating"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { ListingMap, ListingTable } from "~/components"
import type { TListing, TLocations } from "~/schemas"
import { Condition } from "~/schemas"
import { useAuthStore } from "~/stores"

export default function ListingPage() {
  const { listing, locations } = useLoaderData() as { listing: TListing; locations: Promise<TLocations> }
  const { user } = useAuthStore()

  return (
    <Stack className="listing-page" divider={<Divider />}>
      <Container className="lp-section">
        <Stack className="lps-container lps-hero">
          <Box className="lpsh-header">
            <Stack className="lpshh-headline">
              <Typography className="lpshhh-condition" variant="caption">
                {Condition[listing.condition]}
              </Typography>

              <Stack className="lpshhh-rating">
                <Typography className="lpshhhr-text" variant="caption">
                  4.5
                </Typography>

                <Rating readOnly defaultValue={4.5} precision={0.5} size="small" sx={{ color: "rating" }} />

                <Typography className="lpshhhr-text" variant="caption">
                  (48)
                </Typography>
              </Stack>
            </Stack>

            <Typography>{listing.title}</Typography>
          </Box>

          {/*
           * TODO: esse carousel tá meio merda fazer um melhor é bom
           * https://mui.com/material-ui/react-stepper/#text-with-carousel-effect
           */}
          <Stack className="lpsh-carousel">
            {listing.pictures.map((picture) => (
              <img className="lpshc-image" key={picture.id} src={picture.path} />
            ))}
          </Stack>

          <Box className="lpsh-information">
            <Typography className="lpshi-pricing" variant="h4">
              <Box className="lpship-currency" component="span">
                R$
              </Box>

              <Box component="span">{listing.hourPricing}</Box>
            </Typography>

            <Typography className="lpshi-caption" variant="subtitle2">
              Por hora
            </Typography>
          </Box>

          <Typography className="lpsh-date" variant="subtitle2">
            Anunciado em {format(listing.createdAt, "dd/MM")} às&nbsp;{format(listing.createdAt, "HH:mm")}
          </Typography>
        </Stack>
      </Container>

      <Container className="lp-section">
        <Stack className="lps-container lps-description">
          <Typography variant="h6">Descrição</Typography>

          <Typography className={clsx("lpsd-content", { disabled: !listing?.description })} component="pre">
            {listing?.description || "Ainda não há descrição para este anúncio"}
          </Typography>
        </Stack>
      </Container>

      <Container className="lp-section">
        <Stack className="lps-container">
          <Typography variant="h6">Detalhes</Typography>

          <ListingTable listing={listing} />
        </Stack>
      </Container>

      <Container className="lp-section">
        <Stack className="lps-container">
          <Typography variant="h6">Localização</Typography>

          <Suspense
            fallback={
              <>
                <Skeleton variant="rounded" height={20} width="60%" />

                <Skeleton variant="rounded" height={256} />
              </>
            }>
            <Await resolve={locations}>
              {(locations: TLocations) => (
                <>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {listing.address?.neighborhood} - {listing.address?.city}, {listing.address?.state}
                  </Typography>

                  <ListingMap location={locations?.at(0)} />
                </>
              )}
            </Await>
          </Suspense>
        </Stack>
      </Container>

      <Container className="lp-section">
        <Stack className="lps-container">
          <Typography variant="h6">Avaliação</Typography>

          <Stack sx={{ gap: "16px", flexDirection: "row" }}>
            {/* Começo do componente de avaliação */}
            <Stack sx={{ gap: "8px", width: "100%" }}>
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
                <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: "1" }}>
                  5
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={100}
                  sx={{
                    "width": "100%",
                    "height": "8px",
                    "borderRadius": "4px",
                    "backgroundColor": "divider",
                    "& span": { backgroundColor: "rating" }
                  }}
                />
              </Stack>

              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
                <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: "1" }}>
                  4
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={78}
                  sx={{
                    "width": "100%",
                    "height": "8px",
                    "borderRadius": "4px",
                    "backgroundColor": "divider",
                    "& span": { backgroundColor: "rating" }
                  }}
                />
              </Stack>

              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
                <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: "1" }}>
                  3
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={56}
                  sx={{
                    "width": "100%",
                    "height": "8px",
                    "borderRadius": "4px",
                    "backgroundColor": "divider",
                    "& span": { backgroundColor: "rating" }
                  }}
                />
              </Stack>

              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
                <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: "1" }}>
                  2
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={42}
                  sx={{
                    "width": "100%",
                    "height": "8px",
                    "borderRadius": "4px",
                    "backgroundColor": "divider",
                    "& span": { backgroundColor: "rating" }
                  }}
                />
              </Stack>

              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
                <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: "1" }}>
                  1
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={18}
                  sx={{
                    "width": "100%",
                    "height": "8px",
                    "borderRadius": "4px",
                    "backgroundColor": "divider",
                    "& span": { backgroundColor: "rating" }
                  }}
                />
              </Stack>
            </Stack>
            {/* Fim do componente de avaliação */}

            {/* Componente de média de avaliação */}
            <Stack sx={{ alignItems: "center" }}>
              <Typography variant="h3" sx={{ lineHeight: 1 }}>
                4.5
              </Typography>

              <Rating readOnly defaultValue={4.5} precision={0.5} size="small" sx={{ color: "rating" }} />

              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                48 avaliações
              </Typography>
            </Stack>
          </Stack>

          <Box>
            <Button
              disabled={!user}
              startIcon={<Icon>rate_review</Icon>}
              disableElevation
              fullWidth
              size="small"
              variant="outlined">
              Avalie
            </Button>

            {!user && (
              <Typography variant="caption" sx={{ color: "action.disabled", lineHeight: "2" }}>
                Você precisa estar logado para avaliar
              </Typography>
            )}
          </Box>
        </Stack>
      </Container>
    </Stack>
  )
}
