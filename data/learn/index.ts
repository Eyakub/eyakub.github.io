import type { Topic } from './types'
import { celeryRedis } from './topics/celery-redis'
import { fastapiLifecycle } from './topics/fastapi-lifecycle'

export const TOPICS: Record<string, Topic> = {
  [celeryRedis.slug]: celeryRedis,
  [fastapiLifecycle.slug]: fastapiLifecycle
}
