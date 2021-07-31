import { RequestHandler } from 'express'
import Vessel from '../db/models/vessel'
import { ErrorMessage } from '../types/error'
import { isEmpty } from '../utils/helpers'
import { BaseController } from './base'

export default class VesselController extends BaseController {
  public create: RequestHandler = async (req, res) => {
    const { name, earliestReturningDate, cutOff, remarks } = req.body
    const bodyArr = [name, earliestReturningDate, cutOff]
    if (isEmpty(bodyArr)) return this.clientError(res, ErrorMessage.MISSING_DATA)

    try {
      const vessel = await Vessel.create({
        name,
        earliestReturningDate,
        cutOff,
        remarks
      })
      return this.created(res, vessel)
    } catch (createError) {
      return this.fail(res, createError)
    }
  }

  public read: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
      const vessel = await Vessel.findByPk(id)
      if (!vessel) return this.notFound(res)
      return this.ok(res, vessel)
      // return res.status(200).json(vessel)
    } catch (readError) {
      return this.fail(res, readError)
    }
  }

  public update: RequestHandler = async (req, res) => {
    const { id, name, earliestReturningDate, cutOff, remarks } = req.body
    const bodyArr = [id, name, earliestReturningDate, cutOff]
    if (isEmpty(bodyArr)) return this.clientError(res, ErrorMessage.MISSING_DATA)

    try {
      const [numOfUpdatedVessels, updatedVessels] = await Vessel.update({
        name,
        earliestReturningDate,
        cutOff,
        remarks
      }, {
        where: { id },
        returning: true
      })
      return this.ok(res, updatedVessels)
    } catch (updateError) {
      return this.fail(res, updateError)
    }
  }

  public remove: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
      await Vessel.destroy({
        where: { id }
      })
      return this.ok(res)
    } catch (removeError) {
      return this.fail(res, removeError)
    }
  }

  public getAll: RequestHandler = async (req, res) => {
    try {
      const vessels = await Vessel.findAll()
      if (!vessels) return this.notFound(res)
      return this.ok(res, vessels)
    } catch (error) {
      return this.fail(res, error)
    }
  }
}
