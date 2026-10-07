import type { Topic } from './types'
import { asyncioEventLoop } from './topics/asyncio-event-loop'
import { celeryRedis } from './topics/celery-redis'
import { ciCd } from './topics/ci-cd'
import { concurrencyVsParallelism } from './topics/concurrency-vs-parallelism'
import { dockerCompose } from './topics/docker-compose'
import { docker } from './topics/docker'
import { djangoLifecycle } from './topics/django-lifecycle'
import { fastapiLifecycle } from './topics/fastapi-lifecycle'
import { gitBasics } from './topics/git-basics'
import { httpJourney } from './topics/http-journey'
import { multiprocessingPools } from './topics/multiprocessing-pools'
import { nginx } from './topics/nginx'
import { processesVsThreads } from './topics/processes-vs-threads'
import { pythonGil } from './topics/python-gil'
import { raceConditionsLocks } from './topics/race-conditions-locks'

export const TOPICS: Record<string, Topic> = {
  [asyncioEventLoop.slug]: asyncioEventLoop,
  [celeryRedis.slug]: celeryRedis,
  [ciCd.slug]: ciCd,
  [concurrencyVsParallelism.slug]: concurrencyVsParallelism,
  [dockerCompose.slug]: dockerCompose,
  [docker.slug]: docker,
  [djangoLifecycle.slug]: djangoLifecycle,
  [fastapiLifecycle.slug]: fastapiLifecycle,
  [gitBasics.slug]: gitBasics,
  [httpJourney.slug]: httpJourney,
  [multiprocessingPools.slug]: multiprocessingPools,
  [nginx.slug]: nginx,
  [processesVsThreads.slug]: processesVsThreads,
  [pythonGil.slug]: pythonGil,
  [raceConditionsLocks.slug]: raceConditionsLocks
}
