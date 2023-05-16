import styles from './FinancialCalculatorNew.module.css';
import Image from 'next/image';
import { useRouter } from "next/router";
export function FinancialCalculatorNew({calculator}){
    const router = useRouter();
    const handleClick = (e, path) => {
        e.preventDefault();
        router.push(path)
    };
    if (calculator && calculator.length == 0)
        return false;
    return(
        <div className={styles.calcWrap}> 
            {calculator.map((calculatorType,index)=>(
                <div className={`${styles.calc} cursorPointer`} key={index} onClick={(e) => handleClick(e, calculatorType.path)}>
                    <p className={`font18 fontsemiBold text181b30 lineHeight26 ${styles.textHead}`}>{calculatorType.title}</p>
                    <figure className={styles.calcicon}>
                        <Image src={process.env.IMAGE_BASEURL + '/images/calculator/'+`${calculatorType.imgSrc}`} height={30} width={30} alt='Urban Money' className="imgResponsive" />       
                    </figure>
                    <p className={`font14 lineHeight26 text444 ${styles.textover}`}>{calculatorType.text} <span className="textLink fontsemiBold font14">know more</span></p>
                    <span className="textLink fontsemiBold font14">{calculatorType.btnText}</span>
                </div>
            ))}
        </div>
    )
}