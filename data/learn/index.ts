import type { Topic } from './types'
import { celeryRedis } from './topics/celery-redis'
import { fastapiLifecycle } from './topics/fastapi-lifecycle'
import { gitBasics } from './topics/git-basics'

export const TOPICS: Record<string, Topic> = {
  [celeryRedis.slug]: celeryRedis,
  [fastapiLifecycle.slug]: fastapiLifecycle,
  [gitBasics.slug]: gitBasics
}
