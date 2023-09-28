import type { NextFunction, Request, Response } from "express"
import type { UserRecord } from "firebase-admin/auth"

import { verifyIdToken, getUser } from "@/profile/services"
import { UnauthorizedException } from "@/exceptions"
import { HttpStatus } from "@lib/http"

export const identity = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.header("authorization") as string
    const token = header.replace("Bearer", "").trim()

    const decodedToken = await verifyIdToken(token)
    const user = await getUser(decodedToken.uid)

    req.user = user
  } catch (error) {
    req.user = {} as UserRecord
  }

  next()
}

export const authenticated = function (req: Request, res: Response, next: NextFunction) {
  const user = req.user
  const method = req.method.toLowerCase()

  if (method.includes("get") || method.includes("head")) return next()

  if (!user?.uid) return res.status(HttpStatus.Unauthorized).json(UnauthorizedException)

  next()
}
