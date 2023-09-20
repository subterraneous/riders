import { useState } from "react"
import { useForm } from "react-hook-form"

import { Link as RouterLink, useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { AuthService } from "@/services"
import { EmailValidation, PasswordValidation } from "@/constants"

interface Form {
  email: string
  password: string
}

// TODO: usar DTOs pra poder ter validação igual tanto no login quanto no cadastro

export function AuthLogin() {
  const navigate = useNavigate()

  const form = useForm<Form>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword)
  }

  const handleSubmit = async ({ email, password }: Form) => {
    // TODO: tratar os erros de forma amigável pro usuário que vem dessa chamada usando o AuthErrorCodes do módulo "firebase/auth"
    await AuthService.signIn.emailAndPassword(email, password)

    navigate("/")
  }

  return (
    <>
      <Typography variant="h5" component="h1" textAlign="center" fontWeight="500" mb={4}>
        Seja bem-vindo!
      </Typography>

      <FormControl component="form" fullWidth noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack gap={2} marginBottom={4}>
          <TextField
            label="Email"
            placeholder="Digite seu email"
            error={!!form.formState.errors.email}
            helperText={form.formState.errors.email?.message}
            {...form.register("email", EmailValidation)}
          />

          <TextField
            label="Senha"
            placeholder="Digite sua senha"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    <Icon>{showPassword ? "visibility_off" : "visibility"}</Icon>
                  </IconButton>
                </InputAdornment>
              )
            }}
            {...form.register("password", PasswordValidation)}
          />
        </Stack>

        <Stack gap={1}>
          <Button type="submit" variant="contained" disableElevation>
            Entrar
          </Button>

          <Button disableElevation component={RouterLink} to="/auth/cadastrar">
            Criar conta
          </Button>
        </Stack>
      </FormControl>
    </>
  )
}
