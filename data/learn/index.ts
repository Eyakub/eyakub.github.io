import type { Topic } from './types'
import { asyncioEventLoop } from './topics/asyncio-event-loop'
import { celeryRedis } from './topics/celery-redis'
import { ciCd } from './topics/ci-cd'
import { concurrencyDeepDive } from './topics/concurrency-deep-dive'
import { concurrencyVsParallelism } from './topics/concurrency-vs-parallelism'
import { dockerCompose } from './topics/docker-compose'
import { docker } from './topics/docker'
import { djangoLifecycle } from './topics/django-lifecycle'
import { fastapiLifecycle } from './topics/fastapi-lifecycle'
import { gitBasics } from './topics/git-basics'
import { httpJourney } from './topics/http-journey'
import { multiprocessingPools } from './topics/multiprocessing-pools'
import { multithreadingDeepDive } from './topics/multithreading-deep-dive'
import { nginx } from './topics/nginx'
import { parallelismDeepDive } from './topics/parallelism-deep-dive'
import { processesVsThreads } from './topics/processes-vs-threads'
import { pythonGil } from './topics/python-gil'
import { raceConditionsLocks } from './topics/race-conditions-locks'
import { threadingDeepDive } from './topics/threading-deep-dive'

export const TOPICS: Record<string, Topic> = {
  [asyncioEventLoop.slug]: asyncioEventLoop,
  [celeryRedis.slug]: celeryRedis,
  [ciCd.slug]: ciCd,
  [concurrencyDeepDive.slug]: concurrencyDeepDive,
  [concurrencyVsParallelism.slug]: concurrencyVsParallelism,
  [dockerCompose.slug]: dockerCompose,
  [docker.slug]: docker,
  [djangoLifecycle.slug]: djangoLifecycle,
  [fastapiLifecycle.slug]: fastapiLifecycle,
  [gitBasics.slug]: gitBasics,
  [httpJourney.slug]: httpJourney,
  [multiprocessingPools.slug]: multiprocessingPools,
  [multithreadingDeepDive.slug]: multithreadingDeepDive,
  [nginx.slug]: nginx,
  [parallelismDeepDive.slug]: parallelismDeepDive,
  [processesVsThreads.slug]: processesVsThreads,
  [pythonGil.slug]: pythonGil,
  [raceConditionsLocks.slug]: raceConditionsLocks,
  [threadingDeepDive.slug]: threadingDeepDive
}
