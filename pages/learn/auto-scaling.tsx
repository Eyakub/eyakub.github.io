import LearnLayout from '../../components/learn/shell/LearnLayout'

export default function AutoScalingFilm() {
  return (
    <LearnLayout
      title="Auto Scaling | Stop by Stop"
      description="Step scaling: CPU above 70% asks for two more servers, and they start serving about four minutes later."
    >
      <main className="film">
        <h1 className="display">Auto Scaling</h1>
        <p className="lede">Step scaling. The 4:00 clock is this reel’s, not an AWS default.</p>
        <video
          src="/learn/auto-scaling.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls
          preload="auto"
        >
          A load balancer, two busy servers, and two more that boot late.
        </video>
      </main>
      <style jsx>{`
        .film {
          display: grid;
          gap: 14px;
          padding-block: 8px 20px;
        }
        .film h1 {
          font-size: clamp(40px, 6vw, 64px);
        }
        video {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #0c1222;
          border: 1px solid var(--rule);
          border-radius: var(--r-card);
        }
      `}</style>
    </LearnLayout>
  )
}
