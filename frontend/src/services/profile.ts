import { httpClient } from "~/services/clients"

import type { AddressForm } from "~/forms"
import { Address, Profile } from "~/schemas"

export const getProfile = async (uid?: string) => {
  let response

  if (!uid) {
    response = await httpClient.get("/profile")
  } else {
    response = await httpClient.get(`/profile/${uid}`)
  }

  const parsed = Profile.parse(response.data)

  return parsed
}

export const createAddress = async (address: AddressForm) => {
  const response = await httpClient.post("/profile/address", address)

  const parsed = Address.parse(response.data)

  return parsed
}
