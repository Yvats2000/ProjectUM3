import style from './Tooltip.module.css'
export const Tooltip = ({ tooltip,children,toolType,selectTool,TooltipRight }) => {
  return (
    <div className={`${style.tooltip} ${TooltipRight?style.toottipRight:null} ${selectTool?style.tooltipSelect:null} ${toolType?style.tooltipStatic:style.toottipAbsolute} cursorPointer`}>      
          {children}
          <span className={style.tooltiptext}>{tooltip }</span>
    </div>
  )
}
