import type { Topic } from './types'
import { celeryRedis } from './topics/celery-redis'
import { concurrencyVsParallelism } from './topics/concurrency-vs-parallelism'
import { fastapiLifecycle } from './topics/fastapi-lifecycle'
import { gitBasics } from './topics/git-basics'
import { processesVsThreads } from './topics/processes-vs-threads'

export const TOPICS: Record<string, Topic> = {
  [celeryRedis.slug]: celeryRedis,
  [concurrencyVsParallelism.slug]: concurrencyVsParallelism,
  [fastapiLifecycle.slug]: fastapiLifecycle,
  [gitBasics.slug]: gitBasics,
  [processesVsThreads.slug]: processesVsThreads
}
