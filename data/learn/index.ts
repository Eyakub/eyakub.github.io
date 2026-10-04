import type { Topic } from './types'
import { celeryRedis } from './topics/celery-redis'

export const TOPICS: Record<string, Topic> = { [celeryRedis.slug]: celeryRedis }
