const GlowCard = ({card, children}) => {
  return (
    <div className="card card-border timeline-card rounded-xl p-10">
        <div className="glow">
            <div>
                {Array.from({length: 5}, (_, i) => (
                    <img src="/images/star.png" key ={i} alt="star" className="star" />
                ))}
            </div>
        </div>
    </div>
  )
}

export default GlowCard