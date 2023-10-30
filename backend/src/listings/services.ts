import type { FindManyOptions, FindOneOptions } from "typeorm"

import type { TCreateListingSchema } from "@/listings/schemas"
import { Listing } from "@/listings/models"

export const getListings = async (options?: FindManyOptions<Listing>) => await Listing.find(options)

export const getListing = async (options: FindOneOptions<Listing>) => await Listing.findOneOrFail(options)

export const createListing = async (params: TCreateListingSchema) => {
  const listing = new Listing()

  listing.createdAt = new Date()
  listing.ownerUid = params.ownerUid
  listing.title = params.title
  listing.type = params.type
  listing.material = params.material
  listing.brand = params.brand
  listing.frameSize = params.frameSize
  listing.wheelSize = params.wheelSize
  listing.condition = params.condition
  listing.description = params.description
  listing.hourPricing = params.hourPricing
  listing.picturePath = params.picturePath

  return await listing.save()
}
