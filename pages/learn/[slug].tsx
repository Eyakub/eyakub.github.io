import type { GetStaticPaths, GetStaticProps } from 'next'
import LearnLayout from '../../components/learn/shell/LearnLayout'
import TopicPage from '../../components/learn/topic/TopicPage'
import { TOPICS } from '../../data/learn'
import type { Topic } from '../../data/learn/types'

interface Props { topic: Topic }

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.keys(TOPICS).map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => ({
  props: { topic: TOPICS[params!.slug as string] },
})

export default function LearnTopic({ topic }: Props) {
  return (
    <LearnLayout title={`${topic.title.en} | Stop by Stop`} description={topic.summary.en}>
      <TopicPage topic={topic} />
    </LearnLayout>
  )
}
