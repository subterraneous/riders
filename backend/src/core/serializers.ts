import type { TAddress, TListing, TListingPicture, TRating } from "~/core/models"

type SerializedListing = Omit<TListing, "pictures"> & { pictures: Omit<TListingPicture, "listing">[] }
type SerializedListingPicture = Omit<TListingPicture, "listing">
type SerializedAddress = TAddress
type SerializedRating = Omit<TRating, "listing">

export const serializeListing = (listing: TListing): SerializedListing => ({
  id: listing.id,
  ownerUid: listing.ownerUid,
  createdAt: listing.createdAt,
  updatedAt: listing.updatedAt,
  title: listing.title,
  description: listing.description,
  hourPricing: listing.hourPricing,
  status: listing.status,
  brand: listing.brand,
  condition: listing.condition,
  type: listing.type,
  frameSize: listing.frameSize,
  wheelSize: listing.wheelSize,
  material: listing.material,
  pictures: listing.pictures && listing.pictures.map((picture) => serializeListingPicture(picture)),
  address: listing.address && serializeAddress(listing.address)
})

export const serializeListingPicture = (listingPicture: TListingPicture): SerializedListingPicture => ({
  id: listingPicture.id,
  path: listingPicture.path
})

export const serializeAddress = (address: TAddress): SerializedAddress => ({
  id: address.id,
  city: address.city,
  neighborhood: address.neighborhood,
  number: address.number,
  ownerUid: address.ownerUid,
  state: address.state,
  street: address.street,
  zipcode: address.zipcode,
  complement: address.complement
})

export const serializeRating = (rating: TRating): SerializedRating => ({
  id: rating.id,
  ownerUid: rating.ownerUid,
  value: rating.value
})
