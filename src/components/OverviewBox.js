
const OverviewBox = ({icon,label,text}) => {
  return (
    <div class="overview-box__detail">
        
        <span class="overview-box__label"> {label} </span>
        <span class="overview-box__text"> {text} </span>
    </div>
  )
}

export default OverviewBox