import React from 'react'
import Image from 'next/image'
import Style from './TooltipWide.module.css'

export const TooltipWide = ({title,content,position}) => {
  return (
    <div className={Style.toolip}>
       <Image className={`imgResponsive`} src={'/assets/images/information.svg'} width = {12} height = {12} alt={`UM_${content}`} />
        <div className={`${Style.tooltipBox} ${position?Style.mobileLeft:Style.mobileRight}`}>
            {title && <h3 className={`font14 textWhite ${Style.heading}`}>{title}</h3>}
            <p>{content}</p>
        </div>
    </div>
  )
}
