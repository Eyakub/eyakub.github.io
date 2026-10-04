import type { GetStaticProps } from 'next'
import LearnLayout from '../../components/learn/shell/LearnLayout'
import Hub from '../../components/learn/hub/Hub'
import { TOPICS } from '../../data/learn'

interface Props { openSlugs: string[] }

export const getStaticProps: GetStaticProps<Props> = async () => ({ props: { openSlugs: Object.keys(TOPICS) } })

export default function LearnIndex({ openSlugs }: Props) {
  return (
    <LearnLayout title="Stop by Stop: learn backend systems visually" description="Animated, beginner-friendly walkthroughs of Celery, FastAPI, Git and more, in English and Bangla.">
      <Hub openSlugs={openSlugs} />
    </LearnLayout>
  )
}
