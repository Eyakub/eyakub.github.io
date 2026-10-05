import type { Topic } from './types'
import { asyncioEventLoop } from './topics/asyncio-event-loop'
import { celeryRedis } from './topics/celery-redis'
import { concurrencyVsParallelism } from './topics/concurrency-vs-parallelism'
import { fastapiLifecycle } from './topics/fastapi-lifecycle'
import { gitBasics } from './topics/git-basics'
import { multiprocessingPools } from './topics/multiprocessing-pools'
import { processesVsThreads } from './topics/processes-vs-threads'
import { pythonGil } from './topics/python-gil'
import { raceConditionsLocks } from './topics/race-conditions-locks'

export const TOPICS: Record<string, Topic> = {
  [asyncioEventLoop.slug]: asyncioEventLoop,
  [celeryRedis.slug]: celeryRedis,
  [concurrencyVsParallelism.slug]: concurrencyVsParallelism,
  [fastapiLifecycle.slug]: fastapiLifecycle,
  [gitBasics.slug]: gitBasics,
  [multiprocessingPools.slug]: multiprocessingPools,
  [processesVsThreads.slug]: processesVsThreads,
  [pythonGil.slug]: pythonGil,
  [raceConditionsLocks.slug]: raceConditionsLocks
}
