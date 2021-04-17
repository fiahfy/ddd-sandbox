import { Circle } from './Circle'
import { CircleRepository } from './CircleRepository'

export class CircleService {
  private readonly circleRepository: CircleRepository

  constructor(circleRepository: CircleRepository) {
    this.circleRepository = circleRepository
  }

  exists(circle: Circle): boolean {
    const duplicated = this.circleRepository.findByCircleName(circle.name)
    return !!duplicated
  }
}
