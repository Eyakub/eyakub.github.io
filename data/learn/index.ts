import type { Topic } from './types'
import { celeryRedis } from './topics/celery-redis'
import { concurrencyVsParallelism } from './topics/concurrency-vs-parallelism'
import { fastapiLifecycle } from './topics/fastapi-lifecycle'
import { gitBasics } from './topics/git-basics'
import { multiprocessingPools } from './topics/multiprocessing-pools'
import { processesVsThreads } from './topics/processes-vs-threads'
import { pythonGil } from './topics/python-gil'

export const TOPICS: Record<string, Topic> = {
  [celeryRedis.slug]: celeryRedis,
  [concurrencyVsParallelism.slug]: concurrencyVsParallelism,
  [fastapiLifecycle.slug]: fastapiLifecycle,
  [gitBasics.slug]: gitBasics,
  [multiprocessingPools.slug]: multiprocessingPools,
  [processesVsThreads.slug]: processesVsThreads,
  [pythonGil.slug]: pythonGil
}
